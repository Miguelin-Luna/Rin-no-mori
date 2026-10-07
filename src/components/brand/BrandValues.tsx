import React from 'react';
import Image from 'next/image';

export const BrandValues: React.FC = () => {
  return (
    <div className="w-full bg-[#f2ebd9] rounded-2xl p-6 md:p-8 my-6 overflow-hidden">
      <Image
        src="/brand/valores.png"
        alt="Valores de Rin No Mori - Ingredientes Naturales, Hecho a Mano, Horneado Diario, Inspiración Japonesa"
        width={1200}
        height={300}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  );
};
