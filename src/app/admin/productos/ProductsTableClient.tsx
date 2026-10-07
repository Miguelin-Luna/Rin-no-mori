"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProductsTableClientProps {
  initialProducts: any[];
}

export default function ProductsTableClient({ initialProducts }: ProductsTableClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = initialProducts.filter(product => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.slug.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="p-4 border-b border-border/10 bg-cream/20">
        <input
          type="text"
          placeholder="Buscar producto por nombre o slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 p-2.5 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream/50 text-brown">
            <tr>
              <th className="p-4 font-bold w-16">Img</th>
              <th className="p-4 font-bold">Producto</th>
              <th className="p-4 font-bold">Categoría</th>
              <th className="p-4 font-bold text-right">Precio</th>
              <th className="p-4 font-bold text-center">Stock</th>
              <th className="p-4 font-bold text-center">Estado</th>
              <th className="p-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No se encontraron productos.
                </td>
              </tr>
            ) : (
              filteredProducts.map(product => {
                const mainImage = product.images?.[0]?.url;
                
                return (
                  <tr key={product.id} className="hover:bg-cream/20 transition-colors">
                    <td className="p-4">
                      {mainImage ? (
                        <div className="w-10 h-10 rounded-md overflow-hidden relative border border-border/15 bg-white">
                          <Image src={mainImage} alt={product.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-md border border-border/15 bg-white flex items-center justify-center text-muted-foreground">
                          <span className="material-symbols-outlined text-sm">image</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-brown">{product.name}</div>
                      <div className="text-xs text-muted-foreground">/{product.slug}</div>
                    </td>
                    <td className="p-4 text-muted-foreground capitalize">
                      {product.category?.name || 'Sin Categoría'}
                    </td>
                    <td className="p-4 text-right font-bold text-brown">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full font-bold text-xs ${
                        product.stock === 0 ? 'bg-red-100 text-red-700' :
                        product.stock < 10 ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {product.isActive ? (
                        <span className="text-green-600 flex items-center justify-center gap-1 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span> Activo
                        </span>
                      ) : (
                        <span className="text-muted-foreground flex items-center justify-center gap-1 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span> Inactivo
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => router.push(`/admin/productos/${product.id}/editar`)}
                        className="text-xs font-bold text-olive hover:text-brown transition-colors"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
