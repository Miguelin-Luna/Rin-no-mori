const fs = require('fs');
let content = fs.readFileSync('src/app/carrito/CartClient.tsx', 'utf8');

content = content.replace(/before:z-\\[-1\\] /g, '');
content = content.replace(/after:z-\\[-1\\] /g, '');

fs.writeFileSync('src/app/carrito/CartClient.tsx', content, 'utf8');
console.log('Removed z-[-1] to ensure borders are visible on top of backgrounds');
