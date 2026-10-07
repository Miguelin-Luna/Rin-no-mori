import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductFormClient from '../../ProductFormClient';

export default async function EditarProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
    include: {
      images: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center gap-4">
        <Link href="/admin/productos" className="w-10 h-10 rounded-full bg-white border border-border/15 flex items-center justify-center text-brown hover:bg-cream transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-display font-bold text-3xl text-brown">Editar Producto</h1>
          <p className="text-muted-foreground mt-1 text-sm">Modificando: {product.name}</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl border border-border/15 shadow-sm max-w-4xl">
        <ProductFormClient product={product} categories={categories} />
      </div>
    </div>
  );
}
