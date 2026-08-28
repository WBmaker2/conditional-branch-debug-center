import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();

function listFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(full));
    else files.push(full);
  }
  return files;
}

describe('릴리스 자산 검사 (계획 §12 Task 7·9)', () => {
  it('vite production base가 /conditional-branch-debug-center/로 고정된다', () => {
    const config = readFileSync(join(ROOT, 'vite.config.ts'), 'utf8');
    expect(config).toContain("'/conditional-branch-debug-center/'");
  });

  it('playwright baseURL이 같은 하위 경로를 쓴다', () => {
    const config = readFileSync(join(ROOT, 'playwright.config.ts'), 'utf8');
    expect(config).toContain("'/conditional-branch-debug-center/'");
  });

  it('favicon이 있고 index.html이 한국어·제목·아이콘을 선언한다', () => {
    expect(existsSync(join(ROOT, 'public', 'favicon.svg'))).toBe(true);
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
    expect(html).toContain('lang="ko"');
    expect(html).toContain('<title>조건 분기 디버그 센터</title>');
    expect(html).toContain('rel="icon"');
  });

  it('src/assets의 모든 자산이 권리 장부에 1:1로 기록된다', () => {
    const ledger = readFileSync(join(ROOT, 'docs', 'image-rights-ledger.md'), 'utf8');
    const assets = listFiles(join(ROOT, 'src', 'assets')).map((path) =>
      path.slice(path.indexOf('src/assets')),
    );
    expect(assets.length).toBeGreaterThan(0);
    for (const asset of assets) {
      expect(ledger.includes(asset), `권리 장부에 없는 자산: ${asset}`).toBe(true);
    }
  });

  it('gi-pulse는 축소 모션에서 animation none + 3px 외곽선으로 대체된다', () => {
    const motion = readFileSync(join(ROOT, 'src', 'styles', 'motion.css'), 'utf8');
    expect(motion).toContain('.gi-pulse');
    expect(motion).toContain('@media (prefers-reduced-motion: reduce)');
    expect(motion).toMatch(/\.gi-pulse\s*\{\s*animation:\s*none;\s*outline:\s*3px/);
    expect(motion).toMatch(/html\.reduce-motion \.gi-pulse\s*\{\s*animation:\s*none;\s*outline:\s*3px/);
  });

  it('dist 결과물이 하위 경로 base와 해시 자산으로 빌드된다', () => {
    const distIndex = join(ROOT, 'dist', 'index.html');
    if (!existsSync(distIndex)) {
      console.warn('dist가 없어 빌드 결과 검사를 건너뛴다. npm run build 뒤 다시 실행하세요.');
      return;
    }
    const html = readFileSync(distIndex, 'utf8');
    expect(html).toContain('/conditional-branch-debug-center/');
    expect(html).toMatch(/assets\/[^"]+-[A-Za-z0-9_-]{8}\.(?:js|css)/);
    expect(html).toContain('조건 분기 디버그 센터');
  });
});
