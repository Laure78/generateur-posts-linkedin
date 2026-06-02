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
};

export function MissionDeliverableDownload({
  missionId,
  hasFile,
  outputFormat,
}: MissionDeliverableDownloadProps) {
  if (!hasFile) return null;

  const format = parseDeliverableFormat(outputFormat ?? 'docx');
  const label = DELIVERABLE_FORMAT_LABELS[format].label;

  return (
    <a
      href={`/api/missions/${missionId}/document?format=${format}`}
      className="bework-btn-primary mt-6 inline-flex"
      download
    >
      <Download size={18} />
      Télécharger le livrable ({label})
    </a>
  );
}
