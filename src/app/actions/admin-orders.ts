"use server";

import prisma from "@/lib/prisma";
import { checkAdminAPI } from "@/lib/auth-admin";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    await checkAdminAPI();

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return { error: "Orden no encontrada." };
    }

    const currentStatus = order.status;

    // 1. Validar máquina de estados permitida
    let isValidTransition = false;
    
    if (newStatus === 'CANCELADO' && currentStatus === 'PENDIENTE') {
      isValidTransition = true;
    } else if (newStatus === 'EN_PREPARACION' && currentStatus === 'PAGADO') {
      isValidTransition = true;
    } else if (newStatus === 'ENVIADO' && currentStatus === 'EN_PREPARACION') {
      isValidTransition = true;
    } else if (newStatus === 'ENTREGADO' && currentStatus === 'ENVIADO') {
      isValidTransition = true;
    }

    if (!isValidTransition) {
      return { error: `Transición inválida: No se puede cambiar de ${currentStatus} a ${newStatus}.` };
    }

    // 2. Transacción para asegurar la consistencia
    await prisma.$transaction(async (tx) => {
      // Si cancelamos una orden PENDIENTE, debemos liberar el stock reservado
      if (newStatus === 'CANCELADO' && currentStatus === 'PENDIENTE') {
        const orderItems = await tx.orderItem.findMany({ where: { orderId } });
        for (const item of orderItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } }
          });
        }

        const boxes = await tx.giftBox.findMany({
          where: { orderId },
          include: { items: true }
        });

        for (const box of boxes) {
          for (const item of box.items) {
            await tx.product.update({
              where: { id: item.productId },
              data: { stock: { increment: item.quantity } }
            });
          }
        }
      }

      await tx.order.update({
        where: { id: orderId },
        data: { status: newStatus as any }
      });
    });

    revalidatePath(`/admin/pedidos/${orderId}`);
    revalidatePath(`/admin/pedidos`);
    revalidatePath(`/admin`);

    return { success: true };

  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return { error: "Acceso no autorizado." };
    }
    console.error("Error actualizando orden:", error);
    return { error: "Error interno del servidor." };
  }
}
