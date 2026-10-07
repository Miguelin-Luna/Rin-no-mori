import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import OrderDetailClient from './OrderDetailClient';

export default async function AdminPedidoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: true,
      shippingAddress: true,
      payment: true,
      items: {
        include: { product: true }
      },
      giftBoxes: {
        include: { items: { include: { product: true } } }
      }
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center gap-4">
        <Link href="/admin/pedidos" className="w-10 h-10 rounded-full bg-white border border-border/15 flex items-center justify-center text-brown hover:bg-cream transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-display font-bold text-3xl text-brown">Pedido {order.orderNumber}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Creado el {new Date(order.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Se delega la UI interactiva (Selector de estados) a un Client Component */}
      <OrderDetailClient order={order} />
    </div>
  );
}
