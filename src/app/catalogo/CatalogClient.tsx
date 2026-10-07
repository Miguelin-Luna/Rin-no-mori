"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { Logo } from '@/components/brand/Logo';
import { BrandValues } from '@/components/brand/BrandValues';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { toggleFavorite } from '@/app/actions/favorites';

interface CatalogViewProps {
  products: Product[];
  initialFavorites?: string[];
}

export type CatalogFilter = 
  | 'all'
  | 'tradicionales'
  | 'matcha'
  | 'temporada'
  | 'regalos'
  | 'mini-pasteleria';

const FILTER_PILLS: { id: CatalogFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'Todos los productos', icon: 'grid_view' },
  { id: 'tradicionales', label: 'Tradicionales', icon: 'cookie' },
  { id: 'matcha', label: 'Matcha', icon: 'eco' },
  { id: 'temporada', label: 'Temporada', icon: 'auto_awesome' },
  { id: 'regalos', label: 'Regalo', icon: 'card_giftcard' },
  { id: 'mini-pasteleria', label: 'Mini Pastelería', icon: 'bakery_dining' },
];

function CatalogContent({ products, initialFavorites = [] }: CatalogViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = (searchParams.get('categoria') as CatalogFilter) || 'all';
  const initialSearch = searchParams.get('busqueda') || '';
  const sortBy = searchParams.get('orden') || 'destacados';

  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // Debounce search query changes to URL
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== (searchParams.get('busqueda') || '')) {
        updateUrl({ busqueda: searchQuery || null });
      }
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchParams, updateUrl]);

  // Update local search if URL changes externally
  useEffect(() => {
    const urlSearch = searchParams.get('busqueda') || '';
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const onToggleFavorite = async (productId: string) => {
    const isCurrentlyFav = favorites.includes(productId);
    setFavorites(prev => 
      isCurrentlyFav ? prev.filter(id => id !== productId) : [...prev, productId]
    );

    const res = await toggleFavorite(productId);
    
    if (res.error) {
      setFavorites(prev => 
        isCurrentlyFav ? [...prev, productId] : prev.filter(id => id !== productId)
      );
      if (res.status === 401) {
        router.push('/login');
      }
    }
  };

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedId(product.id);
    addToCart(product, 1);
    setTimeout(() => {
      setAddedId(null);
    }, 450);
  };

  const isMatchFilter = (product: Product, filter: CatalogFilter): boolean => {
    if (filter === 'all') return true;
    if (filter === 'regalos') {
      return (
        product.category === 'regalos' ||
        product.category === 'bombones' ||
        product.tags.some(t => t.toLowerCase().includes('regalo') || t.toLowerCase().includes('empaque'))
      );
    }
    if (filter === 'matcha') {
      return (
        product.name.toLowerCase().includes('matcha') ||
        product.shortDescription.toLowerCase().includes('matcha') ||
        product.description.toLowerCase().includes('matcha') ||
        (product.ingredients && product.ingredients.some(i => i.toLowerCase().includes('matcha') || i.toLowerCase().includes('té')))
      );
    }
    if (filter === 'tradicionales') {
      return (
        product.category === 'galletas' ||
        product.tags.some(t => t.toLowerCase().includes('artesanal') || t.toLowerCase().includes('bestseller') || t.toLowerCase().includes('nuts')) ||
        product.name.toLowerCase().includes('hazelnut') ||
        product.name.toLowerCase().includes('hojicha')
      );
    }
    if (filter === 'temporada') {
      return (
        product.tags.some(t => t.toLowerCase().includes('limitada') || t.toLowerCase().includes('insignia') || t.toLowerCase().includes('especialidad') || t.toLowerCase().includes('fresco')) ||
        product.category === 'postres' ||
        product.category === 'bombones'
      );
    }
    if (filter === 'mini-pasteleria') {
      return product.category === 'mini-pasteleria';
    }
    return true;
  };

  // Filter & Search Logic
  let processedProducts = products.filter(p => {
    const matchesCategory = isMatchFilter(p, activeFilter);
    const searchUrlValue = searchParams.get('busqueda') || '';
    const matchesSearch = searchUrlValue.trim() === '' ||
      p.name.toLowerCase().includes(searchUrlValue.toLowerCase()) ||
      p.description.toLowerCase().includes(searchUrlValue.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchUrlValue.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  if (sortBy === 'precio-asc') {
    processedProducts = [...processedProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'precio-desc') {
    processedProducts = [...processedProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'recientes') {
    // Si tuviéramos fecha de creación, la usaríamos.
    // Como no está en el tipo, dejamos igual o invertimos.
    processedProducts = [...processedProducts].reverse(); 
  } else if (sortBy === 'destacados') {
    // sortBy === 'destacados' (default)
    // En el cliente original se ordenaba por featured o rating. 
    processedProducts = [...processedProducts].sort((a, b) => b.rating - a.rating);
  }

  // Count items for each filter badge
  const getFilterCount = (filterId: CatalogFilter) => {
    return products.filter(p => isMatchFilter(p, filterId)).length;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 animate-in fade-in duration-300 space-y-8 bg-[#f8f3e9]">
      
      {/* 1. HERO BANNER - Exact match with user image */}
      <section className="relative w-full rounded-3xl overflow-hidden bg-[#f2ebd9] p-6 md:p-12">
        
        {/* Botanical Leaf Overlay Graphic Left */}
        <div className="absolute left-0 top-0 h-full w-32 md:w-48 pointer-events-none select-none">
          <img src="/brand/flor.png" alt="" className="w-full h-full object-contain object-left" />
        </div>

        {/* Botanical Leaf Overlay Graphic Right */}
        <div className="absolute right-0 top-0 h-full w-32 md:w-48 pointer-events-none select-none transform scale-x-[-1]">
          <img src="/brand/flor.png" alt="" className="w-full h-full object-contain object-left" />
        </div>

        {/* Banner Content Grid */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          
          <div className="shrink-0 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center rounded-full overflow-hidden bg-[#f4e7da]/50 border border-[#827470]/10 shadow-2xs hover:scale-102 transition-transform duration-300">
              <div className="w-full h-full scale-[1.15] origin-center">
                <Logo size="100%" variant="full" />
              </div>
            </div>
          </div>

          {/* Center Column: Text & Headline */}
          <div className="flex-1 text-center space-y-4 max-w-lg">
            <div className="inline-block">
              <span className="text-[11px] font-bold text-[#5e6a2c] uppercase tracking-widest bg-[#dbea9e]/60 px-3.5 py-1.5 rounded-full border border-[#586427]/20 shadow-2xs">
                ✦ CATÁLOGO RIN NO MORI ✦
              </span>
            </div>

            <h1 className="text-[#4a3327]" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem', lineHeight: 1.1 }}>
              Nuestras Creaciones<br />Artesanales
            </h1>

            <p className="font-body text-xs sm:text-sm text-[#504441] leading-relaxed max-w-md mx-auto">
              Explora nuestra selección horneada diariamente con ingredientes de alta calidad e inspiración japonesa.
            </p>
          </div>

          {/* Right Column: Featured Cake Photo on Wooden Pedestal */}
          <div className="shrink-0 flex justify-center">
            <div className="w-56 h-48 sm:w-64 sm:h-56 md:w-72 md:h-60 rounded-3xl overflow-hidden border border-[#827470]/15 shadow-sm group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg"
                alt="Pastel de Naranja y Coco Rin no mori"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>

      </section>

      {/* 2. DYNAMIC FILTER BAR */}
      <div className="w-full bg-[#ffffff] rounded-2xl p-4 md:p-6 border border-[#827470]/15 space-y-4">
        
        {/* Top Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[#827470]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, sabor o ingrediente..."
              className="w-full bg-[#fbf2ed]/60 text-xs text-[#1e1b18] placeholder-[#827470]/70 pl-10 pr-9 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none focus:ring-2 focus:ring-[#586427]/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  updateUrl({ busqueda: null });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#827470] hover:text-[#442a22]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-[#504441] shrink-0">Ordenar por:</span>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => updateUrl({ orden: e.target.value })}
                className="w-full sm:w-auto appearance-none bg-[#fbf2ed]/60 text-xs font-semibold text-[#442a22] pl-4 pr-9 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none focus:ring-2 focus:ring-[#586427]/40 cursor-pointer shadow-2xs"
              >
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="recientes">Más Recientes</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-base text-[#442a22] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

        </div>

        {/* Filter Pills Category Navigation */}
        <div className="pt-2 border-t border-[#827470]/10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FILTER_PILLS.map(pill => {
              const isActive = activeFilter === pill.id;
              const count = getFilterCount(pill.id);
              return (
                <button
                  key={pill.id}
                  onClick={() => updateUrl({ categoria: pill.id === 'all' ? null : pill.id })}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 group ${
                    isActive
                      ? 'bg-[#828b65] text-white shadow-xs scale-[1.02]'
                      : 'bg-[#fbf2ed]/60 text-[#504441] border border-[#827470]/15 hover:bg-[#f5ece7] hover:border-[#827470]/30 hover:text-[#442a22]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${isActive ? 'text-white' : 'text-[#827470] group-hover:text-[#586427]'}`}>
                    {pill.icon}
                  </span>
                  <span>{pill.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-[#586427] border border-[#827470]/10'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. MASCOT VALUE PROPOSITIONS BANNER */}
      <BrandValues />

      {/* 4. PRODUCTOS DESTACADOS SECTION HEADER */}
      <div className="space-y-6 pt-2">
        <div className="flex justify-between items-center border-b border-[#827470]/10 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-xl md:text-2xl text-[#442a22] flex items-center gap-2">
              <span>Productos del Catálogo</span>
              <span className="text-lg">🌿</span>
            </h3>
          </div>
          
          <button
            onClick={() => updateUrl({ categoria: null, busqueda: null })}
            className="text-xs font-bold text-[#586427] hover:text-[#3b4515] flex items-center gap-1 group transition-colors"
          >
            <span>Ver todos los productos</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Product Cards Grid */}
        {processedProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#fbf2ed]/50 rounded-2xl border border-dashed border-[#827470]/20 space-y-4">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center border border-[#827470]/15 shadow-2xs">
              <span className="material-symbols-outlined text-3xl text-[#827470]">search_off</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-lg text-[#442a22]">No encontramos coincidencias</h4>
              <p className="text-xs text-[#504441] max-w-sm mx-auto">
                No hay productos que coincidan con la combinación de filtros seleccionados.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                updateUrl({ categoria: null, busqueda: null, orden: null });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#442a22] hover:bg-[#5d4037] text-white text-xs font-semibold rounded-xl transition-all shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Restablecer todos los filtros
            </button>
          </div>
        ) : (
          <div key={`grid-${activeFilter}-${sortBy}-${searchParams.get('busqueda')}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem', width: '100%', marginTop: '2rem' }}>
            {processedProducts.map((product, index) => {
              const isFav = favorites.includes(product.id);
              
              let badgeTag = product.tags[0];
              if (product.id === 'caja-regalo-artesanal') badgeTag = 'Nuevo';
              if (product.id === 'galleta-matcha') badgeTag = 'Más vendido';
              if (product.id === 'bombones-artesanales') badgeTag = 'Temporada';

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

export function CatalogClient(props: CatalogViewProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Cargando catálogo...</div>}>
      <CatalogContent products={props.products} initialFavorites={props.initialFavorites} />
    </Suspense>
  );
}
