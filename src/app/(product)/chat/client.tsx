"use client";

import { useChat } from '@ai-sdk/react';
import { Column, Row, Text, Textarea, IconButton, Heading, Button, useToast } from '@once-ui-system/core';
import { prompts } from '@/content/misc/prompts';
import React, { useRef, useEffect } from 'react';

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
    // keep your system prompts
    initialMessages: prompts.system.map((prompt, index) => ({
      role: "system",
      id: `system-${index}`,
      content: prompt,
    })),
    onError(err) {
      // surface the actual error reason
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
            <Column fillWidth fitHeight maxWidth="s" gap="24">
              {messages
                .filter(m => m.role !== 'system')
                .map(m => (
                  <Column key={m.id} paddingTop="2" fillWidth>
                    <Row
                      fillWidth
                      horizontal={m.role === 'user' ? 'end' : 'start'}
                      gap="8"
                    >
                      <Row
                        data-border="rounded"
                        style={{ maxWidth: '36rem', wordBreak: 'break-word' }}
                        fitWidth
                        paddingX="20"
                        paddingY="12"
                        radius="l"
                        background={m.role === 'user' ? 'neutral-alpha-weak' : 'surface'}
                      >
                        <Text>{typeof m.content === 'string'
                          ? m.content
                          : Array.isArray(m.content)
                            ? (m.content as any[]).map(p => typeof p === 'string' ? p : (p.text || '')).join('')
                            : 'Content unavailable'}
                        </Text>
                      </Row>
                    </Row>
                  </Column>
                ))}
              <div ref={messagesEndRef} style={{ height: 1, opacity: 0 }} />
            </Column>
          </Column>
        ) : (
          <Heading variant="display-default-xs" align="center" marginBottom="48">
            What are we working on?
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
                placeholder={isLoading ? 'Generating…' : 'Ask anything'}
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