import { copyFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const src = join(homedir(), '.gemini', 'antigravity', 'brain', '50ca184e-b810-48c2-a020-e9c2371acee9', 'media__1774581202056.png');
const dest = join(import.meta.dirname, 'client', 'public', 'tutor-banner.png');

copyFileSync(src, dest);
console.log('Copied:', dest);
