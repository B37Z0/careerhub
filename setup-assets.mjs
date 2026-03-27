// Run with: node setup-assets.mjs
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const conversationId = '50ca184e-b810-48c2-a020-e9c2371acee9';
const appDataDir = join(homedir(), '.gemini', 'antigravity', 'brain', conversationId);

const assets = [
  {
    src: join(appDataDir, 'media__1774581202056.png'),
    dest: join(import.meta.dirname, 'client', 'public', 'tutor-banner.png'),
  },
];

for (const { src, dest } of assets) {
  if (existsSync(src)) {
    copyFileSync(src, dest);
    console.log('✓ Copied:', dest);
  } else {
    console.warn('✗ Source not found:', src);
  }
}
