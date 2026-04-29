const fs = require('fs');
const path = require('path');

const env = { ...process.env };

const envFile = path.resolve(__dirname, '../.env');
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf-8')
    .split('\n')
    .forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length && !env[key.trim()]) {
        env[key.trim()] = rest.join('=').trim();
      }
    });
}

const envDir = path.resolve(__dirname, '../src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const content = (production) => `export const environment = {
  production: ${production},
  supabaseUrl: '${env.SUPABASE_URL ?? ''}',
  supabaseKey: '${env.SUPABASE_KEY ?? ''}',
};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/environments/environment.ts'), content(true));
fs.writeFileSync(path.resolve(__dirname, '../src/environments/environment.development.ts'), content(false));

console.log('environment files generated.');
