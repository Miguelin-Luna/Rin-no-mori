"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, GiftBoxConfig } from '@/types';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity: number) => void;
  addGiftBoxToCart: (config: GiftBoxConfig, quantity: number, price: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rin_no_mori_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        const migrated = parsed.map((item: any) => {
          if (!item.type && item.product) {
            return { ...item, id: item.product.id, type: 'product' };
          }
          return item;
        });
        setCart(migrated);
      }
    } catch (e) {
      console.error("Error parsing cart from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('rin_no_mori_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.type === 'product' && item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.type === 'product' && item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: product.id, type: 'product', product, quantity }];
    });
  };

  const addGiftBoxToCart = (config: GiftBoxConfig, quantity: number, price: number) => {
    const id = `giftbox_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setCart(prev => [...prev, { id, type: 'gift_box', config, quantity, price }]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    if (item.type === 'product') {
      return acc + (item.product.price * item.quantity);
    } else {
      return acc + (item.price * item.quantity);
    }
  }, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, addGiftBoxToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
