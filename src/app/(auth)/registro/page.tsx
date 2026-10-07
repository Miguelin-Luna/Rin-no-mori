"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setError(data.details.map((d: any) => d.message).join(', '));
        } else {
          setError(data.error || 'Ocurrió un error');
        }
        setLoading(false);
        return;
      }

      // Registro exitoso, ir al login
      router.push('/login');
    } catch (err) {
      setError('Error de conexión');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto px-5 py-12 md:py-24 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-border/15 shadow-sm p-8">
        <h1 className="font-display font-bold text-2xl text-brown mb-2 text-center">Crea tu cuenta</h1>
        <p className="text-muted-foreground text-sm text-center mb-6">Únete a nuestra familia de Rin no mori</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold mb-4 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-brown mb-1.5">Nombre completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-cream/50 text-sm text-brown p-3 rounded-xl border border-border/15 focus:outline-none focus:ring-2 focus:ring-olive/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brown mb-1.5">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-cream/50 text-sm text-brown p-3 rounded-xl border border-border/15 focus:outline-none focus:ring-2 focus:ring-olive/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brown mb-1.5">Contraseña (Mínimo 6 caracteres)</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-cream/50 text-sm text-brown p-3 rounded-xl border border-border/15 focus:outline-none focus:ring-2 focus:ring-olive/40 transition-all"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-olive hover:bg-olive/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-olive font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
