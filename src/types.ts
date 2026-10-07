export type CategoryId = 
  | 'all'
  | 'galletas'
  | 'regalos'
  | 'mini-pasteleria'
  | 'eventos'
  | 'postres'
  | 'bombones';

export interface Product {
  id: string;
  name: string;
  japaneseName?: string;
  category: CategoryId;
  categoryLabel: string;
  price: number; // e.g. 7.00
  originalPrice?: number;
  description: string;
  shortDescription: string;
  image: string;
  thumbnails?: string[];
  tags: string[]; // e.g. ['Bestseller', 'Contains Nuts', 'New', 'Gluten Free']
  rating: number; // e.g. 4.9
  reviewCount: number;
  inStock: boolean;
  ingredients?: string[];
  flavorNotes?: string[];
}

export interface GiftBoxSelection {
  productId: string;
  quantity: number;
  product?: Product; // Opcional, para UI
}

export interface GiftBoxConfig {
  size: 6 | 12;
  selections: GiftBoxSelection[];
  message?: string;
  presentation: 'standard' | 'premium';
  deliveryDate?: string;
}

export type CartItem = 
  | { id: string; type: 'product'; product: Product; quantity: number }
  | { id: string; type: 'gift_box'; config: GiftBoxConfig; quantity: number; price: number };

export type OrderStatus = 'En preparación' | 'En camino' | 'Entregado';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface UserOrder {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  address?: string;
  paymentMethod?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  joinDate?: string;
}

export type ViewTab = 'home' | 'catalog' | 'favorites' | 'cart';

export interface OrderDetails {
  customerName: string;
  email: string;
  address: string;
  phone: string;
  notes?: string;
  paymentMethod: 'card' | 'cash' | 'transfer';
  discountCode?: string;
}
