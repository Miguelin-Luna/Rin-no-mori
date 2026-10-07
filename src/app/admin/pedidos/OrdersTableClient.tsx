"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrdersTableClientProps {
  initialOrders: any[];
}

export default function OrdersTableClient({ initialOrders }: OrdersTableClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrders = initialOrders.filter(order => {
    const term = searchTerm.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(term) ||
      (order.user?.name || '').toLowerCase().includes(term) ||
      (order.user?.email || '').toLowerCase().includes(term)
    );
  });

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
    <div>
      <div className="p-4 border-b border-border/10 bg-cream/20">
        <input
          type="text"
          placeholder="Buscar por código (ORD-...) o cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 p-2.5 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream/50 text-brown">
            <tr>
              <th className="p-4 font-bold">Orden</th>
              <th className="p-4 font-bold">Cliente</th>
              <th className="p-4 font-bold">Fecha</th>
              <th className="p-4 font-bold text-center">Estado</th>
              <th className="p-4 font-bold text-right">Total</th>
              <th className="p-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No se encontraron pedidos.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-cream/20 transition-colors">
                  <td className="p-4 font-semibold text-brown">{order.orderNumber}</td>
                  <td className="p-4 text-brown">
                    <div className="font-semibold">{order.user?.name || 'Usuario'}</div>
                    <div className="text-xs text-muted-foreground">{order.user?.email}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full font-bold text-[10px] uppercase border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-brown">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => router.push(`/admin/pedidos/${order.id}`)}
                      className="text-xs font-bold text-olive hover:text-brown transition-colors"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
