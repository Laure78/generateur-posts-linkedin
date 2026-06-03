'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseReady } from '@/components/auth/use-supabase-ready';
import { PasswordInput } from '@/components/auth/PasswordInput';
import Link from 'next/link';
import { AuthShell, AuthFooterLink } from '@/components/brand/AuthShell';

const DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_BYPASS === 'true';

export default function InscriptionPage() {
  const router = useRouter();
  const supabaseReady = useSupabaseReady();
  const [email, setEmail] = useState(DEV_BYPASS ? 'demo@entreprise-btp.fr' : '');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [acceptLegal, setAcceptLegal] = useState(false);

  const canSubmit = (DEV_BYPASS || supabaseReady === true) && acceptLegal;

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
        body: JSON.stringify({ email, password, company_name: company }),
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
    <AuthShell
      title="Créer un compte MOEX"
      subtitle="Accédez aux assistants BeWork dédiés à la maîtrise d'œuvre d'exécution."
      footer={
        <p className="text-slate-600">
          Déjà inscrit ? <AuthFooterLink href="/auth/connexion">Se connecter</AuthFooterLink>
        </p>
      }
    >
      {DEV_BYPASS && (
        <p className="mb-4 rounded-lg bg-[var(--bework-blue-soft)] px-3 py-2 text-sm text-[var(--bework-blue-dark)]">
          Mode local actif — pas besoin de Supabase pour tester.
        </p>
      )}
      {!DEV_BYPASS && supabaseReady === false && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Configuration Supabase absente. Ajoutez les variables Railway puis redeploy.
        </p>
      )}
      {!DEV_BYPASS && supabaseReady === null && (
        <p className="mb-4 text-sm text-slate-500">Vérification de la configuration…</p>
      )}
      {success && (
        <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-900">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Entreprise</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            autoComplete="organization"
            className="bework-input mt-1.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email professionnel</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="bework-input mt-1.5"
          />
        </div>
        {!DEV_BYPASS && (
          <PasswordInput
            id="password"
            label="Mot de passe"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            minLength={6}
            hint="6 caractères minimum"
          />
        )}
        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={acceptLegal}
            onChange={(e) => setAcceptLegal(e.target.checked)}
            required
            className="mt-1 rounded border-slate-300 text-[var(--bework-blue)] focus:ring-[var(--bework-blue)]"
          />
          <span>
            J&apos;accepte les{' '}
            <Link href="/cgu" className="font-medium text-[var(--bework-blue)] hover:underline">
              CGU
            </Link>
            , les{' '}
            <Link href="/cgv" className="font-medium text-[var(--bework-blue)] hover:underline">
              CGV
            </Link>{' '}
            et la{' '}
            <Link
              href="/politique-confidentialite"
              className="font-medium text-[var(--bework-blue)] hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading || !canSubmit || Boolean(success)}
          className="bework-btn-primary w-full py-3"
        >
          {loading ? 'Création…' : 'Créer le compte'}
        </button>
      </form>
    </AuthShell>
  );
}
