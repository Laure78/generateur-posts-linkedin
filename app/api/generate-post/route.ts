import { NextResponse } from 'next/server'

export const maxDuration = 60
import { getLaureProfileContext } from '../../../lib/laureProfile'
import { generateWithAI, type AIProvider } from '../../../lib/aiProvider'

const TYPE_LABELS: Record<string, string> = {
  instructif: 'instructif (pédagogique, qui apporte une connaissance claire)',
  inspirant: 'inspirant (qui motive et donne envie d\'agir)',
  introspectif: 'introspectif (réflexion personnelle, retour d\'expérience)',
  promotionnel: 'promotionnel (mise en avant d\'une offre, service ou expertise)',
}

const CATEGORY_LABELS: Record<string, string> = {
  'explication-analyse': 'explication / analyse : présentation claire d\'un concept et de sa mise en pratique',
  'conseil-percutant': 'conseil percutant : message direct et incisif pour pousser à l\'action',
  'ressources-utiles': 'ressources utiles : présentation d\'outils, méthodes ou contenus utiles',
  'bonnes-pratiques': 'bonnes pratiques : conseils en 2 à 7 points (erreurs à éviter, astuces)',
  'liste-conseils': 'liste de conseils/règles : 8+ conseils, règles ou leçons de façon succincte',
  auto: 'catégorie adaptée automatiquement au sujet',
}

const STYLE_LABELS: Record<string, string> = {
  neutre: 'ton professionnel équilibré, accessible',
  humoristique: 'ton léger avec touches d\'humour adaptées au contexte professionnel (pas de moquerie)',
  storytelling: 'récit, anecdote, mise en situation, histoire vécue pour illustrer le propos',
  formel: 'ton sérieux, institutionnel, très professionnel',
  convivial: 'ton chaleureux, proche du terrain, comme une discussion entre pairs',
  expert: 'ton d\'autorité, données chiffrées, cas concrets, démonstration d\'expertise',
}

const BTP_AUDIENCE_LABELS: Record<string, string> = {
  artisans: 'artisans et TPE du BTP (vocabulaire chantier, devis, clients, quotidien terrain)',
  chefs: 'chefs d\'entreprise et dirigeants TP (vision stratégique, rentabilité, équipes)',
  equipes: 'équipes admin et chantier (process, outils, gain de temps au quotidien)',
  tous: 'tous publics BTP (artisans, chefs, équipes)',
}

const LENGTH_SPECS: Record<string, { chars: string; tokens: number }> = {
  court: { chars: '400 à 600 caractères', tokens: 400 },
  moyen: { chars: '800 à 1500 caractères', tokens: 800 },
  long: { chars: '1500 à 2500 caractères', tokens: 1200 },
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      subject,
      postType = 'instructif',
      category = 'explication-analyse',
      style = 'neutre',
      btpMode = false,
      btpAudience = 'artisans',
      length = 'moyen',
      tonalite = 'conversationnel',
      registre = 'vouvoiement',
      genre = 'aucun',
      signatureEnabled = false,
      signature = '',
      accrocheEnabled = false,
      accroche = '',
      instructionsEnabled = false,
      instructions = '',
      provider = 'openai' as AIProvider,
      customKnowledge = '',
      multiAngle = true,
      templatePrompt = '',
    } = body || {}

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json(
        { error: 'Le sujet est requis' },
        { status: 400 }
      )
    }

    const typeDesc = TYPE_LABELS[postType] || TYPE_LABELS.instructif
    const categoryDesc = CATEGORY_LABELS[category] || CATEGORY_LABELS.auto
    const styleDesc = STYLE_LABELS[style] || STYLE_LABELS.neutre
    const btpDesc = btpMode ? BTP_AUDIENCE_LABELS[btpAudience] || '' : ''
    const lengthSpec = LENGTH_SPECS[length] || LENGTH_SPECS.moyen
    const isUrl = /^https?:\/\//i.test(subject.trim())

    const profileContext = getLaureProfileContext()

    let systemPrompt = `Tu es un expert en rédaction pour LinkedIn. Tu écris des posts professionnels en français, percutants et adaptés à l'algorithme LinkedIn.

BASE DE CONNAISSANCE — Profil de l'auteure (Laure Olivié) :
${profileContext}`
    if (customKnowledge && typeof customKnowledge === 'string' && customKnowledge.trim()) {
      systemPrompt += `

IMPORTANT — TON ET STYLE À REPRODUIRE :
Les éléments suivants définissent le style d'écriture de l'auteure. Tu DOIS t'en inspirer pour chaque nouveau post :
- Même ton, même longueur de phrases, mêmes structures (listes, paragraphes, questions)
- Même vocabulaire et mêmes tournures de phrase
- Si des caractéristiques de style sont listées, les appliquer systématiquement

${customKnowledge.trim()}`
    }
    systemPrompt += `

Règles :
- Style : ${styleDesc}
- Ton professionnel mais accessible, sans jargon inutile.
- Accroche forte dans la première ligne pour capter l'attention.
- Paragraphes courts (2-4 lignes max), avec des sauts de ligne pour la lisibilité.
- Pas de hashtags dans le corps du post (on peut en ajouter après).
- Longueur cible : ${lengthSpec.chars}
- Utilise des listes à puces ou une structure claire quand c'est pertinent.`


    if (tonalite === 'emojis') systemPrompt += '\n- Utilise quelques emojis pertinents pour rendre le post plus vivant.'
    if (tonalite === 'aucun') systemPrompt += '\n- Pas d\'emojis.'
    if (registre === 'tutoiement') systemPrompt += '\n- Utilise le tutoiement (tu, ton, ta).'
    if (registre === 'vouvoiement') systemPrompt += '\n- Utilise le vouvoiement (vous, votre).'
    if (genre === 'feminin') systemPrompt += '\n- Accord au féminin quand pertinent.'
    if (genre === 'masculin') systemPrompt += '\n- Accord au masculin quand pertinent.'
    if (btpMode && btpDesc) systemPrompt += `\n- Contexte BTP : adapte le vocabulaire et les exemples pour ${btpDesc}`
    if (signatureEnabled && signature?.trim()) systemPrompt += `\n- Termine le post par la signature : "${signature.trim()}"`
    if (accrocheEnabled && accroche?.trim()) systemPrompt += `\n- Commence le post par cette accroche personnalisée : "${accroche.trim()}"`
    if (instructionsEnabled && instructions?.trim()) systemPrompt += `\n- Instructions spécifiques à respecter : ${instructions.trim()}`
    if (templatePrompt && typeof templatePrompt === 'string' && templatePrompt.trim()) {
      systemPrompt += `\n\nFORMAT IMPOSÉ (template viral) :\n${templatePrompt.trim()}`
    }

    const multiAngleInstruction = multiAngle
      ? `\n\nIMPORTANT : Génère exactement 3 versions de ce post, chacune avec un angle différent :
- Version 1 : angle question ou curiosité
- Version 2 : angle donnée/chiffre ou autorité
- Version 3 : angle anecdote ou storytelling
Sépare chaque version par exactement cette ligne (sans rien d'autre) :
---VERSION---
N'écris aucun autre texte avant, entre ou après les 3 versions.`
      : ''

    const userPrompt = isUrl
      ? `Génère un post LinkedIn pour accompagner le partage de ce lien :

**Type de post :** ${typeDesc}
**Catégorie / format :** ${categoryDesc}

**URL à partager :**
${subject.trim()}

Propose un post qui donne envie de cliquer (accroche, contexte, valeur) sans recopier le contenu de la page. Écris uniquement le texte du post, sans titre ni métadonnées.${multiAngleInstruction}`
      : `Génère un post LinkedIn avec les contraintes suivantes :

**Type de post :** ${typeDesc}
**Catégorie / format :** ${categoryDesc}

**Sujet ou idée :**
${subject.trim()}

Écris uniquement le texte du post, sans titre ni métadonnées.${multiAngleInstruction}`

    const apiKey = provider === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: provider === 'claude' ? 'ANTHROPIC_API_KEY non configurée (ajoute-la dans .env.local)' : 'OPENAI_API_KEY non configurée' },
        { status: 500 }
      )
    }

    const content = await generateWithAI({
      systemPrompt,
      userPrompt,
      provider,
      maxTokens: multiAngle ? 2400 : 1000,
      temperature: 0.8,
    })

    if (multiAngle) {
      const sep = /---VERSION---/
      const parts = content.split(sep).map((p) => p.trim()).filter(Boolean)
      const variants = parts.length >= 2 ? parts.slice(0, 3) : [content]
      return NextResponse.json({ content: variants[0], variants })
    }

    return NextResponse.json({ content })
  } catch (e) {
    console.error('generate-post error', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Erreur lors de la génération' },
      { status: 500 }
    )
  }
}
