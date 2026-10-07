import React from 'react';
import prisma from '@/lib/prisma';
import OrdersTableClient from './OrdersTableClient';

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display font-bold text-3xl text-brown">Gestión de Pedidos</h1>
          <p className="text-muted-foreground mt-1 text-sm">Visualiza y administra el estado de todas las órdenes.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border/15 shadow-sm overflow-hidden">
        <OrdersTableClient initialOrders={orders} />
      </div>
    </div>
  );
}
