"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CartItem } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicializar cliente de MP
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-dummy-token',
  options: { timeout: 5000 }
});

interface CheckoutFormData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export async function checkoutOrder(cartItems: CartItem[], formData: CheckoutFormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Debes iniciar sesión para realizar la compra." };
    }

    if (!cartItems || cartItems.length === 0) {
      return { error: "El carrito está vacío." };
    }

    const userId = session.user.id;
    let subtotal = 0;
    const shippingCost = 5.00;

    // 1. Validar productos individuales
    const productItems = cartItems.filter(item => item.type === 'product');
    const validatedProducts = [];

    for (const item of productItems) {
      if (item.type !== 'product') continue; // typescript narrowing

      const dbProduct = await prisma.product.findUnique({
        where: { id: item.product.id }
      });

      if (!dbProduct) {
        return { error: `El producto ${item.product.name} ya no existe.` };
      }

      if (!dbProduct.isActive) {
        return { error: `El producto ${dbProduct.name} no está disponible actualmente.` };
      }

      if (dbProduct.stock < item.quantity) {
        return { error: `No hay suficiente stock para ${dbProduct.name}. Solo quedan ${dbProduct.stock}.` };
      }

      const itemTotal = dbProduct.price * item.quantity;
      subtotal += itemTotal;

      validatedProducts.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: dbProduct.price, // Precio real de BD
      });
    }

    // 2. Validar Gift Boxes
    const giftBoxItems = cartItems.filter(item => item.type === 'gift_box');
    const validatedGiftBoxes = [];

    for (const item of giftBoxItems) {
      if (item.type !== 'gift_box') continue;

      const { size, selections, presentation, message } = item.config;
      
      if (size !== 8 && size !== 12) {
        return { error: "Tamaño de caja inválido." };
      }

      let boxCookiesTotal = 0;
      const validatedSelections = [];

      let totalSelectedQuantity = 0;

      for (const sel of selections) {
        const dbProduct = await prisma.product.findUnique({
          where: { id: sel.productId }
        });

        if (!dbProduct || !dbProduct.isActive) {
          return { error: `El sabor seleccionado no está disponible.` };
        }

        // Para las cajas, asumimos que el stock también cuenta. 
        // Idealmente, se descuenta stock de la galleta individual por sel.quantity * item.quantity
        const requiredQuantity = sel.quantity * item.quantity;
        if (dbProduct.stock < requiredQuantity) {
          return { error: `No hay suficiente stock de ${dbProduct.name} para completar tu caja.` };
        }

        boxCookiesTotal += dbProduct.price * sel.quantity;
        totalSelectedQuantity += sel.quantity;

        validatedSelections.push({
          productId: dbProduct.id,
          quantity: sel.quantity,
        });
      }

      if (totalSelectedQuantity !== size) {
        return { error: `La caja debe tener exactamente ${size} galletas.` };
      }

      const packagingFee = presentation === 'premium' ? 8.00 : 2.50;
      const boxTotal = boxCookiesTotal + packagingFee;
      
      subtotal += boxTotal * item.quantity;

        validatedGiftBoxes.push({
        size,
        price: boxTotal, // total per box unit
        presentation,
        message: message || '',
        quantity: item.quantity,
        selections: validatedSelections
      });
    }

    const totalAmount = subtotal + shippingCost;
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    // 3. Crear Transacción (Order, Items, Shipping, Payment y reducir stock)
    const order = await prisma.$transaction(async (tx) => {
      
      // A. Crear Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: 'PENDIENTE',
          totalAmount,
          subtotal,
          shippingCost,
          shippingAddress: {
            create: {
              fullName: formData.fullName,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country,
              phone: formData.phone,
            }
          },
          items: {
            create: validatedProducts.map(vp => ({
              productId: vp.productId,
              quantity: vp.quantity,
              price: vp.price,
            }))
          },
          payment: {
            create: {
              provider: 'dummy',
              amount: totalAmount,
              status: 'PENDING',
              transactionId: `TXN-${uuidv4()}`
            }
          }
        },
        include: { payment: true } // Para obtener el orderId y paymentId
      });

      // B. Crear GiftBoxes
      for (const box of validatedGiftBoxes) {
        // En Prisma, cada GiftBox en el modelo Order.giftBoxes es 1 instancia.
        // Si el usuario pidió quantity = 2 cajas idénticas, creamos 2 registros de GiftBox.
        for (let i = 0; i < box.quantity; i++) {
          await tx.giftBox.create({
            data: {
              orderId: newOrder.id,
              size: box.size,
              price: box.price,
              message: box.message,
              ribbonColor: null,
              flavorTheme: null,
              items: {
                create: box.selections.map(sel => ({
                  productId: sel.productId,
                  quantity: sel.quantity,
                }))
              }
            }
          });
        }
      }

      // C. Reducir Stock (Reserva Temporal Atómica)
      for (const vp of validatedProducts) {
        const updateResult = await tx.product.updateMany({
          where: { 
            id: vp.productId,
            stock: { gte: vp.quantity }
          },
          data: { stock: { decrement: vp.quantity } }
        });

        if (updateResult.count === 0) {
          throw new Error(`Concurrencia: No hay suficiente stock para el producto.`);
        }
      }

      for (const box of validatedGiftBoxes) {
        for (const sel of box.selections) {
          const reqQty = sel.quantity * box.quantity;
          const updateResult = await tx.product.updateMany({
            where: { 
              id: sel.productId,
              stock: { gte: reqQty }
            },
            data: { stock: { decrement: reqQty } }
          });

          if (updateResult.count === 0) {
            throw new Error(`Concurrencia: No hay suficiente stock para completar la caja personalizada.`);
          }
        }
      }

      return newOrder;
    });

    // 4. Crear Preferencia en Mercado Pago
    const preference = new Preference(client);
    
    // Transformar items para Mercado Pago
    const mpItems = [];
    
    for (const vp of validatedProducts) {
      const dbProduct = await prisma.product.findUnique({ where: { id: vp.productId } });
      if (dbProduct) {
        mpItems.push({
          id: dbProduct.id,
          title: dbProduct.name,
          quantity: vp.quantity,
          unit_price: vp.price,
          currency_id: 'USD'
        });
      }
    }

    for (const box of validatedGiftBoxes) {
      mpItems.push({
        id: `giftbox-${box.size}`,
        title: `Caja Personalizada de ${box.size} galletas`,
        quantity: box.quantity,
        unit_price: box.price,
        currency_id: 'USD'
      });
    }

    // Costo de envío
    if (shippingCost > 0) {
      mpItems.push({
        id: 'shipping',
        title: 'Costo de envío',
        quantity: 1,
        unit_price: shippingCost,
        currency_id: 'USD'
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const preferenceResult = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: formData.fullName,
          email: session.user.email || undefined,
        },
        back_urls: {
          success: `${baseUrl}/checkout/exito`,
          failure: `${baseUrl}/checkout/fallido`,
          pending: `${baseUrl}/checkout/pendiente`
        },
        auto_return: 'approved',
        external_reference: order.id,
        notification_url: `${baseUrl}/api/webhooks/mercadopago`
      }
    });

    return { success: true, paymentUrl: preferenceResult.init_point };

  } catch (error: any) {
    console.error("Error creating order:", error);
    if (error.message && error.message.includes("Concurrencia")) {
      return { error: "Lo sentimos, alguien más acaba de comprar la última unidad disponible de uno de tus productos. Por favor revisa tu carrito." };
    }
    return { error: "Error interno del servidor al procesar la orden." };
  }
}
