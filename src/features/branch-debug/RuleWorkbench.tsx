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

type WorkbenchStep = Exclude<SessionState['step'], 'INTRO' | 'REPORT'>;

const STEP_NOTES: Record<WorkbenchStep, string> = {
  PREDICT: '사례를 보고, 어떤 행동이 나올지 먼저 예상해요.',
  TRACE: '규칙을 한 줄씩 시험하고, 맞는지 표시를 확인해요.',
  DIAGNOSE: '아래 근거에서 맞는 규칙 수를 세어 진단을 골라요.',
  REPAIR: '조건이나 순서 중 한 곳만 바꾸고 전체 사례로 확인해요.',
  RETEST: '고친 규칙이 모든 사례에서 잘 작동하는지 확인해요.',
};

const STEP_LABELS: Record<WorkbenchStep, string> = {
  PREDICT: '예측',
  TRACE: '추적',
  DIAGNOSE: '진단',
  REPAIR: '수리',
  RETEST: '재시험',
};

// PREDICT → TRACE → DIAGNOSE → REPAIR → RETEST 화면 전환만 담당한다 (계획 §9).
export function RuleWorkbench({ state, dispatch }: RuleWorkbenchProps) {
  const step = state.step as WorkbenchStep;
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
      <div className="mission-sticky-bar" aria-hidden="true">
        <span>{mission.content.title}</span>
        <span>{STEP_LABELS[step]} 단계</span>
      </div>
      <section className="mission-context" aria-label="미션 소개">
        <div className="mission-context__meta">
          <span>미션 {state.missionIndex + 1}/{missions.length}</span>
          <span className="mission-context__stage">현재 단계: {STEP_LABELS[step]}</span>
        </div>
        <h2 className="mission-context__title">{mission.content.title}</h2>
        <p className="mission-context__scene">{mission.content.scene}</p>
        <div className="mission-context__goal">
          <strong>이번 목표</strong>
          <span>{mission.content.goal}</span>
        </div>
        <p className="mission-context__step-note">{STEP_NOTES[step]}</p>
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
