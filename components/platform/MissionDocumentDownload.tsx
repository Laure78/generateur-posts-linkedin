import { Download } from 'lucide-react';

type MissionDocumentDownloadProps = {
  missionId: string;
  hasDocx: boolean;
};

export function MissionDocumentDownload({ missionId, hasDocx }: MissionDocumentDownloadProps) {
  if (!hasDocx) return null;

  return (
    <a
      href={`/api/missions/${missionId}/document`}
      className="bework-btn-primary mt-6 inline-flex"
      download
    >
      <Download size={18} />
      Télécharger le compte rendu (.docx)
    </a>
  );
}
