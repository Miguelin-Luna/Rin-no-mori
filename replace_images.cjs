const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

content = content.replace(/<img\s+src="https:\/\/lh3\.googleusercontent\.com[^>]+\/>/g, (match) => {
  return match.replace('<img', '<Image fill sizes="(max-width: 768px) 100vw, 50vw"');
});

content = content.replace(/className="h-44 rounded-xl overflow-hidden bg-beige"/g, 'className="h-44 rounded-xl overflow-hidden bg-beige relative"');

fs.writeFileSync('src/app/HomeClient.tsx', content, 'utf8');
console.log('Done');
