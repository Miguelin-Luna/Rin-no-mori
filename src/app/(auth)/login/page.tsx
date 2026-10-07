"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Credenciales incorrectas');
      setLoading(false);
    } else {
      router.push('/cuenta');
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto px-5 py-12 md:py-24 animate-in fade-in">
      <div className="bg-white rounded-3xl border border-border/15 shadow-sm p-8">
        <h1 className="font-display font-bold text-2xl text-brown mb-2 text-center">Bienvenido de vuelta</h1>
        <p className="text-muted-foreground text-sm text-center mb-6">Inicia sesión para continuar</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold mb-4 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-bold text-brown mb-1.5">Contraseña</label>
            <input
              type="password"
              required
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
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link href="/registro" className="text-olive font-bold hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
