import fs from 'fs';
const t = fs.readFileSync('src/components/DashboardPage.tsx', 'utf8');
const c = fs.readFileSync('node_modules/hugeicons-react/dist/esm/hugeicons-react.js', 'utf8');
const m = t.match(/import\s+\{([^}]+)\}\s+from\s+["']hugeicons-react["']/);
if (m) {
  const imports = m[1].split(',').map(s => s.trim().split(/\s+as\s+/)[0]).filter(Boolean);
  console.log(`Found ${imports.length} imports in DashboardPage`);
  imports.forEach(i => {
    if (!c.includes('export { ' + i + ' }')) console.log('MISSING: ' + i);
  });
} else {
  console.log('No imports found');
}
