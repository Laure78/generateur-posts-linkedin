'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthShell, AuthFooterLink } from '@/components/brand/AuthShell';

export default function NouveauMotDePassePage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || 'Mise à jour impossible');
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
        <button type="submit" disabled={loading} className="bework-btn-primary w-full py-3">
          {loading ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </form>
    </AuthShell>
  );
}
