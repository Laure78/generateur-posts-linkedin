'use client';

import { useState } from 'react';
import { useSupabaseReady } from '@/components/auth/use-supabase-ready';
import { AuthShell, AuthFooterLink } from '@/components/brand/AuthShell';
import { formatAuthFetchError, getAuthCallbackUrl } from '@/lib/auth/redirect';
import { createClient, isSupabaseBrowserConfigured } from '@/lib/supabase/client';

const SUCCESS_MESSAGE =
  'Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.';

export default function MotDePasseOubliePage() {
  const supabaseReady = useSupabaseReady();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = supabaseReady === true && isSupabaseBrowserConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const normalized = email.trim().toLowerCase();
    if (!normalized) {
      setError('Email requis');
      setLoading(false);
      return;
    }

    try {
      // Appel direct Supabase depuis le navigateur (évite les erreurs réseau serveur → Supabase)
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalized, {
        redirectTo: getAuthCallbackUrl('/auth/nouveau-mot-de-passe'),
      });

      if (resetError) {
        throw new Error(resetError.message);
      }

      setSuccess(SUCCESS_MESSAGE);
    } catch (err) {
      setError(formatAuthFetchError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Mot de passe oublié"
      subtitle="Nous vous enverrons un lien pour choisir un nouveau mot de passe."
      footer={
        <AuthFooterLink href="/auth/connexion">Retour à la connexion</AuthFooterLink>
      }
    >
      {supabaseReady === false && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Configuration Supabase absente sur le serveur.
        </p>
      )}

      {success && (
        <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-900">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={Boolean(success)}
            className="bework-input mt-1.5 disabled:bg-slate-50"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading || !canSubmit || Boolean(success)}
          className="bework-btn-primary w-full py-3"
        >
          {loading ? 'Envoi…' : 'Envoyer le lien'}
        </button>
      </form>
    </AuthShell>
  );
}
