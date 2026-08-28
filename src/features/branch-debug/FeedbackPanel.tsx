interface FeedbackPanelProps {
  tone: 'success' | 'warning' | 'info';
  messages: readonly string[];
}

export function FeedbackPanel({ tone, messages }: FeedbackPanelProps) {
  const icon = tone === 'success' ? '✔' : tone === 'warning' ? '💡' : 'ℹ';
  return (
    <div role="status" className={`feedback feedback--${tone}`}>
      <p aria-hidden="true" className="feedback__icon">
        {icon}
      </p>
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}
