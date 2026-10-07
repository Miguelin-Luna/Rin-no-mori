"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface DummyClientProps {
  orderId: string;
  amount: number;
}

export default function DummyClient({ orderId, amount }: DummyClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulatePayment = async (status: 'COMPLETED' | 'FAILED') => {
    setLoading(true);
    setError(null);

    try {
      // Llamamos al webhook de prueba internamente
      const res = await fetch('/api/webhooks/dummy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer DUMMY_SECRET_KEY' // Simula validación de webhook
        },
        body: JSON.stringify({
          orderId,
          status
        })
      });

      if (!res.ok) {
        throw new Error('Error en el webhook');
      }

      if (status === 'COMPLETED') {
        router.push(`/checkout/exito?orderId=${orderId}`);
      } else {
        router.push('/checkout/fallido');
      }

    } catch (err) {
      console.error(err);
      setError('Ocurrió un error simulando el pago.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-8 rounded-3xl border border-border/15 shadow-sm max-w-md w-full text-center space-y-6">
      <h2 className="font-display font-bold text-2xl text-brown">Pasarela de Pago Simulada</h2>
      <p className="text-sm text-muted-foreground">
        Esta pantalla existe solo para propósitos de prueba en desarrollo. 
        En producción, el usuario vería la pantalla de Mercado Pago o Stripe.
      </p>
      
      <div className="bg-beige p-4 rounded-xl border border-border/10">
        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Monto a Pagar</p>
        <p className="font-display font-bold text-3xl text-brown">${amount.toFixed(2)}</p>
      </div>

      {error && (
        <div className="text-red-500 text-xs font-semibold">{error}</div>
      )}

      <div className="space-y-3 pt-2">
        <Button
          disabled={loading}
          onClick={() => simulatePayment('COMPLETED')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 rounded-xl text-sm"
        >
          {loading ? 'Procesando...' : 'Simular Pago Exitoso'}
        </Button>
        <Button
          disabled={loading}
          onClick={() => simulatePayment('FAILED')}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 py-6 rounded-xl text-sm font-bold"
        >
          {loading ? 'Procesando...' : 'Simular Pago Fallido'}
        </Button>
      </div>
    </div>
  );
}
