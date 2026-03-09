'use client';

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-800 md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 text-neutral-600 max-w-2xl">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
