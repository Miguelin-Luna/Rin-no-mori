"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { MASCOT_STICKER } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { toggleFavorite } from '@/app/actions/favorites';

interface DetailViewProps {
  product: Product;
  relatedProducts: Product[];
  initialFavorites?: string[];
}

export function ProductDetailClient({ product, relatedProducts, initialFavorites = [] }: DetailViewProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const { addToCart } = useCart();
  
  const isFavorite = favorites.includes(product.id);

  const onToggleFavorite = async (id: string) => {
    const isCurrentlyFav = favorites.includes(id);
    setFavorites(prev => 
      isCurrentlyFav ? prev.filter(f => f !== id) : [...prev, id]
    );

    const res = await toggleFavorite(id);
    
    if (res.error) {
      setFavorites(prev => 
        isCurrentlyFav ? [...prev, id] : prev.filter(f => f !== id)
      );
      if (res.status === 401) {
        router.push('/login');
      }
    }
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdded(false), 800);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Fase 6: Checkout
  };

  const thumbnails = product.thumbnails && product.thumbnails.length > 0
    ? product.thumbnails
    : [product.image];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 py-6 animate-in fade-in duration-300">
      
      {/* Top Header Navigation for Detail View */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#827470]/10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[#504441] hover:text-[#442a22] font-semibold text-xs transition-colors p-2 -ml-2 rounded-full hover:bg-[#f5ece7]"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Volver</span>
        </button>

        <span className="font-display font-extrabold text-lg text-[#442a22]">
          Rin no mori
        </span>

        <button
          onClick={() => onToggleFavorite(product.id)}
          className="p-2 text-[#442a22] hover:bg-[#f5ece7] rounded-full transition-colors"
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span 
            className="material-symbols-outlined text-xl text-[#442a22]"
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* Left Column: Image & Gallery */}
        <div className="col-span-1 md:col-span-6 lg:col-span-7 space-y-4">
          
          {/* Main Display Image with Mascot Sticker */}
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-[#fbf2ed] border border-[#827470]/10 shadow-xs group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            
            {/* Mascot Dog Decorative Sticker */}
            <div className="absolute bottom-4 right-4 w-16 h-16 md:w-20 md:h-20 rotate-12 opacity-90 drop-shadow-md mix-blend-multiply transition-transform hover:scale-110 pointer-events-none">
              <img
                src={MASCOT_STICKER}
                alt="Cute puppy sticker"
                className="w-full h-full object-contain"
              />
            </div>
            
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                 <span className="bg-white text-red-600 font-bold px-6 py-2 rounded-xl text-lg shadow-xl">Agotado</span>
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {thumbnails.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border cursor-pointer transition-all ${
                    selectedImage === img
                      ? 'border-[#442a22] ring-2 ring-[#442a22]/20 opacity-100 scale-98'
                      : 'border-[#827470]/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Product Info & Purchase Actions */}
        <div className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col gap-6">
          
          <div>
            {/* Tag Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    tag.toLowerCase().includes('bestseller') || tag.toLowerCase().includes('vendido')
                      ? 'bg-[#dbea9e] text-[#5e6a2c]'
                      : 'bg-[#e9e1dc] text-[#504441]'
                  }`}
                >
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 text-xs text-[#586427] font-semibold ml-auto">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                {product.rating} ({product.reviewCount} opiniones)
              </span>
            </div>

            {/* Title & Price */}
            <h1 className="font-display font-bold text-2xl md:text-3xl text-[#1e1b18] mb-1">
              {product.name}
            </h1>
            {product.japaneseName && (
              <p className="text-sm font-semibold text-[#586427] mb-3">{product.japaneseName}</p>
            )}

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display font-bold text-2xl text-[#442a22]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#504441]">/ unidad</span>
            </div>

            <p className="font-body text-sm text-[#504441] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Flavor Notes & Ingredients if available */}
          {(product.flavorNotes || product.ingredients) && (
            <div className="bg-[#fbf2ed] p-4 rounded-xl border border-[#827470]/10 space-y-2 text-xs">
              {product.flavorNotes && (
                <div>
                  <span className="font-bold text-[#442a22] uppercase tracking-wider block mb-1">Notas de Sabor:</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {product.flavorNotes.map(fn => (
                      <span key={fn} className="bg-[#fff8f5] px-2.5 py-1 rounded-md border border-[#827470]/10 text-[#504441]">
                        🌿 {fn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="pt-1">
                  <span className="font-bold text-[#442a22] uppercase tracking-wider block mb-1">Ingredientes Principales:</span>
                  <p className="text-[#504441]">{product.ingredients.join(' • ')}</p>
                </div>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="border-t border-[#827470]/10 pt-5">
            <h3 className="font-label-md text-xs font-bold text-[#1e1b18] mb-3">Cantidad</h3>
            <div className="flex items-center gap-4 w-max bg-[#fbf2ed] rounded-full border border-[#827470]/15 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#504441] hover:bg-[#efe6e2] disabled:opacity-50 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="font-semibold text-sm w-8 text-center text-[#1e1b18]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#504441] hover:bg-[#efe6e2] disabled:opacity-50 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 text-white py-3.5 px-6 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-110 shadow-sm hover:shadow-md disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed ${
                isAdded
                  ? 'bg-[#586427] animate-cart-pop scale-105 ring-2 ring-[#dbea9e]'
                  : 'bg-[#442a22] hover:bg-[#5d4037]'
              }`}
            >
              <span className={`material-symbols-outlined text-lg transition-transform ${isAdded ? 'scale-125' : ''}`}>
                {isAdded ? 'check_circle' : 'shopping_cart'}
              </span>
              {isAdded ? '¡Añadido al Carrito!' : product.inStock ? 'Agregar al Carrito' : 'Agotado'}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="sm:w-auto w-full bg-transparent border border-[#442a22] text-[#442a22] py-3.5 px-6 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#442a22]/5 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comprar Ahora
            </button>
          </div>

          {/* Freshly Baked & Delivered Box */}
          <div className="mt-2 bg-[#f5ece7] p-4 rounded-xl flex items-start gap-3.5 border border-[#827470]/10">
            <span className="material-symbols-outlined text-[#586427] text-2xl mt-0.5">local_shipping</span>
            <div>
              <h4 className="font-bold text-xs text-[#1e1b18] mb-0.5">Horneado y entregado fresco</h4>
              <p className="text-xs text-[#504441] leading-relaxed">
                Los pedidos antes de las 12 PM se envían el mismo día. Empacados con cuidado para mantener su calidad perfecta.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-[#827470]/10">
          <h3 className="font-display font-bold text-xl text-[#442a22] mb-6 flex items-center gap-2">
            <span>También te podría gustar</span>
            <span className="text-lg">🌿</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => {
              const isFav = favorites.includes(p.id);
              let badgeTag = p.tags[0];
              
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorite={isFav}
                  onToggleFavorite={(id, e) => {
                    e.stopPropagation();
                    onToggleFavorite(id);
                  }}
                  onAddToCart={(prod, e) => {
                    e.stopPropagation();
                    addToCart(prod, 1);
                  }}
                  addedId={null}
                  badgeTag={badgeTag}
                  onClick={() => router.push(`/productos/${p.id}`)}
                />
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
