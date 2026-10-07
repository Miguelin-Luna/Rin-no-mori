"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function FallidoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="bg-card p-8 rounded-3xl border border-border/15 shadow-sm max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center border border-red-200">
          <span className="material-symbols-outlined text-4xl text-red-600">error</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-display font-bold text-2xl text-brown">El pago no se pudo completar</h1>
          <p className="text-sm text-muted-foreground">
            Ocurrió un problema al intentar procesar tu pago. Tu carrito sigue guardado.
            Por favor, inténtalo de nuevo.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button onClick={() => router.push('/checkout')} className="w-full bg-brown hover:bg-brown/90 text-white font-bold py-6 rounded-xl">
            Intentar nuevamente
          </Button>
          <Button onClick={() => router.push('/catalogo')} variant="outline" className="w-full text-brown border-border/20 py-6 rounded-xl font-bold">
            Volver al catálogo
          </Button>
        </div>
      </div>
    </div>
  );
}
