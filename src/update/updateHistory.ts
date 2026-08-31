export interface UpdateEntry {
  readonly date: string;
  readonly note: string;
}

// 계획 §10: 최초 항목은 2026-08-28 — 구현 계획 확정이며, 수정 때마다 최신 날짜를 앞에 추가한다.
export const updateHistory: readonly UpdateEntry[] = [
  { date: '2026-08-31', note: '학습 단계 위계·진단 근거·모바일 수리 흐름 개선' },
  { date: '2026-08-28', note: '구현 계획 확정' },
];
