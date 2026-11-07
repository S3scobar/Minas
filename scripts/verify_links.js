const fs = require('fs');
const htmls = ['index.html', 'malla.html', 'info.html', 'convenios.html', 'intercampus.html'];

let errors = 0;
htmls.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  console.log('Checking ' + file + '...');
  const hrefMatches = content.match(/href="([^"]+)"/g) || [];
  const srcMatches = content.match(/src="([^"]+)"/g) || [];

  const refs = [
    ...hrefMatches.map(m => m.slice(6, -1)),
    ...srcMatches.map(m => m.slice(5, -1))
  ];

  refs.forEach(ref => {
    if (ref.startsWith('http') || ref.startsWith('#') || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('data:')) return;
    const clean = ref.split('?')[0].split('#')[0];
    if (clean && !fs.existsSync(clean)) {
      console.error('  [MISSING]', clean, 'referenced in', file);
      errors++;
    }
  });
});

console.log('Total missing references:', errors);
