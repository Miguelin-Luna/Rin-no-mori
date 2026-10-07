import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import ProductsTableClient from './ProductsTableClient';

export default async function AdminProductosPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50, // Limitar a los 50 más recientes para evitar colapso de memoria
    include: {
      category: true,
      images: {
        take: 1
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-brown">Catálogo de Productos</h1>
          <p className="text-muted-foreground mt-1 text-sm">Gestiona precios, inventario y visibilidad.</p>
        </div>
        <Link 
          href="/admin/productos/nuevo"
          className="bg-brown hover:bg-brown/90 text-white font-bold py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Nuevo Producto
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-border/15 shadow-sm overflow-hidden">
        <ProductsTableClient initialProducts={products} />
      </div>
    </div>
  );
}
