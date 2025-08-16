'use client';
import { useState } from 'react';

export default function ChatUI() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    if (!res.ok) {
      console.error('Error:', await res.text());
      setIsLoading(false);
      return;
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader?.read() ?? { done: true };
      if (done) break;
      const chunk = decoder.decode(value);
      setResponse((prev) => prev + chunk); // Append streamed chunks
    }

    setIsLoading(false);
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
      <div>{isLoading ? 'Thinking...' : response}</div>
    </div>
  );
}