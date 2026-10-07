import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  // 1. Obtener métricas de órdenes
  const allOrders = await prisma.order.findMany({
    select: { status: true, totalAmount: true }
  });

  const totalRevenue = allOrders
    .filter(o => o.status !== 'PENDIENTE' && o.status !== 'CANCELADO')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendientesCount = allOrders.filter(o => o.status === 'PENDIENTE').length;
  const enPreparacionCount = allOrders.filter(o => o.status === 'EN_PREPARACION').length;
  const enviadosCount = allOrders.filter(o => o.status === 'ENVIADO').length;

  // 2. Obtener alerta de productos (stock < 10)
  const lowStockProducts = await prisma.product.findMany({
    where: { stock: { lt: 10 } },
    select: { id: true, name: true, stock: true },
    orderBy: { stock: 'asc' }
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      <h1 className="font-display font-bold text-3xl text-brown">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border/15 shadow-sm">
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">Ingresos Totales</p>
          <p className="font-display font-bold text-3xl text-brown">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border/15 shadow-sm">
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">Pendientes</p>
          <p className="font-display font-bold text-3xl text-yellow-600">{pendientesCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border/15 shadow-sm">
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">En Preparación</p>
          <p className="font-display font-bold text-3xl text-purple-600">{enPreparacionCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border/15 shadow-sm">
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">Enviados</p>
          <p className="font-display font-bold text-3xl text-blue-600">{enviadosCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl border border-border/15 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/10 flex justify-between items-center">
            <h2 className="font-display font-bold text-xl text-brown flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">warning</span>
              Alertas de Stock
            </h2>
            <Link href="/admin/productos" className="text-sm font-bold text-olive hover:underline">Ver catálogo</Link>
          </div>
          <div className="p-0 flex-1">
            {lowStockProducts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                Todos los productos tienen buen nivel de stock.
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-cream/50 text-brown">
                  <tr>
                    <th className="p-4 font-bold">Producto</th>
                    <th className="p-4 font-bold text-right">Stock Actual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {lowStockProducts.map(p => (
                    <tr key={p.id} className="hover:bg-cream/20 transition-colors">
                      <td className="p-4 font-semibold text-brown">{p.name}</td>
                      <td className="p-4 text-right">
                        <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs ${
                          p.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {p.stock} unid.
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="bg-white rounded-2xl border border-border/15 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/10">
            <h2 className="font-display font-bold text-xl text-brown flex items-center gap-2">
              <span className="material-symbols-outlined text-olive">bolt</span>
              Accesos Rápidos
            </h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link href="/admin/productos/nuevo" className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border/15 bg-cream/30 hover:bg-olive/10 transition-colors text-brown text-center">
              <span className="material-symbols-outlined text-3xl">add_circle</span>
              <span className="font-semibold text-sm">Nuevo Producto</span>
            </Link>
            <Link href="/admin/pedidos" className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border/15 bg-cream/30 hover:bg-olive/10 transition-colors text-brown text-center">
              <span className="material-symbols-outlined text-3xl">local_shipping</span>
              <span className="font-semibold text-sm">Gestionar Pedidos</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
