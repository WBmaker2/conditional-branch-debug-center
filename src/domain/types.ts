// 계획 §7.1 TypeScript 계약. 미션 ID·선택지 ID·판정 ID는 코드·테스트·문서에서 같은 문자열을 쓴다.
export type MissionId =
  | 'branch-lamp-01'
  | 'branch-plant-02'
  | 'branch-fan-03'
  | 'branch-library-04'
  | 'branch-sorter-05'
  | 'branch-bus-06';

export type Operator = 'lt' | 'lte' | 'eq' | 'gte' | 'gt';

export type Diagnosis = 'deterministic' | 'gap' | 'overlap' | 'invalid-input';

export type Scalar = number | boolean | string;

export interface FieldReference {
  readonly fieldRef: string;
}

export interface InputCase {
  readonly id: string;
  readonly values: Readonly<Record<string, Scalar>>;
}

export interface Clause {
  readonly id: string;
  readonly field: string;
  readonly operator: Operator;
  readonly expected: Scalar | FieldReference;
}

export interface Rule {
  readonly id: string;
  readonly clauseIds: readonly string[];
  readonly actionId: string;
  readonly priority?: number;
}

export interface BranchMission {
  readonly id: MissionId;
  readonly finiteDomain: readonly InputCase[];
  readonly clauses: readonly Clause[];
  readonly rules: readonly Rule[];
  readonly validRepairIds: readonly string[];
  readonly sourceNote: string;
  readonly reviewStatus: 'pending' | 'approved';
  readonly misconceptionGuard: string;
}

export interface RuleRun {
  readonly inputId: string;
  readonly matchingRuleIds: readonly string[];
  readonly actionId: string | null;
  readonly diagnosis: Diagnosis;
}

export interface RepairEvaluation {
  readonly accepted: boolean;
  readonly changedClauseIds: readonly string[];
  readonly runs: readonly RuleRun[];
  readonly evidenceKeys: readonly string[];
}

export type SessionStep = 'INTRO' | 'PREDICT' | 'TRACE' | 'DIAGNOSE' | 'REPAIR' | 'RETEST' | 'REPORT';

// ---- 화면 표시를 위한 확장 계약 (판정 경계는 유지: 컴포넌트는 evaluator 결과만 렌더링한다) ----

export interface FieldMeta {
  readonly name: string;
  readonly label: string;
  readonly kind: 'number' | 'boolean' | 'enum';
  readonly booleanLabels?: { readonly true: string; readonly false: string };
  readonly enumLabels?: Readonly<Record<string, string>>;
  readonly valueLabels?: Readonly<Record<string, string>>;
  readonly unit?: string;
}

export interface ActionMeta {
  readonly id: string;
  readonly label: string;
}

export interface KidNotes {
  readonly gap: string;
  readonly overlap: string;
  readonly deterministic: string;
}

export interface MissionContent {
  readonly title: string;
  readonly scene: string;
  readonly goal: string;
  readonly focusInputId: string;
  readonly fields: readonly FieldMeta[];
  readonly actions: readonly ActionMeta[];
  readonly kidNotes: KidNotes;
  readonly extraClauses: readonly Clause[];
  readonly noFixAllowed: boolean;
}

// 학생의 수정 한 건. kind 'edit'은 규칙 하나의 절 목록(및 선택적 priority)을 통째로 대체한다.
export interface RepairProposal {
  readonly kind: 'edit' | 'none';
  readonly ruleId: string;
  readonly clauses: readonly Clause[];
  readonly priority?: number;
}

export interface NamedRepair {
  readonly id: string;
  readonly label: string;
  readonly proposal: RepairProposal;
}

export interface LearningMission extends BranchMission {
  readonly content: MissionContent;
  readonly repairs: readonly NamedRepair[];
}
