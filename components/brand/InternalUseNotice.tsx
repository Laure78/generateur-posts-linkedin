import { Bot } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';

type InternalUseNoticeProps = {
  /** Texte court (footer, bandeau) ou long (pages d’information). */
  variant?: 'short' | 'long';
  className?: string;
};

export function InternalUseNotice({ variant = 'short', className = '' }: InternalUseNoticeProps) {
  const text = variant === 'long' ? BEWORK.internalUseLong : BEWORK.internalUseShort;

  return (
    <div
      role="note"
      aria-label="Usage interne de l'outil IA"
      className={`rounded-xl border border-amber-200/90 bg-amber-50/80 px-4 py-3 text-left ${className}`}
    >
      <p className="inline-flex items-start gap-2 text-sm leading-relaxed text-amber-950">
        <Bot size={18} className="mt-0.5 shrink-0 text-amber-700" aria-hidden />
        <span>
          {variant === 'long' && <span className="font-semibold">Usage interne — </span>}
          {text}
        </span>
      </p>
    </div>
  );
}
