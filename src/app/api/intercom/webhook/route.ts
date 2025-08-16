// src/app/api/intercom/webhook/route.ts
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { getConversation, replyToConversation } from '@/lib/intercom';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Json = Record<string, unknown> | null;

// -------- helpers --------
function json(status: number, data: Json) {
  return new NextResponse(JSON.stringify(data ?? {}, null, 2), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function timingSafeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function computeHmac(secret: string, body: string, algo: 'sha1' | 'sha256') {
  return crypto.createHmac(algo, secret).update(body, 'utf8').digest('hex');
}

/**
 * Supports Intercom signatures:
 *  - `x-hub-signature: sha1=<hex>`
 *  - `x-hub-signature-256: sha256=<hex>`
 *  - (some setups) `x-intercom-signature: sha256=<hex>`
 */
function verifyIntercomSignature(req: Request, rawBody: string): { ok: boolean; why?: string } {
  const secret = process.env.INTERCOM_WEBHOOK_SECRET || process.env.INTERCOM_CLIENT_SECRET;
  if (!secret) return { ok: false, why: 'missing INTERCOM_WEBHOOK_SECRET' };

  const hSig = req.headers.get('x-hub-signature');
  const hSig256 = req.headers.get('x-hub-signature-256') ?? req.headers.get('x-intercom-signature');

  // header format is usually "<algo>=<hex>"
  const parse = (v: string | null) => {
    if (!v) return null;
    const [algo, hex] = v.split('=', 2);
    if (!algo || !hex) return null;
    return { algo: algo.toLowerCase(), hex };
  };

  const sig1 = parse(hSig);
  const sig256 = parse(hSig256);

  // Try sha1 first if provided, otherwise sha256
  if (sig1?.algo === 'sha1') {
    const expected = computeHmac(secret, rawBody, 'sha1');
    return { ok: timingSafeEqual(sig1.hex, expected) };
  }
  if (sig256?.algo === 'sha256') {
    const expected = computeHmac(secret, rawBody, 'sha256');
    return { ok: timingSafeEqual(sig256.hex, expected) };
  }

  // If no signature header at all, fail closed in prod; allow in dev.
  const isDev = process.env.NODE_ENV !== 'production';
  return { ok: isDev, why: 'no signature header present' };
}

// ---- tiny topic router (add what you enable in Intercom) ----
// Simple sales brain for now (we’ll swap to Fin later)
function salesReply(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes('seo')) {
    return `Got it — SEO. Our **Spark Starter** is $750/mo, **Momentum Builder** $1,500/mo, and **Dominance Drive** $3,000/mo.\n\nWant me to send a checkout link for any of these, or would you like a quick recommendation based on your goals and budget?`;
  }
  if (lower.includes('website') || lower.includes('site')) {
    return `For websites we have **Launch Pad** ($750 one‑time), **Elevate Pro** ($1,500 one‑time), and **Ultimate Build** ($2,500 one‑time).\n\nDo you want a quick 30‑sec fit check, or should I send you the checkout for a package?`;
  }
  return `I can help with Websites & Marketing. Tell me your goal (e.g., “need a new website” or “grow SEO leads”), and I’ll recommend a package with price — you can buy right here.`;
}

async function handleEvent(topic: string | undefined, payload: any) {
  switch (topic) {
    case 'ping':
    case 'test':
      return { ok: true, note: 'pong' };

    // When a user starts or replies in a conversation
    case 'conversation.user.created':
    case 'conversation.user.replied': {
      const convId = payload?.data?.item?.id;
      if (!convId) return { ok: true, note: 'no_conversation_id' };

      // Pull latest conversation to inspect the last user message
      const conv = await getConversation(convId);
      const lastPart = conv?.conversation_parts?.conversation_parts?.at(-1) ?? conv?.first_contact_reply ?? null;

      const userText =
        lastPart?.body ||
        payload?.data?.item?.conversation_message?.body ||
        '';

      // Strip HTML (Intercom messages can include formatting)
      const clean = userText.replace(/<[^>]+>/g, '').trim();

      const reply = salesReply(clean);
      await replyToConversation({ conversation_id: convId, body: reply });

      return { ok: true, handled: topic, convId };
    }

    default:
      // Let the rest pass silently for now
      return { ok: true, note: 'unhandled_topic', topic };
  }
}

// ---- Routes ----
export async function GET(req: Request) {
  return json(200, {
    ok: true,
    method: 'GET',
    route: '/api/intercom/webhook',
    ts: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  // 1) Read raw body FIRST (needed for HMAC)
  const buf = await req.arrayBuffer();
  const raw = Buffer.from(buf).toString('utf8');

  // 2) Verify signature (fail closed in prod)
  const { ok, why } = verifyIntercomSignature(req, raw);
  if (!ok) {
    console.warn('[intercom webhook] signature failed', { why });
    return json(401, { ok: false, error: 'signature_verification_failed', why });
  }

  // 3) Parse JSON safely (Intercom test pings may be minimal)
  let body: any = null;
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('[intercom webhook] invalid JSON', e);
    return json(400, { ok: false, error: 'invalid_json' });
  }

  // 4) Determine topic
  const topic: string | undefined = body?.topic || body?.type;

  // 5) Handle
  const result = await handleEvent(topic, body);

  return json(200, {
    ok: true,
    received: { topic, id: body?.data?.item?.id ?? null },
    result,
  });
}

// (optional) HEAD & OPTIONS for friendly checks/tools
export async function HEAD() {
  return json(200, { ok: true });
}
export async function OPTIONS() {
  return json(200, { ok: true, allow: 'GET,POST,HEAD,OPTIONS' });
}