import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DummyClient from './DummyClient';

export default async function DummyCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId;

  if (!orderId) redirect('/checkout');

  const order = await prisma.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    include: { payment: true }
  });

  if (!order || order.payment?.status !== 'PENDING') {
    redirect('/checkout');
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <DummyClient orderId={order.id} amount={order.totalAmount} />
    </div>
  );
}
