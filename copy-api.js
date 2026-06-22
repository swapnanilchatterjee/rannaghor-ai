import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  if (fs.existsSync('api')) {
    copyDir('api', 'dist/api');
    console.log('Successfully copied api directory to dist/api');
  } else {
    console.warn('api directory does not exist');
  }
} catch (err) {
  console.error('Error copying api directory:', err);
}
