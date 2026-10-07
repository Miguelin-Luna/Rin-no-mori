const fs = require('fs');
let content = fs.readFileSync('src/app/carrito/CartClient.tsx', 'utf8');

// Replace border radii with subtle percentages
content = content.replace(/255px 15px 225px 15px\\/15px 225px 15px 255px/g, '2% 98% 1% 99% / 99% 1% 98% 2%');
content = content.replace(/15px 255px 15px 225px\\/255px 15px 225px 15px/g, '98% 2% 99% 1% / 1% 99% 2% 98%');
content = content.replace(/15px 225px 15px 255px\\/255px 15px 225px 15px/g, '98% 2% 99% 1% / 1% 99% 2% 98%');

// Increase negative margin and z-index for dog
content = content.replace(/className=\\\"w-full flex justify-center -mt-24 relative z-0\\\"/g, 'className=\"w-full flex justify-center -mt-[110px] relative z-20\"');

fs.writeFileSync('src/app/carrito/CartClient.tsx', content, 'utf8');
console.log('Fixed');
