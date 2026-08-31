import { expect, test, type Locator, type Page } from '@playwright/test';

// 계획 §12 Task 8: 키보드만으로 규칙 행, 연산자, 재시험 버튼을 조작한다.
// 라디오 그룹은 Tab으로 진입해 표준 화살표·Space 상호작용을 쓴다.
async function tabUntilFocused(page: Page, target: Locator, maxTabs = 40): Promise<void> {
  for (let i = 0; i < maxTabs; i += 1) {
    if (await target.evaluate((element) => element === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  throw new Error('Tab으로 대상에 도달하지 못했다');
}

async function selectGroupRadio(page: Page, firstRadio: Locator, arrowDowns: number): Promise<void> {
  await tabUntilFocused(page, firstRadio);
  for (let i = 0; i < arrowDowns; i += 1) {
    await page.keyboard.press('ArrowDown');
  }
  await page.keyboard.press('Space');
}

async function pressWhenFocused(page: Page, target: Locator, key: string): Promise<void> {
  await tabUntilFocused(page, target);
  await page.keyboard.press(key);
}

test('키보드만으로 안내 미션을 완주한다', async ({ page }) => {
  await page.goto('./');

  await pressWhenFocused(page, page.getByRole('button', { name: '학습 시작하기' }), 'Enter');

  // 예측: 첫 라디오(전등 켜기)에서 두 칸 내려가 '아무 일도 일어나지 않아요'를 고른다.
  await selectGroupRadio(page, page.getByRole('radio', { name: '전등 켜기' }), 2);
  await pressWhenFocused(page, page.getByRole('button', { name: '예측 완료하기' }), 'Enter');

  // 규칙 추적: 규칙 시험하기 ×2 → 진단하러 가기.
  for (let i = 0; i < 2; i += 1) {
    await pressWhenFocused(page, page.getByRole('button', { name: '규칙 시험하기' }), 'Enter');
  }
  await pressWhenFocused(page, page.getByRole('button', { name: '진단하러 가기' }), 'Enter');

  // 진단: 갭(첫 선택지)을 Space로 고르고 진단 완료하기.
  await selectGroupRadio(page, page.getByRole('radio', { name: /갭/ }), 0);
  await pressWhenFocused(page, page.getByRole('button', { name: '진단 완료하기' }), 'Enter');

  // 수리: 모드 → 규칙 → 조건 → 연산자(첫 후보에서 한 칸 내려가 ≤ 선택).
  await selectGroupRadio(page, page.getByRole('radio', { name: /조건 고치기/ }), 0);
  await selectGroupRadio(page, page.getByRole('radio', { name: /전등 켜기 규칙/ }), 0);
  await selectGroupRadio(page, page.getByRole('radio', { name: '밝기: 2단계보다 작음', exact: true }), 0);
  await selectGroupRadio(page, page.getByRole('radio', { name: '보다 작다(<)', exact: true }), 1);

  const retest = page.getByRole('button', { name: '수정안 재시험' });
  await expect(retest).toBeEnabled();
  await pressWhenFocused(page, retest, 'Enter');

  // 재시험 통과 → 다음 미션.
  await pressWhenFocused(page, page.getByRole('button', { name: '다음 미션 열기' }), 'Enter');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/2번 미션/);
});
