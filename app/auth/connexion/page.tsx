'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BEWORK } from '@/lib/bework/config';

const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS === 'true';

function ConnexionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/plateforme';
  const [email, setEmail] = useState('demo@entreprise-btp.fr');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (DEV_BYPASS) {
        const fd = new FormData();
        fd.set('email', email);
        fd.set('next', next);
        await fetch('/auth/dev-login', { method: 'POST', body: fd });
        router.push(next);
        router.refresh();
        return;
      }
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {DEV_BYPASS && (
        <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">
          Mode local : connexion automatique sans Supabase (email libre).
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email professionnel</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>
      {!DEV_BYPASS && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[var(--bework-blue)] py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}

export default function ConnexionPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <Link href="/" className="font-display text-2xl font-bold text-slate-900">
        {BEWORK.name}
      </Link>
      <h1 className="mt-8 text-xl font-semibold">Connexion entreprise</h1>
      <Suspense fallback={<p className="mt-8 text-slate-500">Chargement…</p>}>
        <ConnexionForm />
      </Suspense>
      <p className="mt-6 text-center text-sm text-slate-600">
        Pas de compte ?{' '}
        <Link href="/auth/inscription" className="font-medium text-[var(--bework-blue)] hover:underline">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}
