import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export type PostRow = {
  id: string;
  title: string;
  content: string | null;
  status: string;
  label: string;
  scheduled_at: string | null;
  published_at: string | null;
  favorite: boolean;
  has_media: boolean;
  created_at: string;
  updated_at: string;
};

function toClientPost(row: PostRow) {
  return {
    id: row.id,
    title: row.title,
    content: row.content || '',
    status: row.status as 'brouillon' | 'planifie' | 'publie',
    label: row.label as 'Instructif' | 'Inspirant' | 'Storytelling' | 'Conseil' | 'Ressources',
    date: row.created_at.slice(0, 10),
    scheduledAt: row.scheduled_at ?? undefined,
    publishedAt: row.published_at ?? undefined,
    favorite: row.favorite,
    hasMedia: row.has_media,
  };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseServer) {
    return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  }
  const { id } = await params;
  try {
    const { data, error } = await supabaseServer.from('posts').select('*').eq('id', id).single();
    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(toClientPost(data as PostRow));
  } catch (e) {
    console.error('GET /api/posts/[id]:', e);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseServer) {
    return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  }
  const { id } = await params;
  try {
    const body = await req.json().catch(() => ({}));
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.title === 'string') updates.title = body.title;
    if (typeof body.content === 'string') updates.content = body.content;
    if (['brouillon', 'planifie', 'publie'].includes(body.status)) updates.status = body.status;
    if (['Instructif', 'Inspirant', 'Storytelling', 'Conseil', 'Ressources'].includes(body.label)) updates.label = body.label;
    if (typeof body.favorite === 'boolean') updates.favorite = body.favorite;
    if (typeof body.hasMedia === 'boolean') updates.has_media = body.hasMedia;
    if (body.scheduledAt !== undefined) updates.scheduled_at = body.scheduledAt || null;
    if (body.publishedAt !== undefined) updates.published_at = body.publishedAt || null;
    const { data, error } = await supabaseServer.from('posts').update(updates).eq('id', id).select('*').single();
    if (error) throw error;
    return NextResponse.json(toClientPost(data as PostRow));
  } catch (e) {
    console.error('PATCH /api/posts/[id]:', e);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseServer) {
    return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  }
  const { id } = await params;
  try {
    const { error } = await supabaseServer.from('posts').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/posts/[id]:', e);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
