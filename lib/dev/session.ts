import { cookies } from 'next/headers';
import { DEV_BYPASS } from './config';

const COOKIE = 'bework_dev_session';

export type DevSession = { email: string; userId: string };

export async function getDevSession(): Promise<DevSession | null> {
  if (!DEV_BYPASS) return null;
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as DevSession;
  } catch {
    return null;
  }
}

export function devUserIdFromEmail(email: string): string {
  return `dev-${email.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
}
