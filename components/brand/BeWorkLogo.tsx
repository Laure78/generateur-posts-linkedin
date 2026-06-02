import Image from 'next/image';
import Link from 'next/link';
import { BEWORK } from '@/lib/bework/config';

type BeWorkLogoProps = {
  variant?: 'full' | 'sidebar' | 'auth' | 'header';
  href?: string;
  className?: string;
  showTagline?: boolean;
};

const SIZES = {
  full: { width: 280, height: 72, src: '/images/bework-logo.png' },
  sidebar: { width: 200, height: 52, src: '/images/bework-logo.png' },
  auth: { width: 260, height: 68, src: '/images/bework-logo-blueprint.png' },
  header: { width: 180, height: 48, src: '/images/bework-logo.png' },
} as const;

export function BeWorkLogo({
  variant = 'full',
  href = '/',
  className = '',
  showTagline = variant === 'sidebar' || variant === 'auth',
}: BeWorkLogoProps) {
  const { width, height, src } = SIZES[variant];

  const content = (
    <div className={`flex flex-col ${className}`}>
      <Image
        src={src}
        alt={`${BEWORK.name} — ${BEWORK.brandTagline}`}
        width={width}
        height={height}
        className="h-auto w-auto max-w-full object-contain object-left"
        priority={variant === 'auth' || variant === 'header'}
      />
      {showTagline && (
        <p className="mt-2 text-xs font-medium tracking-wide text-slate-500">{BEWORK.brandTagline}</p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
