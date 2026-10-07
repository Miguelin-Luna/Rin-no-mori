import React from 'react';
import { requireAdmin } from '@/lib/auth-admin';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | Rin No Mori',
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Proteger toda la ruta /admin y obtener el usuario (opcional usar user si se necesita en layout)
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-border/15 shrink-0 flex flex-col h-auto md:min-h-screen">
        <div className="p-6 border-b border-border/10">
          <Link href="/admin" className="font-display font-bold text-2xl text-brown">
            Admin <span className="text-olive">Panel</span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brown hover:bg-olive/5 font-semibold transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link href="/admin/pedidos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brown hover:bg-olive/5 font-semibold transition-colors">
            <span className="material-symbols-outlined">shopping_cart</span>
            Pedidos
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brown hover:bg-olive/5 font-semibold transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
            Productos
          </Link>
          <Link href="/admin/clientes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brown hover:bg-olive/5 font-semibold transition-colors">
            <span className="material-symbols-outlined">group</span>
            Clientes
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border/10 mt-auto">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brown hover:bg-red-50 hover:text-red-600 font-semibold transition-colors">
            <span className="material-symbols-outlined">storefront</span>
            Volver a Tienda
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
