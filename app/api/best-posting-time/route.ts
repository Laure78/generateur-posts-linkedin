import { NextResponse } from 'next/server'

/**
 * Suggestions de meilleurs moments pour publier (B2B France)
 * Basé sur études LinkedIn / Buffer / Sprout
 */
const RECOMMENDATIONS: Record<string, { times: string[]; note: string }> = {
  btp: {
    times: ['Mardi 9h-10h', 'Mercredi 8h-9h', 'Jeudi 10h-11h', 'Mardi 14h', 'Mercredi 15h'],
    note: 'B2B France : mardi et mercredi matin performent bien. Éviter le lundi matin et le vendredi après-midi.',
  },
  default: {
    times: ['Mardi 9h', 'Mercredi 9h', 'Jeudi 10h', 'Mardi 14h'],
    note: 'Horaires type B2B. Teste et adapte selon ton audience.',
  },
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sector = searchParams.get('sector') || 'default'
  const data = RECOMMENDATIONS[sector] || RECOMMENDATIONS.default
  return NextResponse.json(data)
}
