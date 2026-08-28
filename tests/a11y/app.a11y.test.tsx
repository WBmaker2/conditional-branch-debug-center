import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';
import { App } from '../../src/app/App';
import { driveToReport } from '../../src/test/driveApp';

// 계획 §12 Task 8: 자동 axe 검사에서 serious·critical 위반 0건을 요구한다.
function seriousOrCritical(results: AxeResults): AxeResults['violations'] {
  return results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
}

describe('자동 접근성 검사', () => {
  it('입구 화면에서 serious·critical 위반이 0건이다', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(seriousOrCritical(results)).toEqual([]);
  });

  it('예측판과 추적판에서 serious·critical 위반이 0건이다', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: '학습 시작하기' }));
    let results = await axe(container);
    expect(seriousOrCritical(results)).toEqual([]);

    await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' }));
    await user.click(screen.getByRole('button', { name: '예측 완료하기' }));
    await user.click(screen.getByRole('button', { name: '규칙 시험하기' }));
    results = await axe(container);
    expect(seriousOrCritical(results)).toEqual([]);
  });

  it('수리판과 재시험판에서 serious·critical 위반이 0건이다', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: '학습 시작하기' }));
    await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' }));
    await user.click(screen.getByRole('button', { name: '예측 완료하기' }));
    for (let i = 0; i < 2; i += 1) {
      await user.click(screen.getByRole('button', { name: '규칙 시험하기' }));
    }
    await user.click(screen.getByRole('button', { name: '진단하러 가기' }));
    await user.click(screen.getByRole('radio', { name: '어떤 규칙에도 맞지 않았어요 (갭)' }));
    await user.click(screen.getByRole('button', { name: '진단 완료하기' }));
    let results = await axe(container);
    expect(seriousOrCritical(results)).toEqual([]);

    await user.click(screen.getByRole('radio', { name: '조건 고치기 (연산자·기준값)' }));
    await user.click(screen.getByRole('radio', { name: '전등 켜기 규칙 — 밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '보다 작거나 같다(≤)' }));
    await user.click(screen.getByRole('button', { name: '수정안 재시험' }));
    results = await axe(container);
    expect(seriousOrCritical(results)).toEqual([]);
  });

  it('디버그 기록 화면에서 serious·critical 위반이 0건이다', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    await driveToReport(user);
    const results = await axe(container);
    expect(seriousOrCritical(results)).toEqual([]);
  });
});
