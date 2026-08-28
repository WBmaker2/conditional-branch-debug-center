import { expect, test, type Page } from '@playwright/test';

// 계획 §12 Task 8: Pages 하위 경로에서 page.goto('./')로 진입한다.
const RULE_COUNTS = [2, 3, 2, 3, 3, 4];
const PREDICTIONS = [
  '아무 일도 일어나지 않아요',
  '기다리기',
  '아무 일도 일어나지 않아요',
  '아무 일도 일어나지 않아요',
  '아무 일도 일어나지 않아요',
  '전부 탑승',
];
const DIAGNOSES = ['갭', '겹침', '갭', '갭', '겹침', '한 규칙'];
const MODES = ['조건 고치기', '실행 순서 정하기', '조건 고치기', '조건 고치기', '조건 추가하기', '결함 없음'];
const RULES = ['전등 켜기 규칙', '기다리기 규칙', '선풍기 켜기 규칙', '반납 알림 보내기 규칙', '종이 통으로 보내기 규칙', ''];
const CLAUSES = ['밝기: 2단계보다 작음', '', '온도: 25도보다 큼', '반납 기한: -1일보다 작거나 같음', '', ''];
const OPERATORS = ['보다 작거나 같다(≤)', '', '보다 크거나 같다(≥)', '보다 작거나 같다(≤)', '', ''];
const VALUES = ['', '', '', '기준값: 당일', '', ''];
const EXTRAS = ['', '', '', '', '오염 상태: 깨끗함', ''];

async function playMission(page: Page, index: number): Promise<void> {
  await page.getByRole('radio', { name: PREDICTIONS[index] }).click();
  await page.getByRole('button', { name: '예측 완료하기' }).click();
  for (let i = 0; i < RULE_COUNTS[index]; i += 1) {
    await page.getByRole('button', { name: '규칙 시험하기' }).click();
  }
  await page.getByRole('button', { name: '진단하러 가기' }).click();
  await page.getByRole('radio', { name: new RegExp(DIAGNOSES[index]) }).click();
  await page.getByRole('button', { name: '진단 완료하기' }).click();
  await page.getByRole('radio', { name: new RegExp(MODES[index]) }).click();
  if (RULES[index]) await page.getByRole('radio', { name: new RegExp(RULES[index]) }).click();
  if (CLAUSES[index]) await page.getByRole('radio', { name: CLAUSES[index], exact: true }).click();
  if (OPERATORS[index]) await page.getByRole('radio', { name: OPERATORS[index] }).click();
  if (VALUES[index]) await page.getByRole('radio', { name: VALUES[index] }).click();
  if (EXTRAS[index]) await page.getByRole('radio', { name: EXTRAS[index], exact: true }).click();
  await page.getByRole('button', { name: '수정안 재시험' }).click();
  await expect(page.getByText(/통과!/)).toBeVisible();
  await page.getByRole('button', { name: /다음 미션 열기|디버그 기록 보기/ }).click();
}

test('안내 갭 미션에서 빠진 조건을 찾고 최소 수정 뒤 재시험한다', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/조건 분기 디버그 센터/);
  await expect(page.getByText(/저장하거나 보내지 않아요/)).toBeVisible();
  await page.getByRole('button', { name: '학습 시작하기' }).click();
  await expect(page.getByText('밝기: 2단계')).toBeVisible();
  await playMission(page, 0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/2번 미션/);
});

test('여섯 미션을 모두 마치면 최초 판단과 수정 근거가 기록된다', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: '학습 시작하기' }).click();
  for (let i = 0; i < 6; i += 1) {
    await playMission(page, i);
  }
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('디버그 기록');
  for (const title of [
    '가상 전등 밝기 조절소',
    '화분 물 주기 검사소',
    '교실 선풍기 경계점 관측소',
    '도서 반납 알림 국',
    '재질 분류기 점검실',
    '셔틀 버스 배차 검증소',
  ]) {
    await expect(page.getByText(new RegExp(title))).toBeVisible();
  }
  await expect(page.getByText(/점수|순위|등급/)).toHaveCount(0);
  await expect(page.getByText(/새로고침하면 이 기록은 사라져요/)).toBeVisible();
});

test('겹침 미션은 조건 추가 해법으로도 통과한다', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: '학습 시작하기' }).click();
  await playMission(page, 0);
  // 미션 2(화분)를 조건 추가 해법으로 푼다.
  await page.getByRole('radio', { name: '기다리기' }).click();
  await page.getByRole('button', { name: '예측 완료하기' }).click();
  for (let i = 0; i < RULE_COUNTS[1]; i += 1) {
    await page.getByRole('button', { name: '규칙 시험하기' }).click();
  }
  await page.getByRole('button', { name: '진단하러 가기' }).click();
  await page.getByRole('radio', { name: /겹침/ }).click();
  await page.getByRole('button', { name: '진단 완료하기' }).click();
  await page.getByRole('radio', { name: /조건 추가하기/ }).click();
  await page.getByRole('radio', { name: /물 주기 규칙/ }).click();
  await page.getByRole('radio', { name: '비 예보: 아니오', exact: true }).click();
  await page.getByRole('button', { name: '수정안 재시험' }).click();
  await expect(page.getByText(/통과!/)).toBeVisible();
  await page.getByRole('button', { name: '다음 미션 열기' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/3번 미션/);
});
