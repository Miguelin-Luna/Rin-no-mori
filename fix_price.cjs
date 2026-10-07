const fs = require('fs');
let content = fs.readFileSync('src/app/carrito/CartClient.tsx', 'utf8');

// Replace the variable declarations
content = content.replace(
  /let imageSrc = "\\/brand\\/2\\.png";\\s*let title = "Caja de Regalo";\\s*let desc = "";\\s*let details = null;/g,
  'let imageSrc = "/brand/2.png";\n                let title = "Caja de Regalo";\n                let desc = "";\n                let details = null;\n                let itemPrice = 0;'
);

// Replace gift_box logic
content = content.replace(
  /desc = \\$\\\$\\{item\\.price\\.toFixed\\(2\\)\\}[^]+;/g,
  'itemPrice = item.price;\n                  desc = $ •  galletas • ;'
);

// Replace product logic
content = content.replace(
  /desc = \\$\\\$\\{item\\.product\\.price\\.toFixed\\(2\\)\\};/g,
  'itemPrice = item.product.price;\n                  desc = $;'
);

// Replace subtotal calculation
content = content.replace(
  /\\$\\{\\(item\\.price \\* item\\.quantity\\)\\.toFixed\\(2\\)\\}/g,
  ''
);

fs.writeFileSync('src/app/carrito/CartClient.tsx', content, 'utf8');
console.log('Price fix applied');
