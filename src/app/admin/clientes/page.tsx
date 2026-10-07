import React from 'react';
import prisma from '@/lib/prisma';
import ClientesTableClient from './ClientesTableClient';

export default async function AdminClientesPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { orders: true }
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display font-bold text-3xl text-brown">Clientes Registrados</h1>
          <p className="text-muted-foreground mt-1 text-sm">Visualiza la base de datos de usuarios de la tienda.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border/15 shadow-sm overflow-hidden">
        <ClientesTableClient initialUsers={users} />
      </div>
    </div>
  );
}
