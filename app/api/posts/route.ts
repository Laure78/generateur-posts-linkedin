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

export async function GET() {
  if (!supabaseServer) {
    return NextResponse.json({ error: 'supabase_not_configured', posts: [] }, { status: 200 });
  }
  try {
    const { data, error } = await supabaseServer
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    const posts = (data || []).map((r) => toClientPost(r as PostRow));
    return NextResponse.json({ posts });
  } catch (e) {
    console.error('GET /api/posts:', e);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!supabaseServer) {
    return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const { title, content, status = 'brouillon', label = 'Instructif', favorite = false, hasMedia = false } = body;
    const postTitle = typeof title === 'string' && title.trim() ? title.trim() : 'Nouveau post';
    const { data, error } = await supabaseServer
      .from('posts')
      .insert({
        title: postTitle,
        content: typeof content === 'string' ? content : null,
        status,
        label,
        favorite: !!favorite,
        has_media: !!hasMedia,
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json(toClientPost(data as PostRow));
  } catch (e) {
    console.error('POST /api/posts:', e);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
