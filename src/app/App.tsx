import {
  Component,
  useEffect,
  useReducer,
  useRef,
  type Dispatch,
  type ReactNode,
} from 'react';
import { AccessibilityToolbar } from '../accessibility/AccessibilityToolbar';
import { ActionButton } from '../components/ActionButton';
import { ModalDialog } from '../components/ModalDialog';
import { ProgressSteps } from '../components/ProgressSteps';
import { UpdateHistoryButton } from '../components/UpdateHistoryButton';
import { missions } from '../content/missions';
import { EntranceScreen } from '../features/branch-debug/EntranceScreen';
import { RuleWorkbench } from '../features/branch-debug/RuleWorkbench';
import { LearningReport } from '../features/report/LearningReport';
import {
  createInitialSessionState,
  sessionReducer,
  type SessionAction,
  type SessionState,
} from './sessionReducer';

const STEP_HEADING: Record<Exclude<SessionState['step'], 'INTRO' | 'REPORT'>, string> = {
  PREDICT: '예측판',
  TRACE: '규칙 추적판',
  DIAGNOSE: '진단판',
  REPAIR: '수리판',
  RETEST: '재시험판',
};

// 계획 §11: 기술 스택이나 원시 오류를 노출하지 않는 어린이용 오류 화면.
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <main className="app-shell error-shell">
          <h1>활동을 다시 불러오지 못했어요</h1>
          <p>화면이 멈췄어요. 답은 저장되지 않으니 처음부터 다시 시작할 수 있어요.</p>
          <ActionButton onClick={() => window.location.reload()}>처음부터 다시 하기</ActionButton>
        </main>
      );
    }
    return this.props.children;
  }
}

function AppShell() {
  const [state, dispatch]: [SessionState, Dispatch<SessionAction>] = useReducer(
    sessionReducer,
    undefined,
    createInitialSessionState,
  );
  // 계획 §3: 단계가 바뀌면 mainHeadingRef로 초점을 옮기고 시작점으로 스크롤한다.
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const mission = missions[state.missionIndex];

  useEffect(() => {
    mainHeadingRef.current?.focus();
    window.scrollTo(0, 0);
  }, [state.step, state.missionIndex]);

  const headingText =
    state.step === 'INTRO'
      ? '조건 분기 디버그 센터'
      : state.step === 'REPORT'
        ? '디버그 기록'
        : `${state.missionIndex + 1}번 미션 · ${mission.content.title} — ${STEP_HEADING[state.step]}`;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <header className="app-header">
        <span className="app-header__brand">조건 분기 디버그 센터</span>
        <div className="app-header__tools">
          <AccessibilityToolbar />
          <UpdateHistoryButton />
        </div>
      </header>
      <ProgressSteps current={state.step} />
      <main id="main-content">
        <h1 ref={mainHeadingRef} tabIndex={-1} className="main-heading">
          {headingText}
        </h1>
        {state.step === 'INTRO' && <EntranceScreen onStart={() => dispatch({ type: 'START' })} />}
        {state.step === 'REPORT' && (
          <LearningReport
            state={state}
            onRestartRequest={() => dispatch({ type: 'RESTART_REQUEST' })}
          />
        )}
        {state.step !== 'INTRO' && state.step !== 'REPORT' && (
          <RuleWorkbench state={state} dispatch={dispatch} />
        )}
      </main>
      <ModalDialog
        open={state.restartPending}
        title="처음부터 다시 시작할까요?"
        onClose={() => dispatch({ type: 'RESTART_CANCEL' })}
      >
        <p>지금까지의 답은 모두 사라져요. 새로 시작할까요?</p>
        <div className="dialog-actions">
          <ActionButton onClick={() => dispatch({ type: 'RESTART_CONFIRMED' })}>
            네, 새로 시작해요
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={() => dispatch({ type: 'RESTART_CANCEL' })}
          >
            아니요, 계속 볼게요
          </ActionButton>
        </div>
      </ModalDialog>
      <footer className="app-footer">
        <p>
          이 앱의 전등·화분·선풍기·분류기·버스는 학습용 가상 모형이에요. 실제 기계나 교통
          시스템을 조종하지 않아요.
        </p>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <AppShell />
    </ErrorBoundary>
  );
}
