import React, { useState } from 'react';
import { Product, ViewTab } from '../types';

interface FavoritesViewProps {
  products: Product[];
  favoriteIds: string[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  setActiveTab: (tab: ViewTab) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  products,
  favoriteIds,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  setActiveTab
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedId(product.id);
    onAddToCart(product);
    setTimeout(() => {
      setAddedId(null);
    }, 450);
  };

  const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16 py-6 md:py-10 animate-in fade-in duration-300 space-y-6">
      <div className="flex justify-between items-center border-b border-[#827470]/10 pb-4">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22]">
            Tus Favoritos
          </h2>
          <p className="text-xs text-[#504441] mt-0.5">Tus creaciones artesanales guardadas para después</p>
        </div>
        <span className="text-xs font-semibold text-[#586427] bg-[#dbea9e]/40 px-3 py-1 rounded-full border border-[#586427]/15">
          {favoriteProducts.length} guardados
        </span>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-[#fbf2ed] rounded-2xl border border-[#827470]/10 max-w-lg mx-auto w-full my-6 p-8">
          <div className="w-16 h-16 bg-[#e9e1dc] text-[#ba1a1a] rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">favorite_border</span>
          </div>
          <h3 className="font-display font-bold text-xl text-[#442a22]">No tienes favoritos aún</h3>
          <p className="text-xs text-[#504441] max-w-xs mx-auto">
            Explora el catálogo y presiona el corazón en las galletas que más te gusten.
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="bg-[#442a22] hover:bg-[#5d4037] text-white font-semibold text-xs px-6 py-3 rounded-xl transition-all active:scale-95"
          >
            Explorar Catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map(product => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              className="bg-white rounded-2xl overflow-hidden border border-[#827470]/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#fbf2ed]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#ba1a1a] shadow-xs"
                  title="Quitar de favoritos"
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-display font-bold text-base text-[#1e1b18]">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#504441] mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between">
                  <span className="font-bold text-base text-[#442a22]">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={(e) => handleAdd(product, e)}
                    className={`text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-110 flex items-center gap-1 shadow-2xs ${
                      addedId === product.id
                        ? 'bg-[#586427] animate-cart-pop scale-110 ring-2 ring-[#dbea9e]'
                        : 'bg-[#442a22] hover:bg-[#5d4037]'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-sm transition-transform ${addedId === product.id ? 'scale-125' : ''}`}>
                      {addedId === product.id ? 'check' : 'shopping_cart'}
                    </span>
                    {addedId === product.id ? '¡Añadido!' : 'Agregar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
