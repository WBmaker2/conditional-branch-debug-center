import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../app/App';
import { missions } from '../../content/missions';
import { driveToReport } from '../../test/driveApp';

describe('결과 기록·인쇄·재시작 (계획 §12 Task 6)', () => {
  beforeEach(() => {
    vi.stubGlobal('print', vi.fn());
  });

  it('여섯 미션을 마치면 최초 판단→근거→수정 결과를 미션별로 보여 주고 점수·순위는 없다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await driveToReport(user);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('디버그 기록');
    for (const mission of missions) {
      expect(screen.getByText(new RegExp(mission.content.title))).toBeInTheDocument();
    }
    expect(screen.getAllByText(/통과: 모든 사례/).length).toBe(6);
    expect(screen.queryByText(/점수/)).not.toBeInTheDocument();
    expect(screen.queryByText(/순위/)).not.toBeInTheDocument();
    expect(screen.queryByText(/등급/)).not.toBeInTheDocument();
  });

  it('인쇄 버튼이 window.print를 부르고 이름 입력란이 없다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await driveToReport(user);
    await user.click(screen.getByRole('button', { name: '인쇄하기' }));
    expect(window.print).toHaveBeenCalledTimes(1);
    expect(screen.queryByLabelText(/이름/)).not.toBeInTheDocument();
  });

  it('처음부터 다시 하기는 확인 대화상자 뒤 세션을 완전히 비운다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await driveToReport(user);
    await user.click(screen.getByRole('button', { name: '처음부터 다시 하기' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '네, 새로 시작해요' }));
    expect(screen.getByText('오늘의 임무: 빠진 조건 찾기')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    // 다시 시작하면 1번 미션부터 새로 시작한다.
    await user.click(screen.getByRole('button', { name: '학습 시작하기' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('1번 미션');
  });
});
