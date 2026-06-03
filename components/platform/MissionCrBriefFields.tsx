'use client';

type MissionCrBriefFieldsProps = {
  crNumber: string;
  onCrNumberChange: (v: string) => void;
  previousCr: string;
  onPreviousCrChange: (v: string) => void;
};

/** Champs structurés injectés en tête du brief pour les CR chantier. */
export function MissionCrBriefFields({
  crNumber,
  onCrNumberChange,
  previousCr,
  onPreviousCrChange,
}: MissionCrBriefFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
      <div>
        <label htmlFor="cr-number" className="block text-sm font-medium text-slate-700">
          N° du CR
        </label>
        <input
          id="cr-number"
          value={crNumber}
          onChange={(e) => onCrNumberChange(e.target.value)}
          placeholder="Ex. : 24"
          className="bework-input mt-1.5"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cr-previous" className="block text-sm font-medium text-slate-700">
          CR précédent / points à reprendre
        </label>
        <textarea
          id="cr-previous"
          value={previousCr}
          onChange={(e) => onPreviousCrChange(e.target.value)}
          rows={3}
          placeholder="Collez le CR N-1 ou listez les points non soldés…"
          className="bework-input mt-1.5 resize-y text-sm"
        />
      </div>
    </div>
  );
}

export function buildCrBriefPrefix(crNumber: string, previousCr: string): string {
  const parts: string[] = [];
  if (crNumber.trim()) parts.push(`N° CR : ${crNumber.trim()}`);
  if (previousCr.trim()) parts.push(`CR précédent / points ouverts :\n${previousCr.trim()}`);
  if (!parts.length) return '';
  return `${parts.join('\n\n')}\n\n---\n\n`;
}
