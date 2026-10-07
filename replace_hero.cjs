const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

const oldHero = \<section 
        className=\"w-full flex items-center box-border\" 
        style={{ 
          minHeight: '540px', 
          backgroundColor: '#f6f2ea',
          backgroundImage: \"url('/brand/fondo.png')\",
          backgroundSize: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '0 4rem'
        }}
      >\;

const newHero = \<section 
        className=\"w-full flex items-center box-border relative overflow-hidden\" 
        style={{ 
          minHeight: '540px', 
          backgroundColor: '#f6f2ea',
          padding: '0 4rem'
        }}
      >
        <Image 
          src=\"/brand/fondo.png\" 
          alt=\"Fondo Principal\" 
          fill 
          priority 
          className=\"object-cover object-center z-0\"
          quality={85}
        />\;

content = content.replace(oldHero, newHero);
fs.writeFileSync('src/app/HomeClient.tsx', content, 'utf8');
