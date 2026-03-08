import { NextResponse } from 'next/server'

const TEXT_EXTS = ['.txt', '.md', '.csv', '.json', '.xml', '.html', '.htm']
const MAX_SIZE = 10 * 1024 * 1024 // 10 Mo

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 10 Mo)' },
        { status: 400 }
      )
    }

    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase()

    // Fichiers texte : lecture directe
    if (TEXT_EXTS.includes(ext)) {
      const text = await file.text()
      return NextResponse.json({ text: text.trim() || '(fichier vide)' })
    }

    // PDF
    if (ext === '.pdf') {
      const mod = await import('pdf-parse')
      const pdfParse = ((mod as Record<string, unknown>).default ?? mod) as (buf: Buffer) => Promise<{ text?: string }>
      const buffer = Buffer.from(await file.arrayBuffer())
      const data = await pdfParse(buffer)
      return NextResponse.json({ text: (data.text || '').trim() || '(aucun texte extrait)' })
    }

    // Word (.docx)
    if (ext === '.docx' || ext === '.doc') {
      const mammoth = await import('mammoth')
      const buffer = Buffer.from(await file.arrayBuffer())
      const result = await mammoth.extractRawText({ buffer })
      return NextResponse.json({
        text: (result.value || '').trim() || '(aucun texte extrait)',
      })
    }

    // Autres formats : tenter lecture en UTF-8
    try {
      const text = await file.text()
      if (text.trim()) {
        return NextResponse.json({ text: text.trim() })
      }
    } catch {
      // ignore
    }

    return NextResponse.json(
      { error: `Format non supporté pour l'extraction de texte : ${ext || file.type}` },
      { status: 400 }
    )
  } catch (e) {
    console.error('extract-file-text error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur lors de l\'extraction' },
      { status: 500 }
    )
  }
}
