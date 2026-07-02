import { UserCheck } from 'lucide-react';
import { BEWORK } from '@/lib/bework/config';

type TeamLeaderValidationAlertProps = {
  className?: string;
  /** Texte plus court pour les bandeaux étroits. */
  compact?: boolean;
};

/** Rappel : validation chef d'équipe avant envoi client. */
export function TeamLeaderValidationAlert({
  className = '',
  compact = false,
}: TeamLeaderValidationAlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-red-200/90 bg-red-50/90 px-4 py-3 text-left ${className}`}
    >
      <p
        className={`inline-flex items-start gap-2 leading-relaxed text-red-950 ${
          compact ? 'text-xs' : 'text-sm'
        }`}
      >
        <UserCheck
          size={compact ? 16 : 18}
          className="mt-0.5 shrink-0 text-red-700"
          aria-hidden
        />
        <span>
          <span className="font-semibold">Alerte — </span>
          {BEWORK.teamLeaderValidationAlert}
          {!compact && (
            <span className="mt-1 block font-normal text-red-900/90">
              Après relecture par l&apos;assistant travaux, le livrable doit être approuvé par le chef
              d&apos;équipe avant transmission au maître d&apos;ouvrage, au promoteur ou au client.
            </span>
          )}
        </span>
      </p>
    </div>
  );
}
