"use client";

import React, { useState } from 'react';
import { updateOrderStatus } from '@/app/actions/admin-orders';

export default function OrderDetailClient({ order }: { order: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStateChange = async (newStatus: string) => {
    if (!confirm(`¿Estás seguro que deseas cambiar el estado a ${newStatus}?`)) return;

    setLoading(true);
    setError(null);
    const res = await updateOrderStatus(order.id, newStatus);
    
    if (res.error) {
      setError(res.error);
    }
    setLoading(false);
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

  // Posibles siguientes estados basados en la máquina de estados definida:
  let availableTransitions: { label: string; value: string; style: string }[] = [];
  
  if (order.status === 'PENDIENTE') {
    availableTransitions.push({ label: 'Cancelar Orden', value: 'CANCELADO', style: 'bg-red-100 text-red-700 hover:bg-red-200' });
  } else if (order.status === 'PAGADO') {
    availableTransitions.push({ label: 'Marcar En Preparación', value: 'EN_PREPARACION', style: 'bg-purple-100 text-purple-700 hover:bg-purple-200' });
  } else if (order.status === 'EN_PREPARACION') {
    availableTransitions.push({ label: 'Marcar Enviado', value: 'ENVIADO', style: 'bg-orange-100 text-orange-700 hover:bg-orange-200' });
  } else if (order.status === 'ENVIADO') {
    availableTransitions.push({ label: 'Marcar Entregado', value: 'ENTREGADO', style: 'bg-green-100 text-green-700 hover:bg-green-200' });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Columna Izquierda (Info y Items) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Cliente y Envío */}
        <div className="bg-white p-6 rounded-3xl border border-border/15 shadow-sm">
          <h2 className="font-display font-bold text-xl text-brown mb-4 border-b border-border/10 pb-4">
            Información del Cliente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Usuario</p>
              <p className="font-semibold text-brown">{order.user.name}</p>
              <p className="text-sm text-muted-foreground">{order.user.email}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Envío a</p>
              {order.shippingAddress ? (
                <div className="text-sm text-brown">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">Sin dirección de envío</p>
              )}
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-white p-6 rounded-3xl border border-border/15 shadow-sm">
          <h2 className="font-display font-bold text-xl text-brown mb-4 border-b border-border/10 pb-4">
            Productos Comprados
          </h2>
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center bg-cream/20 p-4 rounded-xl border border-border/10">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white rounded-lg border border-border/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-olive">cookie</span>
                  </div>
                  <div>
                    <p className="font-semibold text-brown">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <div className="font-bold text-brown">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {order.giftBoxes.map((box: any) => (
              <div key={box.id} className="flex justify-between bg-cream/20 p-4 rounded-xl border border-border/10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg border border-border/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-olive">featured_seasonal_and_gifts</span>
                  </div>
                  <div>
                    <p className="font-semibold text-brown">Caja Personalizada ({box.size} pz)</p>
                    <p className="text-xs text-muted-foreground">Empaque: {box.presentation}</p>
                    {box.message && <p className="text-xs italic mt-1">Mensaje: "{box.message}"</p>}
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-bold text-olive">Sabores:</p>
                      {box.items.map((sel: any) => (
                        <p key={sel.id} className="text-xs text-muted-foreground ml-2">
                          - {sel.quantity}x {sel.product.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-brown">
                  ${box.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Columna Derecha (Resumen y Acciones) */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-border/15 shadow-sm sticky top-6">
          
          <div className="mb-6">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Estado Actual</p>
            <span className={`inline-flex px-4 py-2 rounded-full font-bold text-sm uppercase border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>

          <div className="border-t border-b border-border/10 py-4 my-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-brown font-semibold">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío</span>
              <span className="text-brown font-semibold">${order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pago via</span>
              <span className="text-brown font-semibold capitalize">{order.payment?.provider || 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transacción ID</span>
              <span className="text-brown font-semibold break-all text-xs text-right ml-4">{order.payment?.transactionId || 'N/A'}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-brown text-lg">Total</span>
            <span className="font-display font-bold text-3xl text-brown">${order.totalAmount.toFixed(2)}</span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 font-semibold">
              {error}
            </div>
          )}

          {availableTransitions.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-center mb-2">
                Acciones de Estado
              </p>
              {availableTransitions.map(t => (
                <button
                  key={t.value}
                  onClick={() => handleStateChange(t.value)}
                  disabled={loading}
                  className={`w-full font-bold py-3 px-4 rounded-xl transition-all ${t.style} disabled:opacity-50`}
                >
                  {loading ? 'Procesando...' : t.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-cream/50 p-4 rounded-xl border border-border/10 text-center">
              <p className="text-xs text-muted-foreground font-semibold">
                No hay acciones disponibles para el estado actual.
              </p>
            </div>
          )}

        </div>
      </div>
      
    </div>
  );
}
