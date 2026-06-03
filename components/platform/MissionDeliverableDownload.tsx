import { Download } from 'lucide-react';
import {
  DELIVERABLE_FORMAT_LABELS,
  type DeliverableFormat,
  parseDeliverableFormat,
} from '@/lib/bework/deliverable-formats';

type MissionDeliverableDownloadProps = {
  missionId: string;
  hasFile: boolean;
  outputFormat?: string | null;
  chefValidated?: boolean;
};

export function MissionDeliverableDownload({
  missionId,
  hasFile,
  outputFormat,
  chefValidated,
}: MissionDeliverableDownloadProps) {
  if (!hasFile) return null;

  const format = parseDeliverableFormat(outputFormat ?? 'docx');
  const label = DELIVERABLE_FORMAT_LABELS[format].label;

  return (
    <div className="mt-6">
      {!chefValidated && (
        <p className="mb-2 text-xs text-amber-800">
          Téléchargement pour relecture interne — validation chef d&apos;équipe requise avant envoi client.
        </p>
      )}
      <a
        href={`/api/missions/${missionId}/document?format=${format}`}
        className="bework-btn-primary inline-flex"
        download
      >
        <Download size={18} />
        Télécharger le livrable ({label})
      </a>
    </div>
  );
}
