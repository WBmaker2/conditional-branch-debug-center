import { analyzeCoverage, evaluateRepair } from '../domain/branchEvaluator';
import type {
  Clause,
  FieldMeta,
  FieldReference,
  LearningMission,
  MissionId,
  Operator,
  Scalar,
} from '../domain/types';

// 계획 §7.2: 잘못된 콘텐츠는 개발·빌드 시 예외로 중단하고, 학생 화면에서 추측해 복구하지 않는다.
export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContentValidationError';
  }
}

const EXPECTED_MISSION_IDS: MissionId[] = [
  'branch-lamp-01',
  'branch-plant-02',
  'branch-fan-03',
  'branch-library-04',
  'branch-sorter-05',
  'branch-bus-06',
];

const OPERATORS: readonly Operator[] = ['lt', 'lte', 'eq', 'gte', 'gt'];

function fail(message: string): never {
  throw new ContentValidationError(`[콘텐츠 검수] ${message}`);
}

function isFieldReference(value: Scalar | FieldReference): value is FieldReference {
  return typeof value === 'object' && value !== null && 'fieldRef' in value;
}

export function validateContent(missions: readonly LearningMission[]): void {
  if (missions.length !== EXPECTED_MISSION_IDS.length) {
    fail(`미션은 정확히 ${EXPECTED_MISSION_IDS.length}개여야 합니다. 현재 ${missions.length}개`);
  }
  const seenIds = new Set<string>();
  for (const mission of missions) {
    if (seenIds.has(mission.id)) fail(`미션 ID 중복: ${mission.id}`);
    seenIds.add(mission.id);
  }
  for (const id of EXPECTED_MISSION_IDS) {
    if (!seenIds.has(id)) fail(`미션 ID 누락: ${id}`);
  }
  for (const mission of missions) validateMission(mission);
}

function validateMission(mission: LearningMission): void {
  const label = mission.id;
  if (mission.sourceNote.trim().length === 0) fail(`${label}: sourceNote가 비어 있다`);
  if (mission.misconceptionGuard.trim().length === 0) fail(`${label}: misconceptionGuard가 비어 있다`);
  if (mission.reviewStatus !== 'approved') fail(`${label}: reviewStatus가 approved가 아니다`);
  if (mission.finiteDomain.length === 0) fail(`${label}: finiteDomain이 빈 배열이다`);

  validateFields(mission);
  validateInputCases(mission);
  validateClauses(mission);
  validateRules(mission);
  validateContentMeta(mission);

  const coverage = analyzeCoverage(mission);
  const invalid = coverage.find((run) => run.diagnosis === 'invalid-input');
  if (invalid) {
    fail(`${label}: 시작 규칙에서 판정 불가(invalid-input) 사례가 있다: ${invalid.inputId}`);
  }

  if (mission.validRepairIds.length === 0) fail(`${label}: validRepairIds가 비어 있다`);
  for (const repairId of mission.validRepairIds) {
    const repair = mission.repairs.find((r) => r.id === repairId);
    if (!repair) fail(`${label}: validRepairIds가 없는 수리를 가리킨다: ${repairId}`);
    if (!evaluateRepair(mission, repair.proposal).accepted) {
      fail(`${label}: validRepair ${repairId}가 전체 테스트를 통과하지 못한다`);
    }
  }
}

function fieldMetaOf(mission: LearningMission, name: string): FieldMeta | undefined {
  return mission.content.fields.find((f) => f.name === name);
}

function validateScalarKind(label: string, meta: FieldMeta, value: Scalar): void {
  if (meta.kind === 'number' && (typeof value !== 'number' || !Number.isFinite(value))) {
    fail(`${label}: 숫자 필드 ${meta.name}의 값이 유한한 수가 아니다`);
  }
  if (meta.kind === 'boolean' && typeof value !== 'boolean') {
    fail(`${label}: 불리언 필드 ${meta.name}의 값이 참/거짓이 아니다`);
  }
  if (meta.kind === 'enum') {
    if (typeof value !== 'string' || !meta.enumLabels?.[value]) {
      fail(`${label}: 열거 필드 ${meta.name}의 값 ${String(value)}이 목록에 없다`);
    }
  }
}

function validateFields(mission: LearningMission): void {
  const names = new Set<string>();
  for (const field of mission.content.fields) {
    if (names.has(field.name)) fail(`${mission.id}: 필드 이름 중복 ${field.name}`);
    names.add(field.name);
    if (field.label.trim().length === 0) fail(`${mission.id}: 필드 ${field.name}의 label이 비어 있다`);
    if (field.kind === 'boolean' && !field.booleanLabels) {
      fail(`${mission.id}: 불리언 필드 ${field.name}에 booleanLabels가 없다`);
    }
    if (field.kind === 'enum' && (!field.enumLabels || Object.keys(field.enumLabels).length === 0)) {
      fail(`${mission.id}: 열거 필드 ${field.name}에 enumLabels가 없다`);
    }
  }
}

function validateInputCases(mission: LearningMission): void {
  const caseIds = new Set<string>();
  const fieldNames = mission.content.fields.map((f) => f.name);
  for (const input of mission.finiteDomain) {
    if (caseIds.has(input.id)) fail(`${mission.id}: 입력 사례 ID 중복 ${input.id}`);
    caseIds.add(input.id);
    for (const name of fieldNames) {
      const meta = fieldMetaOf(mission, name);
      if (!meta) fail(`${mission.id}: 필드 메타데이터 누락 ${name}`);
      const value = input.values[name];
      if (typeof value === 'undefined') {
        fail(`${mission.id}: 입력 사례 ${input.id}에 필드 ${name} 값이 없다`);
      }
      validateScalarKind(`${mission.id}/${input.id}`, meta, value);
    }
  }
}

function validateClauseShape(mission: LearningMission, clause: Clause, context: string): void {
  if (!OPERATORS.includes(clause.operator)) fail(`${context}: 지원하지 않는 연산자 ${clause.operator}`);
  const meta = fieldMetaOf(mission, clause.field);
  if (!meta) fail(`${context}: clause가 없는 필드를 참조한다: ${clause.field}`);
  if (isFieldReference(clause.expected)) {
    const refMeta = fieldMetaOf(mission, clause.expected.fieldRef);
    if (!refMeta) {
      fail(`${context}: fieldRef가 없는 필드를 참조한다: ${clause.expected.fieldRef}`);
    }
    if (refMeta.kind !== meta.kind) fail(`${context}: fieldRef의 필드 종류가 다르다`);
    return;
  }
  validateScalarKind(`${context}/${clause.id}`, meta, clause.expected);
}

function validateClauses(mission: LearningMission): void {
  const ids = new Set<string>();
  for (const clause of mission.clauses) {
    if (ids.has(clause.id)) fail(`${mission.id}: clause ID 중복 ${clause.id}`);
    ids.add(clause.id);
    validateClauseShape(mission, clause, mission.id);
  }
  const extraIds = new Set<string>();
  for (const clause of mission.content.extraClauses) {
    if (ids.has(clause.id) || extraIds.has(clause.id)) {
      fail(`${mission.id}: 수리용 추가 clause ID가 기존 절과 충돌한다: ${clause.id}`);
    }
    extraIds.add(clause.id);
    validateClauseShape(mission, clause, `${mission.id}/extraClauses`);
  }
}

function validateRules(mission: LearningMission): void {
  const ruleIds = new Set<string>();
  const clauseIds = new Set(mission.clauses.map((c) => c.id));
  const actionIds = new Set(mission.content.actions.map((a) => a.id));
  const priorities: number[] = [];
  for (const rule of mission.rules) {
    if (ruleIds.has(rule.id)) fail(`${mission.id}: rule ID 중복 ${rule.id}`);
    ruleIds.add(rule.id);
    if (rule.clauseIds.length === 0) fail(`${mission.id}: 규칙 ${rule.id}의 clause가 없다`);
    for (const clauseId of rule.clauseIds) {
      if (!clauseIds.has(clauseId)) {
        fail(`${mission.id}: 규칙 ${rule.id}가 존재하지 않는 clause를 참조한다: ${clauseId}`);
      }
    }
    if (!actionIds.has(rule.actionId)) {
      fail(`${mission.id}: 규칙 ${rule.id}의 actionId ${rule.actionId}가 action 목록에 없다`);
    }
    if (typeof rule.priority !== 'undefined') {
      if (!Number.isInteger(rule.priority)) {
        fail(`${mission.id}: 규칙 ${rule.id}의 priority가 정수가 아니다`);
      }
      priorities.push(rule.priority);
    }
  }
  if (new Set(priorities).size !== priorities.length) {
    fail(`${mission.id}: 같은 priority 값을 가진 규칙이 둘 이상이다 (콘텐츠 오류)`);
  }
}

function validateContentMeta(mission: LearningMission): void {
  const c = mission.content;
  if (c.title.trim().length === 0) fail(`${mission.id}: content.title이 비어 있다`);
  if (c.scene.trim().length === 0) fail(`${mission.id}: content.scene이 비어 있다`);
  if (c.goal.trim().length === 0) fail(`${mission.id}: content.goal이 비어 있다`);
  if (!c.kidNotes.gap.trim() || !c.kidNotes.overlap.trim() || !c.kidNotes.deterministic.trim()) {
    fail(`${mission.id}: 어린이용 판정 문구(kidNotes)가 비어 있다`);
  }
  if (!mission.finiteDomain.some((input) => input.id === c.focusInputId)) {
    fail(`${mission.id}: focusInputId가 finiteDomain에 없다: ${c.focusInputId}`);
  }
  const actionIds = new Set<string>();
  for (const action of c.actions) {
    if (actionIds.has(action.id)) fail(`${mission.id}: action ID 중복 ${action.id}`);
    actionIds.add(action.id);
    if (action.label.trim().length === 0) fail(`${mission.id}: action ${action.id}의 label이 비어 있다`);
  }
}
