// src/components/IntercomBoot.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

type Props = {
  /** Logged-in user id (if you have auth). When present, we’ll try Secure Mode (JWT). */
  userId?: string;
  /** Optional identity fields */
  email?: string;
  name?: string;
  /** Extra non-sensitive traits you want available in Intercom */
  customAttributes?: Record<string, unknown>;
  /** Auto-open the messenger after boot */
  autoOpen?: boolean;
  /** Force-disable Secure Mode and boot anonymously */
  secureModeDisabled?: boolean;
};

/**
 * Boots Intercom Messenger globally.
 * - If `userId` is provided and Secure Mode is enabled (default), it fetches a JWT from /api/intercom/jwt
 *   and boots a *verified* session.
 * - Otherwise it boots an anonymous session.
 * Also forces the default launcher visible (you can hide later in Intercom settings).
 */
export default function IntercomBoot({
  userId,
  email,
  name,
  customAttributes,
  autoOpen = false,
  secureModeDisabled = false,
}: Props) {
  const [jwt, setJwt] = useState<string | null>(null);
  const hasBootedRef = useRef(false);

  // 1) If we have a user and secure mode is ON, fetch a signed JWT from our server
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
    console.log('[IntercomBoot] NEXT_PUBLIC_INTERCOM_APP_ID =', appId);
    if (!appId) return;

    if (!secureModeDisabled && userId) {
      const controller = new AbortController();
      (async () => {
        try {
          const res = await fetch(
            `/api/intercom/jwt?user_id=${encodeURIComponent(userId)}${
              email ? `&email=${encodeURIComponent(email)}` : ''
            }`,
            { signal: controller.signal, cache: 'no-store' }
          );
          if (!res.ok) throw new Error(`JWT fetch failed: ${res.status}`);
          const data = await res.json();
          if (data?.token) setJwt(data.token as string);
        } catch (err) {
          console.warn('[intercom] secure JWT fetch failed, falling back to anonymous:', err);
          setJwt(null); // fall back to anon
        }
      })();
      return () => controller.abort();
    } else {
      // Not using secure mode or no userId — ensure no leftover token
      setJwt(null);
    }
  }, [userId, email, secureModeDisabled]);

  // 2) Boot Intercom (exactly once) when we have enough info
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;
    if (!appId || hasBootedRef.current) return;

    const baseOptions: Record<string, unknown> = {
      app_id: appId,
      hide_default_launcher: false, // <- keep launcher visible while we integrate
      ...(customAttributes ?? {}),
    };

    // Prefer secure mode when we have a JWT
    if (jwt && userId && !secureModeDisabled) {
      Intercom({
        ...baseOptions,
        intercom_user_jwt: jwt,
        session_duration: 86_400_000, // 1 day (optional)
      });
      hasBootedRef.current = true;
    }
    // Else, if we have a user but no JWT, do a best-effort identified (non-secure) boot
    else if (userId) {
      Intercom({
        ...baseOptions,
        user_id: userId,
        ...(email ? { email } : {}),
        ...(name ? { name } : {}),
      });
      hasBootedRef.current = true;
    }
    // Else anonymous
    else {
      Intercom(baseOptions);
      hasBootedRef.current = true;
    }

    // Make sure launcher is visible even if workspace rules try to hide it (for dev)
    try {
      (window as any).Intercom?.('update', { hide_default_launcher: false });
    } catch {}

    if (autoOpen) {
      setTimeout(() => {
        (window as any).Intercom?.('show');
      }, 500);
    }

    return () => {
      (window as any).Intercom?.('shutdown');
      hasBootedRef.current = false;
    };
  }, [jwt, userId, email, name, customAttributes, autoOpen, secureModeDisabled]);

  return null;
}