import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { Product } from '@/types';
import { ProductDetailClient } from './ProductDetailClient';
import { auth } from '@/lib/auth';

// Next.js 15: params es una Promesa
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true }
  });

  if (!product) {
    return {
      title: 'Producto no encontrado | Rin no mori',
    };
  }

  const imageUrl = product.images?.[0]?.url || '/placeholder.png';

  return {
    title: `${product.name} | Rin No Mori`,
    description: product.shortDescription || product.description || '',
    openGraph: {
      title: `${product.name} | Rin No Mori`,
      description: product.shortDescription || product.description || '',
      url: `/productos/${product.slug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Rin No Mori`,
      description: product.shortDescription || product.description || '',
      images: [imageUrl],
    }
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dbProduct = await prisma.product.findUnique({
    where: { slug },
    include: { images: true, category: true },
  });

  if (!dbProduct) {
    notFound();
  }

  // Productos relacionados (misma categoría, excluyendo el actual)
  const relatedDbProducts = await prisma.product.findMany({
    where: {
      categoryId: dbProduct.categoryId,
      id: { not: dbProduct.id },
      isActive: true,
    },
    take: 4,
    include: { images: true, category: true },
  });

  const mapDbProductToUIProduct = (p: any): Product => ({
    id: p.id,
    name: p.name,
    price: p.price,
    description: p.description || '',
    shortDescription: p.shortDescription || '',
    category: (p.category?.slug as any) || 'galletas',
    categoryLabel: p.category?.name || 'Categoría',
    image: p.images?.find((img: any) => img.isMain)?.url || p.images?.[0]?.url || '',
    thumbnails: p.images?.map((img: any) => img.url) || [],
    tags: p.tags || [],
    rating: p.rating || 5.0,
    reviewCount: p.reviewCount || 12,
    inStock: p.stock > 0,
    ingredients: p.ingredients || [],
  });

  const product: Product = mapDbProductToUIProduct(dbProduct);
  const relatedProducts: Product[] = relatedDbProducts.map(mapDbProductToUIProduct);

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
    <div className="min-h-screen bg-[#fcf9f8]">
      <ProductDetailClient 
        product={product} 
        relatedProducts={relatedProducts}
        initialFavorites={userFavorites}
      />
    </div>
  );
}
