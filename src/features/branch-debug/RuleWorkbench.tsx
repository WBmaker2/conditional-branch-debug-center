import type { Dispatch } from 'react';
import type { SessionAction, SessionState } from '../../app/sessionReducer';
import { missions } from '../../content/missions';
import type { LearningMission } from '../../domain/types';
import { DiagnosePanel } from './DiagnosePanel';
import { PredictPanel } from './PredictPanel';
import { RepairEditor } from './RepairEditor';
import { RetestPanel } from './RetestPanel';
import { TracePanel } from './TracePanel';

interface RuleWorkbenchProps {
  state: SessionState;
  dispatch: Dispatch<SessionAction>;
}

// PREDICT → TRACE → DIAGNOSE → REPAIR → RETEST 화면 전환만 담당한다 (계획 §9).
export function RuleWorkbench({ state, dispatch }: RuleWorkbenchProps) {
  const mission: LearningMission = missions[state.missionIndex];
  const record = state.missions[state.missionIndex];
  const input = mission.finiteDomain.find((c) => c.id === mission.content.focusInputId);
  if (!input) {
    // validateContent가 focusInputId를 보증하므로 정상 콘텐츠에서는 도달하지 않는다.
    return (
      <section className="card">
        <p>미션 사례를 찾지 못했어요. 상단의 업데이트 내역을 확인해 주세요.</p>
      </section>
    );
  }

  return (
    <div>
      <section className="card" aria-label="미션 소개">
        <h2 className="card__title">
          {state.missionIndex + 1}/{missions.length} · {mission.content.title}
        </h2>
        <p>{mission.content.scene}</p>
        <p>
          <strong>목표:</strong> {mission.content.goal}
        </p>
      </section>
      {state.step === 'PREDICT' && (
        <PredictPanel mission={mission} input={input} record={record} dispatch={dispatch} />
      )}
      {state.step === 'TRACE' && (
        <TracePanel mission={mission} input={input} record={record} dispatch={dispatch} />
      )}
      {state.step === 'DIAGNOSE' && (
        <DiagnosePanel mission={mission} input={input} record={record} dispatch={dispatch} />
      )}
      {state.step === 'REPAIR' && (
        <RepairEditor mission={mission} input={input} record={record} dispatch={dispatch} />
      )}
      {state.step === 'RETEST' && (
        <RetestPanel
          mission={mission}
          record={record}
          isLastMission={state.missionIndex === missions.length - 1}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
