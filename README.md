# 조건 분기 디버그 센터

초등 5~6학년 실과·정보 학습용 정적 디버깅 앱. 학생은 입력 사례를 규칙에 하나씩 시험해 보고,
어떤 규칙에도 맞지 않는 **갭(gap)**, 여러 규칙에 동시에 맞는 **겹침(overlap)**,
경계값 오류를 찾아 한 조건 또는 우선순위를 **최소 수정**한 뒤 근거를 설명한다.

- 대상: 초등 5~6학년 / 실과·정보 / 예상 활동 시간 20~30분
- 구성: 입구 → 예측 → 규칙 추적 → 진단 → 수리 → 재시험 → 디버그 기록, 미션 6개 고정
- 개인정보: 서버·로그인·분석·쿠키·localStorage 없음. 응답은 탭 메모리에만 존재하며 새로고침하면 사라진다.
- 접근성: 키보드 동등 조작, 320px 이상 반응형, 고대비 포커스, 축소 모션 대체. VoiceOver 수동 검증은 범위 밖(계획 §1).

## 개발

```bash
npm install
npm run dev        # 로컬 개발 (base /)
npm run verify     # lint → typecheck → 단위 → 접근성·개인정보 → 줄수 → build → 릴리스 → E2E
```

| 스크립트 | 내용 |
|---|---|
| `npm run lint` / `npm run typecheck` | 정적 검사 |
| `npm run test:run` | 도메인·콘텐츠·reducer·컴포넌트 단위 테스트 |
| `npm run test:a11y` | axe 접근성 + 네트워크·저장소 경계 테스트 |
| `npm run check:lines` | TS·TSX·CSS 500줄 미만 강제 |
| `npm run build` | production 빌드 (base `/conditional-branch-debug-center/`) |
| `npm run test:release` | 빌드 결과물·자산 권리 장부 검사 |
| `npm run test:e2e` | Playwright 학습 흐름·키보드·모바일·축소 모션 |

## 검수 경계 (계획 §15)

- 자동화로 증명: 타입, 순수 판정, 콘텐츠 무결성, 키보드 흐름, 축소 모션, 가로 넘침, 개인정보·네트워크 경계, 빌드 자산.
- 사람 검수 필요: 교과 정확성, 어린이 문장 난이도, 생성 이미지 검수, 실제 태블릿 가독성 → `docs/content-review.md`.
- 배포(GitHub Pages)·HVC 등록은 `npm run verify` 통과와 별도 출시 승인 후에만 진행한다.

구현 계획 원문: `2026-08-28-conditional-branch-debug-center-implementation-plan.md`
(SHA-256 `5bfc925c39a5aa9b6012774e98c132642f9d95e6755fbdbbb77af8dc0cca5c1b`, 원본과 대조 완료)
