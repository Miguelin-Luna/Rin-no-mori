import type { Metadata } from 'next';
import './globals.css';
import { Geist, Cormorant_Garamond, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans', display: 'swap'});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Rin No Mori | Repostería Japonesa en Ecuador',
    template: '%s | Rin No Mori'
  },
  description: 'Descubre los sabores auténticos de Japón. Mochis, dorayakis, galletas y postres tradicionales japoneses con un toque moderno.',
  openGraph: {
    title: 'Rin No Mori | Repostería Japonesa',
    description: 'Postres tradicionales japoneses en Ecuador. Mochis, dorayakis y cajas de regalo personalizadas.',
    url: '/',
    siteName: 'Rin No Mori',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rin No Mori | Repostería Japonesa',
    description: 'Descubre los sabores auténticos de Japón con nosotros.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable, cormorant.variable, quicksand.variable)}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 pt-[90px] pb-24 md:pb-12">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
