import { useMemo, useState, type Dispatch } from 'react';
import type { MissionRecord, SessionAction } from '../../app/sessionReducer';
import { ActionButton } from '../../components/ActionButton';
import { changedClauseIds, isFieldReference } from '../../domain/branchEvaluator';
import type {
  Clause,
  InputCase,
  LearningMission,
  Operator,
  RepairProposal,
  Rule,
  Scalar,
} from '../../domain/types';
import { FeedbackPanel } from './FeedbackPanel';
import { clauseText, fieldMetaOf, kidNote, ruleName, valueLabel, OPERATOR_CHOICES } from './labels';

interface RepairEditorProps {
  mission: LearningMission;
  input: InputCase;
  record: MissionRecord;
  dispatch: Dispatch<SessionAction>;
}

type Mode = 'clause' | 'add' | 'priority' | 'none';

function ruleOf(mission: LearningMission, ruleId: string | null): Rule | null {
  if (!ruleId) return null;
  return mission.rules.find((r) => r.id === ruleId) ?? null;
}

function clauseOf(mission: LearningMission, clauseId: string): Clause | null {
  return mission.clauses.find((c) => c.id === clauseId) ?? null;
}

// 절의 기준값 후보: 임의의 수를 추측하지 않고 finiteDomain에 나온 값만 고른다 (계획 §5).
function valueOptions(mission: LearningMission, clause: Clause): { raw: string; label: string }[] {
  if (isFieldReference(clause.expected)) return [];
  const meta = fieldMetaOf(mission, clause.field);
  const seen = new Set<string>();
  const options: { raw: string; label: string }[] = [];
  for (const input of mission.finiteDomain) {
    const value = input.values[clause.field];
    const raw =
      typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value);
    if (seen.has(raw)) continue;
    seen.add(raw);
    options.push({ raw, label: valueLabel(meta, value) });
  }
  return options;
}

function parseValue(raw: string, clause: Clause): Scalar {
  if (typeof clause.expected === 'boolean') return raw === 'true';
  if (typeof clause.expected === 'number') return Number(raw);
  return raw;
}

// 계획 §9 수리판: 조건 연산자·기준값 또는 우선순위 중 한 곳만 바꾼다.
export function RepairEditor({ mission, input, record, dispatch }: RepairEditorProps) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [ruleId, setRuleId] = useState<string | null>(null);
  const [clauseId, setClauseId] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [valueRaw, setValueRaw] = useState<string | null>(null);
  const [extraClauseId, setExtraClauseId] = useState<string | null>(null);

  const rule = ruleOf(mission, ruleId);
  const guidance =
    record.diagnosisChoice === null
      ? null
      : kidNote(mission, record.diagnosisChoice.diagnosis);

  const buildProposal = (): { proposal: RepairProposal; label: string } | null => {
    if (mode === 'none') {
      return { proposal: { kind: 'none', ruleId: '-', clauses: [] }, label: '규칙을 그대로 둘래요(결함 없음)' };
    }
    if (!rule) return null;
    if (mode === 'priority') {
      return {
        proposal: { kind: 'edit', ruleId: rule.id, clauses: rule.clauseIds.map((id) => clauseOf(mission, id)!), priority: 1 },
        label: `${ruleName(rule, mission)}을(를) 가장 먼저 실행하기`,
      };
    }
    if (mode === 'add') {
      const extra = mission.content.extraClauses.find((c) => c.id === extraClauseId);
      if (!extra) return null;
      return {
        proposal: {
          kind: 'edit',
          ruleId: rule.id,
          clauses: [...rule.clauseIds.map((id) => clauseOf(mission, id)!), extra],
        },
        label: `${ruleName(rule, mission)}에 "${clauseText(extra, mission)}" 추가하기`,
      };
    }
    if (mode === 'clause' && clauseId) {
      const original = clauseOf(mission, clauseId);
      if (!original) return null;
      const nextClause: Clause = {
        ...original,
        operator: operator ?? original.operator,
        expected:
          valueRaw !== null && !isFieldReference(original.expected)
            ? parseValue(valueRaw, original)
            : original.expected,
      };
      const clauses = rule.clauseIds.map((id) => (id === clauseId ? nextClause : clauseOf(mission, id)!));
      return {
        proposal: { kind: 'edit', ruleId: rule.id, clauses },
        label: `${ruleName(rule, mission)}의 조건을 "${clauseText(nextClause, mission)}"(으)로 바꾸기`,
      };
    }
    return null;
  };

  const built = useMemo(buildProposal, [mode, rule, clauseId, operator, valueRaw, extraClauseId, mission]);
  const changed = built ? changedClauseIds(rule?.clauseIds.map((id) => clauseOf(mission, id)!).filter(Boolean) ?? [], built.proposal.clauses) : [];
  const hasChange =
    built !== null &&
    (built.proposal.kind === 'none' ||
      changed.length > 0 ||
      (built.proposal.priority !== undefined && rule?.priority !== built.proposal.priority));

  const resetDetail = () => {
    setClauseId(null);
    setOperator(null);
    setValueRaw(null);
    setExtraClauseId(null);
  };

  const runRetest = () => {
    if (!built) return;
    dispatch({ type: 'RUN_RETEST', label: built.label, proposal: built.proposal });
  };

  const editingClause = mode === 'clause' && rule && clauseId ? clauseOf(mission, clauseId) : null;

  return (
    <section className="card" aria-labelledby="repair-heading">
      <h2 id="repair-heading" className="card__title">
        4단계 · 수리판
      </h2>
      <p>
        사례:
        <span className="case-chip">
          {mission.content.fields
            .map((field) => `${field.label}: ${valueLabel(field, input.values[field.name])}`)
            .join(' · ')}
        </span>
      </p>
      {guidance && <FeedbackPanel tone="info" messages={[guidance, '조건 하나 또는 순서 하나, 딱 한 곳만 바꿔 보세요.']} />}
      <fieldset>
        <legend>어떻게 고칠까요?</legend>
        <div className="choice-list">
          <label className="choice">
            <input
              type="radio"
              name="repair-mode"
              checked={mode === 'clause'}
              onChange={() => {
                setMode('clause');
                setRuleId(null);
                resetDetail();
              }}
            />
            조건 고치기 (연산자·기준값)
          </label>
          {mission.content.extraClauses.length > 0 && (
            <label className="choice">
              <input
                type="radio"
                name="repair-mode"
                checked={mode === 'add'}
                onChange={() => {
                  setMode('add');
                  setRuleId(null);
                  resetDetail();
                }}
              />
              조건 추가하기
            </label>
          )}
          <label className="choice">
            <input
              type="radio"
              name="repair-mode"
              checked={mode === 'priority'}
              onChange={() => {
                setMode('priority');
                setRuleId(null);
                resetDetail();
              }}
            />
            실행 순서 정하기 (우선순위)
          </label>
          {mission.content.noFixAllowed && (
            <label className="choice">
              <input
                type="radio"
                name="repair-mode"
                checked={mode === 'none'}
                onChange={() => {
                  setMode('none');
                  setRuleId(null);
                  resetDetail();
                }}
              />
              결함 없음(그대로 통과)
            </label>
          )}
        </div>
      </fieldset>

      {mode !== null && mode !== 'none' && (
        <fieldset>
          <legend>어느 규칙을 고칠까요?</legend>
          <div className="choice-list">
            {mission.rules.map((item) => (
              <label key={item.id} className="choice">
                <input
                  type="radio"
                  name="repair-rule"
                  checked={ruleId === item.id}
                  onChange={() => {
                    setRuleId(item.id);
                    resetDetail();
                  }}
                />
                {ruleName(item, mission)} — {item.clauseIds
                  .map((id) => mission.clauses.find((c) => c.id === id))
                  .filter((c): c is Clause => typeof c !== 'undefined')
                  .map((c) => clauseText(c, mission))
                  .join(' 그리고 ')}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {mode === 'clause' && rule && (
        <fieldset>
          <legend>어느 조건을, 어떻게 바꿀까요?</legend>
          <div className="choice-list">
            {rule.clauseIds.map((id) => {
              const clause = clauseOf(mission, id);
              if (!clause) return null;
              return (
                <label key={id} className="choice">
                  <input
                    type="radio"
                    name="repair-clause"
                    checked={clauseId === id}
                    onChange={() => {
                      setClauseId(id);
                      setOperator(null);
                      setValueRaw(null);
                    }}
                  />
                  {clauseText(clause, mission)}
                </label>
              );
            })}
          </div>
          {editingClause && (
            <>
              <div className="choice-list">
                {OPERATOR_CHOICES.map((item) => (
                  <label key={item.operator} className="choice">
                    <input
                      type="radio"
                      name="repair-operator"
                      checked={operator === item.operator}
                      onChange={() => setOperator(item.operator)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
              {!isFieldReference(editingClause.expected) && (
                <div className="choice-list">
                  {valueOptions(mission, editingClause).map((option) => (
                    <label key={option.raw} className="choice">
                      <input
                        type="radio"
                        name="repair-value"
                        checked={valueRaw === option.raw}
                        onChange={() => setValueRaw(option.raw)}
                      />
                      기준값: {option.label}
                    </label>
                  ))}
                </div>
              )}
              {isFieldReference(editingClause.expected) && (
                <p>이 조건은 다른 필드와 비교해요. 연산자만 바꿀 수 있어요.</p>
              )}
            </>
          )}
        </fieldset>
      )}

      {mode === 'add' && rule && (
        <fieldset>
          <legend>어떤 조건을 추가할까요?</legend>
          <div className="choice-list">
            {mission.content.extraClauses.map((clause) => (
              <label key={clause.id} className="choice">
                <input
                  type="radio"
                  name="repair-extra"
                  checked={extraClauseId === clause.id}
                  onChange={() => setExtraClauseId(clause.id)}
                />
                {clauseText(clause, mission)}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {mode === 'priority' && rule && (
        <p>
          <strong>{ruleName(rule, mission)}</strong>을(를) 가장 먼저 실행하도록 순서를 정할게요.
        </p>
      )}

      <div className="actions-row">
        <ActionButton pulse disabled={!hasChange} onClick={runRetest}>
          수정안 재시험
        </ActionButton>
        {built && !hasChange && <span>바뀐 내용이 없어요. 한 곳을 바꾸면 재시험할 수 있어요.</span>}
      </div>
    </section>
  );
}
