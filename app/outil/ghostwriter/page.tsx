'use client';

import { useState, useRef, useEffect } from 'react';
import { Copy, Send, Sparkles, X, Lock, FileText, Plus } from 'lucide-react';
import { OPENROUTER_MODELS } from '../../../lib/aiProvider';

const BLUE = '#377CF3';
const STORAGE_KEY = 'createur_knowledge_base';
const MEMORY_KEY = 'ghostwriter_memory';
const ASSISTANT_CONFIG_KEY = 'ghostwriter_assistant_config';

type Attachment = { id: string; name: string; content: string };

type AssistantConfig = { instructions: string; projectMemory: string };

function loadAssistantConfig(): AssistantConfig {
  if (typeof window === 'undefined') return { instructions: '', projectMemory: '' };
  try {
    const raw = localStorage.getItem(ASSISTANT_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AssistantConfig;
      return {
        instructions: typeof parsed?.instructions === 'string' ? parsed.instructions : '',
        projectMemory: typeof parsed?.projectMemory === 'string' ? parsed.projectMemory : '',
      };
    }
  } catch {
    // ignore
  }
  return { instructions: '', projectMemory: '' };
}

function saveAssistantConfig(config: AssistantConfig) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ASSISTANT_CONFIG_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

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

function loadMemory(): { messages: Message[]; attachments: Attachment[] } {
  if (typeof window === 'undefined') return { messages: [], attachments: [] };
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { messages?: Message[]; attachments?: Attachment[] };
      return {
        messages: Array.isArray(parsed?.messages) ? parsed.messages : [],
        attachments: Array.isArray(parsed?.attachments) ? parsed.attachments : [],
      };
    }
  } catch {
    // ignore
  }
  return { messages: [], attachments: [] };
}

function saveMemory(messages: Message[], attachments: Attachment[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify({ messages, attachments }));
  } catch {
    // ignore
  }
}

export default function GhostwriterPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<'openrouter' | 'openai'>('openrouter');
  const [openRouterModel, setOpenRouterModel] = useState<string>(OPENROUTER_MODELS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [instructions, setInstructions] = useState('');
  const [projectMemory, setProjectMemory] = useState('');
  const [configPanelOpen, setConfigPanelOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { messages: m, attachments: a } = loadMemory();
    const config = loadAssistantConfig();
    setMessages(m);
    setAttachments(a);
    setInstructions(config.instructions);
    setProjectMemory(config.projectMemory);
  }, []);

  useEffect(() => {
    saveMemory(messages, attachments);
  }, [messages, attachments]);

  useEffect(() => {
    saveAssistantConfig({ instructions, projectMemory });
  }, [instructions, projectMemory]);

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
      const attachmentsContext = attachments.length > 0
        ? attachments.map((a) => `[${a.name}]\n${a.content}`).join('\n\n---\n\n')
        : '';
      const res = await fetch('/api/ghostwriter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          customKnowledge: getCustomKnowledge(),
          attachmentsContext,
          customInstructions: instructions.trim(),
          projectMemory: projectMemory.trim(),
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
      setAttachments([]);
      setError(null);
      return;
    }
    if (item.text) {
      sendMessage(item.text);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/extract-file-text', { method: 'POST', body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erreur extraction');
        const text = data.text || '';
        if (text && text !== '(fichier vide)' && text !== '(aucun texte extrait)') {
          setAttachments((prev) => [...prev, {
            id: crypto.randomUUID(),
            name: file.name,
            content: text.slice(0, 15000),
          }]);
        } else {
          setError(`Impossible d'extraire le texte de ${file.name}`);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const copyContent = (content: string, id: string) => {
    navigator.clipboard?.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row">
      {/* Zone principale : chat */}
      <div className="min-w-0 flex-1">
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
                Configure ton assistant (instructions, mémoire, fichiers) dans le panneau à droite.
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

      {/* Panneau de configuration assistant */}
      <div
        className={`w-full shrink-0 rounded-2xl border border-neutral-200 bg-white shadow-sm lg:w-80 ${
          configPanelOpen ? '' : 'hidden'
        }`}
      >
        <div className="border-b border-neutral-200 p-3">
          <h2 className="text-sm font-semibold text-neutral-800">Paramètres de l'assistant</h2>
          <button
            type="button"
            onClick={() => setConfigPanelOpen(false)}
            className="mt-1 text-xs text-neutral-500 hover:text-neutral-700"
          >
            Masquer le panneau
          </button>
        </div>
        <div className="space-y-4 p-4">
          {/* Mémoire */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Lock size={14} className="text-neutral-400" />
              <h3 className="text-xs font-semibold text-neutral-700">Mémoire</h3>
            </div>
            <p className="mb-2 text-xs text-neutral-500">
              Contexte et préférences à mémoriser entre les conversations.
            </p>
            <textarea
              value={projectMemory}
              onChange={(e) => setProjectMemory(e.target.value)}
              placeholder="Ex : Je suis expert RH, je parle toujours au « vous ». J'évite le jargon..."
              rows={3}
              className="w-full resize-y rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
          </div>

          {/* Instructions */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-semibold text-neutral-700">Instructions</h3>
              <Plus size={12} className="text-neutral-400" />
            </div>
            <p className="mb-2 text-xs text-neutral-500">
              Personnalise les réponses de l'assistant selon tes besoins.
            </p>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ex : Toujours proposer une version courte et une longue. Utiliser des emojis modérément..."
              rows={3}
              className="w-full resize-y rounded-lg border border-neutral-200 px-3 py-2 text-xs text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
          </div>

          {/* Fichiers (base de connaissances) */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-semibold text-neutral-700">Fichiers</h3>
              <FileText size={12} className="text-neutral-400" />
            </div>
            <p className="mb-2 text-xs text-neutral-500">
              PDF, documents ou textes à utiliser comme références pour les réponses.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.pdf,.doc,.docx,.csv,.json,.html,.htm,.xml"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-50 disabled:opacity-50"
            >
              <Plus size={14} />
              {uploading ? 'Extraction…' : 'Ajouter des fichiers'}
            </button>
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachments.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg bg-neutral-50 px-2 py-1.5 text-xs"
                  >
                    <span className="max-w-[160px] truncate text-neutral-700" title={a.name}>
                      {a.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(a.id)}
                      className="rounded p-0.5 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
                      title="Retirer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {!configPanelOpen && (
        <button
          type="button"
          onClick={() => setConfigPanelOpen(true)}
          className="fixed right-6 top-24 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm hover:bg-neutral-50"
        >
          Paramètres assistant
        </button>
      )}
    </div>
  );
}
