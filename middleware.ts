import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (
    process.env.NEXT_PUBLIC_DEV_BYPASS === 'true' ||
    process.env.DEV_BYPASS === 'true'
  ) {
    return NextResponse.next({ request });
  }

  const { updateSession } = await import('@/lib/supabase/middleware');
  return updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
