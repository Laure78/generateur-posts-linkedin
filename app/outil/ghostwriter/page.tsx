'use client';

import { useState, useRef, useEffect } from 'react';
import { Copy, Send, Sparkles } from 'lucide-react';
import { OPENROUTER_MODELS } from '../../../lib/aiProvider';

const BLUE = '#377CF3';
const STORAGE_KEY = 'createur_knowledge_base';

const QUICK_ACTIONS = [
  { label: 'Génère un brouillon', text: "J'ai une idée de post mais je ne sais pas par où commencer. Peux-tu m'écrire un brouillon ? (je te donnerai le sujet dans le message suivant si besoin)" },
  { label: 'Réécris plus court', text: 'Peux-tu réécrire ta dernière proposition en version plus courte (max 8 lignes) ?' },
  { label: 'Propose 3 angles', text: "Propose-moi 3 angles différents pour ce sujet, avec un titre d'accroche pour chacun :" },
  { label: 'Plus storytelling', text: 'Réécris la dernière version en mode storytelling, avec une anecdote ou une mise en situation.' },
  { label: 'Nouvelle conversation', text: '', isReset: true },
];

function getCustomKnowledge(): string {
  if (typeof window === 'undefined') return '';
  try {
    const parts: string[] = [];
    const raw = localStorage.getItem(STORAGE_KEY);
    let kb: { references?: Array<{ label?: string; url?: string; content?: string }>; oldPosts?: string; styleSummary?: string } = {};
    if (raw) kb = JSON.parse(raw);
    if (kb.styleSummary?.trim()) {
      parts.push(`CARACTÉRISTIQUES DE STYLE :\n${kb.styleSummary.trim()}`);
    }
    kb.references?.forEach((r) => {
      if (r.content?.trim()) parts.push(`[${r.label || r.url || 'Référence'}] ${r.content.trim()}`);
    });
    if (kb.oldPosts?.trim()) {
      parts.push(`ANCIENS POSTS — exemples de style :\n${kb.oldPosts.trim()}`);
    }
    return parts.join('\n\n');
  } catch {
    return '';
  }
}

type Message = { role: 'user' | 'assistant'; content: string };

export default function GhostwriterPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<'openrouter' | 'openai'>('openrouter');
  const [openRouterModel, setOpenRouterModel] = useState<string>(OPENROUTER_MODELS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content && messages.length === 0) return;

    const userMsg: Message = { role: 'user', content: content || 'Dis-moi par quoi tu veux commencer.' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/ghostwriter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          customKnowledge: getCustomKnowledge(),
          provider,
          openRouterModel: provider === 'openrouter' ? openRouterModel : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content || '' }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    sendMessage(input);
  };

  const handleQuickAction = (item: (typeof QUICK_ACTIONS)[number]) => {
    if (item.isReset) {
      setMessages([]);
      setError(null);
      return;
    }
    if (item.text) {
      sendMessage(item.text);
    }
  };

  const copyContent = (content: string, id: string) => {
    navigator.clipboard?.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Ghostwriter LinkedIn</h1>
        <p className="mt-1 text-neutral-600">
          Ton assistant rédactionnel. Brainstorme, écris, réécris — comme un vrai ghostwriter, à ton style.
        </p>
      </div>

      {/* Options */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-neutral-500">Modèle :</span>
        <button
          type="button"
          onClick={() => setProvider('openrouter')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${provider === 'openrouter' ? 'text-white' : 'bg-neutral-100 text-neutral-600'}`}
          style={provider === 'openrouter' ? { backgroundColor: BLUE } : undefined}
        >
          OpenRouter
        </button>
        <button
          type="button"
          onClick={() => setProvider('openai')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${provider === 'openai' ? 'text-white' : 'bg-neutral-100 text-neutral-600'}`}
          style={provider === 'openai' ? { backgroundColor: BLUE } : undefined}
        >
          OpenAI
        </button>
        {provider === 'openrouter' && (
          <select
            value={openRouterModel}
            onChange={(e) => setOpenRouterModel(String(e.target.value))}
            className="rounded-lg border border-neutral-200 px-2 py-1 text-xs"
          >
            {OPENROUTER_MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Raccourcis */}
      <div className="mb-4 flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleQuickAction(item)}
            disabled={loading}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
              item.isReset
                ? 'border border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            } disabled:opacity-50`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles size={32} className="mb-3 text-neutral-300" style={{ color: BLUE }} />
              <p className="text-sm text-neutral-500">
                Commence par décrire ton idée, ou clique sur un raccourci ci-dessus.
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                Mon style sera chargé depuis Ma base si configurée.
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-4 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  m.role === 'user'
                    ? 'rounded-br-md'
                    : 'rounded-bl-md'
                } ${
                  m.role === 'user'
                    ? 'text-white'
                    : 'bg-neutral-50 text-neutral-800'
                }`}
                style={m.role === 'user' ? { backgroundColor: BLUE } : undefined}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 whitespace-pre-wrap text-sm">{m.content}</div>
                  {m.role === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => copyContent(m.content, `msg-${i}`)}
                      className="shrink-0 rounded p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
                      title="Copier"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
                {m.role === 'assistant' && copiedId === `msg-${i}` && (
                  <span className="mt-1 block text-xs text-neutral-500">✓ Copié</span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="mb-4 flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-neutral-50 px-4 py-2.5">
                <span className="text-sm text-neutral-500">Écrit…</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {error && <p className="px-4 py-2 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="border-t border-neutral-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ton message…"
              className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: BLUE }}
            >
              <Send size={18} />
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
