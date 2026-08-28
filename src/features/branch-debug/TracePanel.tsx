import type { Dispatch } from 'react';
import type { MissionRecord, SessionAction } from '../../app/sessionReducer';
import { ActionButton } from '../../components/ActionButton';
import { evaluateClause, runRuleSet } from '../../domain/branchEvaluator';
import type { InputCase, LearningMission } from '../../domain/types';
import { actualDisplay, caseChips, clauseText, ruleName } from './labels';

interface TracePanelProps {
  mission: LearningMission;
  input: InputCase;
  record: MissionRecord;
  dispatch: Dispatch<SessionAction>;
}

// 계획 §9 규칙 추적판: 규칙을 위에서 아래로 한 줄씩 시험하며 참·거짓 근거를 표시한다.
export function TracePanel({ mission, input, record, dispatch }: TracePanelProps) {
  const run = runRuleSet(mission, input);
  const revealed = record.revealedRuleIds;
  const allRevealed = revealed.length === mission.rules.length;

  return (
    <section className="card" aria-labelledby="trace-heading">
      <h2 id="trace-heading" className="card__title">
        2단계 · 규칙 추적판
      </h2>
      <p>
        사례:
        {caseChips(mission, input).map((chip) => (
          <span key={chip} className="case-chip">
            {chip}
          </span>
        ))}
      </p>
      <ol className="rule-rail">
        {mission.rules.map((rule) => {
          const isRevealed = revealed.includes(rule.id);
          const hit = run.matchingRuleIds.includes(rule.id);
          return (
            <li
              key={rule.id}
              className={`rule-row ${
                isRevealed ? (hit ? 'rule-row--hit' : 'rule-row--miss') : ''
              }`}
            >
              <div className="rule-row__head">
                <span className="rule-row__name">{ruleName(rule, mission)}</span>
                {isRevealed ? (
                  hit ? (
                    <span className="badge badge--ok">✓ 당첨</span>
                  ) : (
                    <span className="badge badge--warn">✗ 실패</span>
                  )
                ) : (
                  <span className="badge">? 아직 시험 전</span>
                )}
              </div>
              {isRevealed && (
                <div>
                  {rule.clauseIds.map((clauseId, index) => {
                    const clause = mission.clauses.find((c) => c.id === clauseId);
                    if (!clause) return null;
                    const result = evaluateClause(clause, input);
                    return (
                      <div key={clauseId} className="clause-line">
                        {index > 0 && <span className="clause-line__and">그리고</span>}
                        <span>{clauseText(clause, mission)}</span>
                        <span>
                          사례 값 <strong>{actualDisplay(clause, input, mission)}</strong>
                        </span>
                        {result === 'invalid-input' ? (
                          <span className="badge badge--danger">? 판정 보류</span>
                        ) : result ? (
                          <span className="badge badge--ok">✓ 참</span>
                        ) : (
                          <span className="badge badge--warn">✗ 거짓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <ActionButton
        pulse={!allRevealed}
        onClick={() => dispatch({ type: allRevealed ? 'CONFIRM_TRACE' : 'REVEAL_NEXT_RULE' })}
      >
        {allRevealed ? '진단하러 가기' : '규칙 시험하기'}
      </ActionButton>
    </section>
  );
}
