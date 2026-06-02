import {
  DEFAULT_DELIVERABLE_FORMAT,
  parseDeliverableFormat,
  type DeliverableFormat,
} from './deliverable-formats';

/** Ligne technique en fin de brief si les colonnes DB ne sont pas encore migrées. */
const META_LINE =
  /^[\s]*Metadonnées BeWork \(ne pas supprimer\) : format=([a-z]+) ; charte=(0|1)\s*$/im;

export type MissionOptions = {
  output_format: DeliverableFormat;
  use_skill_charter: boolean;
};

export function appendMissionMetaToBrief(brief: string, options: MissionOptions): string {
  const line = `Metadonnées BeWork (ne pas supprimer) : format=${options.output_format} ; charte=${options.use_skill_charter ? 1 : 0}`;
  if (META_LINE.test(brief)) {
    return brief.replace(META_LINE, line).trimEnd();
  }
  return `${brief.trimEnd()}\n\n${line}`;
}

export function stripMissionMetaFromBrief(brief: string): string {
  return brief.replace(META_LINE, '').trimEnd();
}

export function parseMissionMetaFromBrief(brief: string): {
  brief: string;
  options: Partial<MissionOptions>;
} {
  const match = brief.match(META_LINE);
  if (!match) {
    return { brief, options: {} };
  }
  return {
    brief: stripMissionMetaFromBrief(brief),
    options: {
      output_format: parseDeliverableFormat(match[1]),
      use_skill_charter: match[2] === '1',
    },
  };
}

export function resolveMissionOptions(
  row: {
    brief: string;
    output_format?: string | null;
    use_skill_charter?: boolean | null;
  }
): MissionOptions & { brief: string } {
  const fromBrief = parseMissionMetaFromBrief(row.brief);
  const output_format = row.output_format
    ? parseDeliverableFormat(row.output_format)
    : fromBrief.options.output_format ?? DEFAULT_DELIVERABLE_FORMAT;
  const use_skill_charter =
    row.use_skill_charter != null
      ? row.use_skill_charter !== false
      : fromBrief.options.use_skill_charter ?? true;

  return {
    brief: fromBrief.brief,
    output_format,
    use_skill_charter,
  };
}

export function isMissingMissionOptionsColumnError(message: string): boolean {
  return (
    message.includes('output_format') ||
    message.includes('use_skill_charter') ||
    message.includes('schema cache')
  );
}
