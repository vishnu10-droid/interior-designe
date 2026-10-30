const fs = require('fs');
const path = 'd:/Aischolars/interior-designe/src/pages/About.jsx';
let content = fs.readFileSync(path, 'utf-8');

// Try to find and replace the address
const oldPatterns = [
  'desc="Shop No. 1, Block No. 4, Cloth Market, GG Hospital, Sanjay Palace, Sanjay Place, Civil Lines, Agra - 282002. Open 24 Hours."',
  'desc="Shop No. 1, Block No. 4, Cloth Market, GG Hospital, Sanjay Palace, Sanjay Place, Civil Lines, Agra – 282002. Open 24 Hours."',
];

let replaced = false;
for (const old of oldPatterns) {
  if (content.includes(old)) {
    const newDesc = 'desc="G-8, near ICICI bank, Sanjay Palace, Sanjay Place, Civil Lines, Agra - 282002. Open 24 Hours."';
    content = content.replace(old, newDesc);
    fs.writeFileSync(path, content, 'utf-8');
    console.log('Replaced using pattern:', old.substring(0, 40) + '...');
    replaced = true;
    break;
  }
}

if (!replaced) {
  // Show what's actually there
  const m = content.match(/desc="[^"]*?"/);
  if (m) {
    console.log('Current desc:', m[0].substring(0, 150));
  } else {
    console.log('No desc found');
  }
}