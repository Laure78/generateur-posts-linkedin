'use client';

import { formatDraftAge, type DemandDraft } from '@/lib/bework/demand-draft';
import { RotateCcw, X } from 'lucide-react';

type DemandDraftBannerProps = {
  draft: DemandDraft;
  onRestore: () => void;
  onDismiss: () => void;
};

export function DemandDraftBanner({ draft, onRestore, onDismiss }: DemandDraftBannerProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3">
      <p className="text-sm text-slate-700">
        <span className="font-medium text-[var(--bework-blue)]">Brouillon sauvegardé</span>
        {' '}
        {formatDraftAge(draft.savedAt)}
        {draft.title.trim() ? ` — « ${draft.title.trim().slice(0, 40)}${draft.title.length > 40 ? '…' : ''} »` : ''}
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={onRestore} className="bework-btn-primary py-2 text-sm">
          <RotateCcw size={14} />
          Reprendre
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-white/80"
          aria-label="Ignorer le brouillon"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
