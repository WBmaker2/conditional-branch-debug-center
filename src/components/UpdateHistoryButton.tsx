import { useState } from 'react';
import { UpdateHistoryDialog } from './UpdateHistoryDialog';

// 계획 §10: 모든 단계에서 열 수 있는 헤더의 작은 버튼.
export function UpdateHistoryButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="btn btn--ghost btn--small"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        업데이트 내역
      </button>
      <UpdateHistoryDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
