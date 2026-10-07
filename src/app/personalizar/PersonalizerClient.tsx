"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, GiftBoxSelection, GiftBoxConfig } from '@/types';
import { useCart } from '@/context/CartContext';

interface PersonalizerClientProps {
  availableProducts: Product[];
}

export function PersonalizerClient({ availableProducts }: PersonalizerClientProps) {
  const router = useRouter();
  const { addGiftBoxToCart } = useCart();

  // State
  const [size, setSize] = useState<6 | 12>(6);
  const [selections, setSelections] = useState<GiftBoxSelection[]>([]);
  const [message, setMessage] = useState('');
  const [presentation, setPresentation] = useState<'standard' | 'premium'>('standard');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Define the 6 specific flavors and their exact images in the requested order
  const flavorMap = [
    { search: 'choco', img: '/brand/choco.png', label: 'Choco Clásica' },
    { search: 'vainilla', img: '/brand/vainilla.png', label: 'Nuez de Macadamia' },
    { search: 'lim', img: '/brand/limon.png', label: ' Galleta Tiramisu' },
    { search: 'doble', img: '/brand/doblechoco.png', label: 'Doble Chocolate' },
    { search: 'almendra', img: '/brand/almendras.png', label: 'Galleta Kinder Bueno' },
    { search: 'red', img: '/brand/red.png', label: 'Red Velvet' }
  ];

  const displayProducts = flavorMap.map((flavor, index) => {
    // Find the product in the DB that matches this flavor to keep its ID for the cart
    const foundProduct = availableProducts.find(p => p.name.toLowerCase().includes(flavor.search));
    
    // If not found by name, just pick a fallback product so the UI never breaks
    const fallback = foundProduct || availableProducts[index % Math.max(availableProducts.length, 1)];
    
    if (fallback) {
      return {
        ...fallback,
        id: foundProduct ? fallback.id : `${fallback.id}-${flavor.search}`, // fake ID if fallback
        name: flavor.label,
        image: flavor.img
      };
    }
    
    // ABSOLUTE FALLBACK: If availableProducts is COMPLETELY empty (database missing data)
    return {
      id: `mock-${flavor.search}`,
      name: flavor.label,
      price: 3.50,
      description: 'Galleta artesanal',
      shortDescription: 'Galleta',
      category: 'galletas',
      categoryLabel: 'Galletas',
      image: flavor.img,
      tags: [],
      rating: 5,
      reviewCount: 0,
      inStock: true
    } as Product;
  });

  // Derived state
  const totalSelected = selections.reduce((acc, sel) => acc + sel.quantity, 0);
  const isFull = totalSelected >= size;

  const updateQuantity = (product: Product, delta: number) => {
    setSelections(prev => {
      const existing = prev.find(s => s.productId === product.id);
      
      let newQuantity = (existing?.quantity || 0) + delta;
      
      if (newQuantity < 0) newQuantity = 0;
      if (delta > 0 && totalSelected >= size) return prev;
      
      if (newQuantity === 0) {
        return prev.filter(s => s.productId !== product.id);
      }
      
      if (existing) {
        return prev.map(s => s.productId === product.id ? { ...s, quantity: newQuantity } : s);
      }
      
      return [...prev, { productId: product.id, quantity: newQuantity, product }];
    });
  };

  const calculatePrice = () => {
    const cookiesTotal = selections.reduce((acc, sel) => {
      const price = sel.product?.price || 0;
      return acc + (price * sel.quantity);
    }, 0);
    const packagingFee = presentation === 'premium' ? 8.00 : 2.50;
    return cookiesTotal + packagingFee;
  };

  const handleAddToCart = () => {
    if (totalSelected !== size) return;
    const config: GiftBoxConfig = { size, selections, message, presentation, deliveryDate };
    addGiftBoxToCart(config, 1, calculatePrice());
    router.push('/carrito');
  };

  const totalPrice = calculatePrice();

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 animate-in fade-in bg-[#fdfbf6] min-h-screen" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      
      <div className="flex flex-col lg:flex-row gap-10 md:gap-14 w-full relative">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* Header */}
          <div className="relative ml-9 pt-2 mb-2">
            {/* Flower Image Centered over the step circles */}
            <div className="absolute -left-16 -top-4 w-24 h-36 opacity-80 pointer-events-none">
               <img src="/brand/4.png" alt="Decoración" className="w-full h-full object-contain object-center" />
            </div>
            
            <div className="pt-2 pl-4 md:pl-8">
              <h1 className="font-['Cormorant_Garamond'] font-semibold text-4xl md:text-[42px] leading-tight text-[#4a3327] mb-1.5 flex items-center gap-3">
                Personaliza tu Caja 
                <span className="material-symbols-outlined text-[32px] md:text-[36px]">redeem</span>
              </h1>
              <p className="text-[#504441] text-[15px]">Elige el tamaño, tus sabores favoritos y añade un toque especial.</p>
            </div>
          </div>
          
          {/* Step 1: Size */}
          <section className="relative">
            <span className="absolute -top-6 right-0 text-[#828b65] opacity-60 text-2xl">✦</span>
            
            <h2 className="font-['Cormorant_Garamond'] font-bold text-lg text-[#4a3327] mb-5 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#6b7543] text-white flex items-center justify-center text-xs">1</span>
              <span className="text-[#6b7543] text-xs">✦</span> Tamaño de la Caja
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button
                onClick={() => {
                  if (size !== 6) {
                    setSize(6);
                    setSelections([]);
                  }
                }}
                className={`p-4 rounded-[24px] border-2 text-left transition-all relative overflow-hidden flex items-center gap-5 ${
                  size === 6 
                    ? 'border-[#6b7543] bg-[#fbf9f4]' 
                    : 'border-[#e8e2d5] bg-white hover:border-[#828b65]/50'
                }`}
              >
                {size === 6 && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#6b7543] rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                )}
                <div className="w-20 h-20 flex items-center justify-center shrink-0">
                   <img src="/brand/3.png" className="w-full h-full object-contain opacity-80" alt="Box Icon" />
                </div>
                <div className="text-left">
                  <div className="font-['Cormorant_Garamond'] font-bold text-xl text-[#4a3327] mb-0.5">6 Piezas</div>
                  <div className="text-xs text-[#827470]">Ideal para un detalle especial</div>
                </div>
              </button>
              
              <button
                onClick={() => setSize(12)}
                className={`relative flex items-center gap-4 p-5 rounded-3xl border transition-all ${
                  size === 12
                    ? 'border-[#6b7543] bg-[#fbf9f4] shadow-sm'
                    : 'border-[#e8e2d5] hover:border-[#828b65]/50 bg-white'
                }`}
              >
                {size === 12 && (
                  <div className="absolute top-4 right-4 w-5 h-5 bg-[#6b7543] rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                )}
                <div className="w-20 h-20 flex items-center justify-center shrink-0">
                   <img src="/brand/3.png" className="w-full h-full object-contain opacity-80" alt="Box Icon" />
                </div>
                <div className="text-left">
                  <div className="font-['Cormorant_Garamond'] font-bold text-xl text-[#4a3327] mb-0.5">12 Piezas</div>
                  <div className="text-xs text-[#827470]">Para compartir momentos</div>
                </div>
              </button>
            </div>
          </section>

          {/* Step 2: Flavors */}
          <section className="relative">
            <span className="absolute -bottom-8 -left-8 text-[#828b65] opacity-60 text-2xl">✧</span>
            <span className="absolute -bottom-4 right-4 text-[#828b65] opacity-60 text-xl">✧</span>

            <div className="flex justify-between items-center mb-5">
              <h2 className="font-['Cormorant_Garamond'] font-bold text-lg text-[#4a3327] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#6b7543] text-white flex items-center justify-center text-xs">2</span>
                <span className="text-[#6b7543] text-xs">✦</span> Elige tus sabores
              </h2>
              <div className="text-xs font-bold text-[#827470]">
                {totalSelected} / {size} seleccionados
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 md:pr-4">
              {displayProducts.map(product => {
                const qty = selections.find(s => s.productId === product.id)?.quantity || 0;
                
                return (
                  <div key={product.id} className="flex items-center gap-2 p-1.5 pl-2 pr-3 bg-white rounded-[20px] border border-[#e8e2d5] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:border-[#828b65]/30 transition-colors">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[12px] md:text-[13px] text-[#4a3327] leading-tight break-words">{product.name}</h3>
                    </div>
                    
                    <div className="flex items-center shrink-0">
                      {qty > 0 ? (
                        <div className="flex items-center bg-white rounded-full border border-[#e8e2d5] shadow-sm overflow-hidden">
                           <button
                             onClick={() => updateQuantity(product, -1)}
                             className="w-7 h-7 flex items-center justify-center text-[#827470] hover:bg-[#fdfbf6] transition-colors text-lg font-medium leading-none"
                           >
                             -
                           </button>
                           <span className="font-bold text-[13px] text-[#4a3327] w-4 text-center leading-none">{qty}</span>
                           <button
                             onClick={() => updateQuantity(product, 1)}
                             disabled={isFull || !product.inStock}
                             className="w-7 h-7 flex items-center justify-center text-[#827470] hover:bg-[#fdfbf6] transition-colors text-lg font-medium leading-none disabled:opacity-30"
                           >
                             +
                           </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateQuantity(product, 1)}
                          disabled={isFull || !product.inStock}
                          className="w-5 h-5 rounded-[4px] border-2 border-[#e8e2d5] hover:border-[#828b65] transition-colors disabled:opacity-50"
                        >
                          {/* Empty checkbox style */}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Step 3: Details */}
          <section className="relative">
            <h2 className="font-['Cormorant_Garamond'] font-bold text-lg text-[#4a3327] mb-5 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#6b7543] text-white flex items-center justify-center text-xs">3</span>
              <span className="text-[#6b7543] text-xs">✦</span> Toque Final
            </h2>
            
            <div className="bg-white p-6 rounded-3xl border border-[#e8e2d5] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-8 relative">
              <span className="absolute -bottom-6 -left-24 opacity-80 w-24 h-36">
                <img src="/brand/4.png" alt="Decoración" className="w-full h-full object-contain" />
              </span>

              {/* Left Side: Empaque & Date */}
              <div className="flex-1 space-y-6 md:pr-4">
                <div>
                  <label className="block text-xs font-bold text-[#4a3327] mb-3">Presentación del Empaque</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPresentation('standard')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        presentation === 'standard'
                          ? 'border-[#6b7543] bg-[#fbf9f4]'
                          : 'border-[#e8e2d5] hover:border-[#828b65]/30'
                      }`}
                    >
                      <div className="font-bold text-[13px] text-[#4a3327]">Estándar (+$2.50)</div>
                      <div className="text-[10px] text-[#827470] mt-1">Caja de cartón kraft con listón.</div>
                    </button>
                    <button
                      onClick={() => setPresentation('premium')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        presentation === 'premium'
                          ? 'border-[#6b7543] bg-[#fbf9f4]'
                          : 'border-[#e8e2d5] hover:border-[#828b65]/30'
                      }`}
                    >
                      <div className="font-bold text-[13px] text-[#4a3327]">Premium (+$8.00)</div>
                      <div className="text-[10px] text-[#827470] mt-1">Caja rígida ilustrada, tarjeta y bolsa de tela.</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4a3327] mb-3">Fecha sugerida de entrega (Opcional)</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={e => setDeliveryDate(e.target.value)}
                      className="w-full bg-white text-sm text-[#4a3327] p-3 rounded-xl border border-[#e8e2d5] focus:outline-none focus:ring-1 focus:ring-[#6b7543] transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:right-0"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#827470] pointer-events-none text-[18px]">calendar_today</span>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:block w-px bg-[#e8e2d5] my-2"></div>

              {/* Right Side: Message */}
              <div className="flex-1 flex flex-col relative md:pl-2">
                <label className="block text-xs font-bold text-[#4a3327] mb-3">Mensaje Dedicatorio (Opcional)</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje para esa persona especial..."
                  className="w-full flex-1 bg-[#fdfbf6] text-sm text-[#4a3327] placeholder-[#827470]/60 p-4 rounded-xl border border-[#e8e2d5] focus:outline-none focus:ring-1 focus:ring-[#6b7543] transition-all resize-none min-h-[120px]"
                />
                <span className="material-symbols-outlined absolute bottom-3 right-3 text-[#827470] opacity-50">favorite</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary Sticky */}
        <div className="lg:w-[320px] shrink-0 mt-10 lg:mt-0">
          <div className="sticky top-28 flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-[#e8e2d5] p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]">
              
              {/* Box Image */}
              <div className="w-full mb-6 flex items-center justify-center">
                <img src="/brand/2.png" alt="Caja" className="w-full h-auto object-contain" />
              </div>
              
              <h3 className="font-['Cormorant_Garamond'] font-bold text-xl text-[#4a3327] mb-2">Tu Caja</h3>
              
              <div className="mb-6 min-h-[40px]">
                {selections.length === 0 ? (
                  <div className="text-[13px] text-[#827470]">
                    Aún no has seleccionado ninguna galleta.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selections.map(sel => (
                      <div key={sel.productId} className="flex justify-between items-center text-sm">
                        <span className="text-[#4a3327] flex gap-2">
                          <span className="font-bold text-[#6b7543]">{sel.quantity}x</span>
                          {sel.product?.name}
                        </span>
                        <span className="text-[#827470]">
                          ${((sel.product?.price || 0) * sel.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-[#e8e2d5] pt-5 space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#4a3327] font-medium">Empaque {presentation === 'premium' ? 'Premium' : 'Estándar'}</span>
                  <span className="text-[#4a3327] font-bold">${presentation === 'premium' ? '8.00' : '2.50'}</span>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <span className="font-bold text-[#4a3327]">Total Estimado</span>
                  <span className="font-['Cormorant_Garamond'] font-bold text-2xl text-[#4a3327]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!isFull}
                className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all flex justify-center items-center gap-2 ${
                  isFull 
                    ? 'bg-[#5e6a2c] hover:bg-[#4a5520] text-white shadow-md' 
                    : 'bg-[#76814b] text-white opacity-90 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                {isFull ? 'Agregar al Carrito' : `Faltan ${size - totalSelected} piezas`}
              </button>
              
              {!isFull && (
                <p className="text-[11px] text-center text-[#827470] mt-3">
                  Debes llenar la caja para poder agregarla al carrito.
                </p>
              )}
            </div>
            
            {/* Dog Mascot Image */}
            <div className="w-full flex items-center justify-center px-4 relative mt-2">
               <span className="absolute top-0 right-10 text-[#828b65] opacity-60 text-2xl">✧</span>
               <span className="absolute bottom-4 right-14 text-[#828b65] opacity-60 text-xl">✧</span>
               <img src="/brand/1.png" alt="Oso con galletas" className="w-56 h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
