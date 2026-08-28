import type {
  BranchMission,
  Clause,
  Diagnosis,
  FieldReference,
  InputCase,
  RepairEvaluation,
  RepairProposal,
  Rule,
  RuleRun,
  Scalar,
} from './types';

// 계획 §7.2: 정오·충족·판단 보류는 이 파일 하나에서만 계산한다.
// 모든 함수는 순수 함수로, readonly 입력을 변이하지 않는다.
export type ClauseResult = boolean | 'invalid-input';

export function isFieldReference(value: Scalar | FieldReference): value is FieldReference {
  return typeof value === 'object' && value !== null && 'fieldRef' in value;
}

export function evaluateClause(clause: Clause, input: InputCase): ClauseResult {
  const actual = input.values[clause.field];
  if (typeof actual === 'undefined') return 'invalid-input';

  let expected: Scalar;
  if (isFieldReference(clause.expected)) {
    const referred = input.values[clause.expected.fieldRef];
    if (typeof referred === 'undefined') return 'invalid-input';
    expected = referred;
  } else {
    expected = clause.expected;
  }

  switch (clause.operator) {
    case 'lt':
    case 'lte':
    case 'gt':
    case 'gte':
      if (typeof actual !== 'number' || typeof expected !== 'number') return 'invalid-input';
      if (clause.operator === 'lt') return actual < expected;
      if (clause.operator === 'lte') return actual <= expected;
      if (clause.operator === 'gt') return actual > expected;
      return actual >= expected;
    case 'eq':
      if (typeof actual !== typeof expected) return 'invalid-input';
      return actual === expected;
    default:
      return 'invalid-input';
  }
}

function ruleMatches(mission: BranchMission, rule: Rule, input: InputCase): boolean | 'invalid-input' {
  let matches = true;
  for (const clauseId of rule.clauseIds) {
    const clause = mission.clauses.find((c) => c.id === clauseId);
    if (!clause) return 'invalid-input';
    const result = evaluateClause(clause, input);
    if (result === 'invalid-input') return 'invalid-input';
    if (!result) matches = false;
  }
  return matches;
}

// 같은 Rule의 clauseIds는 모두 참이어야 하고(AND), 별도 and 연산자는 두지 않는다 (계획 §4.1).
export function runRuleSet(mission: BranchMission, input: InputCase): RuleRun {
  const matchingRuleIds: string[] = [];
  for (const rule of mission.rules) {
    const matches = ruleMatches(mission, rule, input);
    if (matches === 'invalid-input') {
      return { inputId: input.id, matchingRuleIds: [], actionId: null, diagnosis: 'invalid-input' };
    }
    if (matches) matchingRuleIds.push(rule.id);
  }

  const diagnosis: Diagnosis =
    matchingRuleIds.length === 0 ? 'gap' : matchingRuleIds.length === 1 ? 'deterministic' : 'overlap';

  let actionId: string | null = null;
  if (matchingRuleIds.length === 1) {
    const winner = mission.rules.find((r) => r.id === matchingRuleIds[0]);
    actionId = winner ? winner.actionId : null;
  } else if (matchingRuleIds.length > 1) {
    // priority는 명시된 규칙에만 적용하고, 작은 정수가 우선이다.
    // 승자를 반환하더라도 overlap 진단은 위에서 그대로 남긴다 (계획 §5).
    const prioritized = mission.rules.filter(
      (r) => matchingRuleIds.includes(r.id) && typeof r.priority === 'number',
    );
    if (prioritized.length > 0) {
      const winner = prioritized.reduce((a, b) => (b.priority! < a.priority! ? b : a));
      actionId = winner.actionId;
    }
  }

  return { inputId: input.id, matchingRuleIds, actionId, diagnosis };
}

// 미션의 finiteDomain 전체만 열거한다. 임의의 실수 범위를 추측하지 않는다 (계획 §5).
export function analyzeCoverage(mission: BranchMission): RuleRun[] {
  return mission.finiteDomain.map((input) => runRuleSet(mission, input));
}

function clauseSignature(clause: Clause): string {
  const expected = isFieldReference(clause.expected)
    ? `ref:${clause.expected.fieldRef}`
    : `${typeof clause.expected}:${String(clause.expected)}`;
  return `${clause.id}|${clause.field}|${clause.operator}|${expected}`;
}

export function changedClauseIds(before: readonly Clause[], after: readonly Clause[]): string[] {
  const beforeSignatures = new Map(before.map((c) => [c.id, clauseSignature(c)]));
  const afterSignatures = new Map(after.map((c) => [c.id, clauseSignature(c)]));
  const changed: string[] = [];
  for (const [id, signature] of afterSignatures) {
    if (beforeSignatures.get(id) !== signature) changed.push(id);
  }
  for (const id of beforeSignatures.keys()) {
    if (!afterSignatures.has(id)) changed.push(id);
  }
  return changed;
}

export function applyRepair(mission: BranchMission, proposal: RepairProposal): BranchMission {
  if (proposal.kind === 'none') return mission;
  return {
    ...mission,
    clauses: mergeClauses(mission, proposal),
    rules: mission.rules.map((rule) =>
      rule.id === proposal.ruleId
        ? {
            ...rule,
            clauseIds: proposal.clauses.map((c) => c.id),
            ...(typeof proposal.priority === 'undefined' ? {} : { priority: proposal.priority }),
          }
        : rule,
    ),
  };
}

function mergeClauses(mission: BranchMission, proposal: RepairProposal): Clause[] {
  const proposalIds = new Set(proposal.clauses.map((c) => c.id));
  const kept = mission.clauses.filter((c) => !proposalIds.has(c.id));
  return [...kept, ...proposal.clauses];
}

// 최소 수정: changedClauseIds가 1개이거나 priority 한 곳만 바뀐 경우 (계획 §5).
// 전체 테스트 통과: 모든 사례에서 행동이 정해진다(갭·판정 불가 없음).
// 우선순위로 실행 순서를 정한 겹침은 승자가 있으므로 통과로 인정하되, 겹침 기록은 남는다.
export function evaluateRepair(mission: BranchMission, proposal: RepairProposal): RepairEvaluation {
  if (proposal.kind === 'none') {
    const runs = analyzeCoverage(mission);
    return {
      accepted: runs.every(hasDecidedAction),
      changedClauseIds: [],
      runs,
      evidenceKeys: ['change:minimal', ...coverageKeys(runs), 'repair:no-change'],
    };
  }

  const rule = mission.rules.find((r) => r.id === proposal.ruleId);
  if (!rule) {
    return {
      accepted: false,
      changedClauseIds: [],
      runs: analyzeCoverage(mission),
      evidenceKeys: ['repair:unknown-rule'],
    };
  }

  const before = rule.clauseIds
    .map((id) => mission.clauses.find((c) => c.id === id))
    .filter((c): c is Clause => typeof c !== 'undefined');
  const changed = changedClauseIds(before, proposal.clauses);
  const priorityChanged =
    typeof proposal.priority !== 'undefined' && proposal.priority !== rule.priority;
  const minimal = (changed.length === 1 && !priorityChanged) || (changed.length === 0 && priorityChanged);

  const runs = analyzeCoverage(applyRepair(mission, proposal));
  const allDecided = runs.every(hasDecidedAction);
  const evidenceKeys = [
    minimal ? 'change:minimal' : 'change:not-minimal',
    ...coverageKeys(runs),
  ];

  return { accepted: minimal && allDecided, changedClauseIds: changed, runs, evidenceKeys };
}

function hasDecidedAction(run: RuleRun): boolean {
  return run.actionId !== null && run.diagnosis !== 'gap' && run.diagnosis !== 'invalid-input';
}

function coverageKeys(runs: readonly RuleRun[]): string[] {
  const keys: string[] = [];
  if (runs.some((r) => r.diagnosis === 'gap' || r.diagnosis === 'invalid-input')) {
    keys.push('coverage:gaps-remain');
  } else {
    keys.push('coverage:no-gaps');
  }
  if (runs.every((r) => r.diagnosis === 'deterministic')) {
    keys.push('coverage:all-decided');
  } else if (runs.every(hasDecidedAction) && runs.some((r) => r.diagnosis === 'overlap')) {
    keys.push('coverage:overlap-with-priority');
  }
  return keys;
}
