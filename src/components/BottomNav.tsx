import React from 'react';
import { ViewTab } from '../types';

interface BottomNavProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  cartCount: number;
  setSelectedProductId: (id: string | null) => void;
  onOpenAuth?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setSelectedProductId,
  onOpenAuth
}) => {
  const handleNav = (tab: ViewTab) => {
    setActiveTab(tab);
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#f5ece7] border-t border-[#827470]/10 shadow-lg rounded-t-2xl flex justify-around items-center px-2 py-2.5">
      {/* Home */}
      <button
        onClick={() => handleNav('home')}
        className={`flex flex-col items-center justify-center transition-all duration-200 px-3 py-1 rounded-xl ${
          activeTab === 'home'
            ? 'bg-[#dbea9e] text-[#5e6a2c] font-semibold rounded-full px-4 py-1'
            : 'text-[#504441] hover:bg-[#efe6e2]'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
        >
          home
        </span>
        <span className="text-[11px] font-medium mt-0.5">Home</span>
      </button>

      {/* Catalog */}
      <button
        onClick={() => handleNav('catalog')}
        className={`flex flex-col items-center justify-center transition-all duration-200 px-3 py-1 rounded-xl ${
          activeTab === 'catalog'
            ? 'bg-[#dbea9e] text-[#5e6a2c] font-semibold rounded-full px-4 py-1'
            : 'text-[#504441] hover:bg-[#efe6e2]'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: activeTab === 'catalog' ? "'FILL' 1" : "'FILL' 0" }}
        >
          cookie
        </span>
        <span className="text-[11px] font-medium mt-0.5">Catálogo</span>
      </button>

      {/* Favorites */}
      <button
        onClick={() => handleNav('favorites')}
        className={`flex flex-col items-center justify-center transition-all duration-200 px-3 py-1 rounded-xl ${
          activeTab === 'favorites'
            ? 'bg-[#dbea9e] text-[#5e6a2c] font-semibold rounded-full px-4 py-1'
            : 'text-[#504441] hover:bg-[#efe6e2]'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: activeTab === 'favorites' ? "'FILL' 1" : "'FILL' 0" }}
        >
          favorite
        </span>
        <span className="text-[11px] font-medium mt-0.5">Favoritos</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => handleNav('cart')}
        className={`flex flex-col items-center justify-center transition-all duration-200 px-3 py-1 rounded-xl relative ${
          activeTab === 'cart'
            ? 'bg-[#dbea9e] text-[#5e6a2c] font-semibold rounded-full px-4 py-1'
            : 'text-[#504441] hover:bg-[#efe6e2]'
        }`}
      >
        <div className="relative">
          <span 
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeTab === 'cart' ? "'FILL' 1" : "'FILL' 0" }}
          >
            shopping_cart
          </span>
          {cartCount > 0 && activeTab !== 'cart' && (
            <span className="absolute -top-1 -right-2 bg-[#586427] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium mt-0.5">Carrito</span>
      </button>

      {/* Account / Registration */}
      {onOpenAuth && (
        <button
          onClick={onOpenAuth}
          className="flex flex-col items-center justify-center transition-all duration-200 px-3 py-1 rounded-xl text-[#504441] hover:bg-[#efe6e2]"
        >
          <span className="material-symbols-outlined text-[22px]">
            person_add
          </span>
          <span className="text-[11px] font-medium mt-0.5">Cuenta</span>
        </button>
      )}
    </nav>
  );
};
