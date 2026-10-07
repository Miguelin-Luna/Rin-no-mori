import React from 'react';
import { Metadata } from 'next';
import { CartClient } from './CartClient';

export const metadata: Metadata = {
  title: 'Carrito | Rin No Mori',
  robots: { index: false, follow: false }
};

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-[#fcf9f8]">
      <CartClient />
    </div>
  );
}
