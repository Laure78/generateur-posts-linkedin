'use client';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 py-12 px-6 text-center">
      <div className="mb-4 text-neutral-400">{icon}</div>
      <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
      {description && <p className="mt-2 text-sm text-neutral-500 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
