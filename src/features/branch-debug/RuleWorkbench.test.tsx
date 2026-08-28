import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { missions } from '../../content/missions';
import { App } from '../../app/App';
import { DIAGNOSIS_LABELS } from '../../test/driveApp';

async function start(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: '학습 시작하기' }));
}

// 실제 학생 행동 순서를 검증한다 (계획 §12 Task 5).
describe('핵심 학습 화면 흐름', () => {
  it('예측 전에는 규칙 추적을 열 수 없다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await start(user);
    expect(screen.queryByRole('button', { name: '규칙 시험하기' })).not.toBeInTheDocument();
    expect(screen.getByText('1단계 · 예측판')).toBeInTheDocument();
  });

  it('예측 → 추적 공개 → 진단 순서로만 열리고, 오답 진단은 정답을 공개하지 않고 힌트를 준다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await start(user);

    await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' }));
    await user.click(screen.getByRole('button', { name: '예측 완료하기' }));
    expect(screen.getByText('2단계 · 규칙 추적판')).toBeInTheDocument();
    expect(screen.getAllByText('? 아직 시험 전')).toHaveLength(missions[0].rules.length);

    for (let i = 0; i < missions[0].rules.length; i += 1) {
      await user.click(screen.getByRole('button', { name: '규칙 시험하기' }));
    }
    // 밝기 2 사례는 갭이라 두 규칙 모두 실패로 표시된다.
    expect(screen.getAllByText('✗ 실패')).toHaveLength(missions[0].rules.length);
    await user.click(screen.getByRole('button', { name: '진단하러 가기' }));
    expect(screen.getByText('3단계 · 진단판')).toBeInTheDocument();
    expect(screen.queryByText('4단계 · 수리판')).not.toBeInTheDocument();

    // 오답: 밝기 2 사례는 갭이므로 "한 규칙"은 틀렸다.
    await user.click(screen.getByRole('radio', { name: DIAGNOSIS_LABELS.deterministic }));
    await user.click(screen.getByRole('button', { name: '진단 완료하기' }));
    expect(screen.getByText(/근거를 다시 세어 볼까요\?/)).toBeInTheDocument();
    expect(screen.getByText('3단계 · 진단판')).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: DIAGNOSIS_LABELS.gap }));
    await user.click(screen.getByRole('button', { name: '진단 완료하기' }));
    expect(screen.getByText('4단계 · 수리판')).toBeInTheDocument();
  });

  it('빗나간 수리 뒤 근거를 받고 다시 고쳐 통과하면 다음 미션이 열린다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await start(user);
    await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' }));
    await user.click(screen.getByRole('button', { name: '예측 완료하기' }));
    for (let i = 0; i < missions[0].rules.length; i += 1) {
      await user.click(screen.getByRole('button', { name: '규칙 시험하기' }));
    }
    await user.click(screen.getByRole('button', { name: '진단하러 가기' }));
    await user.click(screen.getByRole('radio', { name: DIAGNOSIS_LABELS.gap }));
    await user.click(screen.getByRole('button', { name: '진단 완료하기' }));

    // 빗나간 수리: 전등 켜기 규칙을 "보다 크다"로 바꾸면 갭이 더 커진다.
    await user.click(screen.getByRole('radio', { name: '조건 고치기 (연산자·기준값)' }));
    await user.click(screen.getByRole('radio', { name: '전등 켜기 규칙 — 밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '보다 크다(>)' }));
    await user.click(screen.getByRole('button', { name: '수정안 재시험' }));

    expect(screen.getByText('5단계 · 재시험판')).toBeInTheDocument();
    expect(screen.getByText(/아직 아무 규칙에도 당첨되지 않는 사례가 남았어요/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '다음 미션 열기' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '다시 고치기' }));
    expect(screen.getByText('4단계 · 수리판')).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: '조건 고치기 (연산자·기준값)' }));
    await user.click(screen.getByRole('radio', { name: '전등 켜기 규칙 — 밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '보다 작거나 같다(≤)' }));
    await user.click(screen.getByRole('button', { name: '수정안 재시험' }));

    expect(screen.getByText(/통과!/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '다음 미션 열기' }));
    expect(screen.getAllByText(new RegExp(missions[1].content.title)).length).toBeGreaterThan(0);
  });

  it('바뀐 내용이 없으면 재시험할 수 없다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await start(user);
    await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' }));
    await user.click(screen.getByRole('button', { name: '예측 완료하기' }));
    for (let i = 0; i < missions[0].rules.length; i += 1) {
      await user.click(screen.getByRole('button', { name: '규칙 시험하기' }));
    }
    await user.click(screen.getByRole('button', { name: '진단하러 가기' }));
    await user.click(screen.getByRole('radio', { name: DIAGNOSIS_LABELS.gap }));
    await user.click(screen.getByRole('button', { name: '진단 완료하기' }));

    await user.click(screen.getByRole('radio', { name: '조건 고치기 (연산자·기준값)' }));
    await user.click(screen.getByRole('radio', { name: '전등 켜기 규칙 — 밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '밝기: 2단계보다 작음' }));
    await user.click(screen.getByRole('radio', { name: '보다 작다(<)' }));
    const retest = screen.getByRole('button', { name: '수정안 재시험' });
    expect(retest).toBeDisabled();
    expect(screen.getByText(/바뀐 내용이 없어요/)).toBeInTheDocument();
  });
});
