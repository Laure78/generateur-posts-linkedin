'use client';

import { useState } from 'react';

interface PostPreviewProps {
  content: string;
  authorName?: string;
  authorTitle?: string;
  className?: string;
}

export default function PostPreview({ content, authorName = 'Laure Olivié', authorTitle = 'Formatrice IA BTP', className = '' }: PostPreviewProps) {
  const [view, setView] = useState<'mobile' | 'desktop'>('desktop');

  return (
    <div className={className}>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setView('desktop')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            view === 'desktop' ? 'bg-[#377CF3] text-white' : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          💻 Desktop
        </button>
        <button
          type="button"
          onClick={() => setView('mobile')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            view === 'mobile' ? 'bg-[#377CF3] text-white' : 'bg-neutral-100 text-neutral-600'
          }`}
        >
          📱 Mobile
        </button>
      </div>

      <div
        className={`overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm ${
          view === 'mobile' ? 'max-w-[360px]' : 'max-w-[550px]'
        }`}
      >
        {/* En-tête LinkedIn */}
        <div className="flex items-center gap-3 border-b border-neutral-100 p-4">
          <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-[#4d8bf7] to-[#377CF3]" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-neutral-900">{authorName}</p>
            <p className="truncate text-sm text-neutral-500">{authorTitle}</p>
          </div>
          <span className="text-xl text-neutral-400">⋯</span>
        </div>

        {/* Contenu du post */}
        <div className={`p-4 ${view === 'mobile' ? 'text-sm' : 'text-[15px]'}`}>
          <div className="whitespace-pre-wrap text-neutral-800 leading-relaxed">{content}</div>
        </div>

        {/* Barre d'engagement LinkedIn */}
        <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-2 text-neutral-500">
          <span className="text-xs">👍 J'aime</span>
          <span className="text-xs">💬 Commenter</span>
          <span className="text-xs">↗️ Répartager</span>
          <span className="text-xs">➤ Envoyer</span>
        </div>
      </div>
    </div>
  );
}
