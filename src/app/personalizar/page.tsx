import React from 'react';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { Product } from '@/types';
import { PersonalizerClient } from './PersonalizerClient';

export const metadata: Metadata = {
  title: 'Personalizar Caja | Rin no mori',
  description: 'Arma tu caja de regalo ideal con tus sabores favoritos',
};

export default async function PersonalizarPage() {
  const dbProducts = await prisma.product.findMany({
    where: { isActive: true },
    include: { images: true, category: true },
  });

  const products: Product[] = dbProducts
    .filter(p => (p.category?.slug as any) === 'galletas' || (p.category?.slug as any) === 'mini-pasteleria')
    .map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description || '',
      shortDescription: p.shortDescription || '',
      category: (p.category?.slug as any) || 'galletas',
      categoryLabel: p.category?.name || 'Categoría',
      image: p.images?.find((img: any) => img.isMain)?.url || p.images?.[0]?.url || '',
      tags: p.tags,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inStock: p.stock > 0,
    }));

  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      <PersonalizerClient availableProducts={products} />
    </div>
  );
}
