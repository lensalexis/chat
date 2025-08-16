// src/components/MessageBubble.tsx
'use client';

import { Row, Text } from '@once-ui-system/core';
import type { ReactNode } from 'react';

type Props = {
  role: 'user' | 'assistant';
  children: ReactNode;
};

export default function MessageBubble({ role, children }: Props) {
  const isUser = role === 'user';

  return (
    <Row
      fillWidth
      horizontal={isUser ? 'end' : 'start'}
      paddingY="4"
    >
      <Row
        // bubble
        data-border="rounded"
        radius="l"
        paddingX="20"
        paddingY="12"
        background={isUser ? 'neutral-alpha-weak' : 'surface'}
        border={isUser ? undefined : 'neutral-alpha-weak'}
        // readability
        style={{
          maxWidth: '36rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.5,
        }}
      >
        {/* default text styling for long paragraphs */}
        <Text variant="body-default-s">
          {children}
        </Text>
      </Row>
    </Row>
  );
}