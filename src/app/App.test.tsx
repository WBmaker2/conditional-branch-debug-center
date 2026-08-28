import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { missions } from '../content/missions';
import { App } from './App';

describe('앱 셸과 입구 (계획 §12 Task 4)', () => {
  it('학습 목표, 6개 미션, 예상 시간, 저장하지 않음 안내를 보여 준다', () => {
    render(<App />);
    expect(screen.getByText('오늘의 임무: 빠진 조건 찾기')).toBeInTheDocument();
    expect(screen.getAllByText(/갭/).length).toBeGreaterThan(0);
    for (const mission of missions) {
      expect(screen.getByText(new RegExp(mission.content.title))).toBeInTheDocument();
    }
    expect(screen.getByText(/예상 시간: 20~30분/)).toBeInTheDocument();
    expect(screen.getByText(/저장하거나 보내지 않아요/)).toBeInTheDocument();
    expect(screen.getByText(/새로고침하면.*사라져요/)).toBeInTheDocument();
  });

  it('Enter로 시작하면 mainHeading에 초점이 옮겨진다', async () => {
    const user = userEvent.setup();
    render(<App />);
    const startButton = screen.getByRole('button', { name: '학습 시작하기' });
    startButton.focus();
    await user.keyboard('{Enter}');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveFocus();
    expect(heading).toHaveTextContent('1번 미션');
    expect(screen.getAllByText(/가상 전등 밝기 조절소/).length).toBeGreaterThan(0);
  });

  it('Space로도 시작할 수 있다', async () => {
    const user = userEvent.setup();
    render(<App />);
    screen.getByRole('button', { name: '학습 시작하기' }).focus();
    await user.keyboard('{ }');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('1번 미션');
  });

  it('업데이트 내역은 Escape로 닫고 초점을 호출 버튼으로 돌려준다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: '업데이트 내역' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('2026-08-28 — 구현 계획 확정');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '업데이트 내역' })).toHaveFocus();
  });
});
