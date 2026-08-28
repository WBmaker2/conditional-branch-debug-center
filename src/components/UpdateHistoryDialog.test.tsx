import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { UpdateHistoryDialog } from './UpdateHistoryDialog';

describe('UpdateHistoryDialog', () => {
  it('최초 항목 2026-08-28 — 구현 계획 확정을 보여 준다', () => {
    const onClose = vi.fn();
    render(<UpdateHistoryDialog open onClose={onClose} />);
    expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toBeInTheDocument();
    expect(screen.getByText(/2026-08-28/)).toBeInTheDocument();
    expect(screen.getByText(/구현 계획 확정/)).toBeInTheDocument();
  });

  it('열려 있지 않으면 아무것도 그리지 않는다', () => {
    render(<UpdateHistoryDialog open={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('닫기 버튼과 Escape로 onClose를 부른다', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<UpdateHistoryDialog open onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: '닫기' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
