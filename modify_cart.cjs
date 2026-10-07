const fs = require('fs');
let content = fs.readFileSync('src/app/carrito/CartClient.tsx', 'utf8');

// Replace left column box
content = content.replace(
  /className=\\\"border-2 border-\\[#4a3327\\] rounded-\\[30px\\] p-6 lg:p-8 bg-transparent\\\"/g,
  'className=\"border-2 border-[#4a3327] p-6 lg:p-8 bg-transparent\" style={{ borderRadius: \"255px 15px 225px 15px/15px 225px 15px 255px\" }}'
);

// Replace right column box
content = content.replace(
  /className=\\\"border-2 border-\\[#4a3327\\] rounded-\\[30px\\] p-8 bg-\\[#fdfbf6\\] relative z-10 shadow-sm\\\"/g,
  'className=\"border-2 border-[#4a3327] p-8 bg-[#fdfbf6] relative z-10 shadow-sm\" style={{ borderRadius: \"15px 255px 15px 225px/255px 15px 225px 15px\" }}'
);

// Move dog higher
content = content.replace(
  /<div className=\\\"w-full flex justify-center -mt-6 relative z-0\\\">/g,
  '<div className=\"w-full flex justify-center -mt-24 relative z-0\">'
);

// Maybe also apply organic border to the 'Sabores seleccionados' small box
content = content.replace(
  /className=\\\"mt-3 bg-white\\/60 rounded-xl border border-\\[#e8e2d5\\] p-3 text-\\[13px\\] text-\\[#4a3327\\] inline-block min-w-\\[200px\\]\\\"/g,
  'className=\"mt-3 bg-white/60 border border-[#e8e2d5] p-3 text-[13px] text-[#4a3327] inline-block min-w-[200px]\" style={{ borderRadius: \"255px 15px 225px 15px/15px 225px 15px 255px\" }}'
);

// Also the image box
content = content.replace(
  /className=\\\"w-24 h-24 rounded-2xl border border-\\[#4a3327\\] p-2 shrink-0 bg-\\[#fdfbf6\\] flex items-center justify-center\\\"/g,
  'className=\"w-24 h-24 border border-[#4a3327] p-2 shrink-0 bg-[#fdfbf6] flex items-center justify-center\" style={{ borderRadius: \"15px 225px 15px 255px/255px 15px 225px 15px\" }}'
);


fs.writeFileSync('src/app/carrito/CartClient.tsx', content, 'utf8');
