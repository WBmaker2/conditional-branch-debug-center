import type { SessionStep } from '../domain/types';

const STEP_LABELS: readonly { readonly key: SessionStep; readonly label: string }[] = [
  { key: 'INTRO', label: '입구' },
  { key: 'PREDICT', label: '예측' },
  { key: 'TRACE', label: '추적' },
  { key: 'DIAGNOSE', label: '진단' },
  { key: 'REPAIR', label: '수리' },
  { key: 'RETEST', label: '재시험' },
  { key: 'REPORT', label: '기록' },
];

export function ProgressSteps({ current }: { current: SessionStep }) {
  return (
    <nav className="progress no-print" aria-label="학습 단계">
      <ol className="progress__list">
        {STEP_LABELS.map((step, index) => (
          <li
            key={step.key}
            className={`progress__step${step.key === current ? ' is-current' : ''}`}
            aria-current={step.key === current ? 'step' : undefined}
            aria-label={`${index + 1}단계 ${step.label}`}
          >
            <span className="progress__num" aria-hidden="true">
              {index + 1}
            </span>
            <span className="progress__label">{step.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
