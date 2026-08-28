import type { Clause, InputCase, LearningMission, MissionId, Rule } from '../domain/types';
import { validateContent } from './validateContent';

// 계획 §4: 런타임 무작위 생성 없이 검수된 고정 미션 6개만 제공한다.
// ID·조건·규칙·수리는 계획 §4.1 fixture와 같은 문자열·값을 쓴다.
const SOURCE = '2026-08-28 구현 계획 §4.1 고정 fixture 기반 · docs/content-review.md 참조';

const KID_NOTES = {
  gap: '어떤 규칙에도 맞지 않아 아무 일도 일어나지 않는 사례가 있어요.',
  overlap: '두 개 이상의 규칙이 동시에 당첨되는 사례가 있어요.',
  deterministic: '모든 사례가 딱 한 규칙씩 당첨돼요.',
} as const;

function numberCases(idPrefix: string, field: string, values: readonly number[]): InputCase[] {
  return values.map((v) => ({ id: `${idPrefix}${v}`, values: { [field]: v } }));
}

// ---- branch-lamp-01 : 밝기 2가 빠진 갭 ----

const lampClauses: Clause[] = [
  { id: 'lamp-on-brightness', field: 'brightness', operator: 'lt', expected: 2 },
  { id: 'lamp-off-brightness', field: 'brightness', operator: 'gte', expected: 3 },
];

const lampMission: LearningMission = {
  id: 'branch-lamp-01',
  finiteDomain: numberCases('lamp-b', 'brightness', [0, 1, 2, 3, 4, 5]),
  clauses: lampClauses,
  rules: [
    { id: 'lamp-on', clauseIds: ['lamp-on-brightness'], actionId: 'lamp-on' },
    { id: 'lamp-off', clauseIds: ['lamp-off-brightness'], actionId: 'lamp-off' },
  ],
  validRepairIds: ['lamp-on-lte-2', 'lamp-off-gte-2'],
  sourceNote: SOURCE,
  reviewStatus: 'approved',
  misconceptionGuard:
    '"2보다 작다"와 "3보다 크거나 같다" 사이에 밝기 2가 비어 있는지 먼저 보게 하고, 경계값 2를 반드시 시험하게 한다.',
  content: {
    title: '가상 전등 밝기 조절소',
    scene:
      '방 안의 가상 전등은 밝기 센서 값(0~5단계)에 따라 켜지고 꺼려요. 그런데 밝기 2에서 전등이 멈춰 버린다는 통보가 왔어요.',
    goal: '밝기 2 사례를 시험해 빠진 조건(갭)을 찾고, 조건 한 곳만 고쳐 완성해요.',
    focusInputId: 'lamp-b2',
    fields: [{ name: 'brightness', label: '밝기', kind: 'number', unit: '단계' }],
    actions: [
      { id: 'lamp-on', label: '전등 켜기' },
      { id: 'lamp-off', label: '전등 끄기' },
    ],
    kidNotes: KID_NOTES,
    extraClauses: [],
    noFixAllowed: false,
  },
  repairs: [
    {
      id: 'lamp-on-lte-2',
      label: '전등 켜기 규칙을 "밝기: 2보다 작거나 같음"으로 바꾸기',
      proposal: {
        kind: 'edit',
        ruleId: 'lamp-on',
        clauses: [{ id: 'lamp-on-brightness', field: 'brightness', operator: 'lte', expected: 2 }],
      },
    },
    {
      id: 'lamp-off-gte-2',
      label: '전등 끄기 규칙을 "밝기: 2보다 크거나 같음"으로 바꾸기',
      proposal: {
        kind: 'edit',
        ruleId: 'lamp-off',
        clauses: [{ id: 'lamp-off-brightness', field: 'brightness', operator: 'gte', expected: 2 }],
      },
    },
  ],
};

// ---- branch-plant-02 : (촉촉함 1, 비 예보 예)에서 겹침 ----

const plantClauses: Clause[] = [
  { id: 'plant-water-moisture', field: 'moisture', operator: 'lte', expected: 2 },
  { id: 'plant-wait-rain', field: 'rain', operator: 'eq', expected: true },
  { id: 'plant-rest-moisture', field: 'moisture', operator: 'gte', expected: 3 },
  { id: 'plant-rest-no-rain', field: 'rain', operator: 'eq', expected: false },
];

const plantMission: LearningMission = {
  id: 'branch-plant-02',
  finiteDomain: [
    { id: 'plant-m1-r0', values: { moisture: 1, rain: false } },
    { id: 'plant-m1-r1', values: { moisture: 1, rain: true } },
    { id: 'plant-m3-r0', values: { moisture: 3, rain: false } },
    { id: 'plant-m3-r1', values: { moisture: 3, rain: true } },
  ],
  clauses: plantClauses,
  rules: [
    { id: 'water', clauseIds: ['plant-water-moisture'], actionId: 'water' },
    { id: 'wait', clauseIds: ['plant-wait-rain'], actionId: 'wait' },
    { id: 'rest', clauseIds: ['plant-rest-moisture', 'plant-rest-no-rain'], actionId: 'skip' },
  ],
  validRepairIds: ['plant-water-add-no-rain', 'plant-wait-priority-1'],
  sourceNote: SOURCE,
  reviewStatus: 'approved',
  misconceptionGuard:
    '비 예보가 있으면 무조건 기다리는 것이 늘 옳다고 받아들이지 않게, 조건 좁히기와 우선순위 두 해법을 모두 인정하고 겹침 기록을 함께 보여 준다.',
  content: {
    title: '화분 물 주기 검사소',
    scene:
      '화분 센서는 흙 촉촉함(1~3)과 비 예보(예/아니오)를 알려 줘요. 물 주기 규칙과 기다리기 규칙이 동시에 당첨되는 사례가 있다는 신고가 왔어요.',
    goal: '겹침 사례를 찾아 조건을 좁히거나 실행 순서를 정해요.',
    focusInputId: 'plant-m1-r1',
    fields: [
      { name: 'moisture', label: '흙 촉촉함', kind: 'number' },
      {
        name: 'rain',
        label: '비 예보',
        kind: 'boolean',
        booleanLabels: { true: '예', false: '아니오' },
      },
    ],
    actions: [
      { id: 'water', label: '물 주기' },
      { id: 'wait', label: '기다리기' },
      { id: 'skip', label: '그대로 두기' },
    ],
    kidNotes: KID_NOTES,
    extraClauses: [{ id: 'plant-water-no-rain', field: 'rain', operator: 'eq', expected: false }],
    noFixAllowed: false,
  },
  repairs: [
    {
      id: 'plant-water-add-no-rain',
      label: '물 주기 규칙에 "비 예보: 아니오" 조건 추가하기',
      proposal: {
        kind: 'edit',
        ruleId: 'water',
        clauses: [
          plantClauses[0],
          { id: 'plant-water-no-rain', field: 'rain', operator: 'eq', expected: false },
        ],
      },
    },
    {
      id: 'plant-wait-priority-1',
      label: '기다리기 규칙을 가장 먼저 실행하기',
      proposal: { kind: 'edit', ruleId: 'wait', clauses: [plantClauses[1]], priority: 1 },
    },
  ],
};

// ---- branch-fan-03 : 25도가 빠진 갭(크다 vs 이상) ----

const fanClauses: Clause[] = [
  { id: 'fan-off-temperature', field: 'temperature', operator: 'lte', expected: 24 },
  { id: 'fan-on-temperature', field: 'temperature', operator: 'gt', expected: 25 },
];

const fanMission: LearningMission = {
  id: 'branch-fan-03',
  finiteDomain: numberCases('fan-t', 'temperature', [20, 24, 25, 30]),
  clauses: fanClauses,
  rules: [
    { id: 'fan-off', clauseIds: ['fan-off-temperature'], actionId: 'fan-off' },
    { id: 'fan-on', clauseIds: ['fan-on-temperature'], actionId: 'fan-on' },
  ],
  validRepairIds: ['fan-on-gte-25', 'fan-off-lte-25'],
  sourceNote: SOURCE,
  reviewStatus: 'approved',
  misconceptionGuard:
    '24도와 25도를 잇달아 시험하게 하여 "크다"와 "크거나 같다"의 차이 하나가 결과를 바꾸는 경험을 보장한다.',
  content: {
    title: '교실 선풍기 경계점 관측소',
    scene:
      '교실 선풍기는 온도(20~30도)에 따라 켜지고 꺼려요. 24도에서는 꺼지고 30도에서는 켜지는데, 25도에서는 반응이 없대요.',
    goal: '24도와 25도 사례를 비교해 "크다"와 "이상"의 차이를 근거로 고쳐요.',
    focusInputId: 'fan-t25',
    fields: [{ name: 'temperature', label: '온도', kind: 'number', unit: '도' }],
    actions: [
      { id: 'fan-on', label: '선풍기 켜기' },
      { id: 'fan-off', label: '선풍기 끄기' },
    ],
    kidNotes: KID_NOTES,
    extraClauses: [],
    noFixAllowed: false,
  },
  repairs: [
    {
      id: 'fan-on-gte-25',
      label: '선풍기 켜기 규칙을 "온도: 25보다 크거나 같음"으로 바꾸기',
      proposal: {
        kind: 'edit',
        ruleId: 'fan-on',
        clauses: [{ id: 'fan-on-temperature', field: 'temperature', operator: 'gte', expected: 25 }],
      },
    },
    {
      id: 'fan-off-lte-25',
      label: '선풍기 끄기 규칙을 "온도: 25보다 작거나 같음"으로 바꾸기',
      proposal: {
        kind: 'edit',
        ruleId: 'fan-off',
        clauses: [{ id: 'fan-off-temperature', field: 'temperature', operator: 'lte', expected: 25 }],
      },
    },
  ],
};

// ---- branch-library-04 : 미반납 당일(dueOffset 0)이 빠진 갭 ----

const libraryClauses: Clause[] = [
  { id: 'library-no-notice-returned', field: 'returned', operator: 'eq', expected: true },
  { id: 'library-remind-returned', field: 'returned', operator: 'eq', expected: false },
  { id: 'library-remind-due', field: 'dueOffset', operator: 'lte', expected: -1 },
  { id: 'library-overdue-returned', field: 'returned', operator: 'eq', expected: false },
  { id: 'library-overdue-due', field: 'dueOffset', operator: 'gte', expected: 1 },
];

const libraryReturnedValues = [true, false] as const;
const libraryDueValues = [-1, 0, 1] as const;
const libraryDomain: InputCase[] = libraryReturnedValues.flatMap((returned) =>
  libraryDueValues.map((dueOffset) => ({
    id: `library-r${returned ? 1 : 0}-d${dueOffset}`,
    values: { returned, dueOffset },
  })),
);

const libraryMission: LearningMission = {
  id: 'branch-library-04',
  finiteDomain: libraryDomain,
  clauses: libraryClauses,
  rules: [
    { id: 'no-notice', clauseIds: ['library-no-notice-returned'], actionId: 'no-notice' },
    { id: 'remind', clauseIds: ['library-remind-returned', 'library-remind-due'], actionId: 'remind' },
    { id: 'overdue', clauseIds: ['library-overdue-returned', 'library-overdue-due'], actionId: 'overdue' },
  ],
  validRepairIds: ['library-remind-due-0', 'library-overdue-due-0'],
  sourceNote: SOURCE,
  reviewStatus: 'approved',
  misconceptionGuard:
    '당일(0)을 "기한 전"과 "기한 후" 어느 쪽에 넣을지 두 해법을 모두 인정하고, 반납한 책은 어떤 수리로도 알림 대상이 되지 않게 유지한다.',
  content: {
    title: '도서 반납 알림 국',
    scene:
      '책 반납 시스템은 반납 여부와 반납 기한(기한 전 -1 · 당일 0 · 기한 후 1)을 봐요. 아직 반납하지 않은 책 중 당일 사례에서 아무 알림도 없대요.',
    goal: '기한 전·당일·이후 사례를 모두 시험해 당일이 빠지지 않은 조건 묶음을 완성해요.',
    focusInputId: 'library-r0-d0',
    fields: [
      {
        name: 'returned',
        label: '반납 여부',
        kind: 'boolean',
        booleanLabels: { true: '반납함', false: '아직 안 함' },
      },
      {
        name: 'dueOffset',
        label: '반납 기한',
        kind: 'number',
        unit: '일',
        valueLabels: { '-1': '기한 전', '0': '당일', '1': '기한 후' },
      },
    ],
    actions: [
      { id: 'no-notice', label: '알림 끄기' },
      { id: 'remind', label: '반납 알림 보내기' },
      { id: 'overdue', label: '연체 안내 보내기' },
    ],
    kidNotes: KID_NOTES,
    extraClauses: [],
    noFixAllowed: false,
  },
  repairs: [
    {
      id: 'library-remind-due-0',
      label: '반납 알림 규칙의 기한 조건을 "0보다 작거나 같음"으로 바꾸기',
      proposal: {
        kind: 'edit',
        ruleId: 'remind',
        clauses: [
          libraryClauses[1],
          { id: 'library-remind-due', field: 'dueOffset', operator: 'lte', expected: 0 },
        ],
      },
    },
    {
      id: 'library-overdue-due-0',
      label: '연체 안내 규칙의 기한 조건을 "0보다 크거나 같음"으로 바꾸기',
      proposal: {
        kind: 'edit',
        ruleId: 'overdue',
        clauses: [
          libraryClauses[3],
          { id: 'library-overdue-due', field: 'dueOffset', operator: 'gte', expected: 0 },
        ],
      },
    },
  ],
};

// ---- branch-sorter-05 : 재질만 보고 실행되는 규칙과 확인 규칙의 겹침 ----

const sorterClauses: Clause[] = [
  { id: 'sorter-paper-material', field: 'material', operator: 'eq', expected: 'paper' },
  { id: 'sorter-plastic-material', field: 'material', operator: 'eq', expected: 'plastic' },
  { id: 'sorter-plastic-clean', field: 'clean', operator: 'eq', expected: true },
  { id: 'sorter-check-dirty', field: 'clean', operator: 'eq', expected: false },
];

const sorterMission: LearningMission = {
  id: 'branch-sorter-05',
  finiteDomain: [
    { id: 'sort-paper-clean', values: { material: 'paper', clean: true } },
    { id: 'sort-paper-dirty', values: { material: 'paper', clean: false } },
    { id: 'sort-plastic-clean', values: { material: 'plastic', clean: true } },
    { id: 'sort-plastic-dirty', values: { material: 'plastic', clean: false } },
  ],
  clauses: sorterClauses,
  rules: [
    { id: 'paper-bin', clauseIds: ['sorter-paper-material'], actionId: 'paper-bin' },
    { id: 'plastic-bin', clauseIds: ['sorter-plastic-material', 'sorter-plastic-clean'], actionId: 'plastic-bin' },
    { id: 'check-first', clauseIds: ['sorter-check-dirty'], actionId: 'check-first' },
  ],
  validRepairIds: ['sorter-paper-add-clean', 'sorter-check-priority-1'],
  sourceNote: SOURCE,
  reviewStatus: 'approved',
  misconceptionGuard:
    '"재질만 보고 실행되면 안 된다"는 이유를 사례 근거로 말하게 하고, 우선순위 해법을 고를 때는 겹침이 기록에 남는 점을 함께 보여 준다.',
  content: {
    title: '재질 분류기 점검실',
    scene:
      '가상 쓰레기 분류기는 재질(종이/플라스틱)과 오염 상태(깨끗함/더러움)를 봐요. 더러운 종이가 종이 통 규칙과 먼저 확인 규칙에 동시에 당첨된대요.',
    goal: '재질만 보고 실행되는 규칙을 찾아 조건을 추가하거나 실행 순서를 정해요.',
    focusInputId: 'sort-paper-dirty',
    fields: [
      {
        name: 'material',
        label: '재질',
        kind: 'enum',
        enumLabels: { paper: '종이', plastic: '플라스틱' },
      },
      {
        name: 'clean',
        label: '오염 상태',
        kind: 'boolean',
        booleanLabels: { true: '깨끗함', false: '더러움' },
      },
    ],
    actions: [
      { id: 'paper-bin', label: '종이 통으로 보내기' },
      { id: 'plastic-bin', label: '플라스틱 통으로 보내기' },
      { id: 'check-first', label: '먼저 확인하기' },
    ],
    kidNotes: KID_NOTES,
    extraClauses: [{ id: 'sorter-paper-clean', field: 'clean', operator: 'eq', expected: true }],
    noFixAllowed: false,
  },
  repairs: [
    {
      id: 'sorter-paper-add-clean',
      label: '종이 통 규칙에 "오염 상태: 깨끗함" 조건 추가하기',
      proposal: {
        kind: 'edit',
        ruleId: 'paper-bin',
        clauses: [
          sorterClauses[0],
          { id: 'sorter-paper-clean', field: 'clean', operator: 'eq', expected: true },
        ],
      },
    },
    {
      id: 'sorter-check-priority-1',
      label: '먼저 확인하기 규칙을 가장 먼저 실행하기',
      proposal: { kind: 'edit', ruleId: 'check-first', clauses: [sorterClauses[3]], priority: 1 },
    },
  ],
};

// ---- branch-bus-06 : 결함 없음, 6개 고정 사례 덮임 검증 (FieldReference 사용) ----

const busClauses: Clause[] = [
  { id: 'bus-idle-no-waiting', field: 'waiting', operator: 'eq', expected: 0 },
  { id: 'bus-wait-no-seats', field: 'seats', operator: 'eq', expected: 0 },
  { id: 'bus-wait-waiting', field: 'waiting', operator: 'gt', expected: 0 },
  { id: 'bus-boardall-waiting', field: 'waiting', operator: 'gt', expected: 0 },
  { id: 'bus-boardall-seats', field: 'seats', operator: 'gte', expected: { fieldRef: 'waiting' } },
  { id: 'bus-boardpart-seats', field: 'seats', operator: 'gt', expected: 0 },
  { id: 'bus-boardpart-waiting', field: 'waiting', operator: 'gt', expected: { fieldRef: 'seats' } },
];

const busPairs: readonly (readonly [number, number])[] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
  [3, 1],
  [3, 4],
];
const busDomain: InputCase[] = busPairs.map(([seats, waiting]) => ({
  id: `bus-s${seats}-w${waiting}`,
  values: { seats, waiting },
}));

const busMission: LearningMission = {
  id: 'branch-bus-06',
  finiteDomain: busDomain,
  clauses: busClauses,
  rules: [
    { id: 'idle', clauseIds: ['bus-idle-no-waiting'], actionId: 'idle' },
    { id: 'wait', clauseIds: ['bus-wait-no-seats', 'bus-wait-waiting'], actionId: 'wait' },
    { id: 'board-all', clauseIds: ['bus-boardall-waiting', 'bus-boardall-seats'], actionId: 'board-all' },
    { id: 'board-part', clauseIds: ['bus-boardpart-seats', 'bus-boardpart-waiting'], actionId: 'board-part' },
  ],
  validRepairIds: ['bus-keep-rules'],
  sourceNote: SOURCE,
  reviewStatus: 'approved',
  misconceptionGuard:
    '결함이 없는 미션에서 억지로 고치게 하지 않고, 여섯 사례 전체를 덮는지 확인하기 자체를 성공으로 인정한다.',
  content: {
    title: '셔틀 버스 배차 검증소',
    scene:
      '가상 셔틀은 자리 수와 대기 인원을 보아 출발하지 않기·다음 버스 기다리기·전부 탑승·자리만큼만 탑승을 정해요. 이 미션은 규칙이 완성되어 있어요.',
    goal: '여섯 개 고정 사례를 모두 시험해 모든 사례가 정확히 한 규칙에 당첨되는지 확인해요.',
    focusInputId: 'bus-s1-w1',
    fields: [
      { name: 'seats', label: '자리 수', kind: 'number', unit: '개' },
      { name: 'waiting', label: '대기 인원', kind: 'number', unit: '명' },
    ],
    actions: [
      { id: 'idle', label: '출발하지 않기' },
      { id: 'wait', label: '다음 버스 기다리기' },
      { id: 'board-all', label: '전부 탑승' },
      { id: 'board-part', label: '자리만큼만 탑승' },
    ],
    kidNotes: KID_NOTES,
    extraClauses: [],
    noFixAllowed: true,
  },
  repairs: [
    {
      id: 'bus-keep-rules',
      label: '규칙을 그대로 둘래요(결함 없음)',
      proposal: { kind: 'none', ruleId: '-', clauses: [] },
    },
  ],
};

export const missions: readonly LearningMission[] = [
  lampMission,
  plantMission,
  fanMission,
  libraryMission,
  sorterMission,
  busMission,
];

// 잘못된 콘텐츠는 개발·빌드·테스트 시 예외로 중단한다 (계획 §7.2).
validateContent(missions);

export function missionById(id: MissionId): LearningMission {
  const found = missions.find((m) => m.id === id);
  if (!found) throw new Error(`미션을 찾을 수 없다: ${id}`);
  return found;
}
