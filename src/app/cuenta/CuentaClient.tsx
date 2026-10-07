"use client";

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface CuentaClientProps {
  user: any;
  orders: any[];
}

export default function CuentaClient({ user, orders }: CuentaClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDIENTE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PAGADO': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'EN_PREPARACION': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ENVIADO': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ENTREGADO': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELADO': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto px-5 py-12 md:py-16 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-brown flex items-center gap-3">
          Mi Cuenta <span className="text-2xl">👤</span>
        </h1>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold border-red-200"
        >
          Cerrar Sesión
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border/15 p-8 shadow-sm mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-olive/10 text-olive flex items-center justify-center font-display text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-brown">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-display font-bold text-2xl text-brown flex items-center gap-2">
          <span className="material-symbols-outlined text-olive">shopping_bag</span>
          Historial de Pedidos
        </h2>

        {orders.length === 0 ? (
          <div className="bg-cream/30 p-8 rounded-2xl border border-border/10 text-center">
            <p className="text-muted-foreground mb-4">Aún no tienes pedidos.</p>
            <Button onClick={() => router.push('/catalogo')} className="bg-brown hover:bg-brown/90 text-white">
              Explorar el catálogo
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-border/15 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border/10 pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-brown text-lg">{order.orderNumber}</h3>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="font-display font-bold text-xl text-brown">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.quantity}x {item.product.name}</span>
                      <span className="text-brown font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  {order.giftBoxes.map((box: any, idx: number) => (
                    <div key={box.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">1x Caja Personalizada ({box.size} pz) - Empaque {box.presentation === 'premium' ? 'Premium' : 'Estándar'}</span>
                      <span className="text-brown font-semibold">${box.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
