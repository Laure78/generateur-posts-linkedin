/** Formats de livrable téléchargeable (plateforme BeWork). */
export const DELIVERABLE_FORMATS = ['docx', 'doc', 'pdf', 'xls', 'pptx'] as const;

export type DeliverableFormat = (typeof DELIVERABLE_FORMATS)[number];

export const DEFAULT_DELIVERABLE_FORMAT: DeliverableFormat = 'docx';

export const DELIVERABLE_FORMAT_LABELS: Record<
  DeliverableFormat,
  { label: string; hint: string }
> = {
  docx: { label: 'Word (.docx)', hint: 'Document Word moderne, éditable' },
  doc: { label: 'Word (.doc)', hint: 'Compatible anciennes versions Word' },
  pdf: { label: 'PDF (.pdf)', hint: 'Lecture seule, diffusion' },
  xls: { label: 'Excel (.xls)', hint: 'Tableur — texte structuré par lignes' },
  pptx: { label: 'PowerPoint (.pptx)', hint: 'Présentation — une slide par section' },
};

export function isDeliverableFormat(value: string): value is DeliverableFormat {
  return (DELIVERABLE_FORMATS as readonly string[]).includes(value);
}

export function parseDeliverableFormat(value: unknown): DeliverableFormat {
  if (typeof value === 'string' && isDeliverableFormat(value)) return value;
  return DEFAULT_DELIVERABLE_FORMAT;
}

export function deliverableExtension(format: DeliverableFormat): string {
  return `.${format}`;
}

export function deliverableMimeType(format: DeliverableFormat): string {
  switch (format) {
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc':
      return 'application/msword';
    case 'pdf':
      return 'application/pdf';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    default:
      return 'application/octet-stream';
  }
}
