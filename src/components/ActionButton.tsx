import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  // 계획 §10: 필수 다음 행동(규칙 시험하기·수정안 재시험)에만 gi-pulse를 쓴다.
  pulse?: boolean;
  children: ReactNode;
}

export function ActionButton({
  variant = 'primary',
  pulse = false,
  className,
  children,
  ...rest
}: ActionButtonProps) {
  const classes = ['btn', `btn--${variant}`, pulse ? 'gi-pulse' : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={classes} {...rest}>
      {children}
      {pulse ? (
        <span className="btn__must-badge" aria-hidden="true">
          필수
        </span>
      ) : null}
    </button>
  );
}
