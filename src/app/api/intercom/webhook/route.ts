// src/app/api/intercom/webhook/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// quick helper to always return a body (even on errors)
function reply(status: number, data: unknown) {
  return new NextResponse(JSON.stringify(data, null, 2), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

// Allow GET so you can hit it in a browser
export async function GET(req: Request) {
  console.log('[intercom webhook] GET', {
    url: req.url,
    headers: Object.fromEntries(new Headers(req.headers)),
  });
  return reply(200, { ok: true, method: 'GET' });
}

export async function POST(req: Request) {
  let body: any = null;
  try {
    body = await req.json();
  } catch {
    // Intercom sometimes sends empty “test” pings
    body = null;
  }

  console.log('[intercom webhook] POST', {
    url: req.url,
    headers: Object.fromEntries(new Headers(req.headers)),
    body,
  });

  // TODO: later add signature verification here
  return reply(200, { ok: true, method: 'POST', topic: body?.topic ?? body?.type ?? null });
}