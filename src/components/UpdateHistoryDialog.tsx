import { ModalDialog } from './ModalDialog';
import { updateHistory } from '../update/updateHistory';

interface UpdateHistoryDialogProps {
  open: boolean;
  onClose: () => void;
}

export function UpdateHistoryDialog({ open, onClose }: UpdateHistoryDialogProps) {
  return (
    <ModalDialog open={open} onClose={onClose} title="업데이트 내역">
      <ul className="update-list">
        {updateHistory.map((entry) => (
          <li key={`${entry.date}-${entry.note}`}>
            <strong>{entry.date}</strong> — {entry.note}
          </li>
        ))}
      </ul>
    </ModalDialog>
  );
}
