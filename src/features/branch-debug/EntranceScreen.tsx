import controlRoom from '../../assets/generated/branch-control-room.svg';
import { ActionButton } from '../../components/ActionButton';
import { missions } from '../../content/missions';

interface EntranceScreenProps {
  onStart: () => void;
}

// 계획 §9 입구: 학습 목표·미션·시간·개인정보 경계를 안내한다.
export function EntranceScreen({ onStart }: EntranceScreenProps) {
  return (
    <section className="entrance" aria-labelledby="entrance-title">
      <img
        src={controlRoom}
        alt="밝은 교실의 가상 조절 작업대 위에 전등, 화분, 선풍기, 책, 버스 정류장 표지가 놓여 있고 규칙 레일이 분기 다이아몬드로 이어진 그림"
        className="entrance__hero"
        width={1440}
        height={900}
      />
      <h2 id="entrance-title">오늘의 임무: 빠진 조건 찾기</h2>
      <p className="entrance__lead">
        규칙은 <strong>입력</strong>을 보고 <strong>조건</strong>에 맞으면 <strong>행동</strong>을
        골라요. 이곳에서는 규칙의 버그를 찾아 고치는 디버그 관리자가 됩니다.
      </p>
      <h3>학습 목표</h3>
      <ul className="goal-list">
        <li>입력, 조건, 행동을 구분하고 규칙을 한 줄씩 시험해요.</li>
        <li>
          어떤 규칙에도 맞지 않는 <strong>갭</strong>과 여러 규칙에 동시에 맞는{' '}
          <strong>겹침</strong>을 구분해요.
        </li>
        <li>3과 4 사이 경계값에서 비교 연산자 하나가 결과를 바꾸는 이유를 설명해요.</li>
        <li>규칙 전체를 다시 쓰지 않고 조건 하나 또는 순서 하나를 최소로 고쳐요.</li>
      </ul>
      <div className="actions-row">
        <ActionButton className="entrance__start" onClick={onStart}>
          학습 시작하기
        </ActionButton>
        <span>예상 시간: 20~30분 · 미션 6개</span>
      </div>
      <div className="notice">
        <p>🔒 여러분의 답과 이름은 어디에도 저장하거나 보내지 않아요.</p>
        <p>⚠️ 새로고침하면 지금까지 고른 답이 사라져요.</p>
      </div>
      <h3>미션 살펴보기</h3>
      <ol className="mission-list">
        {missions.map((mission, index) => (
          <li key={mission.id}>
            <strong>
              {index + 1}. {mission.content.title}
            </strong>{' '}
            — {mission.content.goal}
          </li>
        ))}
      </ol>
    </section>
  );
}
