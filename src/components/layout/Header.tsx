"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/types';
import { Logo } from '../brand/Logo';
import { Button } from '../ui/button';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  cartCount?: number;
  currentUser?: User | null;
}

export const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { data: session, status } = useSession();
  
  const currentUser = session?.user;

  return (
    <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b border-border/10 transition-all duration-200" style={{ backgroundColor: 'rgba(245, 242, 235, 0.97)' }}>
      <div className="w-full mx-auto px-4 md:px-8 flex justify-between items-center" style={{ height: '90px' }}>
        
        {/* Brand Logo & Avatar */}
        <Link 
          href="/"
          className="flex items-center gap-2.5 hover:opacity-85 transition-opacity text-left focus:outline-none group"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full overflow-hidden bg-transparent group-hover:scale-105 transition-transform shrink-0">
            <Logo size="100%" variant="icon-only" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg md:text-xl text-brown tracking-tight leading-tight">
              Rin no mori
            </span>
            <span className="text-[10px] text-olive font-semibold tracking-wider uppercase hidden sm:block">
              Bosque de dulzura ・ りんの森
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-medium text-sm transition-colors relative py-1 ${
              pathname === '/'
                ? 'text-brown font-bold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brown after:rounded-full'
                : 'text-muted-foreground hover:text-brown'
            }`}
          >
            Home
          </Link>
          <Link
            href="/catalogo"
            className={`font-medium text-sm transition-colors relative py-1 flex items-center gap-1 ${
              pathname === '/catalogo'
                ? 'text-brown font-bold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brown after:rounded-full'
                : 'text-muted-foreground hover:text-brown'
            }`}
          >
            <span>Catálogo</span>
            {pathname === '/catalogo' && (
              <span className="material-symbols-outlined text-xs text-olive font-normal animate-pulse">
                eco
              </span>
            )}
          </Link>
          <Link
            href="/personalizar"
            className={`font-medium text-sm transition-colors relative py-1 flex items-center gap-1 ${
              pathname === '/personalizar'
                ? 'text-brown font-bold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brown after:rounded-full'
                : 'text-muted-foreground hover:text-brown'
            }`}
          >
            <span>Armar Caja</span>
            <span className="material-symbols-outlined text-[16px] text-olive font-normal">
              redeem
            </span>
          </Link>
          <Link
            href="/favoritos"
            className={`font-medium text-sm transition-colors relative py-1 ${
              pathname === '/favoritos'
                ? 'text-brown font-bold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brown after:rounded-full'
                : 'text-muted-foreground hover:text-brown'
            }`}
          >
            Favoritos
          </Link>
        </nav>

        {/* Actions (Search, Account, Favorites & Cart) */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-brown hover:bg-beige rounded-full transition-colors"
            title="Buscar galletas"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </Button>

          {/* User Account / Registration Button */}
          {status === 'loading' ? (
             <div className="w-10 h-10 rounded-full bg-cream animate-pulse" />
          ) : (
            <Link href={currentUser ? "/cuenta" : "/login"} passHref>
              <Button
                variant="outline"
                className={`rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  currentUser
                    ? 'bg-secondary-container/40 border-olive/30 text-brown hover:bg-secondary-container/70'
                    : 'bg-olive text-white border-olive hover:bg-olive/90 shadow-sm'
                }`}
                title={currentUser ? `Mi Cuenta (${currentUser.name})` : 'Registro / Iniciar sesión'}
              >
                <span className="material-symbols-outlined text-lg">
                  {currentUser ? 'account_circle' : 'person_add'}
                </span>
                <span className="hidden sm:inline whitespace-nowrap max-w-[100px] truncate">
                  {currentUser ? currentUser.name : 'Ingresar'}
                </span>
              </Button>
            </Link>
          )}

          <Link href="/favoritos" passHref>
            <Button
              variant="ghost"
              size="icon"
              className={`text-brown hover:bg-beige rounded-full transition-colors ${
                pathname === '/favoritos' ? 'bg-beige text-olive' : ''
              }`}
              title="Favoritos"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
            </Button>
          </Link>

          <Link href="/carrito" passHref>
            <Button
              variant="ghost"
              size="icon"
              className="text-brown hover:bg-beige rounded-full transition-colors relative"
              title="Ver carrito"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-olive text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream shadow-xs animate-in zoom-in-50">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
};
