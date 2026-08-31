# 조건 분기 디버그 센터 초등 학습자 개선 계획

> 상태: 구현 전 계획 확정 · 작성일: 2026-08-31 · 요청 모드: `full`

## 1. 프로젝트 규칙과 범위

- 저장소 규칙은 `README.md`, `2026-08-28-conditional-branch-debug-center-implementation-plan.md`, `docs/content-review.md`, `docs/qa/acceptance-checklist.md`, `docs/image-rights-ledger.md`와 현재 코드에서 확인했다.
- 대상은 초등 5~6학년, 실과·정보, 20~30분 활동이다.
- Vite + React 18 + TypeScript + vanilla CSS 정적 SPA를 유지한다.
- 6개 고정 미션, `branchEvaluator` 판정, `sessionReducer` 상태 전이, 탭 메모리, 라이트 모드, 키보드/포커스/축소 모션 계약을 유지한다.
- 서버·로그인·분석·쿠키·localStorage/sessionStorage·음성/TTS/녹음·VoiceOver 검증·새 UI 라이브러리·새 시뮬레이션 엔진은 추가하지 않는다.
- 중요한 단계 CTA에는 기존 `gi-pulse`를 유지하고, `prefers-reduced-motion`에서는 정적 외곽선과 `필수` 배지를 사용한다.
- 커밋·푸시·배포·HVC 등록은 이번 요청 범위에 없다.
- 단일 TS/TSX/CSS 파일은 500줄 미만으로 유지한다.

## 2. 기준선과 우선순위

기준선 상세는 `work/elementary-webapp-ux-audit.md`에 기록했다.

1. **P1 / EDU-UX-001:** 진단 화면에 추적 근거를 다시 보여 주어 오답 회복을 가능하게 한다.
2. **P1 / EDU-UX-002:** 수리 화면의 연산자·기준값을 컴팩트한 키보드 가능 컨트롤로 바꾸어 긴 스크롤과 맥락 손실을 줄인다.
3. **P2 / EDU-UX-003:** 입구의 `이번에 할 일` 위계를 강화하고 320px 진행 단계 래핑을 제거한다.
4. **P2 / EDU-UX-004:** `당첨/실패`를 `맞음/안 맞음`으로 통일한다. gap/overlap/교과 용어는 유지한다.
5. **P2 / EDU-UX-005:** 기록판에 점수 없는 다음 학습 행동을 추가한다.
6. **P3 / EDU-UX-006:** 선택 상태 장식 텍스트를 축약해 네이티브 radio 이름을 깨끗하게 한다.

## 3. 구현 설계

### 앱 셸·진행

- `src/app/App.tsx`: skip link와 `main` 앵커를 추가하고 단계 제목/포커스 계약은 보존한다.
- `src/components/ProgressSteps.tsx`, `src/styles/app.css`: 모바일에서는 7개 단계가 한 줄에 안정적으로 보이도록 숫자 중심 표시를 정리하고, 현재 단계는 제목과 `aria-current`로 전달한다.

### 입구·미션 맥락

- `EntranceScreen.tsx`: 현재 목표, 첫 행동, 완료 후 흐름을 분리한 `이번에 할 일` 패널을 추가한다. 개인정보·새로고침 고지는 의미 있는 HTML 라벨로 정리한다.
- `RuleWorkbench.tsx`: 미션 번호/현재 단계/사례 맥락을 한 묶음으로 보여 주어 각 단계에서 맥락을 잃지 않게 한다.

### 근거·문구·수리

- `TracePanel.tsx`: 상태 배지를 `맞음/안 맞음`으로 바꾸고, 한 줄씩 시험하라는 지시를 앞에 둔다.
- `DiagnosePanel.tsx`: `runRuleSet` 결과로 규칙별 근거 요약을 만들고 진단 선택 위에 렌더링한다. 오답은 정답을 직접 표시하지 않고 같은 요약을 다시 세도록 안내한다.
- `RepairEditor.tsx`: mode/rule/clause 선택의 의미는 유지하고 operator/value 후보만 2열 압축 라디오 그리드로 배치한다. 기존 라디오의 키보드·터치 의미와 현재 수리 맥락을 보존한다.
- `RetestPanel.tsx`, `FeedbackPanel.tsx`, `LearningReport.tsx`: 용어를 통일하고 재시험 요약/다음 학습 행동을 추가한다. 이모지 장식은 CSS/텍스트 기호로 대체한다.

### 스타일 시스템

- `src/styles/tokens.css`, `src/styles/app.css`, `src/styles/components.css`: 기존 라이트 모드를 유지하면서 배경·카드·상태·선택·근거·CTA의 semantic token과 위계를 정돈한다.
- 히어로 SVG는 기능·맥락 도식으로 보존하고, 이미지 생성 모델을 장식 교체에 사용하지 않는다.

### 테스트·문서

- `e2e/learner-flow.spec.ts`, `e2e/mobile-reduced-motion.spec.ts`, `tests/a11y/app.a11y.test.tsx`, 컴포넌트 테스트의 수리 선택자를 압축 라디오 그리드 계약에 맞게 갱신한다.
- `work/elementary-webapp-ux-language-audit.md`에 before/after와 의미 보존을 남기고, 실제 상태에서 확인한다.
- `src/update/updateHistory.ts`에 2026-08-31 개선 항목을 추가한다.

## 4. 필수 수용 기준

- 동일한 first-mission 오답 경로에서 진단판이 규칙별 근거를 자체 제공하고, 오답 뒤 같은 화면에서 재시도할 수 있다.
- 여섯 미션·복수 승인 수리·no-fix 미션이 기존 evaluator/reducer 계약대로 통과한다.
- 수리 화면은 320/375px에서 operator/value를 선택할 수 있고 `수정안 재시험` CTA가 맥락과 함께 읽힌다.
- 320/375/1280px에서 가로 넘침이 없고, 44px 터치 영역·보이는 포커스·라디오 네이티브 의미를 유지한다.
- `npm run verify`의 기존 단계와 변경한 E2E/a11y 테스트가 통과한다.
- 콘솔 오류·실패 요청·깨진 자산이 없고, 저장소·쿠키·네트워크 경계가 유지된다.
- 최종 기록판에 점수/순위 없이 학습 takeaway와 다음 행동이 있다.
- 교과 정확성·어린이 문장·실제 태블릿 가독성은 사람 검수 대기로 별도 표시한다.

## 5. 순서와 롤백

1. 컴포넌트·스타일·문구를 패치한다.
2. 타입/린트/단위/axe/라인 수를 실행한다.
3. preview와 Playwright로 동일 경로를 320/375/1280에서 재실행한다.
4. 실패가 세 번 같은 원인으로 반복되면 추가 시도 대신 원인·대안을 보고하고 사용자 결정을 요청한다.
5. 롤백이 필요하면 이번 작업에서 변경한 파일만 사용자가 선택적으로 되돌린다. 기존 변경과 계획/감사 장부는 삭제하지 않는다.
