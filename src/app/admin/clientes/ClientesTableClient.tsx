"use client";

import React, { useState } from 'react';

interface ClientesTableClientProps {
  initialUsers: any[];
}

export default function ClientesTableClient({ initialUsers }: ClientesTableClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = initialUsers.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      (user.name || '').toLowerCase().includes(term) ||
      (user.email || '').toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="p-4 border-b border-border/10 bg-cream/20">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 p-2.5 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream/50 text-brown">
            <tr>
              <th className="p-4 font-bold">Cliente</th>
              <th className="p-4 font-bold">Rol</th>
              <th className="p-4 font-bold">Fecha de Registro</th>
              <th className="p-4 font-bold text-center">Pedidos Completados</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No se encontraron clientes.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-cream/20 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-brown">{user.name || 'Sin nombre'}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full font-bold text-[10px] uppercase border ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-brown bg-cream/50 px-3 py-1 rounded-full">
                      {user._count.orders}
                    </span>
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
