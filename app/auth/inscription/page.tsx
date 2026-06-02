'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { BEWORK } from '@/lib/bework/config';

const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS === 'true';
const SUPABASE_OK = isSupabaseConfigured();

export default function InscriptionPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEV_BYPASS ? 'demo@entreprise-btp.fr' : '');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
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

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          company_name: company,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        needsEmailConfirmation?: boolean;
        message?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || 'Inscription impossible');
      }

      if (data.needsEmailConfirmation) {
        setSuccess(
          data.message ||
            'Compte créé. Ouvrez le lien reçu par email pour activer votre accès, puis connectez-vous.'
        );
        return;
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
      <Link href="/" className="font-display text-2xl font-bold">
        {BEWORK.name}
      </Link>
      <h1 className="mt-8 text-xl font-semibold">Créer un compte entreprise</h1>
      {DEV_BYPASS && (
        <p className="mt-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-900">
          Mode local actif — pas besoin de Supabase pour tester.
        </p>
      )}
      {!DEV_BYPASS && !SUPABASE_OK && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Inscription indisponible : ajoutez les variables Supabase sur Railway puis redéployez.
        </p>
      )}
      {success && (
        <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-900">{success}</p>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Entreprise</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            autoComplete="organization"
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
            autoComplete="email"
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
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3"
            />
            <p className="mt-1 text-xs text-slate-500">6 caractères minimum</p>
          </div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading || (!DEV_BYPASS && !SUPABASE_OK) || Boolean(success)}
          className="w-full rounded-xl bg-[var(--bework-blue)] py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Création…' : 'Créer le compte'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        <Link href="/auth/connexion" className="text-[var(--bework-blue)] hover:underline">
          Déjà inscrit ?
        </Link>
      </p>
    </div>
  );
}
