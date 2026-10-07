import React, { useState } from 'react';
import { ViewTab, Product } from '../types';
import { Logo } from '../components/brand/Logo';
import { BrandValues } from '../components/brand/BrandValues';

interface HomeViewProps {
  setActiveTab: (tab: ViewTab) => void;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  products: Product[];
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectProduct,
  onAddToCart,
  products,
  favorites,
  onToggleFavorite
}) => {
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showCustomBoxModal, setShowCustomBoxModal] = useState(false);
  
  // Custom Box Builder State
  const [boxFlavor, setBoxFlavor] = useState<string>('Matcha + Avellana');
  const [boxSize, setBoxSize] = useState<number>(12);
  const [boxMessage, setBoxMessage] = useState<string>('');
  const [boxRibbon, setBoxRibbon] = useState<string>('Verde Oliva');
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedId(product.id);
    onAddToCart(product);
    setTimeout(() => setAddedId(null), 450);
  };

  // Find featured 4 products for section 6
  const featuredList = [
    products.find(p => p.id === 'caja-regalo-artesanal') || products[3],
    products.find(p => p.id === 'galleta-matcha') || products[0],
    products.find(p => p.id === 'bombones-artesanales') || products[5],
    products.find(p => p.id === 'signature-forest-hazelnut') || products[2]
  ].filter(Boolean);

  const handleAddCustomBoxToCart = () => {
    const customBoxProduct: Product = {
      id: `custom-box-${Date.now()}`,
      name: `Caja Personalizada Rin no mori (${boxSize} pcs)`,
      price: boxSize === 6 ? 14.00 : boxSize === 12 ? 26.00 : 48.00,
      description: `Sabores: ${boxFlavor}. Presentación: Cinta ${boxRibbon}. Mensaje: "${boxMessage || 'Con cariño'}"`,
      shortDescription: `Caja a medida (${boxSize} galletas) • ${boxFlavor}`,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg',
      category: 'regalos',
      categoryLabel: 'Regalos Especiales',
      rating: 5.0,
      reviewCount: 1,
      tags: ['Personalizada', 'Regalo'],
      inStock: true
    };

    onAddToCart(customBoxProduct, 1);
    setShowCustomBoxModal(false);
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-300 space-y-12 md:space-y-16">
      
      {/* 2. HERO PRINCIPAL (40-50% height screen, balanced & elegant) */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 pt-4">
        <div className="relative w-full rounded-3xl overflow-hidden bg-[#fbf2ed] border border-[#827470]/15 p-6 md:p-10 shadow-2xs">
          
          {/* Hand-drawn Botanical Accent Overlay Left */}
          <div className="absolute left-2 top-4 w-20 md:w-32 opacity-20 pointer-events-none select-none">
            <svg viewBox="0 0 100 150" fill="none" stroke="#4a3327" strokeWidth="2.5">
              <path d="M 10 140 C 30 100, 40 60, 20 10" />
              <path d="M 25 100 C 50 80, 80 80, 70 100 C 50 110, 30 110, 25 100" fill="#f4e7da" />
              <path d="M 30 60 C 60 40, 85 50, 75 70 C 55 75, 35 70, 30 60" fill="#f4e7da" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Mascot Emblem Visual */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center p-2 rounded-full bg-[#f4e7da]/60 border border-[#827470]/15 shadow-2xs hover:scale-102 transition-transform duration-300">
                <Logo size="100%" variant="full" />
              </div>
            </div>

            {/* Center: Main Message */}
            <div className="md:col-span-5 text-center md:text-left space-y-4">
              
              {/* 3. BRAND STAMP / SELLO DE MARCA */}
              <div className="inline-block">
                <span className="text-[11px] font-bold text-[#5e6a2c] uppercase tracking-widest bg-[#dbea9e]/70 px-3.5 py-1.5 rounded-full border border-[#586427]/25 shadow-2xs">
                  ✦ GALLETAS ARTESANALES ✦
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#4a3327] leading-tight tracking-tight">
                Galletas hechas<br />para regalar
              </h1>

              <p className="font-body text-xs sm:text-sm text-[#504441] leading-relaxed max-w-md mx-auto md:mx-0">
                Pequeños momentos de dulzura, horneados artesanalmente con inspiración japonesa.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-6 py-3 bg-[#442a22] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#5d4037] active:scale-95 transition-all flex items-center gap-2 group"
                >
                  <span>Ver nuestras galletas</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <button
                  onClick={() => setShowStoryModal(true)}
                  className="px-6 py-3 bg-white/80 text-[#442a22] text-xs font-bold rounded-xl border border-[#827470]/20 hover:bg-white active:scale-95 transition-all shadow-2xs"
                >
                  Conocer nuestra historia
                </button>
              </div>

            </div>

            {/* Far Right: Professional Cake/Cookie Photo */}
            <div className="md:col-span-3 flex justify-center">
              <div className="w-52 h-44 sm:w-60 sm:h-52 rounded-2xl overflow-hidden border border-[#827470]/15 shadow-sm group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg"
                  alt="Pastel y galletas artesanales Rin no mori"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. BUSCADOR Y CATEGORÍAS DE PRODUCTOS */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="bg-[#ffffff] rounded-2xl p-4 md:p-6 border border-[#827470]/15 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[#827470]">
                search
              </span>
              <input
                type="text"
                onClick={() => setActiveTab('catalog')}
                placeholder="Buscar por nombre, sabor o ingrediente..."
                className="w-full bg-[#fbf2ed]/60 text-xs text-[#1e1b18] placeholder-[#827470]/70 pl-10 pr-4 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none cursor-pointer"
                readOnly
              />
            </div>

            <button
              onClick={() => setActiveTab('catalog')}
              className="text-xs font-bold text-[#586427] hover:text-[#3b4515] flex items-center gap-1 group"
            >
              <span>Explorar catálogo completo</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#827470]/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { label: 'Todos los productos', icon: 'grid_view' },
              { label: 'Tradicionales', icon: 'cookie' },
              { label: 'Matcha', icon: 'eco' },
              { label: 'Temporada', icon: 'auto_awesome' },
              { label: 'Regalo', icon: 'card_giftcard' },
              { label: 'Mini Pastelería', icon: 'bakery_dining' },
            ].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-[#fbf2ed]/70 text-[#504441] border border-[#827470]/15 hover:bg-[#586427] hover:text-white transition-all flex items-center gap-2 group shadow-2xs"
              >
                <span className="material-symbols-outlined text-base text-[#827470] group-hover:text-white">
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE VALORES DE LA MARCA (ValuePropsBanner with exact 4 Mascot Illustrations) */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12">
        <BrandValues />
      </section>

      {/* 6. PRODUCTOS DESTACADOS SECTION */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-6">
        <div className="flex justify-between items-center border-b border-[#827470]/12 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22]">
              Productos destacados
            </h2>
            <span className="text-xl">🌿</span>
          </div>

          <button
            onClick={() => setActiveTab('catalog')}
            className="text-xs font-bold text-[#586427] hover:text-[#3b4515] flex items-center gap-1 group transition-colors"
          >
            <span>Ver todos los productos</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Grid of 4 Featured Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredList.map((product, idx) => {
            const isFav = favorites.includes(product.id);
            let badgeTag = product.tags[0];
            if (idx === 0) badgeTag = 'Nuevo';
            if (idx === 1) badgeTag = 'Más vendido';
            if (idx === 2) badgeTag = 'Temporada';

            return (
              <div
                key={`${product.id}-${idx}`}
                onClick={() => onSelectProduct(product.id)}
                className="bg-[#ffffff] rounded-2xl overflow-hidden border border-[#827470]/12 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Photo (55-60% height) */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#fbf2ed]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {badgeTag && (
                    <span className="absolute top-3 left-3 bg-[#586427] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {badgeTag}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#1e1b18] group-hover:text-[#442a22] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#827470] mt-1 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Actions & Price */}
                  <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#442a22]">
                      ${product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(product.id);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#827470] hover:text-[#e53935] hover:bg-[#fbf2ed] transition-colors"
                        title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        <span
                          className="material-symbols-outlined text-base"
                          style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          favorite
                        </span>
                      </button>

                      <button
                        onClick={(e) => handleAdd(product, e)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-2xs ${
                          addedId === product.id
                            ? 'bg-[#586427] text-white scale-105'
                            : 'bg-[#442a22] text-white hover:bg-[#5d4037]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">
                          {addedId === product.id ? 'check' : 'shopping_cart'}
                        </span>
                        <span>{addedId === product.id ? 'Añadido' : 'Agregar'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. SECCIÓN “ELIGE TU CAJA” */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] font-bold text-[#5e6a2c] uppercase tracking-widest bg-[#dbea9e]/50 px-3 py-1 rounded-full border border-[#586427]/20">
            SELECCIÓN ESPECIAL
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22]">
            Un pequeño bosque de dulzura para regalar
          </h2>
          <p className="text-xs sm:text-sm text-[#504441]">
            Encuentra la caja perfecta para cada ocasión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: CAJA PEQUEÑA */}
          <div className="bg-[#ffffff] rounded-2xl border border-[#827470]/15 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="h-44 rounded-xl overflow-hidden bg-[#fbf2ed]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRtfYyWhcCYUqma8Ww9u-vRR1MKw-Tc123yaAZPF1FRIp_bTCWnIIzRAkqgOsU8NX1DssOBcs4bc6KAijegQU37ISZALKQV1wNGdFN-FUVazfcMLBqjS5xEeGM0L339ESML53I8DHMA7JBwbibDLYvVXi_S2sopxJQTTdiZMIrsZoU-xinhJ8iIDs19MygFDfYf_hBYdruQjjWHxsLSLWOJDRKPHRPgLxBKDSfsnphwfnh-8Q8L7kbyQ"
                  alt="Caja Pequeña 6 galletas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#586427] uppercase">6 GALLETAS</span>
                <h3 className="font-display font-bold text-lg text-[#442a22]">Caja Pequeña</h3>
                <p className="text-xs text-[#504441]">Para un pequeño detalle cotidiano.</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between">
              <span className="font-bold text-base text-[#442a22]">$14.00</span>
              <button
                onClick={() => {
                  setBoxSize(6);
                  setShowCustomBoxModal(true);
                }}
                className="px-4 py-2 bg-[#442a22] text-white text-xs font-bold rounded-xl hover:bg-[#5d4037] transition-all"
              >
                Elegir esta caja
              </button>
            </div>
          </div>

          {/* Card 2: CAJA ESPECIAL (MÁS ELEGIDA) */}
          <div className="bg-[#ffffff] rounded-2xl border-2 border-[#586427] p-6 shadow-md transition-all flex flex-col justify-between space-y-4 relative group transform scale-[1.02]">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#586427] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs">
              ✦ MÁS ELEGIDA ✦
            </span>

            <div className="space-y-3 pt-2">
              <div className="h-44 rounded-xl overflow-hidden bg-[#fbf2ed]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg"
                  alt="Caja Especial 12 galletas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#586427] uppercase">12 GALLETAS</span>
                <h3 className="font-display font-bold text-lg text-[#442a22]">Caja Especial</h3>
                <p className="text-xs text-[#504441]">Una selección variada para compartir en reunión.</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between">
              <span className="font-bold text-base text-[#442a22]">$26.00</span>
              <button
                onClick={() => {
                  setBoxSize(12);
                  setShowCustomBoxModal(true);
                }}
                className="px-4 py-2 bg-[#586427] text-white text-xs font-bold rounded-xl hover:bg-[#3b4515] transition-all shadow-2xs"
              >
                Elegir esta caja
              </button>
            </div>
          </div>

          {/* Card 3: CAJA REGALO */}
          <div className="bg-[#ffffff] rounded-2xl border border-[#827470]/15 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="h-44 rounded-xl overflow-hidden bg-[#fbf2ed]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc8hlF7scGYEtgmnl16klXCE9EeTgPK94k9WpTExwFyINyTB4bM1KRJsrdKo47o18tJ7m_q-YPU8BNklCpwFGepicIhShS8ckY2LKsf0fwj4aKpNTvjBM2-7w4wQCHzmkOgw_-vH5MdWrvWu-qCmVfddBSjhhjlukug8q4W7gHjiYjBsmdVo8qja1TUP0XZMw9a-2yi9lLNUsEtA8_ASFPfnLmIdByaCx6uvAVx2MNjXMcXjDUE9CtBQ"
                  alt="Caja Regalo 24 galletas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#586427] uppercase">24 GALLETAS</span>
                <h3 className="font-display font-bold text-lg text-[#442a22]">Caja Regalo</h3>
                <p className="text-xs text-[#504441]">Para celebrar un momento verdaderamente especial.</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between">
              <span className="font-bold text-base text-[#442a22]">$48.00</span>
              <button
                onClick={() => {
                  setBoxSize(24);
                  setShowCustomBoxModal(true);
                }}
                className="px-4 py-2 bg-[#442a22] text-white text-xs font-bold rounded-xl hover:bg-[#5d4037] transition-all"
              >
                Elegir esta caja
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. ¿QUÉ SABOR VA CONTIGO? */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-6">
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <span className="text-[11px] font-bold text-[#5e6a2c] uppercase tracking-widest bg-[#dbea9e]/50 px-3.5 py-1.5 rounded-full border border-[#586427]/20">
            PERFIL DE SABORES
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22]">
            ¿Qué sabor va contigo?
          </h2>
          <p className="text-xs text-[#504441]">
            Descubre las notas distintivas que hacen única a cada galleta de Rin no mori.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div
            onClick={() => setActiveTab('catalog')}
            className="bg-[#ffffff] rounded-2xl p-5 border border-[#827470]/12 shadow-2xs hover:border-[#586427] hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#dbea9e]/40 border border-[#586427]/20 flex items-center justify-center text-2xl">
              🍵
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#586427] uppercase">INSIGNIA JAPONESA</span>
              <h3 className="font-display font-bold text-base text-[#442a22] group-hover:text-[#586427] transition-colors">
                Matcha Uji Ceremonial
              </h3>
              <p className="text-xs text-[#504441] mt-1 leading-relaxed">
                Herbal, ligero toque vegetal con final cremoso de chocolate blanco artesanal.
              </p>
            </div>
            <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between text-[11px] font-bold text-[#586427]">
              <span>Ver galletas de Matcha</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('catalog')}
            className="bg-[#ffffff] rounded-2xl p-5 border border-[#827470]/12 shadow-2xs hover:border-[#442a22] hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f4e7da]/70 border border-[#827470]/20 flex items-center justify-center text-2xl">
              🌰
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#827470] uppercase">TRADICIONAL CÁLIDO</span>
              <h3 className="font-display font-bold text-base text-[#442a22] group-hover:text-[#5d4037] transition-colors">
                Avellana Tostada
              </h3>
              <p className="text-xs text-[#504441] mt-1 leading-relaxed">
                Notas a frutos secos del bosque, mantequilla pura y un toque de flor de sal.
              </p>
            </div>
            <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between text-[11px] font-bold text-[#442a22]">
              <span>Ver galletas de Avellana</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('catalog')}
            className="bg-[#ffffff] rounded-2xl p-5 border border-[#827470]/12 shadow-2xs hover:border-[#827470] hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fbf2ed] border border-[#827470]/20 flex items-center justify-center text-2xl">
              🍂
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#827470] uppercase">TÉ AHUMADO</span>
              <h3 className="font-display font-bold text-base text-[#442a22] group-hover:text-[#827470] transition-colors">
                Hojicha de Kioto
              </h3>
              <p className="text-xs text-[#504441] mt-1 leading-relaxed">
                Té verde tostado con perfil de caramelo, nuez tostada y dulzura sutil.
              </p>
            </div>
            <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between text-[11px] font-bold text-[#504441]">
              <span>Ver galletas de Hojicha</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('catalog')}
            className="bg-[#ffffff] rounded-2xl p-5 border border-[#827470]/12 shadow-2xs hover:border-[#586427] hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fbf2ed] border border-[#827470]/20 flex items-center justify-center text-2xl">
              🍊
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#586427] uppercase">CÍTRICO FRESCO</span>
              <h3 className="font-display font-bold text-base text-[#442a22] group-hover:text-[#586427] transition-colors">
                Naranja & Coco
              </h3>
              <p className="text-xs text-[#504441] mt-1 leading-relaxed">
                Ralladura fresca de naranja, copos de coco horneado y textura suave.
              </p>
            </div>
            <div className="pt-2 border-t border-[#827470]/10 flex items-center justify-between text-[11px] font-bold text-[#586427]">
              <span>Ver galletas Cítricas</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. SECCIÓN DE PERSONALIZACIÓN ("Hazla especial") */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="bg-[#fbf2ed] rounded-3xl border border-[#827470]/15 p-6 md:p-10 shadow-2xs space-y-6">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <span className="text-[11px] font-bold text-[#586427] uppercase tracking-wider">A TU GUSTO</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22]">
              Hazla especial
            </h2>
            <p className="text-xs text-[#504441]">
              Diseña tu propia caja personalizada paso a paso para un regalo único.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="bg-white p-4 rounded-2xl border border-[#827470]/10 text-center space-y-2 flex flex-col items-center">
              <span className="material-symbols-outlined text-2xl text-[#586427]">cookie</span>
              <span className="text-xs font-bold text-[#442a22]">Elegir sabores</span>
              <span className="text-[10px] text-[#827470]">Matcha, Hojicha, Avellana, Naranja</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#827470]/10 text-center space-y-2 flex flex-col items-center">
              <span className="material-symbols-outlined text-2xl text-[#586427]">grid_view</span>
              <span className="text-xs font-bold text-[#442a22]">Elegir cantidad</span>
              <span className="text-[10px] text-[#827470]">6, 12 o 24 piezas</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#827470]/10 text-center space-y-2 flex flex-col items-center">
              <span className="material-symbols-outlined text-2xl text-[#586427]">mail</span>
              <span className="text-xs font-bold text-[#442a22]">Agregar mensaje</span>
              <span className="text-[10px] text-[#827470]">Tarjeta con dedicatoria</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#827470]/10 text-center space-y-2 flex flex-col items-center">
              <span className="material-symbols-outlined text-2xl text-[#586427]">card_giftcard</span>
              <span className="text-xs font-bold text-[#442a22]">Presentación</span>
              <span className="text-[10px] text-[#827470]">Cintas y envoltorios</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#827470]/10 text-center space-y-2 flex flex-col items-center col-span-2 sm:col-span-1">
              <span className="material-symbols-outlined text-2xl text-[#586427]">local_shipping</span>
              <span className="text-xs font-bold text-[#442a22]">Fecha de entrega</span>
              <span className="text-[10px] text-[#827470]">Programación exacta</span>
            </div>

          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setShowCustomBoxModal(true)}
              className="px-8 py-3.5 bg-[#586427] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#3b4515] active:scale-95 transition-all"
            >
              Crear mi caja
            </button>
          </div>
        </div>
      </section>

      {/* 9. HISTORIA DE LA MARCA (Editorial Layout) */}
      <section className="w-full bg-[#fbf2ed] py-12 md:py-16 px-4 sm:px-6 md:px-12 border-y border-[#827470]/15 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-[#586427] uppercase tracking-widest">NUESTRA HISTORIA</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22] leading-tight">
              Una pequeña historia detrás de cada galleta
            </h2>
            <p className="text-xs md:text-sm text-[#504441] leading-relaxed">
              En Rin no mori creemos que una galleta puede convertirse en un pequeño momento de felicidad. Cada creación es preparada artesanalmente, combinando sabores reconfortantes con inspiración japonesa.
            </p>
            <p className="text-xs text-[#827470] leading-relaxed">
              Respetamos los tiempos de fermentación lenta, la molienda artesanal del té y el horneado meticuloso para que cada mordisco sea una experiencia inolvidable.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setShowStoryModal(true)}
                className="px-6 py-2.5 bg-[#442a22] text-white text-xs font-bold rounded-xl hover:bg-[#5d4037] transition-all"
              >
                Conoce nuestra historia →
              </button>
            </div>
          </div>

          <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden border border-[#827470]/15 shadow-2xs">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNnhfOUPqc4hqgDptKa4d23CILCLU2BnwyJ1mGpDckqMtSj1eByxjf6tO4fhSd7Nyjl5pvn5xKumiQdeB4HWDM74av1TGvGsdHm9sjZVWU94BkShQFY08FfySwyQreTWocU3BfP0ivr3LoDZ2n82EHfmXkvY3QwU0Se1h1F0KWDQ0vXmKgLWFenz986ZCfB8YwPCXVyXxM7AmnE_mkUNTn2YcAhWTLFBetbO_sWSP1TD9GJ7OlQwqA2w"
              alt="Horneado artesanal Rin no mori"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 10. SECCIÓN DE INGREDIENTES */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-[#586427] uppercase tracking-wider">CALIDAD SUPREMA</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22]">
            Lo bueno empieza con buenos ingredientes
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#827470]/12 text-center space-y-1">
            <span className="text-2xl">🍵</span>
            <h4 className="font-bold text-xs text-[#442a22]">Matcha japonés</h4>
            <p className="text-[10px] text-[#827470]">Uji de grado ceremonial</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#827470]/12 text-center space-y-1">
            <span className="text-2xl">🌾</span>
            <h4 className="font-bold text-xs text-[#442a22]">Harina seleccionada</h4>
            <p className="text-[10px] text-[#827470]">Molienda fina artesanal</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#827470]/12 text-center space-y-1">
            <span className="text-2xl">🍫</span>
            <h4 className="font-bold text-xs text-[#442a22]">Chocolate premium</h4>
            <p className="text-[10px] text-[#827470]">Cacao de origen ético</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#827470]/12 text-center space-y-1">
            <span className="text-2xl">🍊</span>
            <h4 className="font-bold text-xs text-[#442a22]">Frutas naturales</h4>
            <p className="text-[10px] text-[#827470]">Cítricos frescos orgánicos</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#827470]/12 text-center space-y-1 col-span-2 sm:col-span-1">
            <span className="text-2xl">🧈</span>
            <h4 className="font-bold text-xs text-[#442a22]">Mantequilla pura</h4>
            <p className="text-[10px] text-[#827470]">Origen artesanal controlado</p>
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIOS */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-[#586427] uppercase tracking-wider">RESEÑAS</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22]">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#827470]/12 space-y-3 shadow-2xs">
            <div className="flex items-center gap-1 text-[#f59e0b] text-xs">
              ★★★★★
            </div>
            <p className="text-xs text-[#504441] italic leading-relaxed">
              "Las galletas llegaron preciosas y estaban deliciosas. La presentación es increíble."
            </p>
            <div className="text-[11px] font-bold text-[#442a22]">
              — Sofía M.
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#827470]/12 space-y-3 shadow-2xs">
            <div className="flex items-center gap-1 text-[#f59e0b] text-xs">
              ★★★★★
            </div>
            <p className="text-xs text-[#504441] italic leading-relaxed">
              "Se nota muchísimo que están hechas artesanalmente. El sabor a matcha es auténtico."
            </p>
            <div className="text-[11px] font-bold text-[#442a22]">
              — Kenji T.
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#827470]/12 space-y-3 shadow-2xs">
            <div className="flex items-center gap-1 text-[#f59e0b] text-xs">
              ★★★★★
            </div>
            <p className="text-xs text-[#504441] italic leading-relaxed">
              "El detalle de la caja y las ilustraciones hizo que fuera un regalo perfecto."
            </p>
            <div className="text-[11px] font-bold text-[#442a22]">
              — Ana R.
            </div>
          </div>
        </div>
      </section>

      {/* 12. INSTAGRAM / REDES */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-6 pb-6">
        <div className="text-center space-y-1">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#442a22] flex items-center justify-center gap-2">
            <span>Un poquito de Rin no mori</span>
            <span>🌿</span>
          </h2>
          <p className="text-xs text-[#827470]">@rinnomori.bakery en Instagram</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtfYyWhcCYUqma8Ww9u-vRR1MKw-Tc123yaAZPF1FRIp_bTCWnIIzRAkqgOsU8NX1DssOBcs4bc6KAijegQU37ISZALKQV1wNGdFN-FUVazfcMLBqjS5xEeGM0L339ESML53I8DHMA7JBwbibDLYvVXi_S2sopxJQTTdiZMIrsZoU-xinhJ8iIDs19MygFDfYf_hBYdruQjjWHxsLSLWOJDRKPHRPgLxBKDSfsnphwfnh-8Q8L7kbyQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDc8hlF7scGYEtgmnl16klXCE9EeTgPK94k9WpTExwFyINyTB4bM1KRJsrdKo47o18tJ7m_q-YPU8BNklCpwFGepicIhShS8ckY2LKsf0fwj4aKpNTvjBM2-7w4wQCHzmkOgw_-vH5MdWrvWu-qCmVfddBSjhhjlukug8q4W7gHjiYjBsmdVo8qja1TUP0XZMw9a-2yi9lLNUsEtA8_ASFPfnLmIdByaCx6uvAVx2MNjXMcXjDUE9CtBQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBNNUTavjoBNf__rwDQ8-W4UF4zWT8w2e-i4oICg72I7tWE4vAMY3x8clkV-WKAxgMQXbZR_CDREH9rtub6S8QNwuUhcffx4R30d9DRZaSQ7c8b5d6bPcBJW06rmH1tL5X2slXXp1oGIcR2cDybv5hktkuc_IrsWDGGq4KQnMjCKEcwH8wJyVBlyZ1OGGoBQ7cbb0ardk27z0lIerezw1bR7S-43w8y4WnmzIQxffLtwMH_LNEMX-U199ILXAs-cUSKV4A',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCNnhfOUPqc4hqgDptKa4d23CILCLU2BnwyJ1mGpDckqMtSj1eByxjf6tO4fhSd7Nyjl5pvn5xKumiQdeB4HWDM74av1TGvGsdHm9sjZVWU94BkShQFY08FfySwyQreTWocU3BfP0ivr3LoDZ2n82EHfmXkvY3QwU0Se1h1F0KWDQ0vXmKgLWFenz986ZCfB8YwPCXVyXxM7AmnE_mkUNTn2YcAhWTLFBetbO_sWSP1TD9GJ7OlQwqA2w',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg'
          ].map((url, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-[#827470]/12 shadow-2xs group">
              <img
                src={url}
                alt={`Instagram Rin no mori ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-[#827470]/20 text-[#442a22] text-xs font-bold rounded-xl hover:bg-[#fbf2ed] transition-all"
          >
            <span>Síguenos en Instagram</span>
          </a>
        </div>
      </section>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 bg-[#1e1b18]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fff8f5] max-w-lg w-full rounded-2xl p-6 md:p-8 border border-[#827470]/15 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 text-[#504441] hover:text-[#442a22] text-lg p-1"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-[#586427] uppercase tracking-wider">Nuestra Filosofía</span>
            <h3 className="font-display font-bold text-2xl text-[#442a22]">Nuestra Historia Completa</h3>
            
            <div className="text-xs text-[#504441] space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                Rin no mori (凛の森, "El Bosque Sereno de la Dulzura") nació cuando nuestra chef fundadora buscaba unir los sabores delicados del té japonés con la calidez reconfortante de una galleta casera.
              </p>
              <p>
                Utilizamos exclusivamente matcha de grado ceremonial de Uji, tés hojicha tostados lentamente y harinas mueles finamente.
              </p>
              <p>
                Cada caja incluye una presentación cuidada para convertirse en el regalo perfecto.
              </p>
            </div>

            <button
              onClick={() => setShowStoryModal(false)}
              className="w-full bg-[#442a22] text-white font-semibold text-xs py-3 rounded-xl hover:bg-[#5d4037]"
            >
              Cerrar Historia
            </button>
          </div>
        </div>
      )}

      {/* Custom Box Builder Modal */}
      {showCustomBoxModal && (
        <div className="fixed inset-0 z-50 bg-[#1e1b18]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fff8f5] max-w-md w-full rounded-2xl p-6 border border-[#827470]/15 shadow-2xl relative space-y-5">
            <button
              onClick={() => setShowCustomBoxModal(false)}
              className="absolute top-4 right-4 text-[#504441] hover:text-[#442a22] text-lg p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#586427] uppercase tracking-wider">PERSONALIZA TU REGALO</span>
              <h3 className="font-display font-bold text-xl text-[#442a22]">
                Diseña tu Caja ({boxSize} piezas)
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Select size */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#442a22]">Tamaño de caja:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[6, 12, 24].map(s => (
                    <button
                      key={s}
                      onClick={() => setBoxSize(s)}
                      className={`py-2 rounded-xl text-xs font-bold border ${
                        boxSize === s
                          ? 'bg-[#586427] text-white border-[#586427]'
                          : 'bg-white text-[#504441] border-[#827470]/20'
                      }`}
                    >
                      {s} galletas
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Flavors */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#442a22]">Combinación de sabores:</label>
                <select
                  value={boxFlavor}
                  onChange={(e) => setBoxFlavor(e.target.value)}
                  className="w-full bg-white p-2.5 rounded-xl border border-[#827470]/20 text-xs font-semibold text-[#442a22]"
                >
                  <option value="Surtido Especial (Todos los sabores)">Surtido Especial (Todos los sabores)</option>
                  <option value="Solo Matcha Ceremonial">Solo Matcha Ceremonial</option>
                  <option value="Matcha + Avellana">Matcha + Avellana</option>
                  <option value="Hojicha + Chocolate Bitter">Hojicha + Chocolate Bitter</option>
                  <option value="Cítricos Naranja y Coco">Cítricos Naranja y Coco</option>
                </select>
              </div>

              {/* Ribbon */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#442a22]">Cinta de regalo:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Verde Oliva', 'Marrón Calido', 'Dorado Matcha'].map(r => (
                    <button
                      key={r}
                      onClick={() => setBoxRibbon(r)}
                      className={`py-1.5 rounded-xl text-[11px] font-semibold border ${
                        boxRibbon === r
                          ? 'bg-[#442a22] text-white border-[#442a22]'
                          : 'bg-white text-[#504441] border-[#827470]/20'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#442a22]">Dedicatoria personalizada:</label>
                <textarea
                  value={boxMessage}
                  onChange={(e) => setBoxMessage(e.target.value)}
                  placeholder="Escribe tu mensaje para la tarjeta de regalo..."
                  rows={3}
                  className="w-full bg-white p-2.5 rounded-xl border border-[#827470]/20 text-xs text-[#1e1b18] placeholder-[#827470]/60 resize-none focus:outline-none"
                />
              </div>

            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#827470]/10">
              <div>
                <span className="text-[10px] text-[#827470]">Total estimado:</span>
                <p className="font-bold text-base text-[#442a22]">
                  ${(boxSize === 6 ? 14.00 : boxSize === 12 ? 26.00 : 48.00).toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleAddCustomBoxToCart}
                className="px-6 py-2.5 bg-[#586427] text-white text-xs font-bold rounded-xl hover:bg-[#3b4515] transition-all shadow-2xs"
              >
                Agregar mi caja al carrito
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
