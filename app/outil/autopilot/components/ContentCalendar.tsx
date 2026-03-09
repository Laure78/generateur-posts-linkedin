'use client';

import { Card } from '../../../components/ui/Card';
import type { AutopilotPost } from './PostCard';

type ContentCalendarProps = {
  ideas: AutopilotPost[];
};

export function ContentCalendar({ ideas }: ContentCalendarProps) {
  const postsPerWeek = Math.ceil(ideas.length / 4);
  const weeks: AutopilotPost[][] = [];
  for (let i = 0; i < ideas.length; i += postsPerWeek) {
    weeks.push(ideas.slice(i, i + postsPerWeek));
  }

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-neutral-800">
        Calendrier éditorial — 30 jours
      </h3>
      <div className="space-y-6">
        {weeks.map((weekPosts, weekIndex) => (
          <div key={weekIndex}>
            <h4 className="mb-2 text-sm font-medium text-neutral-500">
              Semaine {weekIndex + 1}
            </h4>
            <div className="space-y-2">
              {weekPosts.map((post, i) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50/50 px-4 py-3"
                >
                  <span className="shrink-0 rounded-full bg-[#377CF3]/10 px-2 py-0.5 text-xs font-medium text-[#377CF3]">
                    Post {weekIndex * postsPerWeek + i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-800">{post.title}</p>
                    <p className="text-xs text-neutral-500">{post.postType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
