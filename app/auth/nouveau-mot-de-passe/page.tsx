'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthShell, AuthFooterLink } from '@/components/brand/AuthShell';
import { formatAuthFetchError } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/client';

export default function NouveauMotDePassePage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionOk, setSessionOk] = useState<boolean | null>(null);

  useEffect(() => {
    createClient()
      .auth.getSession()
      .then(({ data: { session } }) => setSessionOk(Boolean(session)))
      .catch(() => setSessionOk(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        throw new Error(updateError.message);
      }

      router.push('/plateforme');
      router.refresh();
    } catch (err) {
      setError(formatAuthFetchError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Nouveau mot de passe"
      subtitle="Choisissez un mot de passe sécurisé pour votre compte."
      footer={
        <p className="text-slate-600">
          <AuthFooterLink href="/auth/mot-de-passe-oublie">Renvoyer un lien</AuthFooterLink>
          {' · '}
          <AuthFooterLink href="/auth/connexion">Connexion</AuthFooterLink>
        </p>
      }
    >
      {sessionOk === false && (
        <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Lien expiré ou session absente.{' '}
          <AuthFooterLink href="/auth/mot-de-passe-oublie">Redemandez un email</AuthFooterLink>.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <PasswordInput
          id="password"
          label="Nouveau mot de passe"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          minLength={6}
          hint="6 caractères minimum"
        />
        <PasswordInput
          id="confirm"
          label="Confirmer le mot de passe"
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          minLength={6}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading || sessionOk === false}
          className="bework-btn-primary w-full py-3"
        >
          {loading ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </form>
    </AuthShell>
  );
}
