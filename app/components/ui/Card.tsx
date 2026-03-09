'use client';

type CardProps = React.PropsWithChildren<{
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}>;

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className = '', padding = 'md', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow ${PADDING[padding]} ${
        hover ? 'hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
      <div>
        <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
        {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
