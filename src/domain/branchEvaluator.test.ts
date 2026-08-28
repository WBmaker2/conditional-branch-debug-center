import { describe, expect, it } from 'vitest';
import { missions, missionById } from '../content/missions';
import {
  analyzeCoverage,
  applyRepair,
  evaluateClause,
  evaluateRepair,
  runRuleSet,
} from './branchEvaluator';
import type { BranchMission, InputCase, LearningMission } from './types';

function caseOf(mission: BranchMission, inputId: string): InputCase {
  const found = mission.finiteDomain.find((c) => c.id === inputId);
  if (!found) throw new Error(`사례 없음: ${inputId}`);
  return found;
}

function lamp(): LearningMission {
  return missionById('branch-lamp-01');
}

describe('evaluateClause', () => {
  const input: InputCase = { id: 't', values: { brightness: 2, rain: false, seats: 3, waiting: 4 } };

  it('경계값에서 lt와 lte가 다른 결과를 낸다', () => {
    const lt = { id: 'c', field: 'brightness', operator: 'lt' as const, expected: 2 };
    const lte = { id: 'c', field: 'brightness', operator: 'lte' as const, expected: 2 };
    expect(evaluateClause(lt, input)).toBe(false);
    expect(evaluateClause(lte, input)).toBe(true);
  });

  it('경계값에서 gt와 gte가 다른 결과를 낸다', () => {
    const gt = { id: 'c', field: 'brightness', operator: 'gt' as const, expected: 2 };
    const gte = { id: 'c', field: 'brightness', operator: 'gte' as const, expected: 2 };
    expect(evaluateClause(gt, input)).toBe(false);
    expect(evaluateClause(gte, input)).toBe(true);
  });

  it('eq는 불리언과 문자열을 비교한다', () => {
    expect(
      evaluateClause({ id: 'c', field: 'rain', operator: 'eq', expected: false }, input),
    ).toBe(true);
    expect(
      evaluateClause({ id: 'c', field: 'rain', operator: 'eq', expected: true }, input),
    ).toBe(false);
  });

  it('FieldReference는 숫자를 복사하지 않고 다른 필드와 비교한다', () => {
    const seatsAtLeastWaiting = {
      id: 'c',
      field: 'seats',
      operator: 'gte' as const,
      expected: { fieldRef: 'waiting' },
    };
    expect(evaluateClause(seatsAtLeastWaiting, input)).toBe(false);
  });

  it('없는 필드는 invalid-input을 반환한다', () => {
    const clause = { id: 'c', field: '없는필드', operator: 'lt' as const, expected: 1 };
    expect(evaluateClause(clause, input)).toBe('invalid-input');
  });

  it('fieldRef가 없는 필드를 가리키면 invalid-input을 반환한다', () => {
    const clause = {
      id: 'c',
      field: 'seats',
      operator: 'gte' as const,
      expected: { fieldRef: '없는필드' },
    };
    expect(evaluateClause(clause, input)).toBe('invalid-input');
  });

  it('지원하지 않는 연산자는 invalid-input을 반환한다', () => {
    const clause = { id: 'c', field: 'brightness', operator: 'ne' as never, expected: 1 };
    expect(evaluateClause(clause, input)).toBe('invalid-input');
  });

  it('숫자와 불리언을 직접 비교하면 invalid-input을 반환한다', () => {
    const clause = { id: 'c', field: 'brightness', operator: 'eq' as const, expected: true };
    expect(evaluateClause(clause, input)).toBe('invalid-input');
  });

  it('크기 비교에 불리언을 쓰면 invalid-input을 반환한다', () => {
    const clause = { id: 'c', field: 'rain', operator: 'lt' as const, expected: 1 };
    expect(evaluateClause(clause, input)).toBe('invalid-input');
  });
});

describe('runRuleSet · analyzeCoverage (여섯 미션 기대 결과 재현)', () => {
  it('branch-lamp-01: 밝기 2가 갭이고 나머지는 판정된다', () => {
    const mission = lamp();
    expect(runRuleSet(mission, caseOf(mission, 'lamp-b2')).diagnosis).toBe('gap');
    expect(runRuleSet(mission, caseOf(mission, 'lamp-b1'))).toMatchObject({
      matchingRuleIds: ['lamp-on'],
      actionId: 'lamp-on',
      diagnosis: 'deterministic',
    });
    expect(runRuleSet(mission, caseOf(mission, 'lamp-b3')).actionId).toBe('lamp-off');
    expect(analyzeCoverage(mission).filter((r) => r.diagnosis === 'gap')).toHaveLength(1);
  });

  it('branch-plant-02: (촉촉함1, 비 예보 예)가 겹침이고 나머지는 판정된다', () => {
    const mission = missionById('branch-plant-02');
    const overlap = runRuleSet(mission, caseOf(mission, 'plant-m1-r1'));
    expect(overlap.diagnosis).toBe('overlap');
    expect(overlap.matchingRuleIds).toEqual(['water', 'wait']);
    expect(overlap.actionId).toBeNull();
    expect(runRuleSet(mission, caseOf(mission, 'plant-m3-r0')).actionId).toBe('skip');
    expect(analyzeCoverage(mission).filter((r) => r.diagnosis === 'overlap')).toHaveLength(1);
  });

  it('branch-plant-02: 우선순위가 있으면 승자를 반환해도 겹침 진단을 숨기지 않는다', () => {
    const mission = missionById('branch-plant-02');
    const waitPriority: LearningMission = {
      ...mission,
      rules: mission.rules.map((r) => (r.id === 'wait' ? { ...r, priority: 1 } : r)),
    };
    const run = runRuleSet(waitPriority, caseOf(mission, 'plant-m1-r1'));
    expect(run.actionId).toBe('wait');
    expect(run.diagnosis).toBe('overlap');
    expect(run.matchingRuleIds).toEqual(['water', 'wait']);
  });

  it('branch-fan-03: 25도가 갭이고 24·30은 판정된다', () => {
    const mission = missionById('branch-fan-03');
    expect(runRuleSet(mission, caseOf(mission, 'fan-t25')).diagnosis).toBe('gap');
    expect(runRuleSet(mission, caseOf(mission, 'fan-t24')).actionId).toBe('fan-off');
    expect(runRuleSet(mission, caseOf(mission, 'fan-t30')).actionId).toBe('fan-on');
    expect(runRuleSet(mission, caseOf(mission, 'fan-t20')).actionId).toBe('fan-off');
  });

  it('branch-library-04: 미반납 당일이 갭이고 나머지는 판정된다', () => {
    const mission = missionById('branch-library-04');
    expect(runRuleSet(mission, caseOf(mission, 'library-r0-d0')).diagnosis).toBe('gap');
    expect(runRuleSet(mission, caseOf(mission, 'library-r1-d0')).actionId).toBe('no-notice');
    expect(runRuleSet(mission, caseOf(mission, 'library-r0-d-1')).actionId).toBe('remind');
    expect(runRuleSet(mission, caseOf(mission, 'library-r0-d1')).actionId).toBe('overdue');
  });

  it('branch-sorter-05: (종이, 더러움)이 겹침이고 나머지는 판정된다', () => {
    const mission = missionById('branch-sorter-05');
    expect(runRuleSet(mission, caseOf(mission, 'sort-paper-dirty')).diagnosis).toBe('overlap');
    expect(runRuleSet(mission, caseOf(mission, 'sort-paper-clean')).actionId).toBe('paper-bin');
    expect(runRuleSet(mission, caseOf(mission, 'sort-plastic-clean')).actionId).toBe('plastic-bin');
    expect(runRuleSet(mission, caseOf(mission, 'sort-plastic-dirty')).actionId).toBe('check-first');
  });

  it('branch-bus-06: 여섯 입력이 정확히 한 번씩 덮인다', () => {
    const mission = missionById('branch-bus-06');
    const expected: Record<string, string> = {
      'bus-s0-w0': 'idle',
      'bus-s0-w1': 'wait',
      'bus-s1-w0': 'idle',
      'bus-s1-w1': 'board-all',
      'bus-s3-w1': 'board-all',
      'bus-s3-w4': 'board-part',
    };
    for (const run of analyzeCoverage(mission)) {
      expect(run.diagnosis, run.inputId).toBe('deterministic');
      expect(run.actionId, run.inputId).toBe(expected[run.inputId]);
    }
  });

  it('모든 미션의 시작 규칙에서 invalid-input은 없다', () => {
    for (const mission of missions) {
      expect(analyzeCoverage(mission).some((r) => r.diagnosis === 'invalid-input')).toBe(false);
    }
  });
});

describe('evaluateRepair · applyRepair (최소 수정 계약)', () => {
  it('branch-lamp-01: 연산자 한 곳 수정(<=2)이 받아들여지고 갭이 사라진다', () => {
    const mission = lamp();
    const [repair] = mission.repairs;
    const evaluation = evaluateRepair(mission, repair.proposal);
    expect(evaluation.accepted).toBe(true);
    expect(evaluation.changedClauseIds).toEqual(['lamp-on-brightness']);
    expect(evaluation.runs.every((r) => r.diagnosis === 'deterministic')).toBe(true);
    expect(evaluation.evidenceKeys).toContain('change:minimal');
  });

  it('branch-lamp-01: 규칙 두 곳을 바꾸면 최소 수정이 아니라서 거부된다', () => {
    const mission = lamp();
    const evaluation = evaluateRepair(mission, {
      kind: 'edit',
      ruleId: 'lamp-on',
      clauses: [
        { id: 'lamp-on-brightness', field: 'brightness', operator: 'lte', expected: 2 },
      ],
      priority: 1,
    });
    expect(evaluation.accepted).toBe(false);
    expect(evaluation.evidenceKeys).toContain('change:not-minimal');
  });

  it('branch-plant-02: 물 주기 규칙에 rain=false 절 추가는 통과하고, 우선순위 해법은 겹침을 남긴 채 통과한다', () => {
    const mission = missionById('branch-plant-02');
    const addClause = evaluateRepair(mission, mission.repairs[0].proposal);
    expect(addClause.accepted).toBe(true);
    expect(addClause.changedClauseIds).toEqual(['plant-water-no-rain']);
    expect(addClause.runs.every((r) => r.diagnosis === 'deterministic')).toBe(true);

    const priority = evaluateRepair(mission, mission.repairs[1].proposal);
    expect(priority.accepted).toBe(true);
    expect(priority.changedClauseIds).toEqual([]);
    const overlapRun = priority.runs.find((r) => r.inputId === 'plant-m1-r1');
    expect(overlapRun?.diagnosis).toBe('overlap');
    expect(overlapRun?.actionId).toBe('wait');
    expect(priority.evidenceKeys).toContain('coverage:overlap-with-priority');
  });

  it('branch-fan-03: 두 승인 수리(>=25, <25)가 모두 통과한다', () => {
    const mission = missionById('branch-fan-03');
    for (const repair of mission.repairs) {
      const evaluation = evaluateRepair(mission, repair.proposal);
      expect(evaluation.accepted, repair.id).toBe(true);
      expect(evaluation.changedClauseIds, repair.id).toHaveLength(1);
    }
  });

  it('branch-library-04: 기준값(기한) 하나만 바꾼 수정이 최소 수정으로 통과한다', () => {
    const mission = missionById('branch-library-04');
    const evaluation = evaluateRepair(mission, mission.repairs[0].proposal);
    expect(evaluation.accepted).toBe(true);
    expect(evaluation.changedClauseIds).toEqual(['library-remind-due']);
  });

  it('branch-sorter-05: 조건 추가 해법과 우선순위 해법이 모두 통과한다', () => {
    const mission = missionById('branch-sorter-05');
    for (const repair of mission.repairs) {
      expect(evaluateRepair(mission, repair.proposal).accepted, repair.id).toBe(true);
    }
  });

  it('branch-bus-06: 결함 없음(그대로 통과)이 받아들여진다', () => {
    const mission = missionById('branch-bus-06');
    const evaluation = evaluateRepair(mission, mission.repairs[0].proposal);
    expect(evaluation.accepted).toBe(true);
    expect(evaluation.changedClauseIds).toEqual([]);
    expect(evaluation.evidenceKeys).toContain('coverage:all-decided');
  });

  it('아직 갭이 남은 수정은 거부하고 근거 키를 남긴다', () => {
    const mission = lamp();
    const evaluation = evaluateRepair(mission, {
      kind: 'edit',
      ruleId: 'lamp-on',
      clauses: [{ id: 'lamp-on-brightness', field: 'brightness', operator: 'lt', expected: 1 }],
    });
    expect(evaluation.accepted).toBe(false);
    expect(evaluation.evidenceKeys).toContain('coverage:gaps-remain');
  });

  it('없는 규칙을 고치는 수정은 거부된다', () => {
    const mission = lamp();
    const evaluation = evaluateRepair(mission, {
      kind: 'edit',
      ruleId: '없는-규칙',
      clauses: [],
    });
    expect(evaluation.accepted).toBe(false);
    expect(evaluation.evidenceKeys).toContain('repair:unknown-rule');
  });

  it('applyRepair는 원본을 바꾸지 않고 새 미션을 만든다', () => {
    const mission = lamp();
    const snapshot = structuredClone(mission);
    const repaired = applyRepair(mission, mission.repairs[0].proposal);
    expect(repaired.rules[0].clauseIds[0]).toBe('lamp-on-brightness');
    const clause = repaired.clauses.find((c) => c.id === 'lamp-on-brightness');
    expect(clause?.operator).toBe('lte');
    expect(JSON.stringify(mission)).toBe(JSON.stringify(snapshot));
  });

  it('판정 함수는 readonly 입력을 변이하지 않는다', () => {
    for (const mission of missions) {
      const snapshot = JSON.stringify(mission);
      analyzeCoverage(mission);
      for (const repair of mission.repairs) evaluateRepair(mission, repair.proposal);
      expect(JSON.stringify(mission)).toBe(snapshot);
    }
  });
});
