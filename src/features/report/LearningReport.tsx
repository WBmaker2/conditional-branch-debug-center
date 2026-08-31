import type { SessionState } from '../../app/sessionReducer';
import { ActionButton } from '../../components/ActionButton';
import { missions } from '../../content/missions';
import { analyzeCoverage, runRuleSet } from '../../domain/branchEvaluator';
import { actionLabel, caseLabel, diagnosisBadge } from '../branch-debug/labels';
import './print.css';

interface LearningReportProps {
  state: SessionState;
  onRestartRequest: () => void;
}

// 계획 §9 기록판: 최초 판단→근거→수정 결과를 미션별로 보여 주고 점수·순위를 만들지 않는다.
export function LearningReport({ state, onRestartRequest }: LearningReportProps) {
  return (
    <div>
      <p>새로고침하면 이 기록은 사라져요. 남겨 두려면 인쇄해 주세요.</p>
      {missions.map((mission, index) => {
        const record = state.missions[index];
        const focus = mission.finiteDomain.find((c) => c.id === mission.content.focusInputId);
        const initialRun = focus ? runRuleSet(mission, focus) : null;
        const failed = analyzeCoverage(mission).filter(
          (run) => run.diagnosis !== 'deterministic',
        );
        const badge = initialRun ? diagnosisBadge(initialRun.diagnosis) : null;
        const headingId = `report-${mission.id}`;
        return (
          <section key={mission.id} className="card report-card" aria-labelledby={headingId}>
            <h2 id={headingId} className="card__title">
              {index + 1}. {mission.content.title}
            </h2>
            <dl>
              <dt>최초 판단</dt>
              <dd>
                {focus && initialRun && badge ? (
                  <>
                    {caseLabel(mission, focus)}{' '}
                    <span className={`badge badge--${badge.tone}`}>{badge.text}</span>
                  </>
                ) : (
                  '기록 없음'
                )}
              </dd>
              <dt>고친 내용</dt>
              <dd>{record.repair?.label ?? '기록 없음'}</dd>
              <dt>재시험 결과</dt>
              <dd>
                {record.accepted
                  ? `통과: 모든 사례 ${mission.finiteDomain.length}개에 행동이 정해졌어요.`
                  : '아직 통과하지 못했어요.'}
              </dd>
              <dt>고쳐야 했던 사례</dt>
              <dd>
                {failed.length === 0
                  ? '없었어요. 처음부터 각 사례에 맞는 규칙이 하나씩 있었어요.'
                  : failed
                      .map((run) => {
                        const input = mission.finiteDomain.find((c) => c.id === run.inputId);
                        const failedBadge = diagnosisBadge(run.diagnosis);
                        return `${input ? caseLabel(mission, input) : run.inputId} (${failedBadge.text})`;
                      })
                      .join(', ')}
              </dd>
              <dt>예측</dt>
              <dd>
                {record.prediction
                  ? record.prediction.actionId === 'none'
                    ? '아무 일도 일어나지 않을 거라고 예측했어요.'
                    : `${actionLabel(mission, record.prediction.actionId)}(이)라고 예측했어요.`
                  : '기록 없음'}
              </dd>
            </dl>
          </section>
        );
      })}
      <section className="card next-learning" aria-labelledby="next-learning-heading">
        <p className="eyebrow">다음에 해 볼 일</p>
        <h2 id="next-learning-heading" className="card__title">
          친구에게 규칙을 설명해 보세요
        </h2>
        <p>
          미션 하나를 골라 <strong>입력 → 조건 → 행동</strong>의 순서를 친구에게 설명해 보세요.
          어떤 조건에서 갭이나 겹침이 생겼는지도 함께 말해 보면 좋아요.
        </p>
      </section>
      <div className="actions-row no-print">
        <ActionButton onClick={() => window.print()}>인쇄하기</ActionButton>
        <ActionButton variant="secondary" onClick={onRestartRequest}>
          처음부터 다시 하기
        </ActionButton>
      </div>
    </div>
  );
}
