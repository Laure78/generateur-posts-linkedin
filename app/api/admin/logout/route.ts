import { NextResponse } from 'next/server'

export async function POST() {
  const expired = `admin_token=deleted; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Secure`;
  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', expired)
  return res
}
