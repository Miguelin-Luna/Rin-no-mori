import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { CheckoutClient } from './CheckoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finalizar Compra | Rin No Mori',
  robots: { index: false, follow: false }
};

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/checkout');
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutClient />
    </div>
  );
}
