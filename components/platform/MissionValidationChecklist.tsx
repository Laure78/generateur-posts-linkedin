'use client';

import { useState } from 'react';
import {
  getValidationChecklistForMissionType,
  getValidationChecklistTitle,
} from '@/lib/bework/mission-checklist';

type MissionValidationChecklistProps = {
  missionTypeId: string;
};

export function MissionValidationChecklist({ missionTypeId }: MissionValidationChecklistProps) {
  const items = getValidationChecklistForMissionType(missionTypeId);
  const title = getValidationChecklistTitle(missionTypeId);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const allChecked = items.every((_, i) => checked[i]);

  return (
    <div className="bework-card mt-6 p-5">
      <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
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
        Aide-mémoire local — non enregistré en base.
        {allChecked && (
          <span className="ml-1 font-medium text-emerald-700">Tous les points sont cochés.</span>
        )}
      </p>
    </div>
  );
}
