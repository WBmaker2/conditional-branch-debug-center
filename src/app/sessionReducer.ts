import { evaluateRepair } from '../domain/branchEvaluator';
import type { Diagnosis, RepairEvaluation, RepairProposal, SessionStep } from '../domain/types';
import { missions } from '../content/missions';

// 계획 §9: step은 정의된 전이표를 통해서만 바뀐다. 알 수 없는 action, 범위를 벗어난
// missionIndex, 이전 revision 응답은 상태를 바꾸지 않는다(같은 참조를 반환한다).
export interface MissionRecord {
  readonly prediction: { readonly actionId: string } | null;
  readonly revealedRuleIds: readonly string[];
  readonly diagnosisChoice: { readonly diagnosis: Diagnosis } | null;
  readonly repair: { readonly label: string; readonly proposal: RepairProposal } | null;
  readonly evaluation: RepairEvaluation | null;
  readonly accepted: boolean;
}

export interface SessionState {
  readonly step: SessionStep;
  readonly missionIndex: number;
  readonly revision: number;
  readonly missions: readonly MissionRecord[];
  readonly restartPending: boolean;
}

export type SessionAction =
  | { type: 'START'; revision?: number }
  | { type: 'SET_PREDICTION'; actionId: string; revision?: number }
  | { type: 'CONFIRM_PREDICTION'; revision?: number }
  | { type: 'REVEAL_NEXT_RULE'; revision?: number }
  | { type: 'CONFIRM_TRACE'; revision?: number }
  | { type: 'SET_DIAGNOSIS'; diagnosis: Diagnosis; revision?: number }
  | { type: 'CONFIRM_DIAGNOSIS'; revision?: number }
  | { type: 'RUN_RETEST'; label: string; proposal: RepairProposal; revision?: number }
  | { type: 'RETRY_REPAIR'; revision?: number }
  | { type: 'ADVANCE'; revision?: number }
  | { type: 'GO_BACK'; revision?: number }
  | { type: 'RESTART_REQUEST'; revision?: number }
  | { type: 'RESTART_CANCEL'; revision?: number }
  | { type: 'RESTART_CONFIRMED'; revision?: number };

const EMPTY_MISSION_INDEX = 6;
const CHOOSABLE_DIAGNOSES: readonly Diagnosis[] = ['gap', 'overlap', 'deterministic'];
const OPERATORS: readonly string[] = ['lt', 'lte', 'eq', 'gte', 'gt'];

export function createInitialSessionState(): SessionState {
  return {
    step: 'INTRO',
    missionIndex: 0,
    revision: 0,
    missions: Array.from({ length: EMPTY_MISSION_INDEX }, () => ({
      prediction: null,
      revealedRuleIds: [],
      diagnosisChoice: null,
      repair: null,
      evaluation: null,
      accepted: false,
    })),
    restartPending: false,
  };
}

function patchCurrent(
  state: SessionState,
  patch: (record: MissionRecord) => MissionRecord,
): SessionState {
  return {
    ...state,
    revision: state.revision + 1,
    missions: state.missions.map((record, i) => (i === state.missionIndex ? patch(record) : record)),
  };
}

function validProposal(missionIndex: number, proposal: RepairProposal): boolean {
  const mission = missions[missionIndex];
  if (!mission) return false;
  if (proposal.kind === 'none') return mission.content.noFixAllowed;
  if (proposal.kind === 'edit') {
    const rule = mission.rules.find((r) => r.id === proposal.ruleId);
    if (!rule || proposal.clauses.length === 0) return false;
    const seen = new Set<string>();
    for (const clause of proposal.clauses) {
      if (seen.has(clause.id)) return false;
      seen.add(clause.id);
      if (typeof clause.field !== 'string' || !OPERATORS.includes(clause.operator)) return false;
    }
    return true;
  }
  return false;
}

const BACK_TARGETS: Partial<Record<SessionStep, SessionStep>> = {
  TRACE: 'PREDICT',
  DIAGNOSE: 'TRACE',
  REPAIR: 'DIAGNOSE',
  RETEST: 'REPAIR',
};

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  if (typeof action.revision === 'number' && action.revision !== state.revision) return state;

  switch (action.type) {
    case 'START':
      if (state.step !== 'INTRO') return state;
      return { ...state, revision: state.revision + 1, step: 'PREDICT' };

    case 'SET_PREDICTION': {
      if (state.step !== 'PREDICT') return state;
      const mission = missions[state.missionIndex];
      const known =
        action.actionId === 'none' || mission.content.actions.some((a) => a.id === action.actionId);
      if (!known) return state;
      return patchCurrent(state, (record) => ({ ...record, prediction: { actionId: action.actionId } }));
    }

    case 'CONFIRM_PREDICTION': {
      if (state.step !== 'PREDICT') return state;
      if (!state.missions[state.missionIndex].prediction) return state;
      return { ...state, revision: state.revision + 1, step: 'TRACE' };
    }

    case 'REVEAL_NEXT_RULE': {
      if (state.step !== 'TRACE') return state;
      const record = state.missions[state.missionIndex];
      const next = missions[state.missionIndex].rules.find((r) => !record.revealedRuleIds.includes(r.id));
      if (!next) return state;
      return patchCurrent(state, (rec) => ({
        ...rec,
        revealedRuleIds: [...rec.revealedRuleIds, next.id],
      }));
    }

    case 'CONFIRM_TRACE': {
      if (state.step !== 'TRACE') return state;
      const record = state.missions[state.missionIndex];
      if (record.revealedRuleIds.length !== missions[state.missionIndex].rules.length) return state;
      return { ...state, revision: state.revision + 1, step: 'DIAGNOSE' };
    }

    case 'SET_DIAGNOSIS': {
      if (state.step !== 'DIAGNOSE') return state;
      if (!CHOOSABLE_DIAGNOSES.includes(action.diagnosis)) return state;
      return patchCurrent(state, (record) => ({
        ...record,
        diagnosisChoice: { diagnosis: action.diagnosis },
      }));
    }

    case 'CONFIRM_DIAGNOSIS': {
      if (state.step !== 'DIAGNOSE') return state;
      if (!state.missions[state.missionIndex].diagnosisChoice) return state;
      return { ...state, revision: state.revision + 1, step: 'REPAIR' };
    }

    case 'RUN_RETEST': {
      if (state.step !== 'REPAIR') return state;
      if (!validProposal(state.missionIndex, action.proposal)) return state;
      const mission = missions[state.missionIndex];
      const evaluation = evaluateRepair(mission, action.proposal);
      return {
        ...patchCurrent(state, (record) => ({
          ...record,
          repair: { label: action.label, proposal: action.proposal },
          evaluation,
          accepted: evaluation.accepted,
        })),
        step: 'RETEST',
      };
    }

    case 'RETRY_REPAIR': {
      if (state.step !== 'RETEST') return state;
      if (state.missions[state.missionIndex].accepted) return state;
      return { ...state, revision: state.revision + 1, step: 'REPAIR' };
    }

    case 'ADVANCE': {
      if (state.step !== 'RETEST') return state;
      if (!state.missions[state.missionIndex].accepted) return state;
      if (state.missionIndex < missions.length - 1) {
        return { ...state, revision: state.revision + 1, step: 'PREDICT', missionIndex: state.missionIndex + 1 };
      }
      return { ...state, revision: state.revision + 1, step: 'REPORT' };
    }

    case 'GO_BACK': {
      if (state.step === 'PREDICT') {
        if (state.missionIndex === 0) return state;
        return {
          ...state,
          revision: state.revision + 1,
          step: 'RETEST',
          missionIndex: state.missionIndex - 1,
        };
      }
      const target = BACK_TARGETS[state.step];
      if (!target) return state;
      return { ...state, revision: state.revision + 1, step: target };
    }

    case 'RESTART_REQUEST':
      if (state.restartPending) return state;
      return { ...state, revision: state.revision + 1, restartPending: true };

    case 'RESTART_CANCEL':
      if (!state.restartPending) return state;
      return { ...state, revision: state.revision + 1, restartPending: false };

    case 'RESTART_CONFIRMED':
      return createInitialSessionState();

    default:
      return state;
  }
}
