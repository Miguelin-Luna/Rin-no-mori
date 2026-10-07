"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export function CartClient() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-24 text-center animate-in fade-in" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
        <h2 className="font-bold text-3xl md:text-4xl text-[#3E3430] mb-4">Tu carrito está vacío</h2>
        <p className="text-[#3E3430] text-lg max-w-md mx-auto mb-8">
          Aún no has agregado ninguna de nuestras deliciosas creaciones artesanales.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-[#606C38] hover:bg-[#4d572c] text-white font-semibold py-3 px-8 rounded-full transition-all"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-in fade-in bg-[#FBF8F2]" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
      
      {/* SVG Wavy Stroke Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="wavy-stroke">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <img src="/brand/flor_2.png" alt="Flor" className="w-10 md:w-14 h-auto object-contain" />
        <div>
          <h1 className="font-bold text-4xl md:text-5xl text-[#3E3430] flex items-center gap-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Tu Carrito <span className="text-[#d8cdb4] text-3xl">✦</span>
          </h1>
          <p className="text-[#3E3430] text-lg mt-1 font-medium">
            Revisa tus productos antes de continuar <span className="text-[#d8cdb4]">✦</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* Left Column (Items) */}
        <div className="flex-1 w-full">
          <div className="relative z-10 bg-[#fffdfa] p-6 before:content-[''] before:absolute before:inset-0 before:border-2 before:border-[#4A3E3D] before:rounded-[28px_24px_26px_22px] before:z-[-1] before:pointer-events-none before:[filter:url(#wavy-stroke)]">
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b-[2px] border-[#4A3E3D] text-xs font-bold text-[#3E3430] tracking-widest uppercase">
              <div className="col-span-6 pl-2">PRODUCTO</div>
              <div className="col-span-3 text-center">CANTIDAD</div>
              <div className="col-span-3 text-right">SUBTOTAL</div>
            </div>

            {/* Items */}
            <div className="flex flex-col">
              {cart.map((item, index) => {
                const isLast = index === cart.length - 1;
                
                let imageSrc = "/brand/3.png"; 
                let title = "Caja de Regalo";
                let desc = "";
                let details = null;
                let itemPrice = 0;

                if (item.type === 'gift_box') {
                  imageSrc = "/brand/3.png";
                  title = "Caja de Regalo";
                  itemPrice = item.price;
                  desc = `$${itemPrice.toFixed(2)} • ${item.config.size} galletas • ${item.config.presentation === 'premium' ? 'Empaque Premium' : 'Empaque Estándar'}`;
                  
                  details = (
                    <div className="relative z-10 mt-3 bg-[#f7f1e6] p-3 text-[13px] text-[#3E3430] max-w-fit before:content-[''] before:absolute before:inset-0 before:border-[1.5px] before:border-[#4A3E3D] before:rounded-[12px_14px_10px_15px] before:z-[-1] before:pointer-events-none before:[filter:url(#wavy-stroke)]">
                      <div className="font-bold mb-1.5">Sabores seleccionados:</div>
                      {item.config.selections.map((sel, idx) => (
                        <div key={idx} className="flex gap-2 mb-1">
                          <span className="font-medium text-[#606C38]">{sel.quantity}x</span>
                          <span className="font-medium break-words">{sel.product?.name || 'Sabor'}</span>
                        </div>
                      ))}
                    </div>
                  );
                } else if (item.type === 'product') {
                  imageSrc = item.product.image;
                  title = item.product.name;
                  itemPrice = item.product.price;
                  desc = `$${itemPrice.toFixed(2)}`;
                }

                return (
                  <div key={item.id} className={`py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start ${!isLast ? 'border-b-[1.5px] border-dashed border-[#d4c5a3]' : ''}`}>
                    
                    {/* Info */}
                    <div className="col-span-1 md:col-span-6 flex gap-4 lg:gap-6 min-w-0">
                      <div className="relative z-10 w-24 h-24 p-2 shrink-0 bg-[#fffdfa] flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:border-[1.5px] before:border-[#4A3E3D] before:rounded-[12px_14px_10px_15px] before:z-[-1] before:pointer-events-none before:[filter:url(#wavy-stroke)]">
                        <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-[#3E3430] leading-tight break-words pr-2">{title}</h3>
                        <p className="text-[#3E3430] text-sm mt-1 font-medium break-words leading-tight pr-2">{desc}</p>
                        {details}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center items-start mt-2 md:mt-0">
                       <div className="relative z-10 flex items-center gap-4 bg-[#fffdfa] px-4 py-1.5 shadow-sm before:content-[''] before:absolute before:inset-0 before:border-[1.5px] before:border-[#4A3E3D] before:rounded-full before:z-[-1] before:pointer-events-none before:[filter:url(#wavy-stroke)]">
                         <button
                           onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                           className="text-[#3E3430] text-lg font-bold hover:opacity-70 transition-opacity"
                         >
                           -
                         </button>
                         <span className="font-bold text-[#3E3430] w-4 text-center">{item.quantity}</span>
                         <button
                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
                           className="text-[#3E3430] text-lg font-bold hover:opacity-70 transition-opacity"
                         >
                           +
                         </button>
                       </div>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end items-center md:items-start gap-5 lg:gap-6 mt-2 md:mt-0">
                      <span className="font-bold text-xl text-[#3E3430]">
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#3E3430] hover:text-red-500 transition-colors pt-1"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Clear Cart */}
            <div className="mt-4 pt-4 border-t-[2px] border-[#4A3E3D] flex justify-end">
               <button 
                 onClick={clearCart}
                 className="text-sm font-bold text-[#3E3430] hover:opacity-70 transition-opacity flex items-center gap-1.5"
               >
                 <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                 Vaciar Carrito
               </button>
            </div>
          </div>
        </div>

        {/* Right Column (Summary) */}
        <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-[120px]">
          <div className="relative pt-4">
            {/* Box */}
            <div className="relative z-10 p-6 bg-[#fffdfa] shadow-sm before:content-[''] before:absolute before:inset-0 before:border-2 before:border-[#4A3E3D] before:rounded-[24px_20px_22px_26px] before:z-[-1] before:pointer-events-none before:[filter:url(#wavy-stroke)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-2xl text-[#3E3430]">Resumen de Compra</h3>
                <span className="material-symbols-outlined text-[#606C38]">energy_savings_leaf</span>
              </div>
              
              <div className="space-y-4 pb-6 border-b-[1.5px] border-dashed border-[#d4c5a3]">
                <div className="flex justify-between items-center">
                  <span className="text-[#3E3430] font-medium">Subtotal</span>
                  <span className="font-bold text-[#3E3430]">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#3E3430] font-medium">Envío</span>
                  <span className="text-[#606C38] font-semibold text-sm">Calculado en checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-center my-6">
                <span className="font-bold text-[#3E3430]">Total Estimado</span>
                <span className="font-bold text-3xl text-[#3E3430]">${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#606C38] hover:bg-[#4d572c] text-white text-lg font-bold rounded-xl py-4 transition-colors flex justify-center items-center gap-2"
              >
                Iniciar Pago
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#3E3430] mt-5">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                Pago seguro y encriptado
              </div>
            </div>

            {/* Mascot Dog - perfectly centered under the box */}
            <div className="w-full flex justify-center relative z-20 pointer-events-none" style={{ marginTop: '-40px' }}>
              <img src="/brand/carrito.png" alt="Mascota" className="w-[280px] h-auto object-contain" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
