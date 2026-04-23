import fs from 'fs';
const c = fs.readFileSync('node_modules/hugeicons-react/dist/esm/hugeicons-react.js', 'utf8');
const files = fs.readdirSync('src/components');
files.forEach(f => {
  if (f.endsWith('.tsx')) {
    const t = fs.readFileSync('src/components/' + f, 'utf8');
    const m = t.match(/import\s+\{([^}]+)\}\s+from\s+["']hugeicons-react["']/m);
    if (m) {
      m[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean).forEach(i => {
        if (!c.includes('export { ' + i + ' }')) console.log(f + ': ' + i);
      });
    }
  }
});
