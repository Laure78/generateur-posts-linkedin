'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BEWORK } from '@/lib/bework/config';

const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS === 'true';

export default function InscriptionPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@entreprise-btp.fr');
  const [password, setPassword] = useState('demo1234');
  const [company, setCompany] = useState('Entreprise BTP Demo');
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
        fd.set('next', '/plateforme');
        await fetch('/auth/dev-login', { method: 'POST', body: fd });
        router.push('/plateforme');
        router.refresh();
        return;
      }
      const supabase = createClient();
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { company_name: company } },
      });
      if (err) throw err;
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email,
          company_name: company,
          role: 'client',
        });
      }
      router.push('/plateforme');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <Link href="/" className="font-display text-2xl font-bold">{BEWORK.name}</Link>
      <h1 className="mt-8 text-xl font-semibold">Créer un compte entreprise</h1>
      {DEV_BYPASS && (
        <p className="mt-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">
          Mode local actif — pas besoin de Supabase pour tester.
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Entreprise</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>
        {!DEV_BYPASS && (
          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
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
          {loading ? 'Création…' : 'Créer le compte'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        <Link href="/auth/connexion" className="text-[var(--bework-blue)] hover:underline">Déjà inscrit ?</Link>
      </p>
    </div>
  );
}
