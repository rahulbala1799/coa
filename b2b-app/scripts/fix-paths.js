const fs = require('fs');
const path = require('path');

// Create the lib directory at the project root if it doesn't exist
const libDir = path.join(__dirname, '..', 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Read the prisma.ts file from src/lib
const prismaSrc = path.join(__dirname, '..', 'src', 'lib', 'prisma.ts');
const prismaDest = path.join(libDir, 'prisma.ts');

if (fs.existsSync(prismaSrc)) {
  fs.copyFileSync(prismaSrc, prismaDest);
  console.log('Copied prisma.ts to /lib');
}

// Read the auth.ts file from src/lib
const authSrc = path.join(__dirname, '..', 'src', 'lib', 'auth.ts');
const authDest = path.join(libDir, 'auth.ts');

if (fs.existsSync(authSrc)) {
  fs.copyFileSync(authSrc, authDest);
  console.log('Copied auth.ts to /lib');
}

console.log('Files copied successfully for Vercel build') 