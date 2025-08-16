// src/app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText, type CoreMessage } from 'ai';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
You are AdLens Digital’s AI sales rep.
Pitch website and marketing packages clearly and persuasively.
Always ask about the user’s goals and budget before recommending a package.
When recommending, provide ONE best-fit package with its price and a clear CTA.
If asked for portfolio, share AdLens Digital examples.
If asked for contact, use lens@adlensdigital.com.
Keep answers concise, professional, and conversion-focused.
`;

export async function POST(req: Request) {
  // Read body safely
  const body = await req.json().catch(() => ({} as any));

  // Support both shapes:
  // 1) Array of messages
  // 2) { messages: [...] }
  const raw = Array.isArray(body) ? body : body?.messages;

  if (!Array.isArray(raw)) {
    return new Response(
      JSON.stringify({
        error:
          'Invalid body: expected an array of messages or an object with messages[]',
        received: body,
      }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  // Normalize to CoreMessage[]
  const messages: CoreMessage[] = raw.map((m: any) => {
    // content can be: string | Array<{text?: string}> | unknown
    let content = '';
    if (typeof m.content === 'string') {
      content = m.content;
    } else if (Array.isArray(m.content)) {
      content = m.content
        .map((p: any) => (typeof p === 'string' ? p : p?.text ?? ''))
        .join('');
    } else if (Array.isArray(m.parts)) {
      // some UIs send { parts: [{ type: 'text', text: '...' }] }
      content = m.parts.map((p: any) => p?.text ?? '').join('');
    }

    return { role: m.role, content };
  });

  const result = streamText({
    model: openai('gpt-5-chat-latest'),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toDataStreamResponse();
}