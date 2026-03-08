import { NextResponse } from 'next/server'
import { hashSecret } from '../../../../lib/auth'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { password } = body || {}
  const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

  if (!ADMIN_SECRET) {
    return NextResponse.json({ error: 'admin not configured' }, { status: 500 })
  }

  if (password !== ADMIN_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const token = hashSecret(ADMIN_SECRET)
  const isProd = process.env.NODE_ENV === 'production'
  const cookie = `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24}${isProd ? '; Secure' : ''}`

  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', cookie)
  return res
}
