import { useState, type Dispatch } from 'react';
import type { MissionRecord, SessionAction } from '../../app/sessionReducer';
import { ActionButton } from '../../components/ActionButton';
import { runRuleSet } from '../../domain/branchEvaluator';
import type { InputCase, LearningMission } from '../../domain/types';
import { FeedbackPanel } from './FeedbackPanel';
import { DIAGNOSIS_CHOICES } from './labels';

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
      <p>
        위 추적판의 "✓ 당첨" 표시를 보고, 이 사례의 진단을 직접 골라 보세요. 정답을 알려 주기 전에
        근거를 세어 보는 게 디버그 관리자의 방법이에요.
      </p>
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
            '위 추적판에서 "✓ 당첨" 표시가 몇 개인지 다시 세어 보세요. 당첨이 0개면 갭, 2개 이상이면 겹침이에요.',
          ]}
        />
      )}
      <ActionButton disabled={choice === null} onClick={confirm}>
        진단 완료하기
      </ActionButton>
    </section>
  );
}
