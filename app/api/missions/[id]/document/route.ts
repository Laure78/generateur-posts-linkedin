import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { getAppUser } from '@/lib/auth/get-user';
import { DEV_BYPASS } from '@/lib/dev/config';
import { getMission } from '@/lib/dev/local-missions';
import { missionDocxPath } from '@/lib/skills/mission-output';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getAppUser();
  if (!user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  if (DEV_BYPASS) {
    const m = await getMission(id, user.id);
    if (!m) {
      return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 });
    }
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('missions')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();
    if (!data) {
      return NextResponse.json({ error: 'Mission introuvable' }, { status: 404 });
    }
  }

  const docxPath = missionDocxPath(id);
  try {
    const buffer = await fs.readFile(docxPath);
    const filename = `CR_BeWork_${id.slice(0, 8)}.docx`;
    return new NextResponse(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
