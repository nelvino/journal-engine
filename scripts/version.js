const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let version;
try {
  version = execSync('git rev-parse HEAD').toString().trim();
} catch {
  version = Date.now().toString();
}

const out = path.join(__dirname, '..', 'public', 'version.json');
fs.writeFileSync(out, JSON.stringify({ version, timestamp: Date.now() }));
console.log(`Wrote ${out} (${version.slice(0, 7)})`);
