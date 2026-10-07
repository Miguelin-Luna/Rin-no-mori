import React from 'react';
import prisma from '@/lib/prisma';
import HomeClient from './HomeClient';
import { Product } from '@/types';
import { auth } from '@/lib/auth';

export default async function HomePage() {
  // Primero intentamos buscar productos destacados
  let dbProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      featured: true,
    },
    include: {
      images: true,
      category: true,
    },
    take: 4,
  });

  // Si aún no hay productos marcados como "featured" (como pasa recién hecho el seed),
  // traemos 4 productos activos cualquiera.
  if (dbProducts.length === 0) {
    dbProducts = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        images: true,
        category: true,
      },
      take: 4,
    });
  }

  // Mapeamos los datos de Prisma al tipo "Product" que espera nuestra UI actual
  // para no romper ProductCard.tsx ni los estados del cliente.
  const featuredProducts: Product[] = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    description: p.description || '',
    shortDescription: p.shortDescription || '',
    // casteamos a 'galletas' o cualquier ID válido del tipo CategoryId
    category: 'galletas',
    categoryLabel: p.category?.name || 'Categoría',
    image: p.images.find(img => img.isMain)?.url || p.images[0]?.url || '',
    tags: p.tags,
    rating: p.rating,
    reviewCount: p.reviewCount,
    inStock: p.stock > 0,
    ingredients: p.ingredients,
  }));

  const session = await auth();
  let userFavorites: string[] = [];

  if (session?.user?.id) {
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id as string },
      select: { productId: true }
    });
    userFavorites = favorites.map(f => f.productId);
  }

  return (
    <HomeClient 
      featuredProducts={featuredProducts} 
      initialFavorites={userFavorites} 
    />
  );
}
