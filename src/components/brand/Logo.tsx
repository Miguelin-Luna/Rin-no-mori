import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'compact' | 'icon-only';
  lightBackground?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = '100%',
  variant = 'full',
  lightBackground = false
}) => {
  return (
    <div 
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/logo.png"
        alt="Rin No Mori - Bosque de dulzura - Repostería Japonesa"
        width={500}
        height={500}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
};
