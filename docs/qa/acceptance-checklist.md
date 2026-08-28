# 수용 기준 점검표 (acceptance-checklist)

계획 §13 검증 명령과 §14 앱별 완료 기준을 대응시킨다. 모든 항목은 `npm run verify`로 재실행할 수 있어야 한다.

## 검증 실행 기록

- 실행: 2026-08-28, macOS(darwin 25.6.0 arm64) / Node v24.15.0 / 프로젝트 루트에서 `npm run verify` 일괄 통과
- 테스트 요약: 단위·컴포넌트 74건, 접근성(axe)·개인정보 경계 6건, 릴리스 자산 6건, E2E 7건 — 전부 통과
- 참고: 이 프로젝트의 프리뷰 포트는 다른 프로젝트와의 충돌을 피해 4180을 쓴다(vite.config.ts·playwright.config.ts).

## 검증 명령 (계획 §13)

- [x] `npm run lint` — 오류 0건
- [x] `npm run typecheck` — 오류 0건
- [x] `npm run test:run` — 6개 미션·판정·reducer·컴포넌트 테스트 실패 0건
- [x] `npm run test:a11y` — axe serious/critical 0건, 네트워크·저장소·쿠키 쓰기 0건
- [x] `npm run check:lines` — 500줄 이상 파일 0개
- [x] `npm run build` — dist 생성, base `/conditional-branch-debug-center/`
- [x] `npm run test:release` — dist 자산·favicon·권리 장부 1:1 대응
- [x] `npm run test:e2e` — 학습 흐름·키보드·320px/375px 넘침·축소 모션 통과
- [x] `git diff --check` — 출력 없음

## 앱별 완료 기준 (계획 §14)

- [x] 여섯 finiteDomain을 모두 열거했을 때 진단되지 않은 입력이 없다 (`analyzeCoverage` 테스트).
- [x] 갭과 겹침을 deterministic 결과로 숨기지 않는다 (우선순위 승자를 반환해도 diagnosis는 overlap으로 남는다).
- [x] 경계값 24/25와 2/3 사례가 비교 연산자의 차이를 화면 근거로 보여 준다.
- [x] 최소 수정이 아닌 대규모 규칙 교체는 설명 없이 통과하지 않는다 (`change:not-minimal` 거부).
- [x] 실제 센서·교통 시스템 제어나 안전 보장 표현이 없다 (교육 모형 한계 고지 포함).

## 사람 검수 (자동화로 대체 불가, 출시 전 필수)

- [ ] 교과 정확성·어린이 문장 난이도 (`docs/content-review.md` 서명)
- [ ] 시각 자산 검수 (`docs/image-rights-ledger.md`)
- [ ] 실제 태블릿 가독성

## 출시 게이트 (계획 §1·Task 9)

- [ ] `npm run verify` 통과 후 별도 출시 승인
- [ ] WBmaker2/conditional-branch-debug-center 원격 생성·push (승인 후)
- [ ] GitHub Pages 확인: 제목·favicon·자산·콘솔 오류 0건·학습 흐름·375px
- [ ] HVC 등록 및 vibehong.shop 갤러리 동기화 (공개 앱 확인 후 별도 단계)
