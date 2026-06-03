'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';

type MissionInternalCommentProps = {
  missionId: string;
  initialComment: string | null;
  canEdit: boolean;
};

export function MissionInternalComment({
  missionId,
  initialComment,
  canEdit,
}: MissionInternalCommentProps) {
  const router = useRouter();
  const [comment, setComment] = useState(initialComment ?? '');
  const [saving, setSaving] = useState(false);

  if (!canEdit && !comment) return null;

  return (
    <div className="bework-card mt-6 p-5">
      <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
        <MessageSquare size={16} />
        Commentaire interne
      </h2>
      {canEdit ? (
        <>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="bework-input mt-3 resize-y text-sm"
            placeholder="Note chef → assistant ou inversement"
          />
          <button
            type="button"
            disabled={saving}
            className="bework-btn-secondary mt-3 text-sm"
            onClick={async () => {
              setSaving(true);
              await fetch(`/api/missions/${missionId}/comment`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment }),
              });
              setSaving(false);
              router.refresh();
            }}
          >
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </>
      ) : (
        <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">{comment}</p>
      )}
    </div>
  );
}
