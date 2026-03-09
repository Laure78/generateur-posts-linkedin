'use client';

import { Copy, Edit, Save, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export type AutopilotPost = {
  id: string;
  title: string;
  hook: string;
  content: string;
  cta: string;
  hashtags: string[];
  postType: string;
};

type PostCardProps = {
  post: AutopilotPost;
  isLoading?: boolean;
  onRegenerate?: () => void;
  onSaveToDrafts?: () => void;
  onGenerateFull?: () => void;
};

export function PostCard({
  post,
  isLoading = false,
  onRegenerate,
  onSaveToDrafts,
  onGenerateFull,
}: PostCardProps) {
  const fullText = [post.hook, post.content, post.cta, post.hashtags.join(' ')].filter(Boolean).join('\n\n');

  const handleCopy = () => {
    navigator.clipboard?.writeText(fullText);
  };

  const previewText = post.content
    ? post.content.slice(0, 150) + (post.content.length > 150 ? '…' : '')
    : post.hook || post.title;

  return (
    <Card padding="md" className="h-full">
      <div className="flex flex-col h-full">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#377CF3]/10 px-2.5 py-0.5 text-xs font-medium text-[#377CF3]">
            {post.postType}
          </span>
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isLoading}
              className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              title="Régénérer"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>
          )}
        </div>
        <h3 className="font-semibold text-neutral-800 line-clamp-2">{post.title}</h3>
        {post.hook && (
          <p className="mt-2 text-sm font-medium text-neutral-700 line-clamp-2">
            {post.hook}
          </p>
        )}
        <p className="mt-1 flex-1 text-sm text-neutral-500 line-clamp-3">
          {isLoading ? 'Génération…' : previewText}
        </p>
        {post.hashtags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {post.hashtags.slice(0, 5).map((tag) => (
              <span key={tag} className="text-xs text-neutral-400">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {onGenerateFull && !post.content && (
            <Button variant="primary" size="sm" onClick={onGenerateFull} disabled={isLoading}>
              Générer le post
            </Button>
          )}
          {post.content && (
            <>
              <Button variant="ghost" size="sm" icon={<Copy size={14} />} onClick={handleCopy}>
                Copier
              </Button>
              {onSaveToDrafts && (
                <Button variant="ghost" size="sm" icon={<Save size={14} />} onClick={onSaveToDrafts}>
                  Sauver
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
