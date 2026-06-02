'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
  hint?: string;
};

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  required = true,
  minLength,
  autoComplete = 'current-password',
  hint,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
      ) : null}
      <div className={label ? 'relative mt-1' : 'relative'}>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="bework-input py-3 pr-11"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {visible ? <EyeOff size={20} aria-hidden /> : <Eye size={20} aria-hidden />}
        </button>
      </div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
