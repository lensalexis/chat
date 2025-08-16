// src/lib/fin.ts
'use server';

type FinAskParams = {
  message: string;
  conversationId?: string; // your app's conversation/thread id
  userId?: string;         // your app's user id (if logged in)
  context?: Record<string, unknown>;
};

// NOTE: Adjust URL/body keys to the official Fin-over-API spec you're using.
export async function finAsk({
  message,
  conversationId,
  userId,
  context,
}: FinAskParams) {
  const token = process.env.INTERCOM_ACCESS_TOKEN!;
  const workspace = process.env.INTERCOM_WORKSPACE_ID!;
  const instructions = process.env.FIN_INSTRUCTIONS ?? '';

  if (!token || !workspace) {
    throw new Error('Missing INTERCOM_ACCESS_TOKEN or INTERCOM_WORKSPACE_ID');
  }

  const res = await fetch('https://api.intercom.io/ai/answers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Intercom-Version': '2.11', // use the version required by your account/docs
    },
    body: JSON.stringify({
      workspace_id: workspace,
      instructions,            // “system prompt” for Fin
      input: message,          // the user’s message
      user: userId ? { external_id: userId } : undefined,
      conversation: conversationId ? { id: conversationId } : undefined,
      context: context ?? undefined,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fin API error ${res.status}: ${text}`);
  }

  // Standardize to { answer: string }
  const data = await res.json();
  const answer =
    data?.answer ?? data?.output ?? data?.choices?.[0]?.message?.content ?? '';

  return { answer, raw: data };
}