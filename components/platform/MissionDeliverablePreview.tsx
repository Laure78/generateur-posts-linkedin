type MissionDeliverablePreviewProps = {
  aiResult: string;
  maxChars?: number;
};

export function MissionDeliverablePreview({ aiResult, maxChars = 1200 }: MissionDeliverablePreviewProps) {
  const preview = aiResult.length > maxChars ? `${aiResult.slice(0, maxChars)}…` : aiResult;

  return (
    <details className="mt-4 rounded-lg border border-slate-200 bg-white">
      <summary className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700">
        Aperçu du livrable (texte)
      </summary>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap border-t border-slate-100 px-4 py-3 font-sans text-xs leading-relaxed text-slate-700">
        {preview}
      </pre>
    </details>
  );
}
