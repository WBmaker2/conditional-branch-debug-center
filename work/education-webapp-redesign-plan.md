# 조건 분기 디버그 센터 전체 리디자인 계획

> 상태: 구현·검증 완료(배포 전) · 작성일: 2026-08-30 · 최종 점검일: 2026-08-31 · 요청 모드: `full`

## 1. 작업 개요

| 항목 | 내용 |
| --- | --- |
| 작성일 | 2026-08-30 |
| 프로젝트 | 조건 분기 디버그 센터 |
| 경로 | `/Volumes/ External Drive 256G/Dev2/codex/conditional-branch-debug-center` |
| 요청 | 기존 교육용 React 앱의 전체 시각·상호작용 리디자인 |
| 확인된 스택 | Vite + React 18 + TypeScript + vanilla CSS |
| 대상 학습자 | 저장소 문서 기준 초등 5~6학년, 실과·정보 |
| 앱 형태 | 서버·로그인·분석·쿠키·브라우저 저장소 없는 정적 SPA |
| 기본 검증 명령 | `npm run verify` (실제 `package.json` 스크립트 확인) |
| 배포/외부 작업 | 이번 작업에서 커밋·푸시·배포·HVC 등록·외부 서비스 연결을 하지 않음 |

## 2. 프로젝트 규칙 확인

- 대상 저장소와 `Dev2/codex` 상위 경로에서 `AGENTS.md`, `EDUCATION_DESIGN.md`, `design-system/MASTER.md`를 검색했으며 현재 발견되지 않았다.
- 기존 우선 기준은 `README.md`, `2026-08-28-conditional-branch-debug-center-implementation-plan.md`, `docs/content-review.md`, `docs/qa/acceptance-checklist.md`, `docs/image-rights-ledger.md`와 현재 코드다.
- 기존 계획과 코드의 고정 경계는 유지한다: 6개 미션, 순수 판정 함수, 단계별 학습 흐름, 탭 메모리만 사용, 라이트 모드, 키보드·포커스·축소 모션, 학생 대상 음성 기능과 VoiceOver 검증 제외.
- 주요 다음 행동에는 `gi-pulse` 계열 강조를 유지하되 필수 CTA에만 적용하고, `prefers-reduced-motion`에서는 정적 강조로 낮춘다.
- 단일 TS/TSX/CSS 파일은 500줄 미만을 유지한다. 관련 없는 기존 변경은 보존한다.

## 3. Stage 0 및 하위 스킬 상태

2026-08-30에 Stage 0 `check --offline`을 실행했고, 보고서는 `work/education-webapp-redesign-stage0-report.md`에 기록했다.

| 역할 | 상태 | 실제 지침 경로 | 읽은 시점 |
| --- | --- | --- | --- |
| `$impeccable` | available | `/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md` | 2026-08-30 |
| `$ui-ux-pro-max` | available | `/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md` | 2026-08-30 |
| `$redesign-existing-projects` | available | `/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md` | 2026-08-30 |
| `$imagegen` | provided-by-Codex | `/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md` | 2026-08-30 |

추가로 `$impeccable`의 `context.mjs`를 `src/app/App.tsx` 대상으로 실행했다. 현재 `PRODUCT.md`와 `DESIGN.md`는 없으며, 리디자인 전 제품 사실을 `PRODUCT.md`에 먼저 기록해야 한다는 결과를 확인했다.

## 4. 현재 학습자 흐름과 보존 대상

```text
입구 → 예측 → 규칙 추적 → 갭·겹침 진단 → 최소 수리 → 전체 재시험 → 디버그 기록
```

보존할 기능과 콘텐츠:

- `src/app/sessionReducer.ts`의 상태 전이·응답 보존·재시작 확인 흐름
- `src/domain/branchEvaluator.ts`의 갭/겹침/결정성·최소 수정 판정 계약
- `src/content/missions.ts`의 6개 고정 미션과 검수 메타데이터
- 단계별 예측, 규칙 한 줄 시험, 진단 근거, 조건/우선순위 한 곳 수정, finiteDomain 전체 재시험
- 결과 기록, 인쇄, 업데이트 내역, 글자 크게/움직임 줄이기 도구
- 오류 회복 문구, 실제 기계·교통 제어가 아닌 교육 모형이라는 안전 고지

## 5. 리디자인 범위

### 포함

- 입구부터 결과까지의 정보 위계, 현재 단계 표시, 미션 맥락 카드, 핵심 CTA 위치와 상태 피드백 개선
- `tokens.css`, `app.css`, `components.css`, `motion.css`를 기반으로 한 라이트 전용 교육용 디자인 시스템 정리
- 학습자에게 보이는 단계·사례·규칙·판정·수리·재시험 UI의 시각적 일관성 및 모바일 세로 흐름 개선
- 키보드 순서와 `:focus-visible`, 포커스/스크롤 이동, 44px 이상 터치 영역, 상태 텍스트와 오류 회복 보강
- `업데이트 내역`의 실제 리디자인 변경 기록 추가
- 기존 일반 장식 자산의 사용처·렌더 크기·alt를 감사하고, 필요할 때만 버전 파일로 교체
- 이미지가 없어도 학습이 완주되는 대체 경로 유지

### 변경하지 않을 범위

- 미션 내용·정답·판정 계약·상태 모델·라우팅을 시각 개선을 이유로 임의 변경하지 않음
- 새 서버, 계정, 네트워크, AI 런타임, 분석, 쿠키, localStorage/sessionStorage, 음성/TTS/녹음 추가 금지
- 사실성·출처가 필요한 도식, 규칙 레일, 로고·마크, 역사/과학 증거 이미지는 자동 생성·교체하지 않음
- VoiceOver 구현·검증, 커밋·푸시·배포·HVC 등록은 수행하지 않음
- 사용자가 별도로 승인하지 않는 한 새 UI 라이브러리/아이콘 패키지를 설치하지 않음

## 6. 예정 파일과 책임

| 영역 | 파일 후보 | 변경 원칙 |
| --- | --- | --- |
| 제품 사실/설계 | `PRODUCT.md`, `design-system/MASTER.md`, `design-system/pages/` | 기존 파일이 없으므로 감사·확정 뒤 검토 가능한 문서로 추가. 기존 기준이 생기면 보존하며 최소 변경 |
| 계획/감사/보고 | `work/education-webapp-redesign-*.md` | 각 증거 상태를 분리해 기록 |
| 앱 셸 | `src/app/App.tsx`, `src/components/ProgressSteps.tsx` | 학습 단계와 포커스 계약 보존, 위계·레이아웃 개선 |
| 학습 화면 | `src/features/branch-debug/*.tsx` | 데이터·판정 호출은 보존하고 표현, CTA, 피드백 구조 개선 |
| 결과 화면 | `src/features/report/LearningReport.tsx`, `src/features/report/print.css` | 학습 회고와 다음 행동을 더 분명하게, 인쇄 기능 보존 |
| 공통 상태/도구 | `src/components/*.tsx`, `src/accessibility/AccessibilityToolbar.tsx` | 의미 있는 HTML, 버튼 상태, 다이얼로그·포커스 개선 |
| 스타일 | `src/styles/tokens.css`, `src/styles/app.css`, `src/styles/components.css`, `src/styles/motion.css` | 토큰 중심, 라이트 모드, reduced motion, 500줄 제한 |
| 자산 | `src/assets/**`, `public/**`, import/CSS 사용처 | 일반 장식만 버전 교체 가능, 원본 보존 및 장부 기록 |
| 테스트 | `src/**/*.test.ts(x)`, `tests/**`, `e2e/**` | 기존 계약을 유지하고 새 학습자 흐름·반응형 회귀만 보강 |

## 7. 단계별 실행 순서

1. 제품 사실 확인 후 `PRODUCT.md` 작성. 시각 스타일은 이 단계에서 결정하지 않는다.
2. `$impeccable` 초기 감사: 기존 화면·코드·테스트·대표 자산을 보고 `work/education-webapp-redesign-audit.md`에 P0/P1과 근거를 기록한다.
3. `$ui-ux-pro-max` 검색: 교육용 디버깅 도구, 초등 학습자, 라이트 모드, React/웹 접근성 조건으로 디자인 시스템·스택 지침을 검색한다.
4. `design-system/MASTER.md`와 필요한 페이지 규칙을 작성하고, 초기 감사의 P0/P1을 수용 기준으로 연결한다.
5. `$redesign-existing-projects` 원칙에 따라 기존 구조를 유지한 채 코드 리디자인을 구현한다.
6. `$imagegen` 지침과 `references/asset-safety.md`를 확인한 뒤 자산을 분류한다. 자동 생성은 일반 장식/개념 일러스트에 한정하며, 애매한 자산은 `human review required`로 남긴다.
7. `$impeccable` 최종 검수 및 `work/education-webapp-redesign-report.md` 병합.
8. 실제 `package.json`에 있는 순서대로 `lint → typecheck → test:run → test:a11y → check:lines → build → test:release → test:e2e`를 실행한다. 한 단계 실패가 3회 반복되면 중단하고 원인·대안을 협의한다.

## 8. 수용 기준

- 첫 화면에서 학습 목표, 현재 해야 할 일, 다음 행동, 예상 흐름이 초등 5~6학년에게 한 번에 보인다.
- 모든 단계에서 현재 단계와 사례 맥락이 유지되고, 핵심 CTA가 긴 설명 아래 묻히지 않는다.
- gap/overlap/deterministic 상태가 색상만이 아니라 텍스트·기호·구조로 구분된다.
- 예측 → 추적 → 진단 → 수리 → 재시험 → 기록 흐름이 마우스·터치·키보드에서 동일하게 완주된다.
- 단계 변경 시 새 제목으로 포커스와 스크롤이 이동하고, 다이얼로그는 Escape/닫기/포커스 복원을 제공한다.
- 320px, 375px, 768px, 1280px에서 가로 넘침이 없고 본문·CTA·표가 읽힌다.
- `prefers-reduced-motion` 또는 화면의 움직임 줄이기에서 맥박·이동이 정적 강조로 낮아진다.
- 라이트 모드의 텍스트·상태·포커스 대비, 44px 이상 터치 영역, 의미 있는 alt/레이블을 확인한다.
- 업데이트 내역 문서와 화면 기록이 실제 변경 사항과 일치한다.
- 기존 자동 테스트와 새 회귀 테스트가 통과하고, 사실성·어린이 문장·시각 자산·실제 태블릿 가독성은 사람 검수 대기로 별도 표시된다.

## 9. 위험과 롤백

| 위험 | 대응 |
| --- | --- |
| 시각 변경이 판정/상태 흐름을 건드림 | 순수 evaluator·reducer·콘텐츠는 먼저 보존하고 UI 테스트를 단계별로 실행 |
| 복잡한 수리 편집이 모바일에서 길어짐 | 선택 순서를 세로 흐름으로 재배치하고 현재 입력/CTA를 상단에 유지 |
| 장식 자산이 사실처럼 오해됨 | 생성 자산은 무문자·무수치·무브랜드로 제한하고 애매하면 유지/사람 검토 |
| 기존 사용자의 변경과 충돌 | 시작 상태의 `git status`를 기록하고 관련 파일만 패치, 불필요한 reset/checkout 금지 |
| 검사 실패가 환경 문제임 | 명령·exit status·핵심 출력을 분리 기록하며 같은 시도를 세 번 반복하지 않음 |

롤백은 새 변경 파일을 확인한 뒤 해당 리디자인 커밋이 없으므로 작업 트리에서 변경된 파일만 선택적으로 되돌리는 방식으로 사용자가 승인해야 한다. 기존 `main`의 미관련 변경과 Stage 0 보고서는 삭제하지 않는다.

## 10. 실행 후 게이트

사용자의 전체 점검·개선 요청으로 계획의 구현 게이트가 열렸다. `PRODUCT.md`는 새로 만들지 않고 저장소의 기존 제품 사실 문서와 현재 코드 계약을 유지했다. 최종 결과와 남은 사람 검수 항목은 `work/elementary-webapp-ux-report.md`에 기록한다.
