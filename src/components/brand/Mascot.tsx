import React from 'react';
import { Logo } from './Logo';

export const Mascot: React.FC = () => {
  return (
    <div className="w-full bg-[#fbf2ed] border-y border-[#827470]/10 py-10 px-4 my-8 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6 text-center">
        
        {/* Central Logo Showcase */}
        <div className="w-48 h-48 md:w-56 md:h-56 bg-[#fff8f5] rounded-full p-4 border border-[#827470]/15 shadow-sm hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          <Logo size="100%" variant="full" />
        </div>

        <div className="space-y-1.5 max-w-lg">
          <span className="text-[11px] font-bold tracking-widest text-[#586427] uppercase bg-[#dbea9e]/40 px-3 py-1 rounded-full border border-[#586427]/15">
            ✦ Bosque de Dulzura ・ りんの森 ✦
          </span>
          <p className="text-xs text-[#504441] leading-relaxed pt-2">
            "Cada pieza nace en nuestro taller como un homenaje a la serenidad del bosque japonés y la calidez del horneado artesanal."
          </p>
        </div>

        {/* Mascot baking processes row */}
        <div className="flex items-center justify-center gap-6 md:gap-12 pt-2 overflow-x-auto w-full">
          
          <div className="flex flex-col items-center shrink-0 group">
            <div className="w-14 h-14 bg-[#f5ece7] rounded-full flex items-center justify-center border border-[#827470]/15 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl text-[#442a22]">bakery_dining</span>
            </div>
            <span className="text-[11px] font-semibold text-[#442a22] mt-1.5">Pan Recién Horneado</span>
          </div>

          <div className="flex flex-col items-center shrink-0 group">
            <div className="w-14 h-14 bg-[#dbea9e]/40 rounded-full flex items-center justify-center border border-[#586427]/20 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl text-[#586427]">cookie</span>
            </div>
            <span className="text-[11px] font-semibold text-[#586427] mt-1.5">Amasado Artesanal</span>
          </div>

          <div className="flex flex-col items-center shrink-0 group">
            <div className="w-14 h-14 bg-[#f5ece7] rounded-full flex items-center justify-center border border-[#827470]/15 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl text-[#442a22]">potted_plant</span>
            </div>
            <span className="text-[11px] font-semibold text-[#442a22] mt-1.5">Ingredientes de Bosque</span>
          </div>

          <div className="flex flex-col items-center shrink-0 group">
            <div className="w-14 h-14 bg-[#dbea9e]/40 rounded-full flex items-center justify-center border border-[#586427]/20 shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl text-[#586427]">cake</span>
            </div>
            <span className="text-[11px] font-semibold text-[#586427] mt-1.5">Empaque con Amor</span>
          </div>

        </div>

      </div>
    </div>
  );
};

