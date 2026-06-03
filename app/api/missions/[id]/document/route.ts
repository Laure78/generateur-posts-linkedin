import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { getAppProfile } from '@/lib/auth/profile';
import { fetchMissionById } from '@/lib/missions/access';
import { logMissionAudit } from '@/lib/missions/audit';
import {
  deliverableMimeType,
  isDeliverableFormat,
  parseDeliverableFormat,
} from '@/lib/bework/deliverable-formats';
import { resolveMissionOptions } from '@/lib/bework/mission-meta';
import { missionDeliverablePath, missionDocxPath } from '@/lib/skills/mission-output';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const profile = await getAppProfile(request);
  if (!profile) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const mission = await fetchMissionById(id, profile.id, profile.role);
  if (!mission) {
    return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 });
  }

  const resolved = resolveMissionOptions({
    brief: mission.brief,
    output_format: mission.output_format,
    use_skill_charter: mission.use_skill_charter,
  });
  const missionFormat = resolved.output_format;
  const missionTitle = mission.title;

  const url = new URL(request.url);
  const formatParam = url.searchParams.get('format');
  const format = isDeliverableFormat(formatParam ?? '')
    ? (formatParam as import('@/lib/bework/deliverable-formats').DeliverableFormat)
    : parseDeliverableFormat(missionFormat);

  let filePath = missionDeliverablePath(id, format);
  try {
    await fs.access(filePath);
  } catch {
    if (format === 'doc') {
      filePath = missionDocxPath(id);
    } else {
      return NextResponse.json(
        { error: 'Document non disponible. Relancez le traitement de la demande.' },
        { status: 404 }
      );
    }
  }

  try {
    const buffer = await fs.readFile(filePath);
    const safeTitle =
      (missionTitle ?? 'Livrable_BeWork')
        .replace(/[^\w\s-àâäéèêëïîôùûüçÀÂÄÉÈÊËÏÎÔÙÛÜÇ]/gi, '')
        .trim()
        .replace(/\s+/g, '_')
        .slice(0, 50) || 'Livrable_BeWork';
    const filename = `${safeTitle}.${format}`;

    await logMissionAudit(id, profile.id, 'deliverable_download', { format });

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': deliverableMimeType(format),
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Document non disponible. Relancez le traitement de la demande.' },
      { status: 404 }
    );
  }
}
