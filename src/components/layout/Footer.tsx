import React from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f4e7da]/80 border-t border-border/15 pt-12 pb-16 px-6 md:px-12 text-brown">
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center p-0.5 rounded-full bg-beige border border-border/15 shadow-sm">
                <Logo size="100%" variant="icon-only" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl text-brown">Rin no mori</h3>
                <p className="text-[10px] text-olive font-semibold tracking-wider uppercase">
                  BOSQUE DE DULZURA · りんの森
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Galletas artesanales hechas con cariño. Pequeños momentos de dulzura horneados diariamente con la más fina inspiración japonesa.
            </p>

            <div className="flex items-center gap-2 text-xs text-olive font-semibold">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span>Kioto Inspired Bakehouse & Delivery</span>
            </div>
          </div>

          {/* Links Columns (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
            
            {/* Column 1: TIENDA */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-brown uppercase tracking-wider">
                Tienda
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/catalogo" className="hover:text-brown transition-colors">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo?orden=destacados" className="hover:text-brown transition-colors">
                    Más vendidos
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo?orden=nuevos" className="hover:text-brown transition-colors">
                    Nuevos
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo?categoria=regalos" className="hover:text-brown transition-colors">
                    Regalos & Cajas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: AYUDA */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-brown uppercase tracking-wider">
                Ayuda
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link href="/faq" className="hover:text-brown transition-colors">Preguntas frecuentes</Link></li>
                <li><Link href="/envios" className="hover:text-brown transition-colors">Envíos</Link></li>
                <li><Link href="/pagos" className="hover:text-brown transition-colors">Métodos de pago</Link></li>
                <li><Link href="/contacto" className="hover:text-brown transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Column 3: SÍGUENOS */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-display font-bold text-xs text-brown uppercase tracking-wider">
                Síguenos
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brown transition-colors flex items-center gap-1.5">
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brown transition-colors flex items-center gap-1.5">
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-brown transition-colors flex items-center gap-1.5">
                    <span>TikTok</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-border/15 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-muted-foreground">
          <p>© 2026 Rin no mori. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/terminos" className="hover:underline cursor-pointer">Términos y Condiciones</Link>
            <span>•</span>
            <Link href="/privacidad" className="hover:underline cursor-pointer">Política de Privacidad</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
