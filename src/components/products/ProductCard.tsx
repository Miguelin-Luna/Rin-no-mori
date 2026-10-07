import React from 'react';
import { Product } from '@/types';
import { Button } from '../ui/button';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  addedId: string | null;
  badgeTag?: string;
  onClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  addedId,
  badgeTag,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#ffffff] rounded-2xl overflow-hidden border border-[#e8e2d5] hover:-translate-y-1 transition-transform duration-200 flex flex-col group cursor-pointer"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-beige">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badgeTag && (
          <span className="absolute top-3 left-3 bg-olive text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {badgeTag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-display font-bold text-sm text-foreground group-hover:text-brown transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Actions & Price */}
        <div className="pt-2 border-t border-border/10 flex items-center justify-between">
          <span className="font-bold text-sm text-brown">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => onToggleFavorite(product.id, e)}
              className="w-8 h-8 rounded-full text-muted-foreground hover:text-red-500 hover:bg-beige transition-colors"
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </Button>

            <Button
              size="sm"
              onClick={(e) => onAddToCart(product, e)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm ${
                addedId === product.id
                  ? 'bg-olive text-white scale-105 hover:bg-olive/90'
                  : 'bg-brown text-white hover:bg-brown/90'
              }`}
            >
              <span className="material-symbols-outlined text-xs mr-1">
                {addedId === product.id ? 'check' : 'shopping_cart'}
              </span>
              <span>{addedId === product.id ? 'Añadido' : 'Agregar'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
