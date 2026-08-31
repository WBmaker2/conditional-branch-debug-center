import { useState, type Dispatch } from 'react';
import type { MissionRecord, SessionAction } from '../../app/sessionReducer';
import { ActionButton } from '../../components/ActionButton';
import { runRuleSet } from '../../domain/branchEvaluator';
import type { InputCase, LearningMission } from '../../domain/types';
import { FeedbackPanel } from './FeedbackPanel';
import { DIAGNOSIS_CHOICES, ruleName } from './labels';

interface DiagnosePanelProps {
  mission: LearningMission;
  input: InputCase;
  record: MissionRecord;
  dispatch: Dispatch<SessionAction>;
}

// 계획 §9 진단판: 갭·겹침·한 규칙 중 하나를 추적 근거와 연결해 고른다.
// 오답이면 정답을 공개하지 않고 근거 힌트를 준다 (계획 §12 Task 5).
export function DiagnosePanel({ mission, input, record, dispatch }: DiagnosePanelProps) {
  const run = runRuleSet(mission, input);
  const choice = record.diagnosisChoice?.diagnosis ?? null;
  const [wrongTries, setWrongTries] = useState(0);

  const confirm = () => {
    if (choice === null) return;
    if (choice === run.diagnosis) {
      dispatch({ type: 'CONFIRM_DIAGNOSIS' });
      return;
    }
    setWrongTries((tries) => tries + 1);
  };

  return (
    <section className="card" aria-labelledby="diagnose-heading">
      <h2 id="diagnose-heading" className="card__title">
        3단계 · 진단판
      </h2>
      <p className="step-instruction">
        아래 근거에서 <strong>맞는 규칙</strong>의 수를 세어 이 사례의 진단을 골라 보세요.
      </p>
      <div className="evidence-card" aria-label="이 사례의 규칙 추적 근거">
        <div className="evidence-card__header">
          <strong>규칙 추적 근거</strong>
          <span>맞음 표시를 세어 보세요</span>
        </div>
        <ul className="evidence-list">
          {mission.rules.map((rule) => {
            const hit = run.matchingRuleIds.includes(rule.id);
            return (
              <li key={rule.id} className="evidence-item">
                <span>{ruleName(rule, mission)}</span>
                <span className={`badge badge--${hit ? 'ok' : 'warn'}`}>
                  {hit ? '✓ 맞음' : '✗ 안 맞음'}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="evidence-card__note">
          맞음이 0개면 갭, 1개면 한 규칙, 2개 이상이면 겹침이에요.
        </p>
      </div>
      <fieldset>
        <legend>이 사례의 진단은?</legend>
        <div className="choice-list">
          {DIAGNOSIS_CHOICES.map((item) => (
            <label key={item.value} className="choice">
              <input
                type="radio"
                name="diagnosis"
                value={item.value}
                checked={choice === item.value}
                onChange={() => dispatch({ type: 'SET_DIAGNOSIS', diagnosis: item.value })}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      {wrongTries > 0 && (
        <FeedbackPanel
          tone="warning"
          messages={[
            '근거를 다시 세어 볼까요?',
            '아래 근거에서 "맞음" 표시가 몇 개인지 다시 세어 보세요. 맞음이 0개면 갭, 1개면 한 규칙, 2개 이상이면 겹침이에요.',
          ]}
        />
      )}
      <ActionButton disabled={choice === null} onClick={confirm}>
        진단 완료하기
      </ActionButton>
    </section>
  );
}
