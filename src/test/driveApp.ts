import { screen } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import { missions } from '../content/missions';
import { runRuleSet } from '../domain/branchEvaluator';

// 컴포넌트·접근성·개인정보 테스트가 실제 학생 행동 순서로 앱을 조작하게 돕는다.
export const PREDICTION_LABELS: readonly string[] = [
  '아무 일도 일어나지 않아요',
  '기다리기',
  '아무 일도 일어나지 않아요',
  '아무 일도 일어나지 않아요',
  '아무 일도 일어나지 않아요',
  '전부 탑승',
];

type ChoosableDiagnosis = 'gap' | 'overlap' | 'deterministic';

export const DIAGNOSIS_LABELS: Record<ChoosableDiagnosis, string> = {
  gap: '어떤 규칙에도 맞지 않았어요 (갭)',
  overlap: '두 개 이상의 규칙에 동시에 맞았어요 (겹침)',
  deterministic: '딱 한 규칙에만 맞았어요',
};

export interface RepairScript {
  readonly mode: string;
  readonly rule?: string;
  readonly clause?: string;
  readonly operator?: string;
  readonly value?: string;
  readonly extra?: string;
}

export const REPAIR_SCRIPTS: readonly RepairScript[] = [
  {
    mode: '조건 고치기 (연산자·기준값)',
    rule: '전등 켜기 규칙 — 밝기: 2단계보다 작음',
    clause: '밝기: 2단계보다 작음',
    operator: '보다 작거나 같다(≤)',
  },
  {
    mode: '실행 순서 정하기 (우선순위)',
    rule: '기다리기 규칙 — 비 예보: 예',
  },
  {
    mode: '조건 고치기 (연산자·기준값)',
    rule: '선풍기 켜기 규칙 — 온도: 25도보다 큼',
    clause: '온도: 25도보다 큼',
    operator: '보다 크거나 같다(≥)',
  },
  {
    mode: '조건 고치기 (연산자·기준값)',
    rule: '반납 알림 보내기 규칙 — 반납 여부: 아직 안 함 그리고 반납 기한: -1일보다 작거나 같음',
    clause: '반납 기한: -1일보다 작거나 같음',
    operator: '보다 작거나 같다(≤)',
    value: '기준값: 당일',
  },
  {
    mode: '조건 추가하기',
    rule: '종이 통으로 보내기 규칙 — 재질: 종이 (같음)',
    extra: '오염 상태: 깨끗함',
  },
  {
    mode: '결함 없음(그대로 통과)',
  },
];

export function correctDiagnosis(index: number): ChoosableDiagnosis {
  const mission = missions[index];
  const focus = mission.finiteDomain.find((c) => c.id === mission.content.focusInputId);
  if (!focus) throw new Error(`focus 사례 없음: ${mission.id}`);
  return runRuleSet(mission, focus).diagnosis as ChoosableDiagnosis;
}

export async function playMission(user: UserEvent, index: number): Promise<void> {
  await user.click(screen.getByRole('radio', { name: PREDICTION_LABELS[index] }));
  await user.click(screen.getByRole('button', { name: '예측 완료하기' }));

  for (let i = 0; i < missions[index].rules.length; i += 1) {
    await user.click(screen.getByRole('button', { name: '규칙 시험하기' }));
  }
  await user.click(screen.getByRole('button', { name: '진단하러 가기' }));

  await user.click(screen.getByRole('radio', { name: DIAGNOSIS_LABELS[correctDiagnosis(index)] }));
  await user.click(screen.getByRole('button', { name: '진단 완료하기' }));

  const script = REPAIR_SCRIPTS[index];
  await user.click(screen.getByRole('radio', { name: script.mode }));
  if (script.rule) await user.click(screen.getByRole('radio', { name: script.rule }));
  if (script.clause) await user.click(screen.getByRole('radio', { name: script.clause }));
  if (script.operator) {
    await user.click(screen.getByRole('radio', { name: script.operator }));
  }
  if (script.value) {
    await user.click(screen.getByRole('radio', { name: script.value }));
  }
  if (script.extra) await user.click(screen.getByRole('radio', { name: script.extra }));
  await user.click(screen.getByRole('button', { name: '수정안 재시험' }));

  await user.click(screen.getByRole('button', { name: /다음 미션 열기|디버그 기록 보기/ }));
}

export async function driveToReport(user: UserEvent): Promise<void> {
  await user.click(screen.getByRole('button', { name: '학습 시작하기' }));
  for (let i = 0; i < missions.length; i += 1) {
    await playMission(user, i);
  }
}
