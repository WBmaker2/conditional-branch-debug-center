import { expect, test, type Page } from '@playwright/test';

// 계획 §12 Task 8: 320px·375px에서 가로 넘침 없이, 축소 모션에서는 정적 필수 배지로.
async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const sizes = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(sizes.scrollWidth, `scrollWidth ${sizes.scrollWidth} > clientWidth ${sizes.clientWidth}`).toBeLessThanOrEqual(
    sizes.clientWidth,
  );
}

for (const viewport of [
  { width: 320, height: 568 },
  { width: 375, height: 812 },
]) {
  test(`${viewport.width}×${viewport.height}: 주요 화면에서 가로 넘침이 없다`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('./');
    await expectNoHorizontalOverflow(page);

    await page.getByRole('button', { name: '학습 시작하기' }).click();
    await expect(page.getByText('1단계 · 예측판')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.getByRole('radio', { name: '아무 일도 일어나지 않아요' }).click();
    await page.getByRole('button', { name: '예측 완료하기' }).click();
    for (let i = 0; i < 2; i += 1) {
      await page.getByRole('button', { name: '규칙 시험하기' }).click();
    }
    await expectNoHorizontalOverflow(page);

    await page.getByRole('button', { name: '진단하러 가기' }).click();
    await page.getByRole('radio', { name: /갭/ }).click();
    await page.getByRole('button', { name: '진단 완료하기' }).click();
    await page.getByRole('radio', { name: /조건 고치기/ }).click();
    await page.getByRole('radio', { name: /전등 켜기 규칙/ }).click();
    await page.getByRole('radio', { name: '밝기: 2단계보다 작음', exact: true }).click();
    await page.getByRole('radio', { name: '보다 작거나 같다(≤)', exact: true }).click();
    await page.getByRole('button', { name: '수정안 재시험' }).click();
    await expect(page.getByText('5단계 · 재시험판')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });
}

test('축소 모션에서 gi-pulse가 animation none + 3px 외곽선·필수 배지가 된다', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('./');
  await page.getByRole('button', { name: '학습 시작하기' }).click();
  await page.getByRole('radio', { name: '아무 일도 일어나지 않아요' }).click();
  await page.getByRole('button', { name: '예측 완료하기' }).click();

  const pulse = page.getByRole('button', { name: '규칙 시험하기' });
  await expect(pulse).toBeVisible();
  const styles = await pulse.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      animationName: computed.animationName,
      outlineStyle: computed.outlineStyle,
      outlineWidth: computed.outlineWidth,
    };
  });
  expect(styles.animationName).toBe('none');
  expect(styles.outlineStyle).toBe('solid');
  expect(Number.parseFloat(styles.outlineWidth)).toBe(3);
  await expect(pulse.locator('.btn__must-badge')).toHaveText('필수');
});
