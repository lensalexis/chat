// src/app/api/fin/ask/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const API_BASE =
  process.env.INTERCOM_API_BASE?.replace(/\/+$/, '') || 'https://api.intercom.io';

export async function POST(req: Request) {
  const { message, userId, email, name, context } = await req.json();

  const token = process.env.INTERCOM_ACCESS_TOKEN;
  const workspace = process.env.INTERCOM_WORKSPACE_ID;
  const instructions = process.env.FIN_INSTRUCTIONS ?? '';

  if (!token || !workspace) {
    return NextResponse.json(
      { ok: false, error: 'Missing INTERCOM_ACCESS_TOKEN or INTERCOM_WORKSPACE_ID' },
      { status: 500 }
    );
  }

  try {
    const payload = {
      input: message ?? '',
      instructions,
      user: {
        user_id: userId ?? undefined,
        email: email ?? undefined,
        name: name ?? undefined,
      },
      context: context ?? undefined,
    };

    const res = await fetch(`${API_BASE}/answers/ask`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Intercom-Workspace-Id': workspace,
        'Intercom-Version': '2.10',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      const text =
        data?.output?.text ??
        data?.output ??
        data?.answer ?? '';
      return NextResponse.json({ ok: true, text, raw: data }, { status: 200 });
    }

    const errorText = await res.text();
    console.error('[fin/ask] Intercom error', res.status, errorText);
    return NextResponse.json(
      { ok: false, status: res.status, error: errorText },
      { status: 502 }
    );
  } catch (err: any) {
    console.error('[fin/ask] exception', err?.message);
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'unknown_error' },
      { status: 500 }
    );
  }
}