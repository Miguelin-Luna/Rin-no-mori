"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/app/actions/admin-products';
import { z } from 'zod';
import Image from 'next/image';

const productSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  slug: z.string().min(2, "El slug es requerido y debe estar en formato URL (ej: mochi-matcha)."),
  price: z.number().min(0, "El precio no puede ser negativo."),
  stock: z.number().int().min(0, "El stock no puede ser negativo."),
  categoryId: z.string().min(1, "Debes seleccionar una categoría."),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
  shortDescription: z.string().min(5, "La descripción corta es requerida."),
  ingredients: z.string(), // Lo transformaremos a array
  tags: z.string(), // Lo transformaremos a array
  isActive: z.boolean(),
  featured: z.boolean(),
  images: z.array(z.object({
    url: z.string().url("Debe ser una URL válida"),
    alt: z.string().optional()
  }))
});

interface ProductFormClientProps {
  product?: any;
  categories: any[];
}

export default function ProductFormClient({ product, categories }: ProductFormClientProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    price: product?.price?.toString() || '',
    stock: product?.stock?.toString() || '0',
    categoryId: product?.categoryId || '',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    ingredients: product?.ingredients?.join(', ') || '',
    tags: product?.tags?.join(', ') || '',
    isActive: product !== undefined ? product.isActive : true,
    featured: product?.featured || false,
    images: product?.images?.map((img: any) => ({ url: img.url, alt: img.alt })) || []
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleAddImage = () => {
    if (!newImageUrl) return;
    try {
      new URL(newImageUrl); // Validar formato básico
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, { url: newImageUrl, alt: '' }]
      }));
      setNewImageUrl('');
    } catch {
      alert("Por favor, ingresa una URL válida.");
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleMoveImageUp = (index: number) => {
    if (index === 0) return;
    setFormData(prev => {
      const newImages = [...prev.images];
      const temp = newImages[index - 1];
      newImages[index - 1] = newImages[index];
      newImages[index] = temp;
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    // Transformar para Zod
    const dataToValidate = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    const result = productSchema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      (result.error as any).errors.forEach((err: any) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const dataToSend = {
      ...result.data,
      ingredients: result.data.ingredients.split(',').map(s => s.trim()).filter(Boolean),
      tags: result.data.tags.split(',').map(s => s.trim()).filter(Boolean)
    };

    let res;
    if (product) {
      res = await updateProduct(product.id, dataToSend);
    } else {
      res = await createProduct(dataToSend);
    }

    if (res.error) {
      setGeneralError(res.error);
      setLoading(false);
    } else {
      router.push('/admin/productos');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {generalError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-200">
          {generalError}
        </div>
      )}

      {/* Información Básica */}
      <div>
        <h2 className="font-display font-bold text-xl text-brown mb-4 border-b border-border/10 pb-2">Información Básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Nombre del Producto</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Slug (URL amigable)</label>
            <input 
              type="text" 
              value={formData.slug} 
              onChange={e => setFormData({...formData, slug: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
              placeholder="ej: mi-producto-genial"
            />
            {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Precio ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={formData.price} 
              onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
            />
            {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Stock (Unidades)</label>
            <input 
              type="number" 
              value={formData.stock} 
              onChange={e => setFormData({...formData, stock: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
            />
            {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-brown">Categoría</label>
            <select 
              value={formData.categoryId} 
              onChange={e => setFormData({...formData, categoryId: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
            >
              <option value="">Selecciona una categoría...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId}</p>}
          </div>
        </div>
      </div>

      {/* Descripciones */}
      <div>
        <h2 className="font-display font-bold text-xl text-brown mb-4 border-b border-border/10 pb-2">Descripción</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Descripción Corta</label>
            <input 
              type="text" 
              value={formData.shortDescription} 
              onChange={e => setFormData({...formData, shortDescription: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
              maxLength={150}
            />
            {errors.shortDescription && <p className="text-xs text-red-500">{errors.shortDescription}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Descripción Larga</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10 min-h-[120px]"
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
        </div>
      </div>

      {/* Etiquetas e Ingredientes */}
      <div>
        <h2 className="font-display font-bold text-xl text-brown mb-4 border-b border-border/10 pb-2">Detalles Adicionales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Ingredientes (Separados por coma)</label>
            <input 
              type="text" 
              value={formData.ingredients} 
              onChange={e => setFormData({...formData, ingredients: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
              placeholder="ej: Harina, Azúcar, Té Matcha"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brown">Tags (Separados por coma)</label>
            <input 
              type="text" 
              value={formData.tags} 
              onChange={e => setFormData({...formData, tags: e.target.value})}
              className="w-full p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
              placeholder="ej: Bestseller, Nuevo, Vegano"
            />
          </div>
        </div>
      </div>

      {/* Imágenes (URLs externas) */}
      <div>
        <h2 className="font-display font-bold text-xl text-brown mb-4 border-b border-border/10 pb-2">Imágenes (URLs Externas)</h2>
        
        <div className="flex gap-4 mb-4">
          <input 
            type="text" 
            value={newImageUrl} 
            onChange={e => setNewImageUrl(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-border/20 text-sm outline-none focus:border-olive/50 bg-cream/10"
            placeholder="Pega aquí la URL de la imagen (ej: https://imgur.com/...)"
          />
          <button 
            type="button" 
            onClick={handleAddImage}
            className="bg-olive hover:bg-olive/90 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Añadir
          </button>
        </div>
        {errors.images && <p className="text-xs text-red-500 mb-4">{errors.images}</p>}

        <div className="space-y-3">
          {formData.images.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-border/20 rounded-xl text-muted-foreground text-sm">
              No hay imágenes. Añade al menos una. La primera será la imagen principal.
            </div>
          ) : (
            formData.images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-border/15 bg-white shadow-sm">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream/20 shrink-0 border border-border/10">
                  <Image src={img.url} alt={`Preview ${idx}`} fill className="object-cover" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-brown truncate">{img.url}</p>
                  {idx === 0 && <span className="inline-block mt-1 px-2 py-0.5 bg-olive/10 text-olive text-[10px] font-bold rounded-full uppercase tracking-wider">Principal</span>}
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => handleMoveImageUp(idx)}
                    disabled={idx === 0}
                    className="p-2 text-muted-foreground hover:text-brown disabled:opacity-30 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">arrow_upward</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(idx)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Estados y Visibilidad */}
      <div>
        <h2 className="font-display font-bold text-xl text-brown mb-4 border-b border-border/10 pb-2">Visibilidad</h2>
        <div className="flex flex-col sm:flex-row gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.isActive} 
              onChange={e => setFormData({...formData, isActive: e.target.checked})}
              className="w-5 h-5 accent-olive"
            />
            <span className="text-sm font-bold text-brown">Producto Activo (Visible en Catálogo)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.featured} 
              onChange={e => setFormData({...formData, featured: e.target.checked})}
              className="w-5 h-5 accent-olive"
            />
            <span className="text-sm font-bold text-brown">Destacado (Home Page)</span>
          </label>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="pt-6 border-t border-border/10 flex justify-end gap-4">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-border/20 text-brown font-bold hover:bg-cream/50 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-brown hover:bg-brown/90 text-white font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : (product ? 'Guardar Cambios' : 'Crear Producto')}
        </button>
      </div>
      
    </form>
  );
}
