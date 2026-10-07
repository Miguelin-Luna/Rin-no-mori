import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // 1. Simular verificación de firma criptográfica
    const authHeader = req.headers.get('Authorization');
    if (authHeader !== 'Bearer DUMMY_SECRET_KEY') {
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Payload incompleto' }, { status: 400 });
    }

    // 2. Transacción segura para actualizar y liberar stock si falla
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { payment: true }
      });

      if (!order) {
        throw new Error(`Orden no encontrada: ${orderId}`);
      }

      // Idempotencia: Si ya está pagado o cancelado, no hacemos nada
      if (order.status !== 'PENDIENTE') {
        return; 
      }

      if (status === 'COMPLETED') {
        // Actualizar Pago
        if (order.payment) {
          await tx.payment.update({
            where: { id: order.payment.id },
            data: { status: 'COMPLETED' }
          });
        }

        // Actualizar Orden
        await tx.order.update({
          where: { id: order.id },
          data: { status: 'PAGADO' }
        });

      } else if (status === 'FAILED') {
        // Actualizar Pago
        if (order.payment) {
          await tx.payment.update({
            where: { id: order.payment.id },
            data: { status: 'FAILED' }
          });
        }

        // Actualizar Orden a CANCELADO
        await tx.order.update({
          where: { id: order.id },
          data: { status: 'CANCELADO' }
        });

        // Liberar Stock que fue reservado
        const items = await tx.orderItem.findMany({ where: { orderId: order.id } });
        for (const item of items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } }
          });
        }

        const boxes = await tx.giftBox.findMany({
          where: { orderId: order.id },
          include: { items: true }
        });

        for (const box of boxes) {
          for (const item of box.items) {
            // El quantity de GiftBoxItem ya refleja la cantidad por caja.
            // Si hay multiples cajas idénticas, cada una es un registro de GiftBox.
            await tx.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } }
            });
          }
        }
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
