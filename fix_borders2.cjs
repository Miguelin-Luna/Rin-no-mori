const fs = require('fs');
let content = fs.readFileSync('src/app/carrito/CartClient.tsx', 'utf8');

content = content.replaceAll('255px 15px 225px 15px/15px 225px 15px 255px', '2% 98% 1% 99% / 99% 1% 98% 2%');
content = content.replaceAll('15px 255px 15px 225px/255px 15px 225px 15px', '98% 2% 99% 1% / 1% 99% 2% 98%');
content = content.replaceAll('15px 225px 15px 255px/255px 15px 225px 15px', '98% 2% 99% 1% / 1% 99% 2% 98%');

content = content.replaceAll('w-full flex justify-center -mt-24 relative z-0', 'w-full flex justify-center -mt-[110px] relative z-20 pointer-events-none');

fs.writeFileSync('src/app/carrito/CartClient.tsx', content, 'utf8');
console.log('Fixed');
