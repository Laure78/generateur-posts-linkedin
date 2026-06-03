import { createServerClient } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';
import { getSupabasePublicEnv, isSupabaseConfigured } from './env';

/**
 * Client Supabase pour Route Handlers (POST déconnexion, etc.) :
 * les cookies de session doivent être écrits sur la NextResponse, pas seulement via cookies().
 */
export function createSupabaseRouteHandlerClient(
  request: NextRequest,
  response: NextResponse
) {
  const { url, key } = getSupabasePublicEnv();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });
}

export async function signOutRouteHandler(
  request: NextRequest,
  response: NextResponse
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = createSupabaseRouteHandlerClient(request, response);
  await supabase.auth.signOut();
}
