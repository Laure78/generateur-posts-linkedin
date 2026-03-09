'use client';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-200 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <Skeleton className="mb-4 h-4 w-1/3" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}
