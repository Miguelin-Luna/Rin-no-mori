const fs = require('fs');
let content = fs.readFileSync('src/app/carrito/CartClient.tsx', 'utf8');

// Fix the z-index so the wavy borders actually show up
content = content.replace(/before:z-\\[-1\\]/g, 'before:z-[0]');
content = content.replace(/after:z-\\[-1\\]/g, 'after:z-[0]');

// Remove wavy effect from dashed borders
content = content.replace(
  /className=\\{elative py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start \\$\\{!isLast \\? 'after:content-\\[\\'\\'\\] after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b-\\[1\\.5px\\] after:border-dashed after:border-\\[#4A3E3D\\] after:pointer-events-none after:\\[filter:url\\(#wavy-stroke\\)\\]' : ''\\}\\}/g,
  'className={py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start }'
);

content = content.replace(
  /<div className=\"relative mt-4 pt-4 flex justify-end before:content-\\[''\\] before:absolute before:top-0 before:left-0 before:right-0 before:border-t-\\[2px\\] before:border-\\[#4A3E3D\\] before:pointer-events-none before:\\[filter:url\\(#wavy-stroke\\)\\]\">/g,
  '<div className="mt-4 pt-4 border-t-[2px] border-[#4A3E3D] flex justify-end">'
);

content = content.replace(
  /<div className=\"relative space-y-4 pb-6 after:content-\\[''\\] after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b-\\[1\\.5px\\] after:border-dashed after:border-\\[#4A3E3D\\] after:pointer-events-none after:\\[filter:url\\(#wavy-stroke\\)\\]\">/g,
  '<div className="space-y-4 pb-6 border-b-[2px] border-dashed border-[#4A3E3D]">'
);

fs.writeFileSync('src/app/carrito/CartClient.tsx', content, 'utf8');
console.log('Fixed straight dividers and z-index');
