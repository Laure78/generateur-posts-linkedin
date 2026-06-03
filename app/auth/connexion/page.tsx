'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { useSupabaseReady } from '@/components/auth/use-supabase-ready';
import { AuthShell, AuthFooterLink } from '@/components/brand/AuthShell';

const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS === 'true';

function ConnexionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/plateforme';
  const supabaseReady = useSupabaseReady();
  const [email, setEmail] = useState(DEV_BYPASS ? 'demo@entreprise-btp.fr' : '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = DEV_BYPASS || supabaseReady === true;

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

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'Connexion impossible');

      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {DEV_BYPASS && (
        <p className="rounded-lg bg-[var(--bework-blue-soft)] px-3 py-2 text-sm text-[var(--bework-blue-dark)]">
          Mode local : connexion automatique sans Supabase (email libre).
        </p>
      )}
      {!DEV_BYPASS && supabaseReady === false && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Variables Supabase manquantes sur Railway → redeploy après configuration.
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email professionnel
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bework-input mt-1.5"
        />
      </div>
      {!DEV_BYPASS && (
        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <Link
              href="/auth/mot-de-passe-oublie"
              className="text-sm font-medium text-[var(--bework-blue)] hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <PasswordInput
            id="password"
            label=""
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading || !canSubmit} className="bework-btn-primary w-full py-3">
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}

function ConnexionPageContent() {
  const searchParams = useSearchParams();
  const deconnected = searchParams.get('deconnecte') === '1';

  return (
    <AuthShell
      title="Connexion assistant travaux"
      subtitle="Outil interne BeWork pour traiter les demandes des MOEX — maîtrises d'œuvre d'exécution externalisées."
      footer={
        <>
          {deconnected && (
            <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
              Vous êtes déconnecté. Vous pouvez vous reconnecter.
            </p>
          )}
          <p className="text-slate-600">
            Pas de compte ? <AuthFooterLink href="/auth/inscription">Créer un compte</AuthFooterLink>
          </p>
        </>
      }
    >
      <ConnexionForm />
    </AuthShell>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={<p className="text-center text-slate-500">Chargement…</p>}>
      <ConnexionPageContent />
    </Suspense>
  );
}
