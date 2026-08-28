import { describe, expect, it } from 'vitest';
import { evaluateRepair } from '../domain/branchEvaluator';
import type { MissionId } from '../domain/types';
import { missions } from './missions';
import { validateContent } from './validateContent';

const EXPECTED_IDS: MissionId[] = [
  'branch-lamp-01',
  'branch-plant-02',
  'branch-fan-03',
  'branch-library-04',
  'branch-sorter-05',
  'branch-bus-06',
];

describe('검수된 고정 미션 (계획 §4)', () => {
  it('정확히 6개 미션을 계획된 ID와 순서로 제공한다', () => {
    expect(missions.map((m) => m.id)).toEqual(EXPECTED_IDS);
  });

  it('전체 콘텐츠 검수기를 통과한다', () => {
    expect(() => validateContent(missions)).not.toThrow();
  });

  it('모든 finiteDomain이 비어 있지 않다', () => {
    for (const mission of missions) {
      expect(mission.finiteDomain.length).toBeGreaterThan(0);
    }
  });

  it('계획 §4.1의 도메인 크기를 고정한다', () => {
    const sizes: Record<MissionId, number> = {
      'branch-lamp-01': 6,
      'branch-plant-02': 4,
      'branch-fan-03': 4,
      'branch-library-04': 6,
      'branch-sorter-05': 4,
      'branch-bus-06': 6,
    };
    for (const mission of missions) {
      expect(mission.finiteDomain, mission.id).toHaveLength(sizes[mission.id]);
    }
  });

  it('모든 validRepairIds가 전체 통과하는 해법을 가리킨다', () => {
    for (const mission of missions) {
      expect(mission.validRepairIds.length, mission.id).toBeGreaterThan(0);
      for (const repairId of mission.validRepairIds) {
        const repair = mission.repairs.find((r) => r.id === repairId);
        expect(repair, `${mission.id}:${repairId}`).toBeDefined();
        expect(evaluateRepair(mission, repair!.proposal).accepted, `${mission.id}:${repairId}`).toBe(
          true,
        );
      }
    }
  });

  it('검수 메타데이터와 오개념 방지 문구를 가진다', () => {
    for (const mission of missions) {
      expect(mission.sourceNote.length).toBeGreaterThan(0);
      expect(mission.reviewStatus).toBe('approved');
      expect(mission.misconceptionGuard.length).toBeGreaterThan(0);
      expect(mission.content.title.length).toBeGreaterThan(0);
      expect(mission.content.scene.length).toBeGreaterThan(0);
      expect(mission.content.goal.length).toBeGreaterThan(0);
      expect(mission.content.kidNotes.gap.length).toBeGreaterThan(0);
      expect(mission.content.kidNotes.overlap.length).toBeGreaterThan(0);
      expect(mission.content.kidNotes.deterministic.length).toBeGreaterThan(0);
    }
  });

  it('branch-bus-06은 다른 필드 비교(FieldReference)를 사용한다', () => {
    const bus = missions.find((m) => m.id === 'branch-bus-06')!;
    const boardAll = bus.rules.find((r) => r.id === 'board-all')!;
    const clauses = boardAll.clauseIds.map((id) => bus.clauses.find((c) => c.id === id)!);
    expect(clauses.some((c) => typeof c.expected === 'object' && 'fieldRef' in c.expected)).toBe(
      true,
    );
  });
});
