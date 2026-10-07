import React from 'react';
import prisma from '@/lib/prisma';
import { Product } from '@/types';
import { CatalogClient } from './CatalogClient';
import { auth } from '@/lib/auth';

export default async function CatalogoPage() {
  // Obtenemos todos los productos activos.
  // El filtrado, ordenamiento y búsqueda se delegan al cliente (CatalogClient)
  // que lee de los searchParams, para permitir contar fácilmente 
  // los elementos en cada categoría de filtro ("pills") sin N+1 queries.
  const dbProducts = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      shortDescription: true,
      category: true,
      images: {
        where: { isMain: true },
        take: 1
      },
      tags: true,
      rating: true,
      reviewCount: true,
      stock: true,
      ingredients: true,
    }
  });

  const products: Product[] = dbProducts.map(p => ({
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
    <div className="min-h-screen bg-background">
      <CatalogClient products={products} initialFavorites={userFavorites} />
    </div>
  );
}
