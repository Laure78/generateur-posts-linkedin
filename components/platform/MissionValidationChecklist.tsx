'use client';

import { useState } from 'react';
import { CR_VALIDATION_CHECKLIST } from '@/lib/bework/mission-checklist';

export function MissionValidationChecklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <div className="bework-card mt-6 p-5">
      <h2 className="text-sm font-semibold text-slate-800">Checklist avant envoi client</h2>
      <ul className="mt-3 space-y-2">
        {CR_VALIDATION_CHECKLIST.map((item, i) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(checked[i])}
                onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))}
                className="mt-1 rounded border-slate-300"
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500">
        Cochez chaque point en local — non enregistré en base (aide-mémoire).
      </p>
    </div>
  );
}
