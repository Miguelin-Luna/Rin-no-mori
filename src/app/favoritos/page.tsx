import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Product } from '@/types';
import FavoritesClient from './FavoritesClient';

export default async function FavoritosPage() {
  const session = await auth();

  // Si no está autenticado, redirigir a login
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Traer favoritos con los detalles del producto
  const dbFavorites = await prisma.favorite.findMany({
    where: { userId: session.user.id as string },
    include: {
      product: {
        include: {
          images: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Mapear los productos a nuestro tipo UI
  const favorites: Product[] = dbFavorites.map((f) => {
    const p = f.product;
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description || '',
      shortDescription: p.shortDescription || '',
      category: (p.category?.slug as any) || 'galletas',
      categoryLabel: p.category?.name || 'Categoría',
      image: p.images.find(img => img.isMain)?.url || p.images[0]?.url || '',
      tags: p.tags,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inStock: p.stock > 0,
      ingredients: p.ingredients,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <FavoritesClient initialProducts={favorites} />
    </div>
  );
}
