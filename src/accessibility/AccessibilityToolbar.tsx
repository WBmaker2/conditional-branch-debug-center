import { useEffect, useState } from 'react';

// 메모리에만 존재하는 화면 도구. 저장소를 쓰지 않는다 (계획 §11).
export function AccessibilityToolbar() {
  const [bigText, setBigText] = useState(false);
  const [lessMotion, setLessMotion] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('big-text', bigText);
    document.documentElement.classList.toggle('reduce-motion', lessMotion);
    return () => {
      document.documentElement.classList.remove('big-text', 'reduce-motion');
    };
  }, [bigText, lessMotion]);

  return (
    <div className="toolbar" role="group" aria-label="화면 도구">
      <button
        type="button"
        className="btn btn--ghost btn--small"
        aria-pressed={bigText}
        onClick={() => setBigText((value) => !value)}
      >
        글자 크게
      </button>
      <button
        type="button"
        className="btn btn--ghost btn--small"
        aria-pressed={lessMotion}
        onClick={() => setLessMotion((value) => !value)}
      >
        움직임 줄이기
      </button>
    </div>
  );
}
