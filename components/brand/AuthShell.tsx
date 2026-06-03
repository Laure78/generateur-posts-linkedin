import Link from 'next/link';
import { BeWorkFooter } from './BeWorkFooter';
import { BeWorkLogo } from './BeWorkLogo';
import { AuthBeworkerBadge } from './AuthBeworkerBadge';
import { AuthResourcesTeaser } from './AuthResourcesTeaser';
import { InternalUseNotice } from './InternalUseNotice';

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Affiche le encart ressources / tutoriel (défaut : oui). */
  showResources?: boolean;
};

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  showResources = true,
}: AuthShellProps) {
  return (
    <div className="bework-blueprint-bg flex min-h-dvh flex-col">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-8 sm:py-10">
        <BeWorkLogo variant="auth" href="/" className="mx-auto w-full max-w-[300px] [&_img]:object-center" />

        <AuthBeworkerBadge />

        <InternalUseNotice variant="short" className="mt-4" />

        <div className="bework-card mt-6 p-6 shadow-md">
          <h1 className="font-display text-xl font-bold text-[var(--bework-navy)]">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>

        {showResources && <AuthResourcesTeaser />}

        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </div>

      <BeWorkFooter className="mt-auto w-full shrink-0 border-t border-slate-200/80" />
    </div>
  );
}

export function AuthFooterLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className="font-medium text-[var(--bework-blue)] hover:underline">
      {children}
    </Link>
  );
}
