"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (!res.ok) {
        setError('Mot de passe incorrect')
        return
      }
      router.push('/outil')
    } catch (e) {
      setError('Erreur réseau')
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="text-2xl font-extrabold">Admin login</h1>
      <p className="mt-2 text-slate-700">Saisissez le mot de passe administrateur.</p>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe" className="rounded-md border px-3 py-2" />
        <div className="flex gap-2">
          <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2 text-white">Se connecter</button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </main>
  )
}
