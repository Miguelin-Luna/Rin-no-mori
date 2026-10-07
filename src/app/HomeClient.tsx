"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toggleFavorite } from '@/app/actions/favorites';

export default function HomeClient({ 
  featuredProducts, 
  initialFavorites = [] 
}: { 
  featuredProducts: Product[],
  initialFavorites?: string[]
}) {
  const router = useRouter();
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showCustomBoxModal, setShowCustomBoxModal] = useState(false);
  
  // Custom Box Builder State
  const [boxFlavor, setBoxFlavor] = useState<string>('Matcha + Avellana');
  const [boxSize, setBoxSize] = useState<number>(12);
  const [boxMessage, setBoxMessage] = useState<string>('');
  const [boxRibbon, setBoxRibbon] = useState<string>('Verde Oliva');
  const [addedId, setAddedId] = useState<string | null>(null);
  
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const { addToCart } = useCart();

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedId(product.id);
    addToCart(product, 1);
    setTimeout(() => setAddedId(null), 450);
  };

  const onToggleFavorite = async (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Optistic update
    const isCurrentlyFav = favorites.includes(productId);
    setFavorites(prev => 
      isCurrentlyFav ? prev.filter(id => id !== productId) : [...prev, productId]
    );

    const res = await toggleFavorite(productId);
    
    if (res.error) {
      // Revert si falla
      setFavorites(prev => 
        isCurrentlyFav ? [...prev, productId] : prev.filter(id => id !== productId)
      );
      if (res.status === 401) {
        router.push('/login');
      }
    }
  };



  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
      
      {/* 2. HERO PRINCIPAL */}
      <section 
        className="w-full flex items-center box-border relative overflow-hidden" 
        style={{ 
          minHeight: '540px', 
          backgroundColor: '#f6f2ea',
          padding: '0 4rem'
        }}
      >
        <Image 
          src="/brand/fondo.png" 
          alt="Fondo Principal" 
          fill 
          priority 
          className="object-cover object-center z-0"
        />
        <div className="relative z-10 w-full max-w-[420px] space-y-5 py-12">
          <div>
            <span className="text-[10px] font-bold text-olive uppercase tracking-[0.2em] bg-[#e8ddd2]/50 px-3 py-1.5 rounded-full border border-olive/20 inline-block">
              ✦ GALLETAS ARTESANALES ✦
            </span>
          </div>

          <h1 className="text-[#4a3327]" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.1 }}>
            Dulzura que<br />se comparte
          </h1>

          <p className="text-sm text-[#827470] leading-relaxed max-w-sm">
            Galletas artesanales hechas a mano,<br />
            con ingredientes seleccionados e<br />
            inspiración japonesa.
          </p>

          <div className="pt-1 flex flex-wrap gap-3">
            <Button
              onClick={() => router.push('/catalogo')}
              className="px-6 py-3 bg-[#6b7c45] text-white hover:bg-[#5a6a3a] font-bold rounded-full flex items-center gap-2 group shadow-md text-sm"
            >
              <span>Ver catálogo</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowStoryModal(true)}
              className="px-6 py-3 bg-transparent text-[#4a3327] font-semibold rounded-full border-2 border-[#4a3327]/25 hover:bg-[#4a3327]/5 text-sm"
            >
              Conocer nuestra historia
            </Button>
          </div>
        </div>
      </section>

      {/* BARRA DE VALORES (features-banner) */}
      <section className="w-full flex justify-around items-center h-[120px] bg-[#909470] px-[20px] md:px-[50px] box-border">
        {/* Elemento 1 */}
        <div className="flex items-center gap-[15px] text-[#ffffff]">
          <Image src="/brand/hoja.png" alt="Icono Hoja" width={40} height={40} className="w-auto h-[35px] md:h-[40px] object-contain" />
          <span className="font-sans text-sm md:text-base font-medium">Ingredientes seleccionados</span>
        </div>

        {/* Elemento 2 */}
        <div className="flex items-center gap-[15px] text-[#ffffff]">
          <Image src="/brand/torre.png" alt="Icono Torre Japonesa" width={40} height={40} className="w-auto h-[35px] md:h-[40px] object-contain" />
          <span className="font-sans text-sm md:text-base font-medium">Inspiración japonesa</span>
        </div>

        {/* Elemento 3 */}
        <div className="flex items-center gap-[15px] text-[#ffffff]">
          <Image src="/brand/mano.png" alt="Icono Mano Corazón" width={40} height={40} className="w-auto h-[35px] md:h-[40px] object-contain" />
          <span className="font-sans text-sm md:text-base font-medium">Hecho a mano</span>
        </div>
      </section>

      {/* 3. BUSCADOR Y CATEGORÍAS DE PRODUCTOS */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 pt-10">
        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border/15 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">
                search
              </span>
              <input
                type="text"
                onClick={() => router.push('/catalogo')}
                placeholder="Buscar por nombre, sabor o ingrediente..."
                className="w-full bg-beige/60 text-xs text-foreground placeholder-muted-foreground pl-10 pr-4 py-2.5 rounded-xl border border-border/20 focus:outline-none cursor-pointer"
                readOnly
              />
            </div>

            <Button
              variant="ghost"
              onClick={() => router.push('/catalogo')}
              className="text-xs font-bold text-olive hover:text-olive/80 flex items-center gap-1 group"
            >
              <span>Explorar catálogo completo</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Button>
          </div>

          <div className="pt-2 border-t border-border/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { label: 'Todos', icon: 'grid_view' },
              { label: 'Tradicionales', icon: 'cookie' },
              { label: 'Matcha', icon: 'eco' },
              { label: 'Temporada', icon: 'auto_awesome' },
              { label: 'Regalo', icon: 'card_giftcard' },
              { label: 'Mini Pastelería', icon: 'bakery_dining' },
            ].map((cat, idx) => (
              <Button
                key={idx}
                variant="outline"
                onClick={() => router.push(`/catalogo?categoria=${cat.label.toLowerCase()}`)}
                className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-beige/70 text-muted-foreground border-border/15 hover:bg-olive hover:text-white flex items-center gap-2 group shadow-sm"
              >
                <span className="material-symbols-outlined text-base text-muted-foreground group-hover:text-white">
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCTOS DESTACADOS SECTION */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-6 mt-12">
        <div className="flex justify-between items-center border-b border-border/12 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-brown">
              Productos destacados
            </h2>
            <span className="text-xl">🌿</span>
          </div>

          <Button
            variant="ghost"
            onClick={() => router.push('/catalogo')}
            className="text-xs font-bold text-olive hover:text-olive/80 flex items-center gap-1 group"
          >
            <span>Ver todos los productos</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Button>
        </div>

        {/* Grid of 4 Featured Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product, idx) => {
            const isFav = favorites.includes(product.id);
            let badgeTag = product.tags[0];
            if (idx === 0) badgeTag = 'Nuevo';
            if (idx === 1) badgeTag = 'Más vendido';
            if (idx === 2) badgeTag = 'Temporada';

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
      </section>

      {/* 7. SECCIÓN “ELIGE TU CAJA” */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-8 mt-16">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] font-bold text-olive uppercase tracking-widest bg-secondary-container/50 px-3 py-1 rounded-full border border-olive/20">
            SELECCIÓN ESPECIAL
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-brown">
            Un pequeño bosque de dulzura para regalar
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Encuentra la caja perfecta para cada ocasión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: CAJA PEQUEÑA */}
          <div className="bg-card rounded-2xl border border-border/15 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="h-44 rounded-xl overflow-hidden bg-beige relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRtfYyWhcCYUqma8Ww9u-vRR1MKw-Tc123yaAZPF1FRIp_bTCWnIIzRAkqgOsU8NX1DssOBcs4bc6KAijegQU37ISZALKQV1wNGdFN-FUVazfcMLBqjS5xEeGM0L339ESML53I8DHMA7JBwbibDLYvVXi_S2sopxJQTTdiZMIrsZoU-xinhJ8iIDs19MygFDfYf_hBYdruQjjWHxsLSLWOJDRKPHRPgLxBKDSfsnphwfnh-8Q8L7kbyQ"
                  alt="Caja Pequeña 6 galletas"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-olive uppercase">6 GALLETAS</span>
                <h3 className="font-display font-bold text-lg text-brown">Caja Pequeña</h3>
                <p className="text-xs text-muted-foreground">Para un pequeño detalle cotidiano.</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border/10 flex items-center justify-between">
              <span className="font-bold text-base text-brown">$14.00</span>
              <Button
                onClick={() => { setBoxSize(6); setShowCustomBoxModal(true); }}
                className="bg-brown text-white hover:bg-brown/90 rounded-xl"
              >
                Elegir esta caja
              </Button>
            </div>
          </div>

          {/* Card 2: CAJA ESPECIAL (MÁS ELEGIDA) */}
          <div className="bg-card rounded-2xl border-2 border-olive p-6 shadow-md transition-all flex flex-col justify-between space-y-4 relative group transform scale-[1.02]">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-olive text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              ✦ MÁS ELEGIDA ✦
            </span>
            <div className="space-y-3 pt-2">
              <div className="h-44 rounded-xl overflow-hidden bg-beige relative">
                <Image fill sizes="(max-width: 768px) 100vw, 50vw"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYGE3lBQ_6_tgoeR-0GTtzAL8onkUDw6yWI19a-NnSdouYFJo8FW9oHHqadNlwjg6as4m6Jcp2Dy5vwAWGU-ad5pyHKB1DrEhOiEAnJI4z45AiFSZAoaRjzxbV3_v2qU4nX_S02G_TI-IFQbJtxpyry6fB3MPxD-79eP_E3Kytxn7bxf5VWBXWfUIYAW7CEH48p_q1ucSKd77xp6LOSahD-U35M6MxQJGsDEyNuuZTG5PNb18QMBP0vg"
                  alt="Caja Especial 12 galletas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-olive uppercase">12 GALLETAS</span>
                <h3 className="font-display font-bold text-lg text-brown">Caja Especial</h3>
                <p className="text-xs text-muted-foreground">Una selección variada para compartir en reunión.</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border/10 flex items-center justify-between">
              <span className="font-bold text-base text-brown">$26.00</span>
              <Button
                onClick={() => { setBoxSize(12); setShowCustomBoxModal(true); }}
                className="bg-olive text-white hover:bg-olive/90 rounded-xl"
              >
                Elegir esta caja
              </Button>
            </div>
          </div>

          {/* Card 3: CAJA REGALO */}
          <div className="bg-card rounded-2xl border border-border/15 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group">
            <div className="space-y-3">
              <div className="h-44 rounded-xl overflow-hidden bg-beige relative">
                <Image fill sizes="(max-width: 768px) 100vw, 50vw"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc8hlF7scGYEtgmnl16klXCE9EeTgPK94k9WpTExwFyINyTB4bM1KRJsrdKo47o18tJ7m_q-YPU8BNklCpwFGepicIhShS8ckY2LKsf0fwj4aKpNTvjBM2-7w4wQCHzmkOgw_-vH5MdWrvWu-qCmVfddBSjhhjlukug8q4W7gHjiYjBsmdVo8qja1TUP0XZMw9a-2yi9lLNUsEtA8_ASFPfnLmIdByaCx6uvAVx2MNjXMcXjDUE9CtBQ"
                  alt="Caja Regalo 24 galletas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-olive uppercase">24 GALLETAS</span>
                <h3 className="font-display font-bold text-lg text-brown">Caja Regalo</h3>
                <p className="text-xs text-muted-foreground">Para celebrar un momento verdaderamente especial.</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border/10 flex items-center justify-between">
              <span className="font-bold text-base text-brown">$48.00</span>
              <Button
                onClick={() => { setBoxSize(24); setShowCustomBoxModal(true); }}
                className="bg-brown text-white hover:bg-brown/90 rounded-xl"
              >
                Elegir esta caja
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HISTORIA DE LA MARCA */}
      <section className="w-full bg-beige py-12 md:py-16 px-4 sm:px-6 md:px-12 border-y border-border/15 relative overflow-hidden mt-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-olive uppercase tracking-widest">NUESTRA HISTORIA</span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-brown leading-tight">
              Una pequeña historia detrás de cada galleta
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              En Rin no mori creemos que una galleta puede convertirse en un pequeño momento de felicidad. Cada creación es preparada artesanalmente, combinando sabores reconfortantes con inspiración japonesa.
            </p>
            <div className="pt-2">
              <Button
                onClick={() => setShowStoryModal(true)}
                className="bg-brown text-white hover:bg-brown/90 rounded-xl"
              >
                Conoce nuestra historia →
              </Button>
            </div>
          </div>
          <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden border border-border/15 shadow-sm">
            <Image fill sizes="(max-width: 768px) 100vw, 50vw"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNnhfOUPqc4hqgDptKa4d23CILCLU2BnwyJ1mGpDckqMtSj1eByxjf6tO4fhSd7Nyjl5pvn5xKumiQdeB4HWDM74av1TGvGsdHm9sjZVWU94BkShQFY08FfySwyQreTWocU3BfP0ivr3LoDZ2n82EHfmXkvY3QwU0Se1h1F0KWDQ0vXmKgLWFenz986ZCfB8YwPCXVyXxM7AmnE_mkUNTn2YcAhWTLFBetbO_sWSP1TD9GJ7OlQwqA2w"
              alt="Horneado artesanal"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIOS */}
      <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-12 space-y-6 mt-16">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-olive uppercase tracking-wider">RESEÑAS</span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-brown">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-card p-5 rounded-2xl border border-border/12 space-y-3 shadow-sm">
            <div className="flex items-center gap-1 text-[#f59e0b] text-xs">★★★★★</div>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              "Las galletas llegaron preciosas y estaban deliciosas. La presentación es increíble."
            </p>
            <div className="text-[11px] font-bold text-brown">— Sofía M.</div>
          </div>
          <div className="bg-card p-5 rounded-2xl border border-border/12 space-y-3 shadow-sm">
            <div className="flex items-center gap-1 text-[#f59e0b] text-xs">★★★★★</div>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              "Se nota muchísimo que están hechas artesanalmente. El sabor a matcha es auténtico."
            </p>
            <div className="text-[11px] font-bold text-brown">— Kenji T.</div>
          </div>
          <div className="bg-card p-5 rounded-2xl border border-border/12 space-y-3 shadow-sm">
            <div className="flex items-center gap-1 text-[#f59e0b] text-xs">★★★★★</div>
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              "El detalle de la caja y las ilustraciones hizo que fuera un regalo perfecto."
            </p>
            <div className="text-[11px] font-bold text-brown">— Ana R.</div>
          </div>
        </div>
      </section>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 bg-[#1e1b18]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream max-w-lg w-full rounded-2xl p-6 md:p-8 border border-border/15 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-brown text-lg p-1"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-olive uppercase tracking-wider">Nuestra Filosofía</span>
            <h3 className="font-display font-bold text-2xl text-brown">Nuestra Historia Completa</h3>
            
            <div className="text-xs text-muted-foreground space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
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

            <Button
              onClick={() => setShowStoryModal(false)}
              className="w-full bg-brown text-white font-semibold text-xs py-3 rounded-xl hover:bg-brown/90"
            >
              Cerrar Historia
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
