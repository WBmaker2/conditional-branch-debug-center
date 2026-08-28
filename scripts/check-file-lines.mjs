import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// 계획 §8: TS·TSX·CSS 파일은 각각 500줄 미만이어야 한다.
const ROOTS = ['src', 'tests'];
const EXTS = new Set(['.ts', '.tsx', '.css']);
const LIMIT = 500;

const offenders = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!EXTS.has(entry.name.slice(entry.name.lastIndexOf('.')))) continue;
    const lines = readFileSync(fullPath, 'utf8').split('\n').length;
    if (lines >= LIMIT) offenders.push({ path: fullPath, lines });
  }
}

for (const root of ROOTS) {
  if (existsSync(root) && statSync(root).isDirectory()) walk(root);
}

if (offenders.length > 0) {
  for (const offender of offenders) {
    console.error(`${relative(process.cwd(), offender.path)}: ${offender.lines}줄 (500줄 미만 필요)`);
  }
  process.exit(1);
}
console.log('검사 통과: 모든 TS·TSX·CSS 파일이 500줄 미만입니다.');
