import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import CuentaClient from './CuentaClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Cuenta | Rin No Mori',
  robots: { index: false, follow: false }
};

export default async function CuentaPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: true }
      },
      giftBoxes: {
        include: { items: { include: { product: true } } }
      }
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <CuentaClient user={session.user} orders={orders} />
    </div>
  );
}
