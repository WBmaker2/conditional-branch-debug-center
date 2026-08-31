# 학습자 문구 감사 장부

> 후보 수집기 결과는 `work/elementary-webapp-ux-language-candidates.md`에 보관한다. 이 장부는 실제 핵심 경로에서 보이는 문구만 선별한다. 대상은 초등 5~6학년이며, 교과 정확성 사람 검수는 기존 `docs/content-review.md`와 함께 계속 대기한다.

| issue-id | screen/state · surface | source/evidence | before | after | difficulty signals | learning intent preserved | curriculum accuracy | comprehension probe | verification state | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EDU-LANG-001 | 입구 · 안전 고지 | `EntranceScreen.tsx`; 320 snapshot | `🔒 여러분의 답과 이름은 어디에도 저장하거나 보내지 않아요.` | `개인정보 보호: 이름과 답은 저장하거나 보내지 않아요.` | abstract-or-formal, emoji-as-structure | yes | human-review | 지시 재진술: “이름과 답을 남기지 않는다는 뜻” | browser-confirmed | fixed |
| EDU-LANG-002 | 입구 · 안전 고지 | `EntranceScreen.tsx`; 320 snapshot | `⚠️ 새로고침하면 지금까지 고른 답이 사라져요.` | `주의: 새로고침하면 고른 답이 사라져요.` | abstract-or-formal, missing-recovery | yes | confirmed | 결과 예측: 새로고침 뒤 처음부터 시작됨을 설명 | browser-confirmed | fixed |
| EDU-LANG-003 | 추적 · rule status | `TracePanel.tsx` | `✓ 당첨` | `✓ 맞음` | technical-or-internal, inconsistent-label | yes | confirmed | 용어 설명: 조건을 모두 만족한 규칙이라고 설명 | e2e-confirmed | fixed |
| EDU-LANG-004 | 추적 · rule status | `TracePanel.tsx` | `✗ 실패` | `✗ 안 맞음` | ambiguous-reference, inconsistent-label | yes | confirmed | 용어 설명: 이 사례에는 조건이 맞지 않는다고 설명 | e2e-confirmed | fixed |
| EDU-LANG-005 | 추적 · instruction | `TracePanel.tsx` | `사례: …` 뒤에 규칙 결과만 노출 | `이 사례에서 규칙을 한 줄씩 확인하세요.` | missing-term-explanation, missing-recovery | yes | confirmed | 지시 재진술: 규칙 시험 버튼을 눌러 한 줄씩 확인 | browser-confirmed | fixed |
| EDU-LANG-006 | 진단 · instruction | `DiagnosePanel.tsx` | `위 추적판의 "✓ 당첨" 표시를 보고…` | `아래 근거를 보고, 맞는 규칙의 수를 세어 진단을 골라 보세요.` | ambiguous-reference, missing-recovery | yes | human-review | 지시 재진술: 아래 목록에서 맞음 개수를 센 뒤 선택 | browser-confirmed | fixed |
| EDU-LANG-007 | 진단 · wrong feedback | `DiagnosePanel.tsx` | `위 추적판에서 "✓ 당첨" 표시가 몇 개인지 다시 세어 보세요.` | `아래 근거에서 `맞음` 표시의 개수를 다시 세어 보세요.` | ambiguous-reference, inconsistent-label | yes | confirmed | 회복 행동: 같은 화면의 근거를 다시 세고 다른 선택 | browser-confirmed | fixed |
| EDU-LANG-008 | 재시험 · success feedback | `RetestPanel.tsx` | `규칙이 정확히 하나씩 당첨됐어요.` | `각 사례에 맞는 규칙이 정확히 하나씩 있어요.` | technical-or-internal, inconsistent-label | yes | human-review | 결과 예측: 표의 판정이 한 규칙으로 정리됨을 설명 | e2e-confirmed | fixed |
| EDU-LANG-009 | 재시험 · warning feedback | `RetestPanel.tsx` | `아직 아무 규칙에도 당첨되지 않는 사례가 남았어요.` | `아직 어떤 규칙에도 맞지 않는 사례가 남았어요.` | technical-or-internal, inconsistent-label | yes | human-review | 회복 행동: 표에서 갭 행을 찾아 다시 고침 | e2e-confirmed | fixed |
| EDU-LANG-010 | 기록 · next action | `LearningReport.tsx` | 결과를 본 뒤 다음 학습 행동 안내 없음 | `다음에는 한 미션을 골라 “입력 → 조건 → 행동”을 친구에게 설명해 보세요.` | missing-recovery, missing-term-explanation | yes | human-review | 전이: 한 사례를 골라 세 요소를 설명 | unit·e2e-confirmed | fixed |

## 문구 적용 원칙

- `갭`, `겹침`, 비교 연산자, 수치와 정답 조건은 삭제하거나 다른 뜻으로 바꾸지 않는다.
- `맞음/안 맞음`은 규칙이 현재 입력 사례의 조건을 만족하는지 설명하는 상태 언어이며, 계산 결과는 기존 evaluator에서만 가져온다.
- 학생이 실제로 다시 볼 근거가 화면에 있어야 하므로 오답 힌트의 대상 지시어를 `위 추적판`에서 `아래 근거`로 바꾼다.
- 교과 정확성은 자동 테스트가 아닌 사람 검수 대상이며, 이 장부에서 `human-review`를 숨기지 않는다.
