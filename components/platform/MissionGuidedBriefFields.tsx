'use client';

import { getBriefSchema } from '@/lib/bework/mission-brief-schema';

type MissionGuidedBriefFieldsProps = {
  missionTypeId: string;
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
};

export function MissionGuidedBriefFields({
  missionTypeId,
  values,
  onChange,
}: MissionGuidedBriefFieldsProps) {
  const schema = getBriefSchema(missionTypeId);
  if (!schema) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
      <p className="sm:col-span-2 text-xs font-medium uppercase tracking-wide text-[var(--bework-blue)]">
        Brief guidé — {schema.family}
      </p>
      {schema.fields.map((field) => {
        const col = field.colSpan === 2 ? 'sm:col-span-2' : '';
        const common = 'bework-input mt-1.5 w-full';
        const label = (
          <label htmlFor={`brief-${field.id}`} className="block text-sm font-medium text-slate-700">
            {field.label}
            {field.required ? <span className="text-red-500"> *</span> : null}
          </label>
        );

        if (field.type === 'textarea') {
          return (
            <div key={field.id} className={col}>
              {label}
              <textarea
                id={`brief-${field.id}`}
                value={values[field.id] ?? ''}
                onChange={(e) => onChange(field.id, e.target.value)}
                rows={3}
                placeholder={field.placeholder}
                className={`${common} resize-y text-sm`}
              />
            </div>
          );
        }

        const inputType =
          field.type === 'number' ? 'text' : field.type === 'date' ? 'date' : 'text';

        return (
          <div key={field.id} className={col}>
            {label}
            <input
              id={`brief-${field.id}`}
              type={inputType}
              value={values[field.id] ?? ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={common}
            />
          </div>
        );
      })}
    </div>
  );
}
