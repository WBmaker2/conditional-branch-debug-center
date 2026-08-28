import type { Dispatch } from 'react';
import type { MissionRecord, SessionAction } from '../../app/sessionReducer';
import { ActionButton } from '../../components/ActionButton';
import type { LearningMission, RuleRun } from '../../domain/types';
import { FeedbackPanel } from './FeedbackPanel';
import { actionLabel, caseLabel, diagnosisBadge } from './labels';

interface RetestPanelProps {
  mission: LearningMission;
  record: MissionRecord;
  isLastMission: boolean;
  dispatch: Dispatch<SessionAction>;
}

function acceptMessages(mission: LearningMission, record: MissionRecord): string[] {
  const keys = record.evaluation?.evidenceKeys ?? [];
  const messages = ['통과! 모든 사례에 행동이 정해졌어요.'];
  if (keys.includes('repair:no-change')) {
    messages.push('규칙을 고치지 않고 전체 덮임을 확인했어요.');
  } else {
    messages.push('딱 한 곳만 고쳤어요.');
  }
  if (keys.includes('coverage:all-decided')) {
    messages.push(`${mission.finiteDomain.length}개 사례 모두에서 규칙이 정확히 하나씩 당첨됐어요.`);
  }
  if (keys.includes('coverage:overlap-with-priority')) {
    messages.push(
      '겹치는 사례는 우선순위로 먼저 실행할 규칙을 정했어요. 기록에는 겹침으로 남아요.',
    );
  }
  return messages;
}

function rejectMessages(mission: LearningMission, record: MissionRecord): string[] {
  const keys = record.evaluation?.evidenceKeys ?? [];
  const messages: string[] = ['아직 통과하지 못했어요. 근거를 볼까요?'];
  if (keys.includes('coverage:gaps-remain')) {
    messages.push('아직 아무 규칙에도 당첨되지 않는 사례가 남았어요. 표에서 갭 행을 찾아보세요.');
  }
  if (keys.includes('change:not-minimal')) {
    messages.push('한 번에 한 군데만 고칠 수 있어요. 조건 하나 또는 순서 하나만 바꿔 보세요.');
  }
  if (keys.includes('coverage:overlap-with-priority')) {
    messages.push('겹치는 사례는 우선순위로 실행 순서를 정했어요. 남은 문제를 표에서 찾아보세요.');
  }
  if (mission.finiteDomain.length === 0) {
    messages.push('사례가 없어요.');
  }
  return messages;
}

function runBadge(run: RuleRun) {
  const badge = diagnosisBadge(run.diagnosis);
  return <span className={`badge badge--${badge.tone}`}>{badge.text}</span>;
}

// 계획 §9 재시험판: 수정한 규칙으로 finiteDomain 전체를 다시 시험한다.
export function RetestPanel({ mission, record, isLastMission, dispatch }: RetestPanelProps) {
  const runs = record.evaluation?.runs ?? [];
  const accepted = record.accepted;

  return (
    <section className="card" aria-labelledby="retest-heading">
      <h2 id="retest-heading" className="card__title">
        5단계 · 재시험판
      </h2>
      <p>
        고친 규칙으로 이 미션의 모든 사례 {mission.finiteDomain.length}개를 다시 시험했어요.
        {record.repair && (
          <>
            {' '}
            적용한 수정: <strong>{record.repair.label}</strong>
          </>
        )}
      </p>
      <table className="retest-table">
        <caption className="sr-only">{mission.content.title} 전체 사례 재시험 결과</caption>
        <thead>
          <tr>
            <th scope="col">사례</th>
            <th scope="col">행동</th>
            <th scope="col">판정</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => {
            const input = mission.finiteDomain.find((c) => c.id === run.inputId);
            return (
              <tr key={run.inputId}>
                <td data-th="사례">{input ? caseLabel(mission, input) : run.inputId}</td>
                <td data-th="행동">
                  {run.actionId ? actionLabel(mission, run.actionId) : '아무 일도 없어요'}
                </td>
                <td data-th="판정">
                  {runBadge(run)}
                  {run.diagnosis === 'overlap' && run.actionId && (
                    <> 우선 실행: {actionLabel(mission, run.actionId)}</>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <FeedbackPanel
        tone={accepted ? 'success' : 'warning'}
        messages={accepted ? acceptMessages(mission, record) : rejectMessages(mission, record)}
      />
      <div className="actions-row">
        {accepted ? (
          <ActionButton onClick={() => dispatch({ type: 'ADVANCE' })}>
            {isLastMission ? '디버그 기록 보기' : '다음 미션 열기'}
          </ActionButton>
        ) : (
          <ActionButton onClick={() => dispatch({ type: 'RETRY_REPAIR' })}>다시 고치기</ActionButton>
        )}
      </div>
    </section>
  );
}
