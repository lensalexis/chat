"use client";

import { useChat } from '@ai-sdk/react';
import { Column, Row, Text, Textarea, IconButton, Heading, Button, useToast } from '@once-ui-system/core';
import { prompts } from '@/content/misc/prompts';
import MessageBubble from '@/components/MessageBubble';
import React, { useRef, useEffect } from 'react';

/* ---------- helpers for cleaner assistant output ---------- */
function escapeHTML(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanMarkdownSymbols(text: string) {
  return text
    .replace(/^\s*[*#]+\s?/gm, '')      // strip leading * or # on lines
    .replace(/\*\*(.*?)\*\*/g, '$1')    // bold -> plain
    .replace(/\*(.*?)\*/g, '$1');       // italics -> plain
}

function linkify(text: string) {
  const url = /(https?:\/\/[^\s)]+)|(\/[a-zA-Z0-9/_-]+(?:\?[^\s)]+)?)/g;
  return text.replace(url, (match) => {
    const href =
      match.startsWith('http') ? match :
      match.startsWith('/') ? match :
      '';
    if (!href) return match;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${match}</a>`;
  });
}

function renderAssistantHTML(raw: string) {
  const safe = escapeHTML(cleanMarkdownSymbols(raw));
  // convert "- " bullets to •
  const bullets = safe.replace(/^- /gm, '• ');
  return linkify(bullets);
}
/* --------------------------------------------------------- */

export default function ChatClient(): React.ReactNode {
  const { addToast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
  } = useChat({
    onError(err) {
      addToast({ message: err.message || 'Chat failed', variant: 'error' });
      console.error('[chat] onError', err);
    },
  });

  // auto-scroll
  useEffect(() => {
    if (!chatContainerRef.current || !messagesEndRef.current) return;
    const c = chatContainerRef.current;
    c.scrollTop = c.scrollHeight;
  }, [messages, isLoading]);

  const handleStopClick = () => {
    if (isLoading) stop();
  };

  return (
    <>
      <Column fill center>
        {messages.filter(m => m.role !== 'system').length > 0 ? (
          <Column
            ref={chatContainerRef}
            fill
            paddingX="l"
            paddingY="24"
            overflowY="auto"
            horizontal="center"
            id="chat-messages-container"
          >
            {/* tighter vertical rhythm and a max width so lines never get too long */}
            <Column fillWidth fitHeight maxWidth="m" gap="12">
              {messages
                .filter(m => m.role !== 'system')
                .map(m => {
                  const text = typeof m.content === 'string'
                    ? m.content
                    : Array.isArray(m.content)
                      ? (m.content as any[])
                          .map(p => (typeof p === 'string' ? p : (p.text || '')))
                          .join('')
                      : '';

                  const isAssistant = m.role === 'assistant';

                  return (
                    <MessageBubble key={m.id} role={m.role as 'user' | 'assistant'}>
                      {isAssistant ? (
                        <div
                          style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}
                          dangerouslySetInnerHTML={{ __html: renderAssistantHTML(text) }}
                        />
                      ) : (
                        <>{text}</>
                      )}
                    </MessageBubble>
                  );
                })}

              {/* subtle typing indicator that aligns with assistant */}
              {isLoading && (
                <MessageBubble role="assistant">
                  <span style={{ display: 'inline-flex', gap: 6 }}>
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </span>
                </MessageBubble>
              )}

              <div ref={messagesEndRef} style={{ height: 1, opacity: 0 }} />
            </Column>
          </Column>
        ) : (
          <Heading variant="display-default-xs" align="center" marginBottom="48">
            What do you need done?
          </Heading>
        )}

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Row fillWidth horizontal="center" paddingX="l">
            <Column maxWidth="s" paddingBottom="16" data-border="rounded">
              <Textarea
                style={{ maxHeight: '10rem' }}
                id="chat-input"
                lines="auto"
                value={input}
                placeholder={isLoading ? 'Generating…' : 'Ask anything about Websites or Marketing'}
                onChange={handleInputChange}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
              >
                <Row fillWidth paddingX="12" paddingBottom="12" horizontal="between">
                  <Row marginLeft="2" />
                  <Row>
                    <IconButton
                      icon={isLoading ? 'stop' : 'send'}
                      disabled={!input}
                      onClick={isLoading ? handleStopClick : handleSubmit}
                    />
                  </Row>
                </Row>
              </Textarea>
            </Column>
          </Row>
        </form>

        {/* starter quick prompts only when no messages yet */}
        {messages.filter(m => m.role !== 'system').length === 0 && (
          <Row data-border="rounded" fillWidth horizontal="center" paddingX="l" gap="8" wrap>
            {prompts.preview.map((q, i) => (
              <Button
                key={i}
                weight="default"
                variant="secondary"
                onClick={async () => {
                  handleInputChange({ target: { value: q } } as any);
                  await new Promise(r => setTimeout(r, 50));
                  handleSubmit(new Event('submit') as any);
                }}
              >
                {q}
              </Button>
            ))}
          </Row>
        )}

        {/* show error inline too */}
        {error && (
          <Text onBackground="critical" paddingY="8">
            {error.message || 'Sorry, something went wrong.'}
          </Text>
        )}
      </Column>
    </>
  );
}