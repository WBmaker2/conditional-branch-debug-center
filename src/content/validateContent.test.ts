import { describe, expect, it } from 'vitest';
import type { LearningMission } from '../domain/types';
import { missions } from './missions';
import { validateContent } from './validateContent';

// 6개 전체를 유지한 채 한 미션만 깨뜨려서, 길이 검사가 아니라 해당 검사가 실패하게 만든다.
function withPatched(index: number, patch: (m: LearningMission) => LearningMission): LearningMission[] {
  return missions.map((m, i) => (i === index ? patch(structuredClone(m)) : m));
}

describe('validateContent (계획 §7.2)', () => {
  it('정상 콘텐츠는 통과한다', () => {
    expect(() => validateContent(missions)).not.toThrow();
  });

  it('미션 수가 6개가 아니면 실패한다', () => {
    expect(() => validateContent(missions.slice(0, 5))).toThrow(/6개/);
  });

  it('미션 ID가 중복되면 실패한다', () => {
    const duplicated = withPatched(1, () => structuredClone(missions[0]));
    expect(() => validateContent(duplicated)).toThrow(/중복/);
  });

  it('sourceNote가 없으면 실패한다', () => {
    expect(() => validateContent(withPatched(0, (m) => ({ ...m, sourceNote: '' })))).toThrow(
      /sourceNote/,
    );
  });

  it('misconceptionGuard가 없으면 실패한다', () => {
    expect(() =>
      validateContent(withPatched(0, (m) => ({ ...m, misconceptionGuard: '' }))),
    ).toThrow(/misconceptionGuard/);
  });

  it('finiteDomain이 빈 배열이면 실패한다', () => {
    expect(() => validateContent(withPatched(0, (m) => ({ ...m, finiteDomain: [] })))).toThrow(
      /finiteDomain/,
    );
  });

  it('규칙이 존재하지 않는 clause를 참조하면 실패한다', () => {
    expect(() =>
      validateContent(
        withPatched(0, (m) => ({
          ...m,
          rules: m.rules.map((r, i) => (i === 0 ? { ...r, clauseIds: ['없는-절'] } : r)),
        })),
      ),
    ).toThrow(/clause/);
  });

  it('우선순위 값이 같은 규칙이 둘이면 실패한다', () => {
    expect(() =>
      validateContent(
        withPatched(0, (m) => ({
          ...m,
          rules: m.rules.map((r) => ({ ...r, priority: 1 })),
        })),
      ),
    ).toThrow(/priority/);
  });

  it('validRepairIds가 존재하지 않는 수리를 가리키면 실패한다', () => {
    expect(() => validateContent(withPatched(0, (m) => ({ ...m, validRepairIds: ['없는-수리'] }))))
      .toThrow(/validRepair/);
  });

  it('validRepairIds가 전체 통과하지 않는 수리를 가리키면 실패한다', () => {
    expect(() =>
      validateContent(
        withPatched(0, (m) => ({
          ...m,
          repairs: m.repairs.map((r, i) =>
            i === 0
              ? {
                  ...r,
                  proposal: { ...r.proposal, ruleId: '없는-규칙' },
                }
              : r,
          ),
        })),
      ),
    ).toThrow(/validRepair/);
  });

  it('입력 사례가 도메인 필드를 빠뜨리면 실패한다', () => {
    expect(() =>
      validateContent(
        withPatched(0, (m) => ({
          ...m,
          finiteDomain: [{ id: 'bad-case', values: { 없는필드: 1 } }],
        })),
      ),
    ).toThrow(/필드/);
  });
});
