'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTeam } from '@/lib/TeamContext';
import { TEMPLATES } from '../../../lib/templates';
import { getHashtagsForSector } from '../../../lib/hashtags';
import PostPreview from '../../components/PostPreview';
import SnippetsManager from '../../components/SnippetsManager';
import VoiceRecorder from '../../components/VoiceRecorder';
import BestTimeDisplay from '../../components/BestTimeDisplay';
import VisualsSection from '../../components/VisualsSection';

const POST_STYLE_MODULES = [
  { value: 'storytelling', label: 'Storytelling', desc: 'Récit, anecdote, mise en situation' },
  { value: 'conseil-expert', label: 'Conseil expert', desc: 'Autorité, données, cas concrets' },
  { value: 'post-viral', label: 'Post viral', desc: 'Phrases courtes, hook percutant, optimisé engagement' },
  { value: 'educatif', label: 'Éducatif', desc: 'Explication claire, pédagogique' },
  { value: 'polemique-soft', label: 'Polémique soft', desc: 'Contredit une idée reçue avec bienveillance' },
  { value: 'etude-de-cas', label: 'Étude de cas', desc: 'Situation réelle, problématique, solution, résultats' },
  { value: 'post-btp', label: 'Post BTP', desc: 'Spécialisé métier (chantier, devis, appel d\'offres...)' },
];

const SECTEURS = [
  { value: 'general', label: 'Général' },
  { value: 'btp', label: 'BTP' },
  { value: 'automobile', label: 'Automobile' },
  { value: 'service', label: 'Service' },
];

const POST_STYLES = [
  { value: 'neutre', label: 'Neutre', desc: 'Ton professionnel équilibré' },
  { value: 'humoristique', label: 'Humoristique', desc: 'Léger, touches d\'humour adaptées au pro' },
  { value: 'storytelling', label: 'Storytelling', desc: 'Récit, anecdote, mise en situation' },
  { value: 'formel', label: 'Formel', desc: 'Sérieux, institutionnel, très professionnel' },
  { value: 'convivial', label: 'Convivial', desc: 'Chaleureux, proche du terrain' },
  { value: 'expert', label: 'Expert', desc: 'Autorité, données, cas concrets' },
];

const POST_TYPES = [
  { value: 'instructif', label: 'Instructif' },
  { value: 'inspirant', label: 'Inspirant' },
  { value: 'introspectif', label: 'Introspectif' },
  { value: 'promotionnel', label: 'Promotionnel' },
];

const POST_CATEGORIES = [
  {
    value: 'explication-analyse',
    label: 'Explication / analyse',
    desc: "Présentation claire d'un concept et de sa mise en ...",
    icon: '○',
  },
  {
    value: 'conseil-percutant',
    label: 'Conseil percutant',
    desc: 'Message direct et incisif pour pousser à l\'action ou ...',
    icon: '✊',
  },
  {
    value: 'ressources-utiles',
    label: 'Ressources utiles',
    desc: 'Présentation de ressources avec description : outils, ...',
    icon: '🏷',
  },
  {
    value: 'bonnes-pratiques',
    label: 'Bonnes pratiques',
    desc: 'Partage de conseils (erreurs, astuces...) en 2 à 7 points...',
    icon: '✓',
  },
  {
    value: 'liste-conseils',
    label: 'Liste de conseils/règles/etc',
    desc: 'Présentation succincte de 8+ conseils, règles, leçons, ...',
    icon: '📄',
  },
  {
    value: 'auto',
    label: 'Catégorie automatique',
    desc: "Choisis cette option si tu ne sais pas quelle catégorie ...",
    icon: '?',
  },
];

const BTP_AUDIENCES = [
  { value: 'artisans', label: 'Artisans / TPE' },
  { value: 'chefs', label: 'Chefs d\'entreprise TP' },
  { value: 'equipes', label: 'Équipes admin / chantier' },
  { value: 'tous', label: 'Tous publics BTP' },
];

type TabId = 'sujet' | 'url' | 'fichier' | 'voix';

const DEFAULT_SUBJECT = "Comment l'IA peut m'aider à gagner du temps sur mes devis et mes emails chantier ?";

function GenerateurPage() {
  const { canCreate } = useTeam();
  const searchParams = useSearchParams();
  const [postType, setPostType] = useState('instructif');
  const [category, setCategory] = useState('explication-analyse');
  const [style, setStyle] = useState('neutre');
  const [postStyleModule, setPostStyleModule] = useState('post-viral');
  const [secteur, setSecteur] = useState('btp');
  const [btpMode, setBtpMode] = useState(true);
  const [btpAudience, setBtpAudience] = useState('artisans');
  const [length, setLength] = useState<'court' | 'moyen' | 'long'>('moyen');
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const styleDropdownRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>('sujet');
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [urlInput, setUrlInput] = useState('');
  const [showParams, setShowParams] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [showPersonnaliseModal, setShowPersonnaliseModal] = useState(false);
  const [linkedInSearch, setLinkedInSearch] = useState('');
  const [tonalite, setTonalite] = useState<'conversationnel' | 'emojis' | 'aucun'>('conversationnel');
  const [registre, setRegistre] = useState<'vouvoiement' | 'tutoiement'>('vouvoiement');
  const [genre, setGenre] = useState<'aucun' | 'masculin' | 'feminin'>('aucun');
  const [expression, setExpression] = useState<'aucun' | 'personnalise'>('aucun');
  const [signatureEnabled, setSignatureEnabled] = useState(true);
  const [signature, setSignature] = useState('Laure Formatrice IA BTP');
  const [accrocheEnabled, setAccrocheEnabled] = useState(false);
  const [accroche, setAccroche] = useState('');
  const [instructionsEnabled, setInstructionsEnabled] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [provider, setProvider] = useState<'openai' | 'claude'>('openai');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [variants, setVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [multiAngle, setMultiAngle] = useState(true);
  const [snippetInsertTarget, setSnippetInsertTarget] = useState<'signature' | 'accroche' | 'subject'>('signature');
  const [hooks, setHooks] = useState<string[]>([]);
  const [showHooks, setShowHooks] = useState(false);
  const [bestTime, setBestTime] = useState<{ times: string[]; note: string } | null>(null);
  const [showPublishLinkedIn, setShowPublishLinkedIn] = useState(false);
  const [styleAnalysis, setStyleAnalysis] = useState('');
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [postsToAnalyze, setPostsToAnalyze] = useState('');
  const [history, setHistory] = useState<Array<{ id: string; content: string; date: string }>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const DRAFT_KEY = 'createur_draft';
  const HISTORY_KEY = 'createur_history';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedToPostsMsg, setSavedToPostsMsg] = useState<string | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [viralityScore, setViralityScore] = useState<{ score: number; suggestions: string[] } | null>(null);
  const [boostLoading, setBoostLoading] = useState(false);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [fullContentLoading, setFullContentLoading] = useState(false);
  const [fullGenTrigger, setFullGenTrigger] = useState<number>(0);
  const errorRef = useRef<HTMLDivElement>(null);

  // Remplir le sujet depuis l'URL (?subject=...) quand on vient d'Idées ou Inspirations
  useEffect(() => {
    const q = searchParams.get('subject');
    if (q?.trim()) setSubject(decodeURIComponent(q.trim()));
  }, [searchParams]);

  // Autosave draft (toutes les 5s)
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ subject, signature, accroche, urlInput }));
    }, 5000);
    return () => clearTimeout(id);
  }, [subject, signature, accroche, urlInput]);

  useEffect(() => {
    const hasSubjectInUrl = searchParams.get('subject')?.trim();
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as { subject?: string; signature?: string; accroche?: string; urlInput?: string };
        if (d.subject && !hasSubjectInUrl) setSubject(d.subject);
        if (d.signature) setSignature(d.signature);
        if (d.accroche) setAccroche(d.accroche);
        if (d.urlInput) setUrlInput(d.urlInput);
      }
    } catch {}
    try {
      const h = localStorage.getItem(HISTORY_KEY);
      if (h) setHistory(JSON.parse(h));
    } catch {}
  }, []);

  const saveToHistory = (content: string) => {
    const entry = { id: crypto.randomUUID(), content, date: new Date().toISOString() };
    const next = [entry, ...history].slice(0, 50);
    setHistory(next);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  };

  const getCustomKnowledge = (): string => {
    if (typeof window === 'undefined') return '';
    try {
      const parts: string[] = [];
      const raw = localStorage.getItem('createur_knowledge_base');
      let kb: { references?: Array<{ label?: string; url?: string; content?: string }>; oldPosts?: string; styleSummary?: string } = {};
      if (raw) kb = JSON.parse(raw);
      if (styleAnalysis.trim()) {
        parts.push(`STYLE ANALYSÉ (session en cours, à reproduire):\n${styleAnalysis.trim()}`);
      } else if (kb.styleSummary?.trim()) {
        parts.push(`CARACTÉRISTIQUES DE STYLE (à reproduire systématiquement):\n${kb.styleSummary.trim()}`);
      }
      kb.references?.forEach((r) => {
        if (r.content?.trim()) parts.push(`[${r.label || r.url || 'Référence'}] ${r.content.trim()}`);
      });
      if (kb.oldPosts?.trim()) {
        parts.push(`ANCIENS POSTS — exemples de ton style à reproduire:\n${kb.oldPosts.trim()}`);
      }
      return parts.join('\n\n');
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(e.target as Node)) {
        setShowStyleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const extractTextFromFile = async (file: File): Promise<string> => {
    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
    const textExts = ['.txt', '.md', '.csv', '.json', '.xml', '.html', '.htm'];
    if (textExts.includes(ext)) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string)?.trim() || '');
        reader.onerror = () => reject(new Error('Erreur lecture fichier'));
        reader.readAsText(file, 'UTF-8');
      });
    }
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/extract-file-text', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur extraction');
    return data.text || '';
  };

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;
    setError(null);
    setIsExtracting(true);
    setFileContent('');
    setFileName(file.name);
    try {
      const text = await extractTextFromFile(file);
      setFileContent(text);
      if (!text) setError('Aucun texte extrait de ce fichier.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l\'import');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGenerate = async () => {
    const input =
      activeTab === 'sujet' || activeTab === 'voix'
        ? subject.trim()
        : activeTab === 'url'
          ? urlInput.trim()
          : activeTab === 'fichier'
            ? fileContent.trim()
            : '';
    if (!input) {
      setError(
        activeTab === 'fichier'
          ? 'Dépose un fichier ou utilise l\'onglet Sujet.'
          : activeTab === 'voix'
            ? 'Enregistre ta voix d\'abord (onglet Voix).'
            : 'Saisis un sujet ou une URL.'
      );
      return;
    }

    setError(null);
    setIsLoading(true);
    setGeneratedPost(null);
    setVariants([]);
    setSelectedVariant(0);
    setViralityScore(null);

    const template = TEMPLATES.find((t) => t.id === selectedTemplate);
    const templatePrompt = template?.prompt || '';

    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: input,
          postType,
          category,
          style,
          postStyleModule,
          secteur,
          btpMode,
          btpAudience,
          length,
          tonalite,
          registre,
          genre,
          signatureEnabled,
          signature,
          accrocheEnabled,
          accroche,
          instructionsEnabled,
          instructions,
          provider,
          customKnowledge: getCustomKnowledge(),
          multiAngle,
          templatePrompt,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        const errMsg = data.error || 'Erreur lors de la génération';
        setError(errMsg);
        errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      setGeneratedPost(data.content || '');
      setVariants(data.variants && data.variants.length > 0 ? data.variants : []);
      saveToHistory(data.content || '');
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : 'Erreur réseau';
      setError(errMsg);
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      setIsLoading(false);
    }
  };

  const displayedPost = variants.length > 0 ? variants[selectedVariant] || generatedPost : generatedPost;

  const copyToClipboard = async (text?: string) => {
    const toCopy = (text ?? displayedPost) || '';
    if (!toCopy) return;
    setCopiedMsg(false);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(toCopy);
      } else {
        const ta = document.createElement('textarea');
        ta.value = toCopy;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = toCopy;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopiedMsg(true);
        setTimeout(() => setCopiedMsg(false), 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const handleSnippetInsert = (text: string) => {
    const add = (prev: string) => prev + (prev ? ' ' : '') + text;
    if (snippetInsertTarget === 'signature') setSignature(add);
    else if (snippetInsertTarget === 'accroche') setAccroche(add);
    else setSubject(add);
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'sujet', label: 'Sujet' },
    { id: 'url', label: 'URL' },
    { id: 'fichier', label: 'Fichier' },
    { id: 'voix', label: '🎤 Voix' },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        {['Type', 'Style', 'Secteur', 'Sujet', 'Générer'].map((step, i) => (
          <span
            key={step}
            className="shrink-0 rounded-full px-3 py-1 text-xs font-medium text-neutral-500 bg-neutral-100"
          >
            {i + 1}. {step}
          </span>
        ))}
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#377CF3]/10 text-[#377CF3] hover:bg-[#377CF3]/20"
              title="Mode rapide"
            >
              <span className="text-lg">⚡</span>
            </button>
            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
              title="Historique"
            >
              <span className="text-lg">📄</span>
            </button>
          </div>
          <div className="relative" ref={styleDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setShowStyleDropdown(false);
                setShowPersonnaliseModal(true);
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                style !== 'neutre'
                  ? 'border-[#377CF3]/30 bg-[#377CF3]/5 text-[#377CF3]'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span>⬇</span>
              Ajoute un style
              {style !== 'neutre' && (
                <span className="rounded-full bg-[#377CF3]/20 px-2 py-0.5 text-xs">
                  {POST_STYLES.find((s) => s.value === style)?.label}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Modal Personnalise l'IA */}
        {showPersonnaliseModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowPersonnaliseModal(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-neutral-800">Personnalise l&apos;IA</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Importe ton style d&apos;écriture ou celui du créateur LinkedIn de ton choix 👆
              </p>
              <div className="mt-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
                  <input
                    type="text"
                    value={linkedInSearch}
                    onChange={(e) => setLinkedInSearch(e.target.value)}
                    placeholder="Rechercher un profil par nom"
                    className="w-full rounded-xl border border-neutral-200 py-2.5 pl-10 pr-4 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  (Import depuis LinkedIn à venir — utilise les tons prédéfinis ci-dessous)
                </p>
              </div>
              <p className="mt-4 text-xs font-medium text-neutral-500">
                Ou enrichis ta{' '}
                <Link
                  href="/outil/ghostwriter"
                  className="text-[#377CF3] hover:underline"
                  onClick={() => setShowPersonnaliseModal(false)}
                >
                  base de connaissance
                </Link>
                {' '}(URLs, anciens posts) pour personnaliser l&apos;IA.
              </p>
              <p className="mt-4 text-xs font-medium text-neutral-500">Ou choisis un ton prédéfini</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {POST_STYLES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => {
                      setStyle(s.value);
                      setShowPersonnaliseModal(false);
                    }}
                    className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      style === s.value
                        ? 'bg-[#377CF3]/10 font-medium text-[#377CF3]'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowPersonnaliseModal(false)}
                className="mt-6 w-full rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
              >
                Le faire plus tard
              </button>
            </div>
          </div>
        )}

        {/* Modal Historique */}
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowHistory(false)}>
            <div className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="border-b p-4 flex justify-between items-center">
                <h3 className="font-semibold text-neutral-800">Historique des posts</h3>
                <button type="button" onClick={() => setShowHistory(false)} className="text-neutral-500 hover:text-neutral-700">×</button>
              </div>
              <div className="max-h-96 overflow-y-auto p-4 space-y-3">
                {history.length === 0 ? (
                  <p className="text-sm text-neutral-500">Aucun post généré récemment.</p>
                ) : (
                  history.map((h) => (
                    <div key={h.id} className="rounded-xl border border-neutral-200 p-3 text-sm">
                      <p className="text-xs text-neutral-400 mb-2">{new Date(h.date).toLocaleString('fr-FR')}</p>
                      <p className="text-neutral-700 line-clamp-3">{h.content}</p>
                      <button
                        type="button"
                        onClick={() => { setSubject(h.content.slice(0, 200)); setShowHistory(false); }}
                        className="mt-2 text-xs text-[#377CF3] hover:underline"
                      >
                        Reprendre
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Analyser mon style */}
        {showStyleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowStyleModal(false)}>
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-semibold text-neutral-800">Analyser mon style</h3>
              <p className="mt-1 text-sm text-neutral-600">Colle 2-3 de tes posts pour que l&apos;IA extraie tes caractéristiques d&apos;écriture.</p>
              <textarea
                value={postsToAnalyze}
                onChange={(e) => setPostsToAnalyze(e.target.value)}
                placeholder="Colle tes posts ici..."
                rows={6}
                className="mt-3 w-full rounded-lg border border-neutral-200 p-3 text-sm"
              />
              <button
                type="button"
                onClick={async () => {
                  if (!postsToAnalyze.trim()) return;
                  const res = await fetch('/api/analyze-style', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ posts: postsToAnalyze, provider }) });
                  const d = await res.json();
                  if (res.ok) setStyleAnalysis(d.styleSummary);
                }}
                className="mt-3 rounded-lg bg-[#377CF3] px-4 py-2 text-sm text-white"
              >
                Analyser
              </button>
              {styleAnalysis && (
                <>
                  <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-700">
                    <p className="font-medium mb-2">Résumé de ton style :</p>
                    <pre className="whitespace-pre-wrap text-xs">{styleAnalysis}</pre>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const raw = localStorage.getItem('createur_knowledge_base');
                        const kb = raw ? JSON.parse(raw) : {};
                        kb.styleSummary = styleAnalysis;
                        localStorage.setItem('createur_knowledge_base', JSON.stringify(kb));
                      } catch {}
                    }}
                    className="mt-3 rounded-lg bg-[#377CF3] px-4 py-2 text-sm text-white"
                  >
                    Sauvegarder dans ma base (utilisé pour tous les posts)
                  </button>
                </>
              )}
              <button type="button" onClick={() => setShowStyleModal(false)} className="mt-4 ml-3 text-sm text-neutral-500 hover:underline">Fermer</button>
            </div>
          </div>
        )}

        {/* Modal Publier LinkedIn */}
        {showPublishLinkedIn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowPublishLinkedIn(false)}>
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-semibold text-neutral-800">Publier sur LinkedIn</h3>
              <p className="mt-2 text-sm text-neutral-600">La publication directe nécessite une configuration OAuth LinkedIn (app développeur). À venir.</p>
              <p className="mt-2 text-xs text-neutral-500">En attendant : copie ton post et publie-le manuellement sur LinkedIn.</p>
              <button type="button" onClick={() => setShowPublishLinkedIn(false)} className="mt-4 rounded-lg border px-4 py-2 text-sm">Fermer</button>
            </div>
          </div>
        )}

        {/* Step 1: Type & Category */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">1. Type de post</h3>
          <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-600">
              Type de post
            </label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            >
              {POST_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-600">
              Catégorie de post
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            >
              {POST_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-neutral-500">
              {POST_CATEGORIES.find((c) => c.value === category)?.desc}
            </p>
          </div>
        </div>
        </div>

        {/* Step 2: Style de post */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">2. Style</h3>
          <label className="mb-1.5 block text-sm font-medium text-neutral-600">
            Style de post
          </label>
          <select
            value={postStyleModule}
            onChange={(e) => setPostStyleModule(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
          >
            {POST_STYLE_MODULES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label} — {s.desc}
              </option>
            ))}
          </select>
        </div>

        {/* Secteur */}
        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-neutral-600">
            Secteur
          </label>
          <div className="flex flex-wrap gap-2">
            {SECTEURS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSecteur(s.value)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  secteur === s.value
                    ? 'bg-[#377CF3] text-white'
                    : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-1 rounded-xl bg-neutral-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="relative mb-6">
          {activeTab === 'sujet' && (
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              rows={5}
              placeholder="Décris ton sujet ou colle ton idée ici..."
              className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 pr-10 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
          )}
          {activeTab === 'url' && (
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Colle l'URL d'un article ou d'une page..."
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
          )}
          {activeTab === 'voix' && (
            <div className="space-y-4 rounded-xl border-2 border-dashed border-[#377CF3]/20 bg-[#377CF3]/5 p-6">
              <p className="text-sm text-neutral-600">
                Dicte ton idée ou ta transcription. Au clic sur Arrêter, le texte sera copié dans le champ Sujet.
              </p>
              <VoiceRecorder
                onTranscript={(t) => {
                  setSubject(t);
                  setActiveTab('sujet');
                }}
              />
            </div>
          )}
          {activeTab === 'fichier' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  handleFileSelect(f || null);
                  e.target.value = '';
                }}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileSelect(e.dataTransfer.files?.[0] || null);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-12 text-neutral-500 transition-colors hover:border-[#377CF3]/30 hover:bg-[#377CF3]/5 hover:text-[#377CF3]"
              >
                <span className="mb-2 text-3xl">📎</span>
                {isExtracting ? (
                  <p className="text-sm font-medium">Extraction du texte en cours…</p>
                ) : fileName ? (
                  <>
                    <p className="text-sm font-medium text-[#377CF3]">✓ {fileName}</p>
                    <p className="mt-1 text-xs">Clique ou dépose un autre fichier pour remplacer</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium">Dépose un fichier ou clique pour parcourir</p>
                    <p className="mt-1 text-xs">Tous formats</p>
                  </>
                )}
              </div>
            </>
          )}
          {(activeTab === 'sujet' && subject) && (
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(subject)}
              className="absolute bottom-3 right-3 rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              title="Copier"
            >
              📋
            </button>
          )}
        </div>

        {/* Contexte BTP (affiché quand secteur = BTP) */}
        {secteur === 'btp' && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={btpMode}
              onChange={(e) => setBtpMode(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-[#377CF3] focus:ring-[#377CF3]"
            />
            <span className="font-medium text-neutral-800">Public BTP détaillé</span>
          </label>
          <p className="mt-1 text-xs text-neutral-600">
            Cible plus précise : artisans, chefs d&apos;entreprise ou équipes chantier/admin.
          </p>
          {btpMode && (
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-neutral-600">Public cible</label>
              <select
                value={btpAudience}
                onChange={(e) => setBtpAudience(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800"
              >
                {BTP_AUDIENCES.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        )}

        {/* Collapsible: Paramètres */}
        <button
          type="button"
          onClick={() => setShowParams(!showParams)}
          className="mb-2 flex w-full items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-800"
        >
          <span className={`transition-transform ${showParams ? 'rotate-90' : ''}`}>›</span>
          Paramètres
        </button>
        {showParams && (
          <div className="mb-4 space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
            <div>
              <label className="mb-1 block font-medium text-neutral-600">Template viral</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-neutral-800"
              >
                <option value="">Aucun (format libre)</option>
                {TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-2 font-medium text-neutral-600">
                <input
                  type="checkbox"
                  checked={multiAngle}
                  onChange={(e) => setMultiAngle(e.target.checked)}
                  className="rounded border-neutral-300"
                />
                3 versions par post (angles différents)
              </label>
              <p className="mt-0.5 text-xs text-neutral-500">Question, chiffre, anecdote</p>
            </div>
            <div>
              <label className="mb-1 block font-medium text-neutral-600">Modèle IA</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setProvider('openai')}
                  className={`rounded-lg px-3 py-1.5 text-sm ${
                    provider === 'openai'
                      ? 'bg-[#377CF3] text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  OpenAI (GPT)
                </button>
                <button
                  type="button"
                  onClick={() => setProvider('claude')}
                  className={`rounded-lg px-3 py-1.5 text-sm ${
                    provider === 'claude'
                      ? 'bg-[#377CF3] text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  Claude (Anthropic)
                </button>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                {provider === 'openai'
                  ? 'Utilise OPENAI_API_KEY'
                  : 'Utilise ANTHROPIC_API_KEY (à configurer dans .env.local)'}
              </p>
            </div>
            <div>
              <label className="mb-1 block font-medium text-neutral-600">Longueur</label>
              <div className="flex gap-2">
                {(['court', 'moyen', 'long'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLength(l)}
                    className={`rounded-lg px-3 py-1.5 text-sm ${
                      length === l
                        ? 'bg-[#377CF3] text-white'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {l === 'court' ? 'Court (~500 car.)' : l === 'moyen' ? 'Moyen (~1200)' : 'Long (~2000)'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block font-medium text-neutral-600">Tonalité</label>
              <div className="flex flex-wrap gap-2">
                {(['conversationnel', 'emojis', 'aucun'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTonalite(t)}
                    className={`rounded-lg px-3 py-1.5 text-sm ${
                      tonalite === t ? 'bg-[#377CF3] text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {t === 'conversationnel' ? 'Conversationnel' : t === 'emojis' ? 'Emojis' : 'Aucun'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block font-medium text-neutral-600">Registre</label>
              <div className="flex gap-2">
                {(['vouvoiement', 'tutoiement'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegistre(r)}
                    className={`rounded-lg px-3 py-1.5 text-sm ${
                      registre === r ? 'bg-[#377CF3] text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {r === 'vouvoiement' ? 'Vouvoiement' : 'Tutoiement'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block font-medium text-neutral-600">Genre</label>
              <div className="flex gap-2">
                {(['aucun', 'masculin', 'feminin'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(g)}
                    className={`rounded-lg px-3 py-1.5 text-sm ${
                      genre === g ? 'bg-[#377CF3] text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {g === 'aucun' ? 'Pas de préférence' : g === 'masculin' ? 'Masculin' : 'Féminin'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block font-medium text-neutral-600">Langue</label>
              <span className="inline-flex items-center rounded-lg bg-[#377CF3]/10 px-3 py-1.5 text-sm font-medium text-[#377CF3]">
                Français 🇫🇷
              </span>
            </div>
          </div>
        )}

        {/* Collapsible: Options avancées */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mb-2 flex w-full items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-800"
        >
          <span className={`transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>›</span>
          Options avancées
        </button>
        {showAdvanced && (
          <div className="mb-6 space-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
            {btpMode && (
              <div>
                <p className="mb-2 font-medium text-neutral-700">Hashtags BTP suggérés</p>
                <p className="text-xs text-neutral-500">
                  #BTP #IA #Artisanat #Construction #Devis #Chantier #TPE #TransformationNumérique
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <label className="font-medium text-neutral-700">Instructions spécifiques</label>
              <button
                type="button"
                role="switch"
                aria-checked={instructionsEnabled}
                onClick={() => setInstructionsEnabled(!instructionsEnabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  instructionsEnabled ? 'bg-[#377CF3]' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    instructionsEnabled ? 'left-6 translate-x-0' : 'left-1'
                  }`}
                />
              </button>
            </div>
            {instructionsEnabled && (
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Ex : Toujours commencer par une question, éviter les listes..."
                rows={2}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-800 placeholder:text-neutral-400"
              />
            )}
            <div className="flex items-center justify-between">
              <label className="font-medium text-neutral-700">Signature à la fin des posts</label>
              <button
                type="button"
                role="switch"
                aria-checked={signatureEnabled}
                onClick={() => setSignatureEnabled(!signatureEnabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  signatureEnabled ? 'bg-[#377CF3]' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    signatureEnabled ? 'left-6 translate-x-0' : 'left-1'
                  }`}
                />
              </button>
            </div>
            {signatureEnabled && (
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Ex : Laure Formatrice IA BTP"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-800 placeholder:text-neutral-400"
              />
            )}
            <div className="flex items-center justify-between">
              <label className="font-medium text-neutral-700">Accroche personnalisée</label>
              <button
                type="button"
                role="switch"
                aria-checked={accrocheEnabled}
                onClick={() => setAccrocheEnabled(!accrocheEnabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  accrocheEnabled ? 'bg-[#377CF3]' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    accrocheEnabled ? 'left-6 translate-x-0' : 'left-1'
                  }`}
                />
              </button>
            </div>
            {accrocheEnabled && (
              <>
                <input
                  type="text"
                  value={accroche}
                  onChange={(e) => setAccroche(e.target.value)}
                  placeholder="Ex : Et vous, comment gérez-vous vos devis ?"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-800 placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const inp = subject.trim() || fileContent.trim();
                    if (!inp) return;
                    const res = await fetch('/api/generate-hooks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject: inp, provider, customKnowledge: getCustomKnowledge() }) });
                    const d = await res.json();
                    if (res.ok) { setHooks(d.hooks || []); setShowHooks(true); }
                  }}
                  className="mt-2 text-sm text-[#377CF3] hover:underline"
                >
                  ✨ Générer des accroches (A/B)
                </button>
              </>
            )}
            {showHooks && hooks.length > 0 && (
              <div className="mt-2 rounded-lg border border-[#377CF3]/20 bg-[#377CF3]/5 p-2">
                <p className="text-xs font-medium text-[#377CF3] mb-2">Choisis une accroche :</p>
                {hooks.map((h, i) => (
                  <button key={i} type="button" onClick={() => { setAccroche(h); setShowHooks(false); }} className="block w-full rounded px-2 py-1.5 text-left text-sm hover:bg-[#377CF3]/10">
                    {h}
                  </button>
                ))}
              </div>
            )}
            <div className="border-t border-neutral-200 pt-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-600">Insérer dans :</span>
                <select
                  value={snippetInsertTarget}
                  onChange={(e) => setSnippetInsertTarget(e.target.value as 'signature' | 'accroche' | 'subject')}
                  className="rounded border border-neutral-200 px-2 py-1 text-xs"
                >
                  <option value="signature">Signature</option>
                  <option value="accroche">Accroche</option>
                  <option value="subject">Sujet</option>
                </select>
              </div>
              <SnippetsManager onInsert={handleSnippetInsert} />
            </div>
          </div>
        )}

        {/* Error message — bien visible au-dessus du bouton */}
        {error && (
          <div ref={errorRef} className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
            <p className="font-semibold">⚠️ Erreur</p>
            <p className="mt-1">{error}</p>
            <p className="mt-2 text-xs text-red-600">
              {provider === 'openai'
                ? 'Vérifie OPENAI_API_KEY dans .env.local. Clé invalide ou expirée ? Génère-en une nouvelle sur platform.openai.com/api-keys'
                : 'Vérifie ANTHROPIC_API_KEY dans .env.local pour utiliser Claude.'}
            </p>
            {provider === 'openai' && (
              <a
                href="/api/test-openai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-[#377CF3] underline hover:text-[#377CF3]"
              >
                Tester la connexion OpenAI →
              </a>
            )}
          </div>
        )}

        {/* Generate buttons */}
        {!canCreate && (
          <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
            Mode lecture seule : tu n&apos;as pas les droits pour générer des posts.
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || fullContentLoading || !canCreate}
            className="flex-1 rounded-xl bg-[#377CF3] py-4 text-base font-semibold text-white hover:bg-[#2d6ad4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Génération…' : 'Générer un post'}
          </button>
          <button
            type="button"
            onClick={async () => {
              const input =
                activeTab === 'sujet' || activeTab === 'voix'
                  ? subject.trim()
                  : activeTab === 'url'
                    ? urlInput.trim()
                    : activeTab === 'fichier'
                      ? fileContent.trim()
                      : '';
              if (!input) {
                setError('Saisis un sujet d\'abord.');
                return;
              }
              setError(null);
              setFullContentLoading(true);
              setGeneratedPost(null);
              setVariants([]);
              setViralityScore(null);
              try {
                const res = await fetch('/api/generate-post', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    subject: input,
                    postType,
                    category,
                    style,
                    postStyleModule,
                    secteur,
                    btpMode,
                    btpAudience,
                    length,
                    tonalite,
                    registre,
                    genre,
                    signatureEnabled,
                    signature,
                    accrocheEnabled,
                    accroche,
                    instructionsEnabled,
                    instructions,
                    provider,
                    customKnowledge: getCustomKnowledge(),
                    multiAngle,
                    templatePrompt: TEMPLATES.find((t) => t.id === selectedTemplate)?.prompt || '',
                  }),
                });
                const data = await res.json();
                if (!res.ok) {
                  setError(data.error || 'Erreur');
                  return;
                }
                const content = data.content || '';
                setGeneratedPost(content);
                saveToHistory(content);
                setFullGenTrigger(Date.now());
              } catch (e) {
                setError(e instanceof Error ? e.message : 'Erreur réseau');
              } finally {
                setFullContentLoading(false);
              }
            }}
            disabled={isLoading || fullContentLoading || !canCreate}
            className="rounded-xl border-2 border-[#377CF3] bg-white py-4 px-6 text-base font-semibold text-[#377CF3] hover:bg-[#377CF3]/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {fullContentLoading ? '…' : 'Générer contenu complet'}
          </button>
        </div>
      </div>

      {/* Generated result */}
      {displayedPost && (
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-neutral-800">Aperçu du post</h3>
              {savedToPostsMsg && <span className="text-sm text-emerald-600 font-medium">{savedToPostsMsg}</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setShowStyleModal(true)} className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100">Analyser mon style</button>
              <button
                type="button"
                disabled={boostLoading}
                onClick={async () => {
                  const text = displayedPost || '';
                  if (!text) return;
                  setBoostLoading(true);
                  try {
                    const res = await fetch('/api/boost-virality', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ post: text }),
                    });
                    const d = await res.json();
                    if (res.ok && d.content) {
                      setGeneratedPost(d.content);
                      setVariants([]);
                      setViralityScore(null);
                    }
                  } finally {
                    setBoostLoading(false);
                  }
                }}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#377CF3] hover:bg-blue-50 border border-[#377CF3]/30"
              >
                {boostLoading ? '…' : 'Booster viralité'}
              </button>
              <button
                type="button"
                disabled={scoreLoading}
                onClick={async () => {
                  const text = displayedPost || '';
                  if (!text) return;
                  setScoreLoading(true);
                  setViralityScore(null);
                  try {
                    const res = await fetch('/api/virality-score', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ post: text }),
                    });
                    const d = await res.json();
                    if (res.ok) setViralityScore({ score: d.score, suggestions: d.suggestions || [] });
                  } finally {
                    setScoreLoading(false);
                  }
                }}
                className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
              >
                {scoreLoading ? '…' : 'Score viralité'}
              </button>
              <button
                type="button"
                onClick={async () => {
                  const text = displayedPost || '';
                  const title = text.split('\n')[0]?.trim().slice(0, 80) || 'Nouveau post';
                  const newPost = {
                    id: crypto.randomUUID(),
                    title,
                    content: text,
                    status: 'brouillon',
                    label: 'Instructif',
                    date: new Date().toISOString().slice(0, 10),
                    favorite: false,
                    hasMedia: false,
                  };
                  setSavedToPostsMsg(null);
                  try {
                    const res = await fetch('/api/posts', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title, content: text, status: 'brouillon', label: 'Instructif' }),
                    });
                    if (res.ok) {
                      setSavedToPostsMsg('✓ Enregistré dans Mes posts');
                      setTimeout(() => setSavedToPostsMsg(null), 3000);
                    } else {
                      const raw = localStorage.getItem('createur_posts');
                      const list = raw ? JSON.parse(raw) : [];
                      list.unshift(newPost);
                      localStorage.setItem('createur_posts', JSON.stringify(list));
                      setSavedToPostsMsg('✓ Enregistré (local)');
                      setTimeout(() => setSavedToPostsMsg(null), 3000);
                    }
                  } catch {
                    const raw = localStorage.getItem('createur_posts');
                    const list = raw ? JSON.parse(raw) : [];
                    list.unshift(newPost);
                    localStorage.setItem('createur_posts', JSON.stringify(list));
                    setSavedToPostsMsg('✓ Enregistré (local)');
                    setTimeout(() => setSavedToPostsMsg(null), 3000);
                  }
                }}
                className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
                title="Ajouter à Mes posts"
              >
                + Mes posts
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    const raw = localStorage.getItem('createur_knowledge_base');
                    const kb = raw ? JSON.parse(raw) : { references: [], oldPosts: '', styleSummary: '' };
                    const sep = kb.oldPosts?.trim() ? '\n\n---\n\n' : '';
                    kb.oldPosts = (kb.oldPosts || '') + sep + (displayedPost || '');
                    localStorage.setItem('createur_knowledge_base', JSON.stringify(kb));
                  } catch {}
                }}
                className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
                title="Ajouter ce post à tes exemples (base de connaissance)"
              >
                + À mes exemples
              </button>
              <button type="button" onClick={() => setShowPublishLinkedIn(true)} className="rounded-lg px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100">Publier</button>
              <button type="button" onClick={() => copyToClipboard()} className="rounded-lg px-3 py-1.5 text-sm text-[#377CF3] hover:bg-[#377CF3]/5">
                {copiedMsg ? '✓ Copié !' : 'Copier'}
              </button>
            </div>
          </div>

          {variants.length > 1 && (
            <div className="mb-4 flex gap-2">
              {variants.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedVariant(i)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    selectedVariant === i ? 'bg-[#377CF3] text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Version {i + 1}
                </button>
              ))}
            </div>
          )}

          {viralityScore && (
            <div className="mb-4 rounded-xl border border-[#377CF3]/30 bg-blue-50/30 p-4">
              <h4 className="mb-2 text-sm font-semibold text-[#377CF3]">Score de viralité</h4>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#377CF3]">{viralityScore.score}/100</span>
                <div className="flex-1">
                  {viralityScore.suggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-neutral-600 mb-1">Suggestions d&apos;amélioration :</p>
                      <ul className="text-xs text-neutral-600 space-y-1">
                        {viralityScore.suggestions.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <pre className="whitespace-pre-wrap rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700 font-sans">
              {displayedPost}
            </pre>
            <div>
              <p className="mb-2 text-sm font-medium text-neutral-600">Prévisualisation LinkedIn</p>
              <PostPreview content={displayedPost} authorName="Laure Olivié" authorTitle={signature || 'Formatrice IA BTP'} />
            </div>
          </div>

          <div className="mt-6">
            <VisualsSection postContent={displayedPost || ''} triggerFullGeneration={fullGenTrigger || undefined} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-medium text-neutral-500">Hashtags suggérés</p>
                <button type="button" onClick={() => copyToClipboard((displayedPost || '') + '\n\n' + getHashtagsForSector(secteur === 'btp' ? 'btp' : 'business').join(' '))} className="text-xs text-[#377CF3] hover:underline">Copier avec hashtags</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {getHashtagsForSector(secteur === 'btp' ? 'btp' : 'business').map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs text-neutral-600 border border-neutral-200">{tag}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-medium text-neutral-500 mb-2">Meilleurs moments pour poster</p>
              <BestTimeDisplay sector={secteur === 'btp' ? 'btp' : 'default'} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GenerateurPageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-neutral-500">Chargement…</div>}>
      <GenerateurPage />
    </Suspense>
  );
}
