const fs = require('fs');
let content = fs.readFileSync('src/app/carrito/CartClient.tsx', 'utf8');

// 1. Remove truncate from title
content = content.replaceAll(
  '<h3 className="font-bold text-xl text-[#3E3430] truncate">{title}</h3>',
  '<h3 className="font-bold text-xl text-[#3E3430]">{title}</h3>'
);

// 2. Add SVG Filter at the top inside the main container
const svgFilter = 
      {/* Hand-drawn SVG Filter */}
      <svg style={{ display: 'none' }}>
        <filter id="hand-drawn">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
;
content = content.replaceAll(
  '<div className="flex items-center gap-4 mb-8">',
  svgFilter + '\n      <div className="flex items-center gap-4 mb-8">'
);

// 3. Apply border-radius and filter to Left Column
content = content.replaceAll(
  'className="border-[1.5px] border-[#4A3E3D] rounded-[24px] p-6 lg:p-8 bg-[#F6F0E6]"',
  'className="border-2 border-[#4A3E3D] p-6 lg:p-8 bg-[#F6F0E6]" style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px", filter: "url(#hand-drawn)" }}'
);

// 4. Apply border-radius and filter to Right Column
content = content.replaceAll(
  'className="border-[1.5px] border-[#4A3E3D] rounded-[24px] p-8 bg-[#FBF8F2] relative z-10 shadow-sm"',
  'className="border-2 border-[#4A3E3D] p-8 bg-[#FBF8F2] relative z-10 shadow-sm" style={{ borderRadius: "20px 255px 20px 240px/240px 20px 250px 20px", filter: "url(#hand-drawn)" }}'
);

// 5. Apply border-radius to Flavors Inner Box
content = content.replaceAll(
  'className="mt-3 bg-[#FBF8F2] rounded-xl border border-[#4A3E3D]/20 p-3 text-[13px] text-[#3E3430] inline-block min-w-[200px]"',
  'className="mt-3 bg-[#FBF8F2] border-[1.5px] border-[#4A3E3D] p-3 text-[13px] text-[#3E3430] inline-block min-w-[200px]" style={{ borderRadius: "14px 225px 18px 240px/230px 16px 240px 14px" }}'
);

// 6. Apply border-radius to Image Inner Box
content = content.replaceAll(
  'className="w-24 h-24 rounded-[16px] border-[1.5px] border-[#4A3E3D] p-2 shrink-0 bg-[#FBF8F2] flex items-center justify-center"',
  'className="w-24 h-24 border-[1.5px] border-[#4A3E3D] p-2 shrink-0 bg-[#FBF8F2] flex items-center justify-center" style={{ borderRadius: "14px 225px 18px 240px/230px 16px 240px 14px" }}'
);

// 7. Update dashed borders
content = content.replaceAll(
  'border-b border-dashed border-[#4A3E3D]/30',
  'border-b-[2px] border-dashed border-[#4A3E3D]'
);

// 8. Update mascot dog placement
content = content.replaceAll(
  '<div className="w-full flex justify-center relative z-20 pointer-events-none" style={{ marginTop: \'-40px\' }}>',
  '<div className="w-full flex justify-center relative z-20 pointer-events-none" style={{ marginTop: "-85px" }}>'
);


fs.writeFileSync('src/app/carrito/CartClient.tsx', content, 'utf8');
console.log('Hand-drawn effects applied!');
