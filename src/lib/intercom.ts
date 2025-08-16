// src/lib/intercom.ts
const INTERCOM_BASE = 'https://api.intercom.io';

function authHeaders() {
  const token = process.env.INTERCOM_ACCESS_TOKEN!;
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export async function getConversation(id: string) {
  const r = await fetch(`${INTERCOM_BASE}/conversations/${id}`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (!r.ok) throw new Error(`Intercom getConversation ${r.status}`);
  return r.json();
}

/** Posts a reply as the bot to the conversation */
export async function replyToConversation(params: {
  conversation_id: string;
  body: string;
}) {
  const r = await fetch(`${INTERCOM_BASE}/conversations/${params.conversation_id}/reply`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      message_type: 'comment',
      type: 'bot',            // shows as bot in Intercom
      admin_id: undefined,    // not required for bot
      body: params.body,
    }),
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`Intercom reply failed ${r.status} ${txt}`);
  }
  return r.json();
}