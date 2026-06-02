import Image from 'next/image';
import Link from 'next/link';
import { BEWORK } from '@/lib/bework/config';

const LOGO_SRC = BEWORK.logo;
/** Dimensions source officielles (PNG blueprint BeWork). */
const LOGO_ASPECT = 786 / 328;

type BeWorkLogoProps = {
  variant?: 'full' | 'sidebar' | 'auth' | 'header';
  href?: string;
  className?: string;
  /** Le logo officiel inclut déjà la tagline — désactivé par défaut. */
  showTagline?: boolean;
};

function logoHeight(width: number) {
  return Math.round(width / LOGO_ASPECT);
}

const SIZES = {
  header: { width: 220, height: logoHeight(220) },
  sidebar: { width: 210, height: logoHeight(210) },
  auth: { width: 320, height: logoHeight(320) },
  full: { width: 360, height: logoHeight(360) },
} as const;

export function BeWorkLogo({
  variant = 'full',
  href = '/',
  className = '',
  showTagline = false,
}: BeWorkLogoProps) {
  const { width, height } = SIZES[variant];

  const content = (
    <div className={`flex flex-col ${className}`}>
      <Image
        src={LOGO_SRC}
        alt={`${BEWORK.name} — ${BEWORK.brandTagline}`}
        width={width}
        height={height}
        className="h-auto max-w-full object-contain object-left"
        style={{ width, maxWidth: '100%' }}
        priority={variant === 'auth' || variant === 'header'}
      />
      {showTagline && (
        <p className="mt-2 text-xs font-medium tracking-wide text-slate-500">{BEWORK.brandTagline}</p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block max-w-full transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
