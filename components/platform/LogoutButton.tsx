'use client';

import { LogOut } from 'lucide-react';
import { useState } from 'react';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/auth/deconnexion';
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-60"
    >
      <LogOut size={17} aria-hidden />
      {loading ? 'Déconnexion…' : 'Déconnexion'}
    </button>
  );
}
