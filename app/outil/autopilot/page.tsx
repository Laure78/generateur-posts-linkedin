'use client';

import { useState } from 'react';
import { useTeam } from '@/lib/TeamContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { AutopilotForm, type AutopilotProfile, type AutopilotPreferences } from './components/AutopilotForm';
import { ContentCalendar } from './components/ContentCalendar';
import { PostCard, type AutopilotPost } from './components/PostCard';
import { FileText } from 'lucide-react';

const BLUE = '#377CF3';
const STEPS = ['Profil', 'Préférences', 'Stratégie', 'Posts', 'Résultats'];

export default function AutopilotPage() {
  const { canCreate } = useTeam();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<AutopilotProfile>({
    sector: 'BTP',
    targetClient: 'artisans',
    goal: 'find_clients',
  });
  const [preferences, setPreferences] = useState<AutopilotPreferences>({
    frequency: '3',
    style: 'storytelling',
    topics: [],
  });
  const [ideas, setIdeas] = useState<AutopilotPost[]>([]);
  const [strategyLoading, setStrategyLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 5;

  const handleGenerateStrategy = async () => {
    setError(null);
    setStrategyLoading(true);
    try {
      const res = await fetch('/api/autopilot-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector: profile.sector,
          targetClient: profile.targetClient,
          goal: profile.goal,
          frequency: preferences.frequency,
          style: preferences.style,
          topics: preferences.topics,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      const list = (data.ideas || []).map((e: AutopilotPost & { id?: number }) => ({
        ...e,
        id: String(e.id ?? crypto.randomUUID()),
        content: '',
        cta: '',
        hashtags: e.hashtags || [],
      }));
      setIdeas(list);
      setStep(4);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setStrategyLoading(false);
    }
  };

  const handleGeneratePost = async (post: AutopilotPost) => {
    setPostsLoading((prev) => ({ ...prev, [post.id]: true }));
    setError(null);
    try {
      const res = await fetch('/api/autopilot-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          hook: post.hook,
          postType: post.postType,
          sector: profile.sector,
          targetClient: profile.targetClient,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setIdeas((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? {
                ...p,
                hook: data.hook || p.hook,
                content: data.content || '',
                cta: data.cta || '',
                hashtags: data.hashtags || [],
              }
            : p
        )
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setPostsLoading((prev) => ({ ...prev, [post.id]: false }));
    }
  };

  const handleRegenerateIdea = async (post: AutopilotPost) => {
    await handleGeneratePost(post);
  };

  const handleSaveToDrafts = (post: AutopilotPost) => {
    const fullText = [post.hook, post.content, post.cta, post.hashtags.join(' ')].filter(Boolean).join('\n\n');
    try {
      const raw = localStorage.getItem('createur_posts');
      const posts = raw ? JSON.parse(raw) : [];
      posts.unshift({
        id: crypto.randomUUID(),
        title: post.title,
        content: fullText,
        status: 'brouillon',
        label: 'Instructif',
        date: new Date().toISOString().slice(0, 10),
        favorite: false,
        hasMedia: false,
      });
      localStorage.setItem('createur_posts', JSON.stringify(posts));
    } catch {}
  };

  const handleExport = (format: 'linkedin' | 'csv' | 'notion' | 'pdf') => {
    if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const content = ideas
          .map(
            (p) =>
              `<h3>${p.title}</h3><p><strong>Type:</strong> ${p.postType}</p><p>${(p.hook + '\n\n' + p.content + '\n\n' + p.cta).replace(/\n/g, '<br>')}</p><p>${p.hashtags.join(' ')}</p><hr>`
          )
          .join('');
        printWindow.document.write(`
          <!DOCTYPE html><html><head><title>Autopilot Content</title></head>
          <body style="font-family:sans-serif;padding:24px;max-width:800px">${content}</body></html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
      return;
    }
    const lines = ideas.map((p) => {
      const full = [p.hook, p.content, p.cta].filter(Boolean).join('\n\n') + '\n' + (p.hashtags.join(' ') || '');
      if (format === 'csv') {
        return `"${p.title}","${p.postType}","${(p.hook + ' ' + p.content).replace(/"/g, '""')}","${(p.cta || '').replace(/"/g, '""')}","${p.hashtags.join(', ')}"`;
      }
      if (format === 'notion') {
        return `## ${p.title}\n**Type:** ${p.postType}\n\n${full}\n\n---`;
      }
      return full;
    });
    const content = format === 'csv'
      ? 'title,postType,content,cta,hashtags\n' + lines.join('\n')
      : lines.join('\n\n==========\n\n');
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autopilot-content-${format}-${new Date().toISOString().slice(0, 10)}.${format === 'csv' ? 'csv' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeader
        title="Autopilot LinkedIn"
        description="Génère un mois de contenu LinkedIn automatiquement. Définis ton profil, tes préférences et laisse l'IA créer ta stratégie."
      />

      {/* Step indicator */}
      <div className="mb-8 flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(i + 1)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              step === i + 1
                ? 'bg-[#377CF3] text-white'
                : 'border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step 1 & 2: Form */}
      {step === 1 && (
        <Card>
          <AutopilotForm
            step={1}
            profile={profile}
            preferences={preferences}
            onProfileChange={(p) => setProfile((prev) => ({ ...prev, ...p }))}
            onPreferencesChange={(p) => setPreferences((prev) => ({ ...prev, ...p }))}
          />
          <div className="mt-8 flex gap-4">
            <Button variant="primary" onClick={() => setStep(2)}>
              Continuer →
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <AutopilotForm
            step={2}
            profile={profile}
            preferences={preferences}
            onProfileChange={(p) => setProfile((prev) => ({ ...prev, ...p }))}
            onPreferencesChange={(p) => setPreferences((prev) => ({ ...prev, ...p }))}
          />
          <div className="mt-8 flex gap-4">
            <Button variant="secondary" onClick={() => setStep(1)}>
              ← Retour
            </Button>
            <Button variant="primary" onClick={() => setStep(3)}>
              Générer la stratégie →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Generate strategy */}
      {step === 3 && (
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-neutral-800">
            Générer ta stratégie
          </h3>
          <p className="mb-6 text-sm text-neutral-600">
            L'IA va créer {preferences.frequency === '2' ? 8 : preferences.frequency === '5' ? 20 : 12} idées de
            posts adaptés à ton profil.
          </p>
          <Button
            variant="primary"
            onClick={handleGenerateStrategy}
            disabled={strategyLoading || !canCreate}
            icon={strategyLoading ? undefined : <FileText size={18} />}
          >
            {strategyLoading ? 'Génération…' : 'Générer la stratégie'}
          </Button>
        </Card>
      )}

      {/* Step 4 & 5: Results */}
      {(step === 4 || step === 5) && ideas.length > 0 && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-neutral-800">
              Tes {ideas.length} posts
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('linkedin')}
              >
                Export TXT
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('csv')}
              >
                Export CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('notion')}
              >
                Export Notion
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
              >
                Export PDF
              </Button>
            </div>
          </div>

          <ContentCalendar ideas={ideas} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isLoading={postsLoading[post.id]}
                onRegenerate={() => handleRegenerateIdea(post)}
                onSaveToDrafts={() => handleSaveToDrafts(post)}
                onGenerateFull={!post.content && canCreate ? () => handleGeneratePost(post) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      {step > 2 && step < 4 && ideas.length === 0 && (
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-neutral-800">
            Prêt à générer
          </h3>
          <p className="mb-6 text-sm text-neutral-600">
            Tu as défini ton profil et tes préférences. Clique pour lancer la génération.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setStep(2)}>
              Retour
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
            >
              Générer la stratégie
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
