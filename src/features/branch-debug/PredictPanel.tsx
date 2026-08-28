import type { Dispatch } from 'react';
import type { SessionAction, MissionRecord } from '../../app/sessionReducer';
import { ActionButton } from '../../components/ActionButton';
import type { InputCase, LearningMission } from '../../domain/types';
import { caseChips } from './labels';

const NO_ACTION = 'none';

interface PredictPanelProps {
  mission: LearningMission;
  input: InputCase;
  record: MissionRecord;
  dispatch: Dispatch<SessionAction>;
}

// 계획 §9 예측판: 한 입력 사례에서 실행될 행동을 먼저 고른다.
export function PredictPanel({ mission, input, record, dispatch }: PredictPanelProps) {
  const chosen = record.prediction?.actionId ?? null;
  return (
    <section className="card" aria-labelledby="predict-heading">
      <h2 id="predict-heading" className="card__title">
        1단계 · 예측판
      </h2>
      <p>이 사례를 규칙에 넣어 볼 거예요:</p>
      <div className="case-chips">
        {caseChips(mission, input).map((chip) => (
          <span key={chip} className="case-chip">
            {chip}
          </span>
        ))}
      </div>
      <fieldset>
        <legend>어떤 일이 일어날 것 같아요?</legend>
        <div className="choice-list">
          {mission.content.actions.map((action) => (
            <label key={action.id} className="choice">
              <input
                type="radio"
                name="prediction"
                value={action.id}
                checked={chosen === action.id}
                onChange={() => dispatch({ type: 'SET_PREDICTION', actionId: action.id })}
              />
              {action.label}
            </label>
          ))}
          <label className="choice">
            <input
              type="radio"
              name="prediction"
              value={NO_ACTION}
              checked={chosen === NO_ACTION}
              onChange={() => dispatch({ type: 'SET_PREDICTION', actionId: NO_ACTION })}
            />
            아무 일도 일어나지 않아요
          </label>
        </div>
      </fieldset>
      <ActionButton disabled={!chosen} onClick={() => dispatch({ type: 'CONFIRM_PREDICTION' })}>
        예측 완료하기
      </ActionButton>
    </section>
  );
}
