"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { checkoutOrder } from '@/app/actions/checkout';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types';

export function CheckoutClient() {
  const router = useRouter();
  const { cart: items, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Ecuador',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await checkoutOrder(items, formData);
      
      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.paymentUrl) {
        // Redirigimos a la pasarela (o al dummy endpoint)
        window.location.href = result.paymentUrl;
      } else {
        setError('No se pudo generar la sesión de pago.');
        setLoading(false);
      }

    } catch (err) {
      console.error(err);
      setError('Ocurrió un error inesperado durante el checkout.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-16 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center border border-border/15 shadow-sm mb-4">
          <span className="material-symbols-outlined text-3xl text-muted-foreground">shopping_cart</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-brown mb-2">Tu carrito está vacío</h2>
        <p className="text-sm text-muted-foreground mb-6">Añade productos para proceder al pago.</p>
        <Button onClick={() => router.push('/catalogo')} className="bg-brown hover:bg-brown/90 text-white rounded-xl">
          Explorar Catálogo
        </Button>
      </div>
    );
  }

  const shippingCost = 5.00;
  const finalTotal = cartTotal + shippingCost;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12 animate-in fade-in duration-300">
      <h1 className="font-display font-bold text-3xl md:text-4xl text-brown mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Formularios (Izquierda) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-card p-6 rounded-3xl border border-border/15 shadow-sm">
            <h2 className="font-display font-bold text-xl text-brown mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-olive">local_shipping</span>
              Dirección de Envío
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold mb-6 border border-red-100">
                {error}
              </div>
            )}

            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-brown">Nombre Completo</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-border/20 bg-beige/30 text-sm outline-none focus:border-olive/50" />
                </div>
                
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-brown">Dirección</label>
                  <input required name="address" value={formData.address} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-border/20 bg-beige/30 text-sm outline-none focus:border-olive/50" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown">Ciudad</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-border/20 bg-beige/30 text-sm outline-none focus:border-olive/50" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown">Provincia / Estado</label>
                  <input required name="state" value={formData.state} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-border/20 bg-beige/30 text-sm outline-none focus:border-olive/50" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown">Código Postal</label>
                  <input required name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-border/20 bg-beige/30 text-sm outline-none focus:border-olive/50" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brown">Teléfono</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-border/20 bg-beige/30 text-sm outline-none focus:border-olive/50" />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Resumen (Derecha) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-border/15 p-6 shadow-sm sticky top-24">
            <h3 className="font-display font-bold text-xl text-brown mb-5">Resumen de tu pedido</h3>
            
            <div className="space-y-4 mb-6 max-h-[30vh] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-brown leading-tight">
                      {item.type === 'product' ? item.product.name : 'Caja Personalizada'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">Cant: {item.quantity}</p>
                    {item.type === 'gift_box' && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.config.size} piezas, Empaque {item.config.presentation}</p>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-brown shrink-0">
                    ${(item.type === 'product' ? item.product.price * item.quantity : item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/10 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-brown font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-brown font-semibold">${shippingCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border/10 pt-4 flex justify-between items-center mb-6">
              <span className="font-bold text-brown text-lg">Total Final</span>
              <span className="font-display font-bold text-2xl text-brown">${finalTotal.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-brown hover:bg-brown/90 text-white font-bold py-6 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                  Procesando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">lock</span>
                  Proceder al Pago Seguro
                </span>
              )}
            </Button>
            
            <p className="text-center text-[10px] text-muted-foreground mt-4">
              Tus datos serán procesados de forma segura mediante un proveedor de pago certificado.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
