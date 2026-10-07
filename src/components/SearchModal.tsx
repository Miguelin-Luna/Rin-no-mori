import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [query, setQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedId(product.id);
    onAddToCart(product);
    setTimeout(() => {
      setAddedId(null);
    }, 450);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = products.filter(p => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      (p.japaneseName && p.japaneseName.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1b18]/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 md:pt-24 animate-in fade-in duration-200">
      <div className="bg-[#fff8f5] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#827470]/15 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header Search Input */}
        <div className="p-4 border-b border-[#827470]/10 flex items-center gap-3 bg-[#f5ece7]">
          <span className="material-symbols-outlined text-[#442a22]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, ingrediente o té (ej. Matcha, Hojicha, Avellana)..."
            className="flex-1 bg-transparent text-[#1e1b18] placeholder-[#504441]/60 focus:outline-none font-body text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#504441] hover:text-[#442a22] p-1 rounded-full"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-[#e9e1dc] text-[#442a22] font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-[#efe6e2] transition-colors"
          >
            Cerrar
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-[#827470]/10">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#504441]">
              <span className="material-symbols-outlined text-4xl text-[#827470] mb-2">search_off</span>
              <p className="font-semibold text-base">No encontramos resultados para "{query}"</p>
              <p className="text-sm text-[#827470] mt-1">Prueba buscando "Matcha", "Hojicha", "Regalos" o "Bombones"</p>
            </div>
          ) : (
            filteredProducts.map(p => (
              <div
                key={p.id}
                className="py-3.5 flex items-center justify-between gap-4 group hover:bg-[#fbf2ed] px-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => {
                  onSelectProduct(p.id);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 rounded-lg object-cover border border-[#827470]/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[#1e1b18] group-hover:text-[#442a22] transition-colors">
                        {p.name}
                      </h4>
                      {p.japaneseName && (
                        <span className="text-xs text-[#586427] bg-[#dbea9e]/40 px-1.5 py-0.5 rounded-sm font-sans">
                          {p.japaneseName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#504441] line-clamp-1 mt-0.5">{p.shortDescription}</p>
                    <span className="text-xs font-bold text-[#442a22]">${p.price.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleAdd(p, e)}
                  className={`text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-200 hover:scale-105 active:scale-110 shrink-0 shadow-2xs ${
                    addedId === p.id
                      ? 'bg-[#586427] animate-cart-pop scale-110 ring-2 ring-[#dbea9e]'
                      : 'bg-[#442a22] hover:bg-[#5d4037]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm transition-transform ${addedId === p.id ? 'scale-125' : ''}`}>
                    {addedId === p.id ? 'check' : 'add'}
                  </span>
                  {addedId === p.id ? '¡Añadido!' : 'Agregar'}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div className="p-3 bg-[#fbf2ed] border-t border-[#827470]/10 text-xs text-[#504441] flex items-center gap-2 overflow-x-auto">
          <span className="font-semibold text-[#442a22] shrink-0">Populares:</span>
          {['Matcha', 'Hojicha', 'Avellana', 'Bombones', 'Caja Regalo'].map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="bg-[#e9e1dc] hover:bg-[#efe6e2] text-[#442a22] px-2.5 py-1 rounded-full shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
