import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { getAppUser } from '@/lib/auth/get-user';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getMission } from '@/lib/dev/local-missions';
import {
  deliverableMimeType,
  isDeliverableFormat,
  parseDeliverableFormat,
} from '@/lib/bework/deliverable-formats';
import { missionDeliverablePath, missionDocxPath } from '@/lib/skills/mission-output';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getAppUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  let missionFormat: string | null = null;
  let missionTitle: string | null = null;

  if (DEV_BYPASS) {
    const m = await getMission(id, user.id);
    if (!m) {
      return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 });
    }
    missionFormat = m.output_format;
    missionTitle = m.title;
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('missions')
      .select('id, title, output_format')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();
    if (!data) {
      return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 });
    }
    missionFormat = data.output_format;
    missionTitle = data.title;
  }

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
