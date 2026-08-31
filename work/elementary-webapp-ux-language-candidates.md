# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/conditional-branch-debug-center`
- Files scanned: `46`
- Candidates: `870`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| e2e/keyboard.spec.ts:7:43 | text | element === document.activeElement)) return; await page.keyboard.press('Tab'); } throw new Error('Tab으로 대상에 도달하지 못했다'); } async function selectGroupRadio(page: Page, firstRadio: Locator, arrowDowns: number): Promise | feedback-or-error | long-or-dense, shaming-tone |
| e2e/keyboard.spec.ts:10:20 | text | Tab으로 대상에 도달하지 못했다 | feedback-or-error | shaming-tone |
| e2e/keyboard.spec.ts:26:7 | text | 키보드만으로 안내 미션을 완주한다 | instruction | — |
| e2e/keyboard.spec.ts:26:47 | text | { await page.goto('./'); await pressWhenFocused(page, page.getByRole('button', { name: '학습 시작하기' }), 'Enter'); // 예측: 첫 라디오(전등 켜기)에서 두 칸 내려가 '아무 일도 일어나지 않아요'를 고른다. await selectGroupRadio(page, page.getByRole('radio', { name: '전등 켜기' }), 2); await pressWhenFocused(page, page.getByRole('button', { name: '예측 완료하기' }), 'Enter'); // 규칙 추적: 규칙 시험하기 ×2 → 진단하러 가기. for (let i = 0; i | button-or-action, instruction | long-or-dense |
| e2e/keyboard.spec.ts:29:48 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:29:66 | text | 학습 시작하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:29:80 | text | Enter | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:31:34 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:32:65 | text | 전등 켜기 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:33:48 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:33:66 | text | 예측 완료하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:33:80 | text | Enter | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:37:50 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:37:68 | text | 규칙 시험하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:37:82 | text | Enter | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:39:48 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:39:66 | text | 진단하러 가기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:39:80 | text | Enter | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:43:48 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:43:66 | text | 진단 완료하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:43:80 | text | Enter | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:48:65 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:49:65 | text | 보다 작다(<) | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:51:34 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:51:52 | text | 수정안 재시험 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:56:48 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:56:66 | text | 다음 미션 열기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:56:81 | text | Enter | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:57:32 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:6:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:7:4 | text | 기다리기 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:8:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:9:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:10:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:11:4 | text | 전부 탑승 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:13:21 | text | 갭 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:13:26 | text | 겹침 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:13:32 | text | 갭 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:13:37 | text | 갭 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:13:42 | text | 겹침 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:13:48 | text | 한 규칙 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:14:17 | text | 조건 고치기 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:14:27 | text | 실행 순서 정하기 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:14:40 | text | 조건 고치기 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:14:50 | text | 조건 고치기 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:14:60 | text | 조건 추가하기 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:14:71 | text | 결함 없음 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:15:17 | text | 전등 켜기 규칙 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:15:29 | text | 기다리기 규칙 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:15:40 | text | 선풍기 켜기 규칙 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:15:53 | text | 반납 알림 보내기 규칙 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:15:69 | text | 종이 통으로 보내기 규칙 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:16:19 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:16:39 | text | 온도: 25도보다 큼 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:16:54 | text | 반납 기한: -1일보다 작거나 같음 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:17:21 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:17:41 | text | 보다 크거나 같다(≥) | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:17:57 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:18:30 | text | 기준값: 당일 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:19:34 | text | 오염 상태: 깨끗함 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:21:69 | text | { await page.getByRole('radio', { name: PREDICTIONS[index] }).click(); await page.getByRole('button', { name: '예측 완료하기' }).click(); for (let i = 0; i | button-or-action | long-or-dense, technical-or-internal |
| e2e/learner-flow.spec.ts:23:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:23:43 | text | 예측 완료하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:25:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:25:45 | text | 규칙 시험하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:27:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:27:43 | text | 진단하러 가기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:29:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:29:43 | text | 진단 완료하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:36:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:36:43 | text | 수정안 재시험 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:38:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:41:7 | text | 안내 갭 미션에서 빠진 조건을 찾고 최소 수정 뒤 재시험한다 | instruction | — |
| e2e/learner-flow.spec.ts:43:32 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:45:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:45:43 | text | 학습 시작하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:46:32 | text | 밝기: 2단계 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:48:32 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:51:7 | text | 여섯 미션을 모두 마치면 최초 판단과 수정 근거가 기록된다 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:51:61 | text | { await page.goto('./'); await page.getByRole('button', { name: '학습 시작하기' }).click(); for (let i = 0; i | button-or-action | long-or-dense |
| e2e/learner-flow.spec.ts:53:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:53:43 | text | 학습 시작하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:57:32 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:57:69 | text | 디버그 기록 | heading | repeated-text |
| e2e/learner-flow.spec.ts:59:6 | text | 가상 전등 밝기 조절소 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:60:6 | text | 화분 물 주기 검사소 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:61:6 | text | 교실 선풍기 경계점 관측소 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:62:6 | text | 도서 반납 알림 국 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:63:6 | text | 재질 분류기 점검실 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:64:6 | text | 셔틀 버스 배차 검증소 | learner-text-candidate | abstract-or-formal, repeated-text |
| e2e/learner-flow.spec.ts:72:7 | text | 겹침 미션은 조건 추가 해법으로도 통과한다 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:72:52 | text | { await page.goto('./'); await page.getByRole('button', { name: '학습 시작하기' }).click(); await playMission(page, 0); // 미션 2(화분)를 조건 추가 해법으로 푼다. await page.getByRole('radio', { name: '기다리기' }).click(); await page.getByRole('button', { name: '예측 완료하기' }).click(); for (let i = 0; i | button-or-action | long-or-dense |
| e2e/learner-flow.spec.ts:74:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:74:43 | text | 학습 시작하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:77:42 | text | 기다리기 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:78:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:78:43 | text | 예측 완료하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:80:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:80:45 | text | 규칙 시험하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:82:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:82:43 | text | 진단하러 가기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:84:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:84:43 | text | 진단 완료하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:87:42 | text | 비 예보: 아니오 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:88:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:88:43 | text | 수정안 재시험 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:90:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:90:43 | text | 다음 미션 열기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:91:32 | text | heading | heading | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:18:9 | text | ${viewport.width}×${viewport.height}: 주요 화면에서 가로 넘침이 없다 | learner-text-candidate | long-or-dense, technical-or-internal |
| e2e/mobile-reduced-motion.spec.ts:18:86 | text | { await page.setViewportSize(viewport); await page.goto('./'); await expectNoHorizontalOverflow(page); await page.getByRole('button', { name: '학습 시작하기' }).click(); await expect(page.getByText('1단계 · 예측판')).toBeVisible(); await expectNoHorizontalOverflow(page); await page.getByRole('radio', { name: '아무 일도 일어나지 않아요' }).click(); await page.getByRole('button', { name: '예측 완료하기' }).click(); for (let i = 0; i | button-or-action | long-or-dense |
| e2e/mobile-reduced-motion.spec.ts:23:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:23:45 | text | 학습 시작하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:24:34 | text | 1단계 · 예측판 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:27:44 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:28:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:28:45 | text | 예측 완료하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:30:29 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:30:47 | text | 규칙 시험하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:34:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:34:45 | text | 진단하러 가기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:36:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:36:45 | text | 진단 완료하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:39:44 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:40:44 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:41:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:41:45 | text | 수정안 재시험 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:42:34 | text | 5단계 · 재시험판 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:47:7 | text | 축소 모션에서 gi-pulse가 animation none + 3px 외곽선·필수 배지가 된다 | learner-text-candidate | — |
| e2e/mobile-reduced-motion.spec.ts:51:25 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:51:43 | text | 학습 시작하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:52:42 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:53:25 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:53:43 | text | 예측 완료하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:55:33 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:55:51 | text | 규칙 시험하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:68:63 | text | 필수 | learner-text-candidate | repeated-text |
| eslint.config.js:20:8 | text | @typescript-eslint/no-unused-vars | feedback-or-error | — |
| eslint.config.js:20:46 | text | error | feedback-or-error | — |
| index.html:9:16 | text | 초등 5~6학년 조건 분기 디버깅 학습 앱. 갭과 겹침을 찾고 최소 수정을 근거로 설명해요. | learner-text-candidate | — |
| index.html:12:12 | text | 조건 분기 디버그 센터 | learner-text-candidate | repeated-text |
| scripts/check-file-lines.mjs:30:20 | text | ${relative(process.cwd(), offender.path)}: ${offender.lines}줄 (500줄 미만 필요) | feedback-or-error | long-or-dense |
| scripts/check-file-lines.mjs:34:14 | text | 검사 통과: 모든 TS·TSX·CSS 파일이 500줄 미만입니다. | learner-text-candidate | technical-or-internal |
| src/accessibility/AccessibilityToolbar.tsx:11:17 | text | { document.documentElement.classList.remove('big-text', 'reduce-motion'); }; }, [bigText, lessMotion]); return ( | learner-text-candidate | long-or-dense |
| src/accessibility/AccessibilityToolbar.tsx:17:55 | aria-label | 화면 도구 | aria-label | — |
| src/accessibility/AccessibilityToolbar.tsx:23:8 | text | 글자 크게 | button-or-action | — |
| src/accessibility/AccessibilityToolbar.tsx:31:8 | text | 움직임 줄이기 | button-or-action | — |
| src/app/App.test.tsx:7:11 | text | 앱 셸과 입구 (계획 §12 Task 4) | learner-text-candidate | — |
| src/app/App.test.tsx:8:7 | text | 학습 목표, 6개 미션, 예상 시간, 저장하지 않음 안내를 보여 준다 | instruction | — |
| src/app/App.test.tsx:10:30 | text | 오늘의 임무: 빠진 조건 찾기 | learner-text-candidate | repeated-text |
| src/app/App.test.tsx:20:7 | text | Enter로 시작하면 mainHeading에 초점이 옮겨진다 | heading | — |
| src/app/App.test.tsx:20:54 | text | { const user = userEvent.setup(); render( | heading | — |
| src/app/App.test.tsx:23:43 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:23:61 | text | 학습 시작하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:26:39 | text | heading | heading | repeated-text |
| src/app/App.test.tsx:28:40 | text | 1번 미션 | heading | repeated-text |
| src/app/App.test.tsx:32:7 | text | Space로도 시작할 수 있다 | learner-text-candidate | — |
| src/app/App.test.tsx:35:23 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:35:41 | text | 학습 시작하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:37:30 | text | heading | heading | repeated-text |
| src/app/App.test.tsx:37:74 | text | 1번 미션 | heading | repeated-text |
| src/app/App.test.tsx:40:7 | text | 업데이트 내역은 Escape로 닫고 초점을 호출 버튼으로 돌려준다 | learner-text-candidate | — |
| src/app/App.test.tsx:43:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:43:58 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/app/App.test.tsx:45:39 | text | 2026-08-28 — 구현 계획 확정 | learner-text-candidate | — |
| src/app/App.test.tsx:48:30 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:48:48 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/app/App.tsx:25:50 | text | step | heading | — |
| src/app/App.tsx:25:59 | text | INTRO | heading | repeated-text, technical-or-internal |
| src/app/App.tsx:25:69 | text | REPORT | heading | repeated-text, technical-or-internal |
| src/app/App.tsx:25:86 | text | = { PREDICT: '예측판', TRACE: '규칙 추적판', DIAGNOSE: '진단판', REPAIR: '수리판', RETEST: '재시험판', }; // 계획 §11: 기술 스택이나 원시 오류를 노출하지 않는 어린이용 오류 화면. class ErrorBoundary extends Component | heading, feedback-or-error | long-or-dense, technical-or-internal |
| src/app/App.tsx:26:13 | text | 예측판 | learner-text-candidate | — |
| src/app/App.tsx:27:11 | text | 규칙 추적판 | learner-text-candidate | — |
| src/app/App.tsx:28:14 | text | 진단판 | learner-text-candidate | — |
| src/app/App.tsx:29:12 | text | 수리판 | learner-text-candidate | — |
| src/app/App.tsx:30:12 | text | 재시험판 | learner-text-candidate | — |
| src/app/App.tsx:34:86 | text | { override state = { hasError: false }; static getDerivedStateFromError() { return { hasError: true }; } override render() { if (this.state.hasError) { return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/App.tsx:45:15 | text | 활동을 다시 불러오지 못했어요 | heading | shaming-tone |
| src/app/App.tsx:46:14 | text | 화면이 멈췄어요. 답은 저장되지 않으니 처음부터 다시 시작할 수 있어요. | learner-text-candidate | — |
| src/app/App.tsx:47:66 | text | 처음부터 다시 하기 | learner-text-candidate | repeated-text |
| src/app/App.tsx:56:66 | text | ] = useReducer( sessionReducer, undefined, createInitialSessionState, ); // 계획 §3: 단계가 바뀌면 mainHeadingRef로 초점을 옮기고 시작점으로 스크롤한다. const mainHeadingRef = useRef | heading | long-or-dense, technical-or-internal |
| src/app/App.tsx:65:18 | text | { mainHeadingRef.current?.focus(); window.scrollTo(0, 0); }, [state.step, state.missionIndex]); const headingText = state.step === 'INTRO' ? '조건 분기 디버그 센터' : state.step === 'REPORT' ? '디버그 기록' : `${state.missionIndex + 1}번 미션 · ${mission.content.title} — ${STEP_HEADING[state.step]}`; return ( | heading | long-or-dense, technical-or-internal |
| src/app/App.tsx:72:10 | text | 조건 분기 디버그 센터 | learner-text-candidate | repeated-text |
| src/app/App.tsx:74:12 | text | 디버그 기록 | learner-text-candidate | repeated-text |
| src/app/App.tsx:75:12 | text | ${state.missionIndex + 1}번 미션 · ${mission.content.title} — ${STEP_HEADING[state.step]} | heading | long-or-dense, missing-term-explanation, technical-or-internal |
| src/app/App.tsx:80:45 | text | 조건 분기 디버그 센터 | learner-text-candidate | repeated-text |
| src/app/App.tsx:104:16 | title | 처음부터 다시 시작할까요? | title | — |
| src/app/App.tsx:107:12 | text | 지금까지의 답은 모두 사라져요. 새로 시작할까요? | learner-text-candidate | — |
| src/app/App.tsx:109:58 | text | RESTART_CONFIRMED | learner-text-candidate | — |
| src/app/App.tsx:109:81 | text | 네, 새로 시작해요 | learner-text-candidate | repeated-text |
| src/app/App.tsx:115:12 | text | 아니요, 계속 볼게요 | learner-text-candidate | — |
| src/app/App.tsx:121:12 | text | 이 앱의 전등·화분·선풍기·분류기·버스는 학습용 가상 모형이에요. 실제 기계나 교통 시스템을 조종하지 않아요. | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/app/App.tsx:126:11 | text | ); } export function App() { return ( | feedback-or-error | — |
| src/app/sessionReducer.test.ts:38:11 | text | 세션 reducer 전이 잠금 (계획 §9) | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:39:7 | text | 초기 상태는 INTRO이고 미션 인덱스는 0이다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:46:7 | text | START 후 예측 없이는 다음 단계로 갈 수 없다 | learner-text-candidate | technical-or-internal |
| src/app/sessionReducer.test.ts:51:7 | text | 알 수 없는 행동 ID를 고르면 상태가 바뀌지 않는다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/app/sessionReducer.test.ts:53:71 | text | 없는-행동 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:56:7 | text | 예측 → 추적(reveal 전부) → 진단 → 수리 순서만 통과한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:71:7 | text | 판단 보류(invalid-input)는 학생 선택지가 아니어서 반영되지 않는다 | input | technical-or-internal |
| src/app/sessionReducer.test.ts:76:7 | text | 수리 전에는 재시험을 실행할 수 없고, 승인 수리는 통과한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:81:17 | text | 아직 수리 전 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:95:7 | text | 없는 규칙을 고치는 수정안은 상태를 바꾸지 않는다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:100:17 | text | 잘못된 수리 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:101:44 | text | 없는-규칙 | learner-text-candidate | repeated-text |
| src/app/sessionReducer.test.ts:106:7 | text | 결함 없음 통과는 noFixAllowed 미션에서만 허용된다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:111:17 | text | 그대로 통과 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:117:7 | text | 통과한 재시험에서만 다음 미션이 열리고, 마지막엔 REPORT로 간다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:126:16 | text | ({ type: 'REVEAL_NEXT_RULE' }) as SessionAction, ), { type: 'CONFIRM_TRACE' }, { type: 'SET_DIAGNOSIS', diagnosis: 'gap' }, { type: 'CONFIRM_DIAGNOSIS' }, { type: 'RUN_RETEST', label: missions[i].repairs[0].label, proposal: firstRepairProposal(i) }, { type: 'ADVANCE' }, ); if (i | learner-text-candidate | long-or-dense, technical-or-internal |
| src/app/sessionReducer.test.ts:131:18 | text | RUN_RETEST | learner-text-candidate | repeated-text |
| src/app/sessionReducer.test.ts:147:7 | text | 미통과 재시험에서는 ADVANCE가 막히고 RETRY_REPAIR로 돌아간다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:151:15 | text | 빗나간 수리 | learner-text-candidate | repeated-text |
| src/app/sessionReducer.test.ts:163:54 | text | 빗나간 수리 | learner-text-candidate | repeated-text |
| src/app/sessionReducer.test.ts:166:7 | text | 뒤로 가기는 직전 단계의 응답을 보존한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:174:7 | text | 이전 revision을 넣은 응답은 상태를 바꾸지 않는다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:180:7 | text | 정의되지 않은 action은 상태를 바꾸지 않는다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:182:30 | text | 없는-액션 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:186:7 | text | 재시작 확인 뒤 초기 상태를 새 객체로 만든다 | learner-text-candidate | — |
| src/app/sessionReducer.ts:32:14 | text | RUN_RETEST | learner-text-candidate | repeated-text |
| src/app/sessionReducer.ts:159:43 | text | ({ ...record, repair: { label: action.label, proposal: action.proposal }, evaluation, accepted: evaluation.accepted, })), step: 'RETEST', }; } case 'RETRY_REPAIR': { if (state.step !== 'RETEST') return state; if (state.missions[state.missionIndex].accepted) return state; return { ...state, revision: state.revision + 1, step: 'REPAIR' }; } case 'ADVANCE': { if (state.step !== 'RETEST') return state; if (!state.missions[state.missionIndex].accepted) return state; if (state.missionIndex | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ActionButton.tsx:1:55 | text | react | learner-text-candidate | — |
| src/components/ActionButton.tsx:3:76 | text | { variant?: 'primary' \| 'secondary' \| 'ghost'; // 계획 §10: 필수 다음 행동(규칙 시험하기·수정안 재시험)에만 gi-pulse를 쓴다. pulse?: boolean; children: ReactNode; } export function ActionButton({ variant = 'primary', pulse = false, className, children, ...rest }: ActionButtonProps) { const classes = ['btn', `btn--${variant}`, pulse ? 'gi-pulse' : '', className ?? ''] .filter(Boolean) .join(' '); return ( | button-or-action | long-or-dense, technical-or-internal |
| src/components/ActionButton.tsx:17:28 | text | btn--${variant} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/components/ActionButton.tsx:21:57 | text | {children} {pulse ? ( | button-or-action | — |
| src/components/ActionButton.tsx:24:62 | text | 필수 | learner-text-candidate | repeated-text |
| src/components/ActionButton.tsx:26:16 | text | ) : null} | button-or-action | technical-or-internal |
| src/components/ModalDialog.tsx:6:17 | text | void; children: ReactNode; } const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'; // 계획 §12 Task 6: Escape와 닫기 버튼을 지원하고 닫은 뒤 호출 버튼으로 초점을 복원한다. export function ModalDialog({ open, title, onClose, children }: ModalDialogProps) { const titleId = useId(); const dialogRef = useRef | button-or-action, input | long-or-dense, technical-or-internal |
| src/components/ModalDialog.tsx:11:4 | text | button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]) | button-or-action, input | long-or-dense |
| src/components/ModalDialog.tsx:70:82 | text | 닫기 | button-or-action | repeated-text |
| src/components/ProgressSteps.tsx:4:11 | text | INTRO | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/ProgressSteps.tsx:4:27 | text | 입구 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:5:11 | text | PREDICT | learner-text-candidate | technical-or-internal |
| src/components/ProgressSteps.tsx:5:29 | text | 예측 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.tsx:6:11 | text | TRACE | learner-text-candidate | technical-or-internal |
| src/components/ProgressSteps.tsx:6:27 | text | 추적 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:7:11 | text | DIAGNOSE | learner-text-candidate | technical-or-internal |
| src/components/ProgressSteps.tsx:7:30 | text | 진단 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:8:11 | text | REPAIR | learner-text-candidate | technical-or-internal |
| src/components/ProgressSteps.tsx:8:28 | text | 수리 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:9:11 | text | RETEST | learner-text-candidate | technical-or-internal |
| src/components/ProgressSteps.tsx:9:28 | text | 재시험 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:10:11 | text | REPORT | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/ProgressSteps.tsx:10:28 | text | 기록 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:15:52 | aria-label | 학습 단계 | aria-label | — |
| src/components/ProgressSteps.tsx:23:64 | text | {index + 1} | learner-text-candidate | — |
| src/components/UpdateHistoryButton.tsx:14:8 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:7:7 | text | 최초 항목 2026-08-28 — 구현 계획 확정을 보여 준다 | learner-text-candidate | — |
| src/components/UpdateHistoryDialog.test.tsx:10:48 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:15:7 | text | 열려 있지 않으면 아무것도 그리지 않는다 | learner-text-candidate | — |
| src/components/UpdateHistoryDialog.test.tsx:20:7 | text | 닫기 버튼과 Escape로 onClose를 부른다 | learner-text-candidate | — |
| src/components/UpdateHistoryDialog.test.tsx:24:40 | text | button | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:24:58 | text | 닫기 | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:6:17 | text | void; } export function UpdateHistoryDialog({ open, onClose }: UpdateHistoryDialogProps) { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/UpdateHistoryDialog.tsx:11:55 | title | 업데이트 내역 | title | repeated-text |
| src/content/missions.test.ts:16:11 | text | 검수된 고정 미션 (계획 §4) | learner-text-candidate | — |
| src/content/missions.test.ts:17:7 | text | 정확히 6개 미션을 계획된 ID와 순서로 제공한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/missions.test.ts:21:7 | text | 전체 콘텐츠 검수기를 통과한다 | learner-text-candidate | — |
| src/content/missions.test.ts:25:7 | text | 모든 finiteDomain이 비어 있지 않다 | learner-text-candidate | — |
| src/content/missions.test.ts:31:7 | text | 계획 §4.1의 도메인 크기를 고정한다 | learner-text-candidate | — |
| src/content/missions.test.ts:45:7 | text | 모든 validRepairIds가 전체 통과하는 해법을 가리킨다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/missions.test.ts:58:7 | text | 검수 메타데이터와 오개념 방지 문구를 가진다 | learner-text-candidate | — |
| src/content/missions.test.ts:72:7 | text | branch-bus-06은 다른 필드 비교(FieldReference)를 사용한다 | learner-text-candidate | — |
| src/content/missions.ts:6:17 | text | 2026-08-28 구현 계획 §4.1 고정 fixture 기반 · docs/content-review.md 참조 | learner-text-candidate | long-or-dense |
| src/content/missions.ts:9:9 | text | 어떤 규칙에도 맞지 않아 아무 일도 일어나지 않는 사례가 있어요. | learner-text-candidate | — |
| src/content/missions.ts:10:13 | text | 두 개 이상의 규칙이 동시에 당첨되는 사례가 있어요. | learner-text-candidate | — |
| src/content/missions.ts:11:19 | text | 모든 사례가 딱 한 규칙씩 당첨돼요. | learner-text-candidate | — |
| src/content/missions.ts:37:6 | text | "2보다 작다"와 "3보다 크거나 같다" 사이에 밝기 2가 비어 있는지 먼저 보게 하고, 경계값 2를 반드시 시험하게 한다. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:39:13 | text | 가상 전등 밝기 조절소 | learner-text-candidate | repeated-text |
| src/content/missions.ts:41:8 | text | 방 안의 가상 전등은 밝기 센서 값(0~5단계)에 따라 켜지고 꺼려요. 그런데 밝기 2에서 전등이 멈춰 버린다는 통보가 왔어요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:42:12 | text | 밝기 2 사례를 시험해 빠진 조건(갭)을 찾고, 조건 한 곳만 고쳐 완성해요. | learner-text-candidate | — |
| src/content/missions.ts:44:23 | text | brightness | learner-text-candidate | — |
| src/content/missions.ts:44:44 | text | 밝기 | learner-text-candidate | — |
| src/content/missions.ts:44:56 | text | number | learner-text-candidate | repeated-text |
| src/content/missions.ts:44:72 | text | 단계 | learner-text-candidate | — |
| src/content/missions.ts:46:14 | text | lamp-on | learner-text-candidate | — |
| src/content/missions.ts:46:32 | text | 전등 켜기 | learner-text-candidate | repeated-text |
| src/content/missions.ts:47:14 | text | lamp-off | learner-text-candidate | — |
| src/content/missions.ts:47:33 | text | 전등 끄기 | learner-text-candidate | — |
| src/content/missions.ts:56:15 | text | 전등 켜기 규칙을 "밝기: 2보다 작거나 같음"으로 바꾸기 | learner-text-candidate | — |
| src/content/missions.ts:65:15 | text | 전등 끄기 규칙을 "밝기: 2보다 크거나 같음"으로 바꾸기 | learner-text-candidate | — |
| src/content/missions.ts:102:6 | text | 비 예보가 있으면 무조건 기다리는 것이 늘 옳다고 받아들이지 않게, 조건 좁히기와 우선순위 두 해법을 모두 인정하고 겹침 기록을 함께 보여 준다. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:104:13 | text | 화분 물 주기 검사소 | learner-text-candidate | repeated-text |
| src/content/missions.ts:106:8 | text | 화분 센서는 흙 촉촉함(1~3)과 비 예보(예/아니오)를 알려 줘요. 물 주기 규칙과 기다리기 규칙이 동시에 당첨되는 사례가 있다는 신고가 왔어요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:107:12 | text | 겹침 사례를 찾아 조건을 좁히거나 실행 순서를 정해요. | learner-text-candidate | — |
| src/content/missions.ts:110:16 | text | moisture | learner-text-candidate | — |
| src/content/missions.ts:110:35 | text | 흙 촉촉함 | learner-text-candidate | — |
| src/content/missions.ts:110:50 | text | number | learner-text-candidate | repeated-text |
| src/content/missions.ts:113:17 | text | 비 예보 | learner-text-candidate | — |
| src/content/missions.ts:115:33 | text | 예 | learner-text-candidate | repeated-text |
| src/content/missions.ts:115:45 | text | 아니오 | learner-text-candidate | repeated-text |
| src/content/missions.ts:119:14 | text | water | learner-text-candidate | — |
| src/content/missions.ts:119:30 | text | 물 주기 | learner-text-candidate | — |
| src/content/missions.ts:120:14 | text | wait | learner-text-candidate | repeated-text |
| src/content/missions.ts:120:29 | text | 기다리기 | learner-text-candidate | repeated-text |
| src/content/missions.ts:121:14 | text | skip | learner-text-candidate | — |
| src/content/missions.ts:121:29 | text | 그대로 두기 | learner-text-candidate | — |
| src/content/missions.ts:130:15 | text | 물 주기 규칙에 "비 예보: 아니오" 조건 추가하기 | learner-text-candidate | — |
| src/content/missions.ts:142:15 | text | 기다리기 규칙을 가장 먼저 실행하기 | learner-text-candidate | — |
| src/content/missions.ts:167:6 | text | 24도와 25도를 잇달아 시험하게 하여 "크다"와 "크거나 같다"의 차이 하나가 결과를 바꾸는 경험을 보장한다. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:169:13 | text | 교실 선풍기 경계점 관측소 | learner-text-candidate | repeated-text |
| src/content/missions.ts:171:8 | text | 교실 선풍기는 온도(20~30도)에 따라 켜지고 꺼려요. 24도에서는 꺼지고 30도에서는 켜지는데, 25도에서는 반응이 없대요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:172:12 | text | 24도와 25도 사례를 비교해 "크다"와 "이상"의 차이를 근거로 고쳐요. | learner-text-candidate | — |
| src/content/missions.ts:174:23 | text | temperature | learner-text-candidate | — |
| src/content/missions.ts:174:45 | text | 온도 | learner-text-candidate | — |
| src/content/missions.ts:174:57 | text | number | learner-text-candidate | repeated-text |
| src/content/missions.ts:174:73 | text | 도 | learner-text-candidate | — |
| src/content/missions.ts:176:14 | text | fan-on | learner-text-candidate | — |
| src/content/missions.ts:176:31 | text | 선풍기 켜기 | learner-text-candidate | — |
| src/content/missions.ts:177:14 | text | fan-off | learner-text-candidate | — |
| src/content/missions.ts:177:32 | text | 선풍기 끄기 | learner-text-candidate | — |
| src/content/missions.ts:186:15 | text | 선풍기 켜기 규칙을 "온도: 25보다 크거나 같음"으로 바꾸기 | learner-text-candidate | — |
| src/content/missions.ts:195:15 | text | 선풍기 끄기 규칙을 "온도: 25보다 작거나 같음"으로 바꾸기 | learner-text-candidate | — |
| src/content/missions.ts:237:6 | text | 당일(0)을 "기한 전"과 "기한 후" 어느 쪽에 넣을지 두 해법을 모두 인정하고, 반납한 책은 어떤 수리로도 알림 대상이 되지 않게 유지한다. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:239:13 | text | 도서 반납 알림 국 | learner-text-candidate | repeated-text |
| src/content/missions.ts:241:8 | text | 책 반납 시스템은 반납 여부와 반납 기한(기한 전 -1 · 당일 0 · 기한 후 1)을 봐요. 아직 반납하지 않은 책 중 당일 사례에서 아무 알림도 없대요. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/missions.ts:242:12 | text | 기한 전·당일·이후 사례를 모두 시험해 당일이 빠지지 않은 조건 묶음을 완성해요. | learner-text-candidate | — |
| src/content/missions.ts:247:17 | text | 반납 여부 | learner-text-candidate | — |
| src/content/missions.ts:249:33 | text | 반납함 | learner-text-candidate | — |
| src/content/missions.ts:249:47 | text | 아직 안 함 | learner-text-candidate | — |
| src/content/missions.ts:253:17 | text | 반납 기한 | learner-text-candidate | — |
| src/content/missions.ts:255:16 | text | 일 | learner-text-candidate | — |
| src/content/missions.ts:256:31 | text | 기한 전 | learner-text-candidate | — |
| src/content/missions.ts:256:44 | text | 당일 | learner-text-candidate | — |
| src/content/missions.ts:256:55 | text | 기한 후 | learner-text-candidate | — |
| src/content/missions.ts:260:14 | text | no-notice | learner-text-candidate | — |
| src/content/missions.ts:260:34 | text | 알림 끄기 | learner-text-candidate | — |
| src/content/missions.ts:261:14 | text | remind | learner-text-candidate | — |
| src/content/missions.ts:261:31 | text | 반납 알림 보내기 | learner-text-candidate | — |
| src/content/missions.ts:262:14 | text | overdue | instruction | — |
| src/content/missions.ts:262:32 | text | 연체 안내 보내기 | instruction | — |
| src/content/missions.ts:271:15 | text | 반납 알림 규칙의 기한 조건을 "0보다 작거나 같음"으로 바꾸기 | learner-text-candidate | — |
| src/content/missions.ts:283:15 | text | 연체 안내 규칙의 기한 조건을 "0보다 크거나 같음"으로 바꾸기 | instruction | — |
| src/content/missions.ts:323:6 | text | "재질만 보고 실행되면 안 된다"는 이유를 사례 근거로 말하게 하고, 우선순위 해법을 고를 때는 겹침이 기록에 남는 점을 함께 보여 준다. | learner-text-candidate | long-or-dense, multiple-conditions |
| src/content/missions.ts:325:13 | text | 재질 분류기 점검실 | learner-text-candidate | repeated-text |
| src/content/missions.ts:327:8 | text | 가상 쓰레기 분류기는 재질(종이/플라스틱)과 오염 상태(깨끗함/더러움)를 봐요. 더러운 종이가 종이 통 규칙과 먼저 확인 규칙에 동시에 당첨된대요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:328:12 | text | 재질만 보고 실행되는 규칙을 찾아 조건을 추가하거나 실행 순서를 정해요. | learner-text-candidate | — |
| src/content/missions.ts:333:17 | text | 재질 | learner-text-candidate | — |
| src/content/missions.ts:335:31 | text | 종이 | learner-text-candidate | — |
| src/content/missions.ts:335:46 | text | 플라스틱 | learner-text-candidate | — |
| src/content/missions.ts:339:17 | text | 오염 상태 | learner-text-candidate | — |
| src/content/missions.ts:341:33 | text | 깨끗함 | learner-text-candidate | — |
| src/content/missions.ts:341:47 | text | 더러움 | learner-text-candidate | — |
| src/content/missions.ts:345:14 | text | paper-bin | learner-text-candidate | — |
| src/content/missions.ts:345:34 | text | 종이 통으로 보내기 | learner-text-candidate | — |
| src/content/missions.ts:346:14 | text | plastic-bin | learner-text-candidate | — |
| src/content/missions.ts:346:36 | text | 플라스틱 통으로 보내기 | learner-text-candidate | — |
| src/content/missions.ts:347:14 | text | check-first | learner-text-candidate | — |
| src/content/missions.ts:347:36 | text | 먼저 확인하기 | learner-text-candidate | — |
| src/content/missions.ts:356:15 | text | 종이 통 규칙에 "오염 상태: 깨끗함" 조건 추가하기 | learner-text-candidate | — |
| src/content/missions.ts:368:15 | text | 먼저 확인하기 규칙을 가장 먼저 실행하기 | learner-text-candidate | — |
| src/content/missions.ts:413:6 | text | 결함이 없는 미션에서 억지로 고치게 하지 않고, 여섯 사례 전체를 덮는지 확인하기 자체를 성공으로 인정한다. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:415:13 | text | 셔틀 버스 배차 검증소 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/content/missions.ts:417:8 | text | 가상 셔틀은 자리 수와 대기 인원을 보아 출발하지 않기·다음 버스 기다리기·전부 탑승·자리만큼만 탑승을 정해요. 이 미션은 규칙이 완성되어 있어요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:418:12 | text | 여섯 개 고정 사례를 모두 시험해 모든 사례가 정확히 한 규칙에 당첨되는지 확인해요. | learner-text-candidate | — |
| src/content/missions.ts:421:16 | text | seats | learner-text-candidate | — |
| src/content/missions.ts:421:32 | text | 자리 수 | learner-text-candidate | — |
| src/content/missions.ts:421:46 | text | number | learner-text-candidate | repeated-text |
| src/content/missions.ts:421:62 | text | 개 | learner-text-candidate | — |
| src/content/missions.ts:422:16 | text | waiting | learner-text-candidate | — |
| src/content/missions.ts:422:34 | text | 대기 인원 | learner-text-candidate | — |
| src/content/missions.ts:422:49 | text | number | learner-text-candidate | repeated-text |
| src/content/missions.ts:422:65 | text | 명 | learner-text-candidate | — |
| src/content/missions.ts:425:14 | text | idle | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/missions.ts:425:29 | text | 출발하지 않기 | learner-text-candidate | — |
| src/content/missions.ts:426:14 | text | wait | learner-text-candidate | repeated-text |
| src/content/missions.ts:426:29 | text | 다음 버스 기다리기 | learner-text-candidate | — |
| src/content/missions.ts:427:14 | text | board-all | learner-text-candidate | — |
| src/content/missions.ts:427:34 | text | 전부 탑승 | learner-text-candidate | repeated-text |
| src/content/missions.ts:428:14 | text | board-part | learner-text-candidate | — |
| src/content/missions.ts:428:35 | text | 자리만큼만 탑승 | learner-text-candidate | — |
| src/content/missions.ts:437:15 | text | 규칙을 그대로 둘래요(결함 없음) | learner-text-candidate | repeated-text |
| src/content/missions.ts:457:32 | text | 미션을 찾을 수 없다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.test.ts:11:11 | text | validateContent (계획 §7.2) | learner-text-candidate | technical-or-internal |
| src/content/validateContent.test.ts:12:7 | text | 정상 콘텐츠는 통과한다 | learner-text-candidate | — |
| src/content/validateContent.test.ts:16:7 | text | 미션 수가 6개가 아니면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:20:7 | text | 미션 ID가 중복되면 실패한다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:25:7 | text | sourceNote가 없으면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:31:7 | text | misconceptionGuard가 없으면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:37:7 | text | finiteDomain이 빈 배열이면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:43:7 | text | 규칙이 존재하지 않는 clause를 참조하면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:48:72 | text | 없는-절 | learner-text-candidate | — |
| src/content/validateContent.test.ts:54:7 | text | 우선순위 값이 같은 규칙이 둘이면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:65:7 | text | validRepairIds가 존재하지 않는 수리를 가리키면 실패한다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:66:83 | text | 없는-수리 | learner-text-candidate | — |
| src/content/validateContent.test.ts:70:7 | text | validRepairIds가 전체 통과하지 않는 수리를 가리키면 실패한다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:79:55 | text | 없는-규칙 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:88:7 | text | 입력 사례가 도메인 필드를 빠뜨리면 실패한다 | feedback-or-error, input | abstract-or-formal |
| src/content/validateContent.ts:16:18 | text | ContentValidationError | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:32:37 | text | [콘텐츠 검수] ${message} | feedback-or-error | — |
| src/content/validateContent.ts:41:11 | text | 미션은 정확히 ${EXPECTED_MISSION_IDS.length}개여야 합니다. 현재 ${missions.length}개 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:45:40 | text | 미션 ID 중복: ${mission.id} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:49:33 | text | 미션 ID 누락: ${id} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:56:53 | text | ${label}: sourceNote가 비어 있다 | learner-text-candidate | — |
| src/content/validateContent.ts:57:61 | text | ${label}: misconceptionGuard가 비어 있다 | learner-text-candidate | — |
| src/content/validateContent.ts:58:33 | text | approved | learner-text-candidate | — |
| src/content/validateContent.ts:58:50 | text | ${label}: reviewStatus가 approved가 아니다 | learner-text-candidate | — |
| src/content/validateContent.ts:59:48 | text | ${label}: finiteDomain이 빈 배열이다 | learner-text-candidate | — |
| src/content/validateContent.ts:70:11 | text | ${label}: 시작 규칙에서 판정 불가(invalid-input) 사례가 있다: ${invalid.inputId} | input | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:73:50 | text | ${label}: validRepairIds가 비어 있다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:76:24 | text | ${label}: validRepairIds가 없는 수리를 가리킨다: ${repairId} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:78:13 | text | ${label}: validRepair ${repairId}가 전체 테스트를 통과하지 못한다 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:84:44 | text | f.name === name); } function validateScalarKind(label: string, meta: FieldMeta, value: Scalar): void { if (meta.kind === 'number' && (typeof value !== 'number' \|\| !Number.isFinite(value))) { fail(`${label}: 숫자 필드 ${meta.name}의 값이 유한한 수가 아니다`); } if (meta.kind === 'boolean' && typeof value !== 'boolean') { fail(`${label}: 불리언 필드 ${meta.name}의 값이 참/거짓이 아니다`); } if (meta.kind === 'enum') { if (typeof value !== 'string' \|\| !meta.enumLabels?.[value]) { fail(`${label}: 열거 필드 ${meta.name}의 값 ${String(value)}이 목록에 없다`); } } } function validateFields(mission: LearningMission): void { const names = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:89:11 | text | ${label}: 숫자 필드 ${meta.name}의 값이 유한한 수가 아니다 | learner-text-candidate | — |
| src/content/validateContent.ts:92:11 | text | ${label}: 불리언 필드 ${meta.name}의 값이 참/거짓이 아니다 | learner-text-candidate | — |
| src/content/validateContent.ts:95:27 | text | string | learner-text-candidate | — |
| src/content/validateContent.ts:96:13 | text | ${label}: 열거 필드 ${meta.name}의 값 ${String(value)}이 목록에 없다 | learner-text-candidate | long-or-dense |
| src/content/validateContent.ts:102:32 | text | (); for (const field of mission.content.fields) { if (names.has(field.name)) fail(`${mission.id}: 필드 이름 중복 ${field.name}`); names.add(field.name); if (field.label.trim().length === 0) fail(`${mission.id}: 필드 ${field.name}의 label이 비어 있다`); if (field.kind === 'boolean' && !field.booleanLabels) { fail(`${mission.id}: 불리언 필드 ${field.name}에 booleanLabels가 없다`); } if (field.kind === 'enum' && (!field.enumLabels \|\| Object.keys(field.enumLabels).length === 0)) { fail(`${mission.id}: 열거 필드 ${field.name}에 enumLabels가 없다`); } } } function validateInputCases(mission: LearningMission): void { const caseIds = new Set | input | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:104:38 | text | ${mission.id}: 필드 이름 중복 ${field.name} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:106:48 | text | ${mission.id}: 필드 ${field.name}의 label이 비어 있다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:107:25 | text | boolean | learner-text-candidate | — |
| src/content/validateContent.ts:108:13 | text | ${mission.id}: 불리언 필드 ${field.name}에 booleanLabels가 없다 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:110:25 | text | enum | learner-text-candidate | — |
| src/content/validateContent.ts:111:13 | text | ${mission.id}: 열거 필드 ${field.name}에 enumLabels가 없다 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:118:55 | text | f.name); for (const input of mission.finiteDomain) { if (caseIds.has(input.id)) fail(`${mission.id}: 입력 사례 ID 중복 ${input.id}`); caseIds.add(input.id); for (const name of fieldNames) { const meta = fieldMetaOf(mission, name); if (!meta) fail(`${mission.id}: 필드 메타데이터 누락 ${name}`); const value = input.values[name]; if (typeof value === 'undefined') { fail(`${mission.id}: 입력 사례 ${input.id}에 필드 ${name} 값이 없다`); } validateScalarKind(`${mission.id}/${input.id}`, meta, value); } } } function validateClauseShape(mission: LearningMission, clause: Clause, context: string): void { if (!OPERATORS.includes(clause.operator)) fail(`${context}: 지원하지 않는 연산자 ${clause.operator}`); const meta = fieldMetaOf(mission, clause.field); if (!meta) fail(`${context}: clause가 없는 필드를 참조한다: ${clause.field}`); if (isFieldReference(clause.expected)) { const refMeta = fieldMetaOf(mission, clause.expected.fieldRef); if (!refMeta) { fail(`${context}: fieldRef가 없는 필드를 참조한다: ${clause.expected.fieldRef}`); } if (refMeta.kind !== meta.kind) fail(`${context}: fieldRef의 필드 종류가 다르다`); return; } validateScalarKind(`${context}/${clause.id}`, meta, clause.expected); } function validateClauses(mission: LearningMission): void { const ids = new Set | input | abstract-or-formal, long-or-dense, multiple-actions, technical-or-internal |
| src/content/validateContent.ts:120:38 | text | ${mission.id}: 입력 사례 ID 중복 ${input.id} | input | abstract-or-formal, technical-or-internal |
| src/content/validateContent.ts:124:24 | text | ${mission.id}: 필드 메타데이터 누락 ${name} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:127:15 | text | ${mission.id}: 입력 사례 ${input.id}에 필드 ${name} 값이 없다 | input | abstract-or-formal, technical-or-internal |
| src/content/validateContent.ts:135:51 | text | ${context}: 지원하지 않는 연산자 ${clause.operator} | learner-text-candidate | — |
| src/content/validateContent.ts:137:20 | text | ${context}: clause가 없는 필드를 참조한다: ${clause.field} | learner-text-candidate | — |
| src/content/validateContent.ts:141:13 | text | ${context}: fieldRef가 없는 필드를 참조한다: ${clause.expected.fieldRef} | learner-text-candidate | long-or-dense |
| src/content/validateContent.ts:143:43 | text | ${context}: fieldRef의 필드 종류가 다르다 | learner-text-candidate | — |
| src/content/validateContent.ts:150:30 | text | (); for (const clause of mission.clauses) { if (ids.has(clause.id)) fail(`${mission.id}: clause ID 중복 ${clause.id}`); ids.add(clause.id); validateClauseShape(mission, clause, mission.id); } const extraIds = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:152:35 | text | ${mission.id}: clause ID 중복 ${clause.id} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:156:35 | text | (); for (const clause of mission.content.extraClauses) { if (ids.has(clause.id) \|\| extraIds.has(clause.id)) { fail(`${mission.id}: 수리용 추가 clause ID가 기존 절과 충돌한다: ${clause.id}`); } extraIds.add(clause.id); validateClauseShape(mission, clause, `${mission.id}/extraClauses`); } } function validateRules(mission: LearningMission): void { const ruleIds = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:159:13 | text | ${mission.id}: 수리용 추가 clause ID가 기존 절과 충돌한다: ${clause.id} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:172:37 | text | ${mission.id}: rule ID 중복 ${rule.id} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:174:44 | text | ${mission.id}: 규칙 ${rule.id}의 clause가 없다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:177:15 | text | ${mission.id}: 규칙 ${rule.id}가 존재하지 않는 clause를 참조한다: ${clauseId} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:181:13 | text | ${mission.id}: 규칙 ${rule.id}의 actionId ${rule.actionId}가 action 목록에 없다 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:185:15 | text | ${mission.id}: 규칙 ${rule.id}의 priority가 정수가 아니다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:191:11 | text | ${mission.id}: 같은 priority 값을 가진 규칙이 둘 이상이다 (콘텐츠 오류) | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:197:42 | text | ${mission.id}: content.title이 비어 있다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:198:42 | text | ${mission.id}: content.scene이 비어 있다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:199:41 | text | ${mission.id}: content.goal이 비어 있다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:201:11 | text | ${mission.id}: 어린이용 판정 문구(kidNotes)가 비어 있다 | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:203:44 | text | input.id === c.focusInputId)) { fail(`${mission.id}: focusInputId가 finiteDomain에 없다: ${c.focusInputId}`); } const actionIds = new Set | input | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:204:11 | text | ${mission.id}: focusInputId가 finiteDomain에 없다: ${c.focusInputId} | input | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:208:41 | text | ${mission.id}: action ID 중복 ${action.id} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:210:49 | text | ${mission.id}: action ${action.id}의 label이 비어 있다 | learner-text-candidate | technical-or-internal |
| src/domain/branchEvaluator.test.ts:14:32 | text | 사례 없음: ${inputId} | feedback-or-error, input | technical-or-internal |
| src/domain/branchEvaluator.test.ts:25:7 | text | 경계값에서 lt와 lte가 다른 결과를 낸다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:32:7 | text | 경계값에서 gt와 gte가 다른 결과를 낸다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:39:7 | text | eq는 불리언과 문자열을 비교한다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:48:7 | text | FieldReference는 숫자를 복사하지 않고 다른 필드와 비교한다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:58:7 | text | 없는 필드는 invalid-input을 반환한다 | input | missing-term-explanation, technical-or-internal |
| src/domain/branchEvaluator.test.ts:59:39 | text | 없는필드 | learner-text-candidate | repeated-text |
| src/domain/branchEvaluator.test.ts:63:7 | text | fieldRef가 없는 필드를 가리키면 invalid-input을 반환한다 | input | missing-term-explanation, technical-or-internal |
| src/domain/branchEvaluator.test.ts:68:30 | text | 없는필드 | learner-text-candidate | repeated-text |
| src/domain/branchEvaluator.test.ts:73:7 | text | 지원하지 않는 연산자는 invalid-input을 반환한다 | input | missing-term-explanation, technical-or-internal |
| src/domain/branchEvaluator.test.ts:78:7 | text | 숫자와 불리언을 직접 비교하면 invalid-input을 반환한다 | input | missing-term-explanation, technical-or-internal |
| src/domain/branchEvaluator.test.ts:83:7 | text | 크기 비교에 불리언을 쓰면 invalid-input을 반환한다 | input | missing-term-explanation, technical-or-internal |
| src/domain/branchEvaluator.test.ts:89:11 | text | runRuleSet · analyzeCoverage (여섯 미션 기대 결과 재현) | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:90:7 | text | branch-lamp-01: 밝기 2가 갭이고 나머지는 판정된다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:102:7 | text | branch-plant-02: (촉촉함1, 비 예보 예)가 겹침이고 나머지는 판정된다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:112:7 | text | branch-plant-02: 우선순위가 있으면 승자를 반환해도 겹침 진단을 숨기지 않는다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:124:7 | text | branch-fan-03: 25도가 갭이고 24·30은 판정된다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:132:7 | text | branch-library-04: 미반납 당일이 갭이고 나머지는 판정된다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:140:7 | text | branch-sorter-05: (종이, 더러움)이 겹침이고 나머지는 판정된다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:148:7 | text | branch-bus-06: 여섯 입력이 정확히 한 번씩 덮인다 | input | abstract-or-formal |
| src/domain/branchEvaluator.test.ts:164:7 | text | 모든 미션의 시작 규칙에서 invalid-input은 없다 | input | missing-term-explanation, technical-or-internal |
| src/domain/branchEvaluator.test.ts:171:11 | text | evaluateRepair · applyRepair (최소 수정 계약) | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:171:58 | text | { it('branch-lamp-01: 연산자 한 곳 수정( | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:172:7 | text | branch-lamp-01: 연산자 한 곳 수정(<=2)이 받아들여지고 갭이 사라진다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:182:7 | text | branch-lamp-01: 규칙 두 곳을 바꾸면 최소 수정이 아니라서 거부된다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:196:7 | text | branch-plant-02: 물 주기 규칙에 rain=false 절 추가는 통과하고, 우선순위 해법은 겹침을 남긴 채 통과한다 | learner-text-candidate | long-or-dense |
| src/domain/branchEvaluator.test.ts:212:7 | text | branch-fan-03: 두 승인 수리(>=25, <25)가 모두 통과한다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:221:7 | text | branch-library-04: 기준값(기한) 하나만 바꾼 수정이 최소 수정으로 통과한다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:228:7 | text | branch-sorter-05: 조건 추가 해법과 우선순위 해법이 모두 통과한다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:235:7 | text | branch-bus-06: 결함 없음(그대로 통과)이 받아들여진다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:243:7 | text | 아직 갭이 남은 수정은 거부하고 근거 키를 남긴다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:254:7 | text | 없는 규칙을 고치는 수정은 거부된다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:258:16 | text | 없는-규칙 | learner-text-candidate | repeated-text |
| src/domain/branchEvaluator.test.ts:265:7 | text | applyRepair는 원본을 바꾸지 않고 새 미션을 만든다 | learner-text-candidate | — |
| src/domain/branchEvaluator.test.ts:275:7 | text | 판정 함수는 readonly 입력을 변이하지 않는다 | input | abstract-or-formal |
| src/domain/types.ts:22:52 | text | ; } export interface Clause { readonly id: string; readonly field: string; readonly operator: Operator; readonly expected: Scalar \| FieldReference; } export interface Rule { readonly id: string; readonly clauseIds: readonly string[]; readonly actionId: string; readonly priority?: number; } export interface BranchMission { readonly id: MissionId; readonly finiteDomain: readonly InputCase[]; readonly clauses: readonly Clause[]; readonly rules: readonly Rule[]; readonly validRepairIds: readonly string[]; readonly sourceNote: string; readonly reviewStatus: 'pending' \| 'approved'; readonly misconceptionGuard: string; } export interface RuleRun { readonly inputId: string; readonly matchingRuleIds: readonly string[]; readonly actionId: string \| null; readonly diagnosis: Diagnosis; } export interface RepairEvaluation { readonly accepted: boolean; readonly changedClauseIds: readonly string[]; readonly runs: readonly RuleRun[]; readonly evidenceKeys: readonly string[]; } export type SessionStep = 'INTRO' \| 'PREDICT' \| 'TRACE' \| 'DIAGNOSE' \| 'REPAIR' \| 'RETEST' \| 'REPORT'; // ---- 화면 표시를 위한 확장 계약 (판정 경계는 유지: 컴포넌트는 evaluator 결과만 렌더링한다) ---- export interface FieldMeta { readonly name: string; readonly label: string; readonly kind: 'number' \| 'boolean' \| 'enum'; readonly booleanLabels?: { readonly true: string; readonly false: string }; readonly enumLabels?: Readonly | input | long-or-dense, technical-or-internal |
| src/domain/types.ts:73:57 | text | ; readonly valueLabels?: Readonly | learner-text-candidate | — |
| src/features/branch-debug/DiagnosePanel.tsx:29:29 | text | tries + 1); }; return ( | heading, feedback-or-error | — |
| src/features/branch-debug/DiagnosePanel.tsx:33:48 | text | diagnose-heading | heading | — |
| src/features/branch-debug/DiagnosePanel.tsx:34:57 | text | 3단계 · 진단판 | heading | repeated-text |
| src/features/branch-debug/DiagnosePanel.tsx:37:10 | text | 위 추적판의 "✓ 당첨" 표시를 보고, 이 사례의 진단을 직접 골라 보세요. 정답을 알려 주기 전에 근거를 세어 보는 게 디버그 관리자의 방법이에요. | feedback-or-error | long-or-dense |
| src/features/branch-debug/DiagnosePanel.tsx:38:17 | text | ✓ 당첨 | feedback-or-error | repeated-text |
| src/features/branch-debug/DiagnosePanel.tsx:42:17 | text | 이 사례의 진단은? | learner-text-candidate | — |
| src/features/branch-debug/DiagnosePanel.tsx:62:14 | text | 근거를 다시 세어 볼까요? | learner-text-candidate | — |
| src/features/branch-debug/DiagnosePanel.tsx:63:14 | text | 위 추적판에서 "✓ 당첨" 표시가 몇 개인지 다시 세어 보세요. 당첨이 0개면 갭, 2개 이상이면 겹침이에요. | learner-text-candidate | long-or-dense |
| src/features/branch-debug/DiagnosePanel.tsx:67:66 | text | 진단 완료하기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/EntranceScreen.tsx:6:17 | text | void; } // 계획 §9 입구: 학습 목표·미션·시간·개인정보 경계를 안내한다. export function EntranceScreen({ onStart }: EntranceScreenProps) { return ( | instruction | long-or-dense, technical-or-internal |
| src/features/branch-debug/EntranceScreen.tsx:12:52 | text | entrance-title | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:15:14 | alt | 밝은 교실의 가상 조절 작업대 위에 전등, 화분, 선풍기, 책, 버스 정류장 표지가 놓여 있고 규칙 레일이 분기 다이아몬드로 이어진 그림 | alt | long-or-dense |
| src/features/branch-debug/EntranceScreen.tsx:20:31 | text | 오늘의 임무: 빠진 조건 찾기 | heading | repeated-text |
| src/features/branch-debug/EntranceScreen.tsx:21:37 | text | 규칙은 | input | — |
| src/features/branch-debug/EntranceScreen.tsx:22:21 | text | 입력 | input | abstract-or-formal |
| src/features/branch-debug/EntranceScreen.tsx:22:32 | text | 을 보고 | input | — |
| src/features/branch-debug/EntranceScreen.tsx:22:45 | text | 조건 | input | — |
| src/features/branch-debug/EntranceScreen.tsx:22:56 | text | 에 맞으면 | input | — |
| src/features/branch-debug/EntranceScreen.tsx:22:70 | text | 행동 | input | repeated-text |
| src/features/branch-debug/EntranceScreen.tsx:22:81 | text | 을 골라요. 이곳에서는 규칙의 버그를 찾아 고치는 디버그 관리자가 됩니다. | input | — |
| src/features/branch-debug/EntranceScreen.tsx:25:11 | text | 학습 목표 | heading | — |
| src/features/branch-debug/EntranceScreen.tsx:27:13 | text | 입력, 조건, 행동을 구분하고 규칙을 한 줄씩 시험해요. | input | abstract-or-formal |
| src/features/branch-debug/EntranceScreen.tsx:28:13 | text | 어떤 규칙에도 맞지 않는 | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:29:43 | text | 과 여러 규칙에 동시에 맞는{' '} | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:30:19 | text | 겹침 | learner-text-candidate | repeated-text |
| src/features/branch-debug/EntranceScreen.tsx:30:30 | text | 을 구분해요. | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:32:13 | text | 3과 4 사이 경계값에서 비교 연산자 하나가 결과를 바꾸는 이유를 설명해요. | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:33:13 | text | 규칙 전체를 다시 쓰지 않고 조건 하나 또는 순서 하나를 최소로 고쳐요. | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:36:69 | text | 학습 시작하기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/EntranceScreen.tsx:39:15 | text | 예상 시간: 20~30분 · 미션 6개 | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:42:12 | text | 🔒 여러분의 답과 이름은 어디에도 저장하거나 보내지 않아요. | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:43:12 | text | ⚠️ 새로고침하면 지금까지 고른 답이 사라져요. | learner-text-candidate | — |
| src/features/branch-debug/EntranceScreen.tsx:45:11 | text | 미션 살펴보기 | heading | — |
| src/features/branch-debug/EntranceScreen.tsx:49:21 | text | {index + 1}. {mission.content.title} | learner-text-candidate | repeated-text |
| src/features/branch-debug/FeedbackPanel.tsx:10:23 | text | true | feedback-or-error | repeated-text |
| src/features/branch-debug/PredictPanel.tsx:13:36 | text | ; } // 계획 §9 예측판: 한 입력 사례에서 실행될 행동을 먼저 고른다. export function PredictPanel({ mission, input, record, dispatch }: PredictPanelProps) { const chosen = record.prediction?.actionId ?? null; return ( | heading, input | abstract-or-formal, long-or-dense, technical-or-internal |
| src/features/branch-debug/PredictPanel.tsx:20:48 | text | predict-heading | heading | — |
| src/features/branch-debug/PredictPanel.tsx:21:56 | text | 1단계 · 예측판 | heading | repeated-text |
| src/features/branch-debug/PredictPanel.tsx:24:10 | text | 이 사례를 규칙에 넣어 볼 거예요: | learner-text-candidate | — |
| src/features/branch-debug/PredictPanel.tsx:33:17 | text | 어떤 일이 일어날 것 같아요? | learner-text-candidate | — |
| src/features/branch-debug/PredictPanel.tsx:54:15 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/features/branch-debug/PredictPanel.tsx:59:73 | text | CONFIRM_PREDICTION | learner-text-candidate | — |
| src/features/branch-debug/PredictPanel.tsx:59:97 | text | 예측 완료하기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:32:37 | text | c.id === clauseId) ?? null; } // 절의 기준값 후보: 임의의 수를 추측하지 않고 finiteDomain에 나온 값만 고른다 (계획 §5). function valueOptions(mission: LearningMission, clause: Clause): { raw: string; label: string }[] { if (isFieldReference(clause.expected)) return []; const meta = fieldMetaOf(mission, clause.field); const seen = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/branch-debug/RepairEditor.tsx:39:31 | text | (); const options: { raw: string; label: string }[] = []; for (const input of mission.finiteDomain) { const value = input.values[clause.field]; const raw = typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value); if (seen.has(raw)) continue; seen.add(raw); options.push({ raw, label: valueLabel(meta, value) }); } return options; } function parseValue(raw: string, clause: Clause): Scalar { if (typeof clause.expected === 'boolean') return raw === 'true'; if (typeof clause.expected === 'number') return Number(raw); return raw; } // 계획 §9 수리판: 조건 연산자·기준값 또는 우선순위 중 한 곳만 바꾼다. export function RepairEditor({ mission, input, record, dispatch }: RepairEditorProps) { const [mode, setMode] = useState | input | long-or-dense, technical-or-internal |
| src/features/branch-debug/RepairEditor.tsx:75:35 | text | none | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:75:78 | text | 규칙을 그대로 둘래요(결함 없음) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:81:17 | text | ${ruleName(rule, mission)}을(를) 가장 먼저 실행하기 | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:93:17 | text | ${ruleName(rule, mission)}에 "${clauseText(extra, mission)}" 추가하기 | learner-text-candidate | long-or-dense |
| src/features/branch-debug/RepairEditor.tsx:110:17 | text | ${ruleName(rule, mission)}의 조건을 "${clauseText(nextClause, mission)}"(으)로 바꾸기 | learner-text-candidate | long-or-dense |
| src/features/branch-debug/RepairEditor.tsx:131:26 | text | { if (!built) return; dispatch({ type: 'RUN_RETEST', label: built.label, proposal: built.proposal }); }; const editingClause = mode === 'clause' && rule && clauseId ? clauseOf(mission, clauseId) : null; return ( | heading | long-or-dense, technical-or-internal |
| src/features/branch-debug/RepairEditor.tsx:133:23 | text | RUN_RETEST | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:139:48 | text | repair-heading | heading | — |
| src/features/branch-debug/RepairEditor.tsx:140:55 | text | 4단계 · 수리판 | heading | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:143:10 | text | 사례: | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:147:28 | text | `${field.label}: ${valueLabel(field, input.values[field.name])}`) .join(' · ')} | input | long-or-dense |
| src/features/branch-debug/RepairEditor.tsx:147:30 | text | ${field.label}: ${valueLabel(field, input.values[field.name])} | input | long-or-dense, repeated-text |
| src/features/branch-debug/RepairEditor.tsx:150:11 | text | {guidance && | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/branch-debug/RepairEditor.tsx:151:41 | text | info | feedback-or-error | — |
| src/features/branch-debug/RepairEditor.tsx:151:69 | text | 조건 하나 또는 순서 하나, 딱 한 곳만 바꿔 보세요. | feedback-or-error | — |
| src/features/branch-debug/RepairEditor.tsx:153:17 | text | 어떻게 고칠까요? | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:165:15 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:179:17 | text | 조건 추가하기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:193:15 | text | 실행 순서 정하기 (우선순위) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:195:19 | text | {mission.content.noFixAllowed && ( | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:207:17 | text | 결함 없음(그대로 통과) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:216:19 | text | 어느 규칙을 고칠까요? | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:232:30 | text | clauseText(c, mission)) .join(' 그리고 ')} | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:233:26 | text | 그리고 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:242:19 | text | 어느 조건을, 어떻게 바꿀까요? | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:244:40 | text | { const clause = clauseOf(mission, id); if (!clause) return null; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/branch-debug/RepairEditor.tsx:258:21 | text | {clauseText(clause, mission)} | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:288:25 | text | 기준값: {option.label} | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:295:20 | text | 이 조건은 다른 필드와 비교해요. 연산자만 바꿀 수 있어요. | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:304:19 | text | 어떤 조건을 추가할까요? | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:313:19 | text | {clauseText(clause, mission)} | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:323:53 | text | 을(를) 가장 먼저 실행하도록 순서를 정할게요. | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:328:71 | text | 수정안 재시험 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RepairEditor.tsx:330:24 | text | {built && !hasChange && | learner-text-candidate | — |
| src/features/branch-debug/RepairEditor.tsx:331:39 | text | 바뀐 내용이 없어요. 한 곳을 바꾸면 재시험할 수 있어요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:12:36 | text | ; } function acceptMessages(mission: LearningMission, record: MissionRecord): string[] { const keys = record.evaluation?.evidenceKeys ?? []; const messages = ['통과! 모든 사례에 행동이 정해졌어요.']; if (keys.includes('repair:no-change')) { messages.push('규칙을 고치지 않고 전체 덮임을 확인했어요.'); } else { messages.push('딱 한 곳만 고쳤어요.'); } if (keys.includes('coverage:all-decided')) { messages.push(`${mission.finiteDomain.length}개 사례 모두에서 규칙이 정확히 하나씩 당첨됐어요.`); } if (keys.includes('coverage:overlap-with-priority')) { messages.push( '겹치는 사례는 우선순위로 먼저 실행할 규칙을 정했어요. 기록에는 겹침으로 남아요.', ); } return messages; } function rejectMessages(mission: LearningMission, record: MissionRecord): string[] { const keys = record.evaluation?.evidenceKeys ?? []; const messages: string[] = ['아직 통과하지 못했어요. 근거를 볼까요?']; if (keys.includes('coverage:gaps-remain')) { messages.push('아직 아무 규칙에도 당첨되지 않는 사례가 남았어요. 표에서 갭 행을 찾아보세요.'); } if (keys.includes('change:not-minimal')) { messages.push('한 번에 한 군데만 고칠 수 있어요. 조건 하나 또는 순서 하나만 바꿔 보세요.'); } if (keys.includes('coverage:overlap-with-priority')) { messages.push('겹치는 사례는 우선순위로 실행 순서를 정했어요. 남은 문제를 표에서 찾아보세요.'); } if (mission.finiteDomain.length === 0) { messages.push('사례가 없어요.'); } return messages; } function runBadge(run: RuleRun) { const badge = diagnosisBadge(run.diagnosis); return | learner-text-candidate | long-or-dense, multiple-actions, multiple-conditions, shaming-tone, technical-or-internal |
| src/features/branch-debug/RetestPanel.tsx:17:22 | text | 통과! 모든 사례에 행동이 정해졌어요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:19:20 | text | 규칙을 고치지 않고 전체 덮임을 확인했어요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:21:20 | text | 딱 한 곳만 고쳤어요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:24:20 | text | ${mission.finiteDomain.length}개 사례 모두에서 규칙이 정확히 하나씩 당첨됐어요. | learner-text-candidate | long-or-dense |
| src/features/branch-debug/RetestPanel.tsx:28:8 | text | 겹치는 사례는 우선순위로 먼저 실행할 규칙을 정했어요. 기록에는 겹침으로 남아요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:36:32 | text | 아직 통과하지 못했어요. 근거를 볼까요? | learner-text-candidate | shaming-tone |
| src/features/branch-debug/RetestPanel.tsx:38:20 | text | 아직 아무 규칙에도 당첨되지 않는 사례가 남았어요. 표에서 갭 행을 찾아보세요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:41:20 | text | 한 번에 한 군데만 고칠 수 있어요. 조건 하나 또는 순서 하나만 바꿔 보세요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:44:20 | text | 겹치는 사례는 우선순위로 실행 순서를 정했어요. 남은 문제를 표에서 찾아보세요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:47:20 | text | 사례가 없어요. | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:54:76 | text | ; } // 계획 §9 재시험판: 수정한 규칙으로 finiteDomain 전체를 다시 시험한다. export function RetestPanel({ mission, record, isLastMission, dispatch }: RetestPanelProps) { const runs = record.evaluation?.runs ?? []; const accepted = record.accepted; return ( | heading | long-or-dense |
| src/features/branch-debug/RetestPanel.tsx:63:48 | text | retest-heading | heading | — |
| src/features/branch-debug/RetestPanel.tsx:64:55 | text | 5단계 · 재시험판 | heading | repeated-text |
| src/features/branch-debug/RetestPanel.tsx:67:10 | text | 고친 규칙으로 이 미션의 모든 사례 {mission.finiteDomain.length}개를 다시 시험했어요. {record.repair && ( | learner-text-candidate | long-or-dense |
| src/features/branch-debug/RetestPanel.tsx:70:13 | text | {' '} 적용한 수정: | learner-text-candidate | abstract-or-formal |
| src/features/branch-debug/RetestPanel.tsx:77:38 | text | {mission.content.title} 전체 사례 재시험 결과 | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:80:29 | text | 사례 | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:81:29 | text | 행동 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RetestPanel.tsx:82:29 | text | 판정 | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:90:34 | text | {input ? caseLabel(mission, input) : run.inputId} | input | technical-or-internal |
| src/features/branch-debug/RetestPanel.tsx:91:34 | text | {run.actionId ? actionLabel(mission, run.actionId) : '아무 일도 없어요'} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/branch-debug/RetestPanel.tsx:92:73 | text | 아무 일도 없어요 | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:94:34 | text | {runBadge(run)} {run.diagnosis === 'overlap' && run.actionId && ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/branch-debug/RetestPanel.tsx:97:23 | text | 우선 실행: {actionLabel(mission, run.actionId)} | learner-text-candidate | technical-or-internal |
| src/features/branch-debug/RetestPanel.tsx:109:36 | text | {accepted ? ( | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:111:58 | text | ADVANCE | learner-text-candidate | technical-or-internal |
| src/features/branch-debug/RetestPanel.tsx:111:71 | text | {isLastMission ? '디버그 기록 보기' : '다음 미션 열기'} | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:112:31 | text | 디버그 기록 보기 | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:112:45 | text | 다음 미션 열기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RetestPanel.tsx:115:58 | text | RETRY_REPAIR | learner-text-candidate | — |
| src/features/branch-debug/RetestPanel.tsx:115:76 | text | 다시 고치기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:9:38 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:9:56 | text | 학습 시작하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:13:11 | text | 핵심 학습 화면 흐름 | learner-text-candidate | — |
| src/features/branch-debug/RuleWorkbench.test.tsx:14:7 | text | 예측 전에는 규칙 추적을 열 수 없다 | learner-text-candidate | — |
| src/features/branch-debug/RuleWorkbench.test.tsx:18:32 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:18:50 | text | 규칙 시험하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:19:30 | text | 1단계 · 예측판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:22:7 | text | 예측 → 추적 공개 → 진단 순서로만 열리고, 오답 진단은 정답을 공개하지 않고 힌트를 준다 | feedback-or-error, hint | — |
| src/features/branch-debug/RuleWorkbench.test.tsx:24:19 | text | ); await start(user); await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' })); await user.click(screen.getByRole('button', { name: '예측 완료하기' })); expect(screen.getByText('2단계 · 규칙 추적판')).toBeInTheDocument(); expect(screen.getAllByText('? 아직 시험 전')).toHaveLength(missions[0].rules.length); for (let i = 0; i | button-or-action | long-or-dense |
| src/features/branch-debug/RuleWorkbench.test.tsx:27:57 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:28:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:28:58 | text | 예측 완료하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:29:30 | text | 2단계 · 규칙 추적판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:30:33 | text | ? 아직 시험 전 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:33:42 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:33:60 | text | 규칙 시험하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:36:33 | text | ✗ 실패 | feedback-or-error | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:37:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:37:58 | text | 진단하러 가기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:38:30 | text | 3단계 · 진단판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:39:32 | text | 4단계 · 수리판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:41:27 | text | 한 규칙 | feedback-or-error | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:42:40 | text | radio | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:43:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:43:58 | text | 진단 완료하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:45:30 | text | 3단계 · 진단판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:47:40 | text | radio | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:48:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:48:58 | text | 진단 완료하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:49:30 | text | 4단계 · 수리판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:52:7 | text | 빗나간 수리 뒤 근거를 받고 다시 고쳐 통과하면 다음 미션이 열린다 | learner-text-candidate | — |
| src/features/branch-debug/RuleWorkbench.test.tsx:54:19 | text | ); await start(user); await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' })); await user.click(screen.getByRole('button', { name: '예측 완료하기' })); for (let i = 0; i | button-or-action | long-or-dense, repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:56:57 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:57:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:57:58 | text | 예측 완료하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:59:42 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:59:60 | text | 규칙 시험하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:61:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:61:58 | text | 진단하러 가기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:62:40 | text | radio | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:63:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:63:58 | text | 진단 완료하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:65:27 | text | 보다 크다 | learner-text-candidate | — |
| src/features/branch-debug/RuleWorkbench.test.tsx:66:57 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:67:57 | text | 전등 켜기 규칙 — 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:68:57 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:69:57 | text | 보다 크다(>) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:70:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:70:58 | text | 수정안 재시험 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:72:30 | text | 5단계 · 재시험판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:74:32 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:74:50 | text | 다음 미션 열기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:76:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:76:58 | text | 다시 고치기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:77:30 | text | 4단계 · 수리판 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:79:57 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:80:57 | text | 전등 켜기 규칙 — 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:81:57 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:82:57 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:83:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:83:58 | text | 수정안 재시험 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:86:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:86:58 | text | 다음 미션 열기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:90:7 | text | 바뀐 내용이 없으면 재시험할 수 없다 | learner-text-candidate | — |
| src/features/branch-debug/RuleWorkbench.test.tsx:92:19 | text | ); await start(user); await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' })); await user.click(screen.getByRole('button', { name: '예측 완료하기' })); for (let i = 0; i | button-or-action | long-or-dense, repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:94:57 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:95:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:95:58 | text | 예측 완료하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:97:42 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:97:60 | text | 규칙 시험하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:99:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:99:58 | text | 진단하러 가기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:100:40 | text | radio | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:101:40 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:101:58 | text | 진단 완료하기 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:103:57 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:104:57 | text | 전등 켜기 규칙 — 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:105:57 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:106:57 | text | 보다 작다(<) | learner-text-candidate | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:107:38 | text | button | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.test.tsx:107:56 | text | 수정안 재시험 | button-or-action | repeated-text |
| src/features/branch-debug/RuleWorkbench.tsx:20:49 | text | c.id === mission.content.focusInputId); if (!input) { // validateContent가 focusInputId를 보증하므로 정상 콘텐츠에서는 도달하지 않는다. return ( | input | long-or-dense, technical-or-internal |
| src/features/branch-debug/RuleWorkbench.tsx:25:12 | text | 미션 사례를 찾지 못했어요. 상단의 업데이트 내역을 확인해 주세요. | learner-text-candidate | shaming-tone |
| src/features/branch-debug/RuleWorkbench.tsx:32:45 | aria-label | 미션 소개 | aria-label | — |
| src/features/branch-debug/RuleWorkbench.tsx:33:37 | text | {state.missionIndex + 1}/{missions.length} · {mission.content.title} | heading | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/branch-debug/RuleWorkbench.tsx:38:19 | text | 목표: | learner-text-candidate | — |
| src/features/branch-debug/TracePanel.tsx:12:36 | text | ; } // 계획 §9 규칙 추적판: 규칙을 위에서 아래로 한 줄씩 시험하며 참·거짓 근거를 표시한다. export function TracePanel({ mission, input, record, dispatch }: TracePanelProps) { const run = runRuleSet(mission, input); const revealed = record.revealedRuleIds; const allRevealed = revealed.length === mission.rules.length; return ( | heading, input | long-or-dense, technical-or-internal |
| src/features/branch-debug/TracePanel.tsx:22:48 | text | trace-heading | heading | — |
| src/features/branch-debug/TracePanel.tsx:23:54 | text | 2단계 · 규칙 추적판 | heading | repeated-text |
| src/features/branch-debug/TracePanel.tsx:49:55 | text | ✓ 당첨 | learner-text-candidate | repeated-text |
| src/features/branch-debug/TracePanel.tsx:51:57 | text | ✗ 실패 | feedback-or-error | repeated-text |
| src/features/branch-debug/TracePanel.tsx:54:43 | text | ? 아직 시험 전 | learner-text-candidate | repeated-text |
| src/features/branch-debug/TracePanel.tsx:65:74 | text | 그리고 | learner-text-candidate | repeated-text |
| src/features/branch-debug/TracePanel.tsx:67:31 | text | 사례 값 | input | — |
| src/features/branch-debug/TracePanel.tsx:71:65 | text | ? 판정 보류 | learner-text-candidate | repeated-text |
| src/features/branch-debug/TracePanel.tsx:73:61 | text | ✓ 참 | learner-text-candidate | — |
| src/features/branch-debug/TracePanel.tsx:75:63 | text | ✗ 거짓 | learner-text-candidate | — |
| src/features/branch-debug/TracePanel.tsx:89:8 | text | {allRevealed ? '진단하러 가기' : '규칙 시험하기'} | learner-text-candidate | — |
| src/features/branch-debug/TracePanel.tsx:90:25 | text | 진단하러 가기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/TracePanel.tsx:90:37 | text | 규칙 시험하기 | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:15:16 | text | lt | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:15:29 | text | 보다 작다(<) | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:16:16 | text | lte | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:16:30 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:17:16 | text | eq | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:17:29 | text | 같다(=) | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:18:16 | text | gte | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:18:30 | text | 보다 크거나 같다(≥) | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:19:16 | text | gt | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:19:29 | text | 보다 크다(>) | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:23:13 | text | gap | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:23:27 | text | 어떤 규칙에도 맞지 않았어요 (갭) | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:24:13 | text | overlap | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:24:31 | text | 두 개 이상의 규칙에 동시에 맞았어요 (겹침) | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:25:13 | text | deterministic | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:25:37 | text | 딱 한 규칙에만 맞았어요 | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:34:43 | text | true | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:34:52 | text | false | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:34:73 | text | 예 | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:34:79 | text | 아니오 | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:54:43 | text | true | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:54:52 | text | false | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:54:73 | text | 예 | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:54:79 | text | 아니오 | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:67:15 | text | ${field}: ${expected}보다 작음 | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:69:15 | text | ${field}: ${expected}보다 작거나 같음 | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:71:15 | text | ${field}: ${expected}보다 큼 | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:73:15 | text | ${field}: ${expected}보다 크거나 같음 | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:78:15 | text | ${field}: ${expected} (같음) | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:85:11 | text | ${actionLabel(mission, rule.actionId)} 규칙 | learner-text-candidate | technical-or-internal |
| src/features/branch-debug/labels.ts:93:12 | text | 그리고 | learner-text-candidate | repeated-text |
| src/features/branch-debug/labels.ts:102:17 | text | ${field.label}: ${valueLabel(field, input.values[field.name])} | input | long-or-dense, repeated-text |
| src/features/branch-debug/labels.ts:116:35 | text | ✓ 한 규칙 | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:118:37 | text | ◻ 갭 | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:120:39 | text | ⧉ 겹침 | learner-text-candidate | — |
| src/features/branch-debug/labels.ts:122:39 | text | ? 판정 보류 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.test.tsx:8:11 | text | 결과 기록·인쇄·재시작 (계획 §12 Task 6) | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:13:7 | text | 여섯 미션을 마치면 최초 판단→근거→수정 결과를 미션별로 보여 주고 점수·순위는 없다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:18:30 | text | heading | heading | repeated-text |
| src/features/report/LearningReport.test.tsx:18:74 | text | 디버그 기록 | heading | repeated-text |
| src/features/report/LearningReport.test.tsx:28:7 | text | 인쇄 버튼이 window.print를 부르고 이름 입력란이 없다 | input | abstract-or-formal |
| src/features/report/LearningReport.test.tsx:32:40 | text | button | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:32:58 | text | 인쇄하기 | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:37:7 | text | 처음부터 다시 하기는 확인 대화상자 뒤 세션을 완전히 비운다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:41:40 | text | button | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:41:58 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:43:40 | text | button | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:43:58 | text | 네, 새로 시작해요 | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:44:30 | text | 오늘의 임무: 빠진 조건 찾기 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.test.tsx:47:40 | text | button | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:47:58 | text | 학습 시작하기 | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:48:30 | text | heading | heading | repeated-text |
| src/features/report/LearningReport.test.tsx:48:74 | text | 1번 미션 | heading | repeated-text |
| src/features/report/LearningReport.tsx:10:26 | text | void; } // 계획 §9 기록판: 최초 판단→근거→수정 결과를 미션별로 보여 주고 점수·순위를 만들지 않는다. export function LearningReport({ state, onRestartRequest }: LearningReportProps) { return ( | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/report/LearningReport.tsx:17:10 | text | 새로고침하면 이 기록은 사라져요. 남겨 두려면 인쇄해 주세요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:23:19 | text | run.diagnosis !== 'deterministic', ); const badge = initialRun ? diagnosisBadge(initialRun.diagnosis) : null; const headingId = `report-${mission.id}`; return ( | heading | long-or-dense, technical-or-internal |
| src/features/report/LearningReport.tsx:29:56 | text | {index + 1}. {mission.content.title} | heading | repeated-text |
| src/features/report/LearningReport.tsx:33:19 | text | 최초 판단 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:36:21 | text | {caseLabel(mission, focus)}{' '} | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:39:22 | text | ) : ( '기록 없음' )} | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:41:20 | text | 기록 없음 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:44:19 | text | 고친 내용 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:45:19 | text | {record.repair?.label ?? '기록 없음'} | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:45:45 | text | 기록 없음 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:46:19 | text | 재시험 결과 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:47:19 | text | {record.accepted ? `통과: 모든 사례 ${mission.finiteDomain.length}개에 행동이 정해졌어요.` : '아직 통과하지 못했어요.'} | learner-text-candidate | long-or-dense, shaming-tone |
| src/features/report/LearningReport.tsx:49:22 | text | 통과: 모든 사례 ${mission.finiteDomain.length}개에 행동이 정해졌어요. | learner-text-candidate | long-or-dense |
| src/features/report/LearningReport.tsx:50:22 | text | 아직 통과하지 못했어요. | learner-text-candidate | shaming-tone |
| src/features/report/LearningReport.tsx:52:19 | text | 고쳐야 했던 사례 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:55:22 | text | 없었어요. 처음부터 모든 사례가 규칙 하나씩에 당첨됐어요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:58:71 | text | c.id === run.inputId); const failedBadge = diagnosisBadge(run.diagnosis); return `${input ? caseLabel(mission, input) : run.inputId} (${failedBadge.text})`; }) .join(', ')} | input | long-or-dense, technical-or-internal |
| src/features/report/LearningReport.tsx:60:33 | text | ${input ? caseLabel(mission, input) : run.inputId} (${failedBadge.text}) | input | long-or-dense, technical-or-internal |
| src/features/report/LearningReport.tsx:64:19 | text | 예측 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:65:19 | text | {record.prediction ? record.prediction.actionId === 'none' ? '아무 일도 일어나지 않을 거라고 예측했어요.' : `${actionLabel(mission, record.prediction.actionId)}(이)라고 예측했어요.` : '기록 없음'} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/LearningReport.tsx:68:24 | text | 아무 일도 일어나지 않을 거라고 예측했어요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:69:24 | text | ${actionLabel(mission, record.prediction.actionId)}(이)라고 예측했어요. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/LearningReport.tsx:70:22 | text | 기록 없음 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:77:54 | text | 인쇄하기 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:78:32 | text | secondary | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:78:70 | text | 처음부터 다시 하기 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:8:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:9:4 | text | 기다리기 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:10:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:11:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:12:4 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:13:4 | text | 전부 탑승 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:19:9 | text | 어떤 규칙에도 맞지 않았어요 (갭) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:20:13 | text | 두 개 이상의 규칙에 동시에 맞았어요 (겹침) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:21:19 | text | 딱 한 규칙에만 맞았어요 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:35:12 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:36:12 | text | 전등 켜기 규칙 — 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:37:14 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:38:16 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:41:12 | text | 실행 순서 정하기 (우선순위) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:42:12 | text | 기다리기 규칙 — 비 예보: 예 | learner-text-candidate | — |
| src/test/driveApp.ts:45:12 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:46:12 | text | 선풍기 켜기 규칙 — 온도: 25도보다 큼 | learner-text-candidate | — |
| src/test/driveApp.ts:47:14 | text | 온도: 25도보다 큼 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:48:16 | text | 보다 크거나 같다(≥) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:51:12 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:52:12 | text | 반납 알림 보내기 규칙 — 반납 여부: 아직 안 함 그리고 반납 기한: -1일보다 작거나 같음 | learner-text-candidate | — |
| src/test/driveApp.ts:53:14 | text | 반납 기한: -1일보다 작거나 같음 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:54:16 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:55:13 | text | 기준값: 당일 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:58:12 | text | 조건 추가하기 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:59:12 | text | 종이 통으로 보내기 규칙 — 재질: 종이 (같음) | learner-text-candidate | — |
| src/test/driveApp.ts:60:13 | text | 오염 상태: 깨끗함 | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:63:12 | text | 결함 없음(그대로 통과) | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:69:49 | text | c.id === mission.content.focusInputId); if (!focus) throw new Error(`focus 사례 없음: ${mission.id}`); return runRuleSet(mission, focus).diagnosis as ChoosableDiagnosis; } export async function playMission(user: UserEvent, index: number): Promise | feedback-or-error, input | long-or-dense, technical-or-internal |
| src/test/driveApp.ts:70:32 | text | focus 사례 없음: ${mission.id} | feedback-or-error | technical-or-internal |
| src/test/driveApp.ts:74:81 | text | { await user.click(screen.getByRole('radio', { name: PREDICTION_LABELS[index] })); await user.click(screen.getByRole('button', { name: '예측 완료하기' })); for (let i = 0; i | button-or-action | long-or-dense |
| src/test/driveApp.ts:75:38 | text | radio | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:76:38 | text | button | button-or-action | repeated-text |
| src/test/driveApp.ts:76:56 | text | 예측 완료하기 | button-or-action | repeated-text |
| src/test/driveApp.ts:79:40 | text | button | button-or-action | repeated-text |
| src/test/driveApp.ts:79:58 | text | 규칙 시험하기 | button-or-action | repeated-text |
| src/test/driveApp.ts:81:38 | text | button | button-or-action | repeated-text |
| src/test/driveApp.ts:81:56 | text | 진단하러 가기 | button-or-action | repeated-text |
| src/test/driveApp.ts:83:38 | text | radio | learner-text-candidate | repeated-text |
| src/test/driveApp.ts:84:38 | text | button | button-or-action | repeated-text |
| src/test/driveApp.ts:84:56 | text | 진단 완료하기 | button-or-action | repeated-text |
| src/test/driveApp.ts:93:38 | text | button | button-or-action | repeated-text |
| src/test/driveApp.ts:93:56 | text | 수정안 재시험 | button-or-action | repeated-text |
| src/test/driveApp.ts:95:38 | text | button | button-or-action | repeated-text |
| src/test/driveApp.ts:98:68 | text | { await user.click(screen.getByRole('button', { name: '학습 시작하기' })); for (let i = 0; i | button-or-action | long-or-dense |
| src/test/driveApp.ts:99:38 | text | button | button-or-action | repeated-text |
| src/test/driveApp.ts:99:56 | text | 학습 시작하기 | button-or-action | repeated-text |
| src/update/updateHistory.ts:7:84 | text | 구현 계획 확정 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:16:11 | text | 자동 접근성 검사 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:17:7 | text | 입구 화면에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:23:7 | text | 예측판과 추적판에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:26:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:26:58 | text | 학습 시작하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:30:57 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:31:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:31:58 | text | 예측 완료하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:32:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:32:58 | text | 규칙 시험하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:37:7 | text | 수리판과 재시험판에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:38:41 | text | ); const user = userEvent.setup(); await user.click(screen.getByRole('button', { name: '학습 시작하기' })); await user.click(screen.getByRole('radio', { name: '아무 일도 일어나지 않아요' })); await user.click(screen.getByRole('button', { name: '예측 완료하기' })); for (let i = 0; i | button-or-action | long-or-dense |
| tests/a11y/app.a11y.test.tsx:40:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:40:58 | text | 학습 시작하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:41:57 | text | 아무 일도 일어나지 않아요 | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:42:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:42:58 | text | 예측 완료하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:44:42 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:44:60 | text | 규칙 시험하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:46:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:46:58 | text | 진단하러 가기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:47:57 | text | 어떤 규칙에도 맞지 않았어요 (갭) | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:48:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:48:58 | text | 진단 완료하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:52:57 | text | 조건 고치기 (연산자·기준값) | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:53:57 | text | 전등 켜기 규칙 — 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:54:57 | text | 밝기: 2단계보다 작음 | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:55:57 | text | 보다 작거나 같다(≤) | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:56:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:56:58 | text | 수정안 재시험 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:61:7 | text | 디버그 기록 화면에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/privacy/runtime-boundary.test.tsx:9:11 | text | 런타임 경계: 네트워크·저장소·쿠키 쓰기 0건 | learner-text-candidate | — |
| tests/privacy/runtime-boundary.test.tsx:23:42 | text | 네트워크 금지 | feedback-or-error | — |
| tests/privacy/runtime-boundary.test.tsx:97:7 | text | 입구부터 디버그 기록까지 네트워크 요청이 0건이다 | learner-text-candidate | — |
| tests/privacy/runtime-boundary.test.tsx:104:7 | text | 재시작 확인까지 전체 흐름에서 저장소·쿠키 쓰기가 0건이다 | learner-text-candidate | — |
| tests/privacy/runtime-boundary.test.tsx:108:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:108:58 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:109:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:109:58 | text | 네, 새로 시작해요 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:110:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:110:58 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/release/pages-assets.test.ts:17:11 | text | 릴리스 자산 검사 (계획 §12 Task 7·9) | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:18:7 | text | vite production base가 /conditional-branch-debug-center/로 고정된다 | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| tests/release/pages-assets.test.ts:23:7 | text | playwright baseURL이 같은 하위 경로를 쓴다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:28:7 | text | favicon이 있고 index.html이 한국어·제목·아이콘을 선언한다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:28:55 | text | { expect(existsSync(join(ROOT, 'public', 'favicon.svg'))).toBe(true); const html = readFileSync(join(ROOT, 'index.html'), 'utf8'); expect(html).toContain('lang="ko"'); expect(html).toContain(' | learner-text-candidate | long-or-dense, technical-or-internal |
| tests/release/pages-assets.test.ts:32:29 | text | <title>조건 분기 디버그 센터</title> | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:32:36 | text | 조건 분기 디버그 센터 | learner-text-candidate | repeated-text |
| tests/release/pages-assets.test.ts:36:7 | text | src/assets의 모든 자산이 권리 장부에 1:1로 기록된다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:43:39 | text | 권리 장부에 없는 자산: ${asset} | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:47:7 | text | gi-pulse는 축소 모션에서 animation none + 3px 외곽선으로 대체된다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:55:7 | text | dist 결과물이 하위 경로 base와 해시 자산으로 빌드된다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:58:21 | text | dist가 없어 빌드 결과 검사를 건너뛴다. npm run build 뒤 다시 실행하세요. | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:64:29 | text | 조건 분기 디버그 센터 | learner-text-candidate | repeated-text |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`
