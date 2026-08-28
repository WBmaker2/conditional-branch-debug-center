import { describe, expect, it } from 'vitest';
import { missions } from '../content/missions';
import {
  createInitialSessionState,
  sessionReducer,
  type SessionAction,
  type SessionState,
} from './sessionReducer';

function drive(state: SessionState, ...actions: SessionAction[]): SessionState {
  return actions.reduce(sessionReducer, state);
}

function startSession(): SessionState {
  return drive(createInitialSessionState(), { type: 'START' });
}

// 현재 미션의 추적 단계까지 진행한다.
function toTrace(state: SessionState): SessionState {
  const ruleCount = missions[state.missionIndex].rules.length;
  return drive(
    state,
    { type: 'SET_PREDICTION', actionId: 'none' },
    { type: 'CONFIRM_PREDICTION' },
    ...Array.from({ length: ruleCount }, () => ({ type: 'REVEAL_NEXT_RULE' }) as SessionAction),
    { type: 'CONFIRM_TRACE' },
  );
}

function toRepair(state: SessionState): SessionState {
  return drive(state, { type: 'SET_DIAGNOSIS', diagnosis: 'gap' }, { type: 'CONFIRM_DIAGNOSIS' });
}

function firstRepairProposal(index: number) {
  return missions[index].repairs[0].proposal;
}

describe('세션 reducer 전이 잠금 (계획 §9)', () => {
  it('초기 상태는 INTRO이고 미션 인덱스는 0이다', () => {
    const state = createInitialSessionState();
    expect(state.step).toBe('INTRO');
    expect(state.missionIndex).toBe(0);
    expect(state.missions).toHaveLength(6);
  });

  it('START 후 예측 없이는 다음 단계로 갈 수 없다', () => {
    const state = startSession();
    expect(sessionReducer(state, { type: 'CONFIRM_PREDICTION' })).toBe(state);
  });

  it('알 수 없는 행동 ID를 고르면 상태가 바뀌지 않는다', () => {
    const state = startSession();
    expect(sessionReducer(state, { type: 'SET_PREDICTION', actionId: '없는-행동' })).toBe(state);
  });

  it('예측 → 추적(reveal 전부) → 진단 → 수리 순서만 통과한다', () => {
    const traced = toTrace(startSession());
    expect(traced.step).toBe('DIAGNOSE');
    // 모든 규칙을 공개하기 전에는 진단으로 못 넘어간다.
    const partial = drive(
      startSession(),
      { type: 'SET_PREDICTION', actionId: 'none' },
      { type: 'CONFIRM_PREDICTION' },
      { type: 'REVEAL_NEXT_RULE' },
    );
    expect(sessionReducer(partial, { type: 'CONFIRM_TRACE' })).toBe(partial);
    // 진단을 고르기 전에는 수리판으로 못 넘어간다.
    expect(sessionReducer(traced, { type: 'CONFIRM_DIAGNOSIS' })).toBe(traced);
  });

  it('판단 보류(invalid-input)는 학생 선택지가 아니어서 반영되지 않는다', () => {
    const state = toTrace(startSession());
    expect(sessionReducer(state, { type: 'SET_DIAGNOSIS', diagnosis: 'invalid-input' })).toBe(state);
  });

  it('수리 전에는 재시험을 실행할 수 없고, 승인 수리는 통과한다', () => {
    const traced = toTrace(startSession());
    expect(
      sessionReducer(traced, {
        type: 'RUN_RETEST',
        label: '아직 수리 전',
        proposal: firstRepairProposal(0),
      }),
    ).toBe(traced);
    const state = toRepair(toTrace(startSession()));
    const retested = sessionReducer(state, {
      type: 'RUN_RETEST',
      label: missions[0].repairs[0].label,
      proposal: firstRepairProposal(0),
    });
    expect(retested.step).toBe('RETEST');
    expect(retested.missions[0].evaluation?.accepted).toBe(true);
  });

  it('없는 규칙을 고치는 수정안은 상태를 바꾸지 않는다', () => {
    const state = toRepair(toTrace(startSession()));
    expect(
      sessionReducer(state, {
        type: 'RUN_RETEST',
        label: '잘못된 수리',
        proposal: { kind: 'edit', ruleId: '없는-규칙', clauses: [] },
      }),
    ).toBe(state);
  });

  it('결함 없음 통과는 noFixAllowed 미션에서만 허용된다', () => {
    const state = toRepair(toTrace(startSession()));
    expect(
      sessionReducer(state, {
        type: 'RUN_RETEST',
        label: '그대로 통과',
        proposal: { kind: 'none', ruleId: '-', clauses: [] },
      }),
    ).toBe(state);
  });

  it('통과한 재시험에서만 다음 미션이 열리고, 마지막엔 REPORT로 간다', () => {
    let state = startSession();
    for (let i = 0; i < missions.length; i += 1) {
      state = drive(
        state,
        { type: 'SET_PREDICTION', actionId: 'none' },
        { type: 'CONFIRM_PREDICTION' },
        ...Array.from(
          { length: missions[i].rules.length },
          () => ({ type: 'REVEAL_NEXT_RULE' }) as SessionAction,
        ),
        { type: 'CONFIRM_TRACE' },
        { type: 'SET_DIAGNOSIS', diagnosis: 'gap' },
        { type: 'CONFIRM_DIAGNOSIS' },
        { type: 'RUN_RETEST', label: missions[i].repairs[0].label, proposal: firstRepairProposal(i) },
        { type: 'ADVANCE' },
      );
      if (i < missions.length - 1) {
        expect(state.step).toBe('PREDICT');
        expect(state.missionIndex).toBe(i + 1);
      } else {
        expect(state.step).toBe('REPORT');
        expect(state.missionIndex).toBe(missions.length - 1);
      }
    }
    // COMPLETE 이후에는 답을 바꾸지 못한다.
    const locked = sessionReducer(state, { type: 'SET_PREDICTION', actionId: 'none' });
    expect(locked).toBe(state);
  });

  it('미통과 재시험에서는 ADVANCE가 막히고 RETRY_REPAIR로 돌아간다', () => {
    const state = toRepair(toTrace(startSession()));
    const failed = sessionReducer(state, {
      type: 'RUN_RETEST',
      label: '빗나간 수리',
      proposal: {
        kind: 'edit',
        ruleId: 'lamp-on',
        clauses: [{ id: 'lamp-on-brightness', field: 'brightness', operator: 'lt', expected: 1 }],
      },
    });
    expect(failed.step).toBe('RETEST');
    expect(failed.missions[0].evaluation?.accepted).toBe(false);
    expect(sessionReducer(failed, { type: 'ADVANCE' })).toBe(failed);
    const retrying = sessionReducer(failed, { type: 'RETRY_REPAIR' });
    expect(retrying.step).toBe('REPAIR');
    expect(retrying.missions[0].repair?.label).toBe('빗나간 수리');
  });

  it('뒤로 가기는 직전 단계의 응답을 보존한다', () => {
    const state = toRepair(toTrace(startSession()));
    const back = sessionReducer(state, { type: 'GO_BACK' });
    expect(back.step).toBe('DIAGNOSE');
    expect(back.missions[0].diagnosisChoice).toBe(state.missions[0].diagnosisChoice);
    expect(back.revision).toBe(state.revision + 1);
  });

  it('이전 revision을 넣은 응답은 상태를 바꾸지 않는다', () => {
    const state = startSession();
    const stale: SessionAction = { type: 'SET_PREDICTION', actionId: 'none', revision: state.revision - 1 };
    expect(sessionReducer(state, stale)).toBe(state);
  });

  it('정의되지 않은 action은 상태를 바꾸지 않는다', () => {
    const state = startSession();
    const unknown = { type: '없는-액션' } as unknown as SessionAction;
    expect(sessionReducer(state, unknown)).toBe(state);
  });

  it('재시작 확인 뒤 초기 상태를 새 객체로 만든다', () => {
    const state = toRepair(toTrace(startSession()));
    const requested = sessionReducer(state, { type: 'RESTART_REQUEST' });
    expect(requested.restartPending).toBe(true);
    const cancelled = sessionReducer(requested, { type: 'RESTART_CANCEL' });
    expect(cancelled.restartPending).toBe(false);
    const restarted = sessionReducer(requested, { type: 'RESTART_CONFIRMED' });
    expect(restarted).not.toBe(state);
    expect(restarted.step).toBe('INTRO');
    expect(restarted.missionIndex).toBe(0);
    expect(restarted.revision).toBe(0);
    expect(restarted.missions[0].prediction).toBeNull();
  });
});
