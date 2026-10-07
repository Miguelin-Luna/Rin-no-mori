"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function ExitoClient() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    // Cuando entramos en la página de éxito, vaciamos el carrito del cliente.
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-card p-8 rounded-3xl border border-border/15 shadow-sm max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center border border-green-200">
        <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
      </div>
      
      <div className="space-y-2">
        <h1 className="font-display font-bold text-2xl text-brown">¡Pago Exitoso!</h1>
        <p className="text-sm text-muted-foreground">
          Tu pedido ha sido procesado y se encuentra en estado PAGADO.
          Hemos comenzado a prepararlo con mucho cuidado.
        </p>
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <Button onClick={() => router.push('/cuenta')} className="w-full bg-brown hover:bg-brown/90 text-white font-bold py-6 rounded-xl">
          Ver mis pedidos
        </Button>
        <Button onClick={() => router.push('/')} variant="outline" className="w-full text-brown border-border/20 py-6 rounded-xl font-bold">
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
}
