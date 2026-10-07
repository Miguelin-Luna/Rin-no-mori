"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { toggleFavorite } from '@/app/actions/favorites';
import { Button } from '@/components/ui/button';

interface FavoritesClientProps {
  initialProducts: Product[];
}

export default function FavoritesClient({ initialProducts }: FavoritesClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [favorites, setFavorites] = useState<string[]>(initialProducts.map(p => p.id));
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedId(product.id);
    addToCart(product, 1);
    setTimeout(() => {
      setAddedId(null);
    }, 450);
  };

  const onToggleFavorite = async (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Optimistic update
    const isCurrentlyFav = favorites.includes(productId);
    
    if (isCurrentlyFav) {
      setFavorites(prev => prev.filter(id => id !== productId));
      setProducts(prev => prev.filter(p => p.id !== productId));
    } else {
      // In theory we won't add from this view since it's already filtered, 
      // but just in case:
      setFavorites(prev => [...prev, productId]);
    }

    const res = await toggleFavorite(productId);

    if (res.error) {
      // Revert si falla
      if (isCurrentlyFav) {
        setFavorites(prev => [...prev, productId]);
        const revertedProduct = initialProducts.find(p => p.id === productId);
        if (revertedProduct) {
          setProducts(prev => [...prev, revertedProduct]);
        }
      }
      if (res.status === 401) {
        router.push('/login');
      }
    }
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-10 animate-in fade-in duration-300 space-y-8">
      
      {/* HEADER */}
      <div className="space-y-6 pt-2">
        <div className="flex justify-between items-center border-b border-[#827470]/10 pb-3">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-[#442a22] flex items-center gap-2">
              <span>Mis Favoritos</span>
              <span className="material-symbols-outlined text-[#e11d48]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </h1>
          </div>
          
          <button
            onClick={() => router.push('/catalogo')}
            className="text-xs font-bold text-[#586427] hover:text-[#3b4515] flex items-center gap-1 group transition-colors"
          >
            <span>Ver todo el catálogo</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* LIST */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-[#fbf2ed]/50 rounded-2xl border border-dashed border-[#827470]/20 space-y-4">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center border border-[#827470]/15 shadow-2xs">
              <span className="material-symbols-outlined text-3xl text-[#827470]">heart_broken</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-lg text-[#442a22]">Aún no tienes favoritos</h4>
              <p className="text-xs text-[#504441] max-w-sm mx-auto">
                Explora nuestro catálogo y guarda los productos que más te gusten para encontrarlos fácilmente aquí.
              </p>
            </div>
            <Button
              onClick={() => router.push('/catalogo')}
              className="mt-4 bg-[#442a22] hover:bg-[#5d4037] text-white rounded-xl"
            >
              Explorar Catálogo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => {
              const isFav = favorites.includes(product.id);
              let badgeTag = product.tags[0];

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={isFav}
                  onToggleFavorite={onToggleFavorite}
                  onAddToCart={handleAdd}
                  addedId={addedId}
                  badgeTag={badgeTag}
                  onClick={() => router.push(`/productos/${product.id}`)}
                />
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
