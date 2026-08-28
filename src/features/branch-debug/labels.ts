import { isFieldReference } from '../../domain/branchEvaluator';
import type {
  Clause,
  Diagnosis,
  FieldMeta,
  InputCase,
  LearningMission,
  Operator,
  Rule,
  Scalar,
} from '../../domain/types';

// 화면 문장은 여기서 만들고, 판정 결과는 evaluator에서만 온다 (계획 §7.2).
export const OPERATOR_CHOICES: readonly { readonly operator: Operator; readonly label: string }[] = [
  { operator: 'lt', label: '보다 작다(<)' },
  { operator: 'lte', label: '보다 작거나 같다(≤)' },
  { operator: 'eq', label: '같다(=)' },
  { operator: 'gte', label: '보다 크거나 같다(≥)' },
  { operator: 'gt', label: '보다 크다(>)' },
];

export const DIAGNOSIS_CHOICES: readonly { readonly value: Diagnosis; readonly label: string }[] = [
  { value: 'gap', label: '어떤 규칙에도 맞지 않았어요 (갭)' },
  { value: 'overlap', label: '두 개 이상의 규칙에 동시에 맞았어요 (겹침)' },
  { value: 'deterministic', label: '딱 한 규칙에만 맞았어요' },
];

export function fieldMetaOf(mission: LearningMission, name: string): FieldMeta | undefined {
  return mission.content.fields.find((f) => f.name === name);
}

export function valueLabel(meta: FieldMeta | undefined, value: Scalar): string {
  if (typeof value === 'boolean') {
    return meta?.booleanLabels?.[value ? 'true' : 'false'] ?? (value ? '예' : '아니오');
  }
  if (typeof value === 'number') {
    const labeled = meta?.valueLabels?.[String(value)];
    if (labeled) return labeled;
    return meta?.unit ? `${value}${meta.unit}` : String(value);
  }
  return meta?.enumLabels?.[value] ?? value;
}

export function expectedLabel(clause: Clause, mission: LearningMission): string {
  if (isFieldReference(clause.expected)) {
    return fieldMetaOf(mission, clause.expected.fieldRef)?.label ?? clause.expected.fieldRef;
  }
  // 조건 문장에는 기준값을 원값으로 보여 준다(경계 학습용). 사례 카드만 뜻풀이 라벨을 쓴다.
  return scalarDisplay(fieldMetaOf(mission, clause.field), clause.expected);
}

function scalarDisplay(meta: FieldMeta | undefined, value: Scalar): string {
  if (typeof value === 'boolean') {
    return meta?.booleanLabels?.[value ? 'true' : 'false'] ?? (value ? '예' : '아니오');
  }
  if (typeof value === 'number') {
    return meta?.unit ? `${value}${meta.unit}` : String(value);
  }
  return meta?.enumLabels?.[value] ?? value;
}

export function clauseText(clause: Clause, mission: LearningMission): string {
  const field = fieldMetaOf(mission, clause.field)?.label ?? clause.field;
  const expected = expectedLabel(clause, mission);
  switch (clause.operator) {
    case 'lt':
      return `${field}: ${expected}보다 작음`;
    case 'lte':
      return `${field}: ${expected}보다 작거나 같음`;
    case 'gt':
      return `${field}: ${expected}보다 큼`;
    case 'gte':
      return `${field}: ${expected}보다 크거나 같음`;
    case 'eq':
      if (!isFieldReference(clause.expected) && typeof clause.expected === 'boolean') {
        return `${field}: ${expected}`;
      }
      return `${field}: ${expected} (같음)`;
    default:
      return `${field}: ?`;
  }
}

export function ruleName(rule: Rule, mission: LearningMission): string {
  return `${actionLabel(mission, rule.actionId)} 규칙`;
}

export function ruleText(rule: Rule, mission: LearningMission): string {
  return rule.clauseIds
    .map((id) => mission.clauses.find((c) => c.id === id))
    .filter((c): c is Clause => typeof c !== 'undefined')
    .map((clause) => clauseText(clause, mission))
    .join(' 그리고 ');
}

export function actionLabel(mission: LearningMission, actionId: string): string {
  return mission.content.actions.find((a) => a.id === actionId)?.label ?? actionId;
}

export function caseChips(mission: LearningMission, input: InputCase): string[] {
  return mission.content.fields.map(
    (field) => `${field.label}: ${valueLabel(field, input.values[field.name])}`,
  );
}

export function caseLabel(mission: LearningMission, input: InputCase): string {
  return caseChips(mission, input).join(' · ');
}

export function diagnosisBadge(diagnosis: Diagnosis): {
  tone: 'ok' | 'warn' | 'danger';
  text: string;
} {
  switch (diagnosis) {
    case 'deterministic':
      return { tone: 'ok', text: '✓ 한 규칙' };
    case 'gap':
      return { tone: 'warn', text: '◻ 갭' };
    case 'overlap':
      return { tone: 'danger', text: '⧉ 겹침' };
    default:
      return { tone: 'danger', text: '? 판정 보류' };
  }
}

export function kidNote(mission: LearningMission, diagnosis: Diagnosis): string | null {
  const notes = mission.content.kidNotes;
  if (diagnosis === 'gap') return notes.gap;
  if (diagnosis === 'overlap') return notes.overlap;
  if (diagnosis === 'deterministic') return notes.deterministic;
  return null;
}

// 사례 값 표시 (절 좌변의 실제 값)
export function actualDisplay(clause: Clause, input: InputCase, mission: LearningMission): string {
  return valueLabel(fieldMetaOf(mission, clause.field), input.values[clause.field]);
}
