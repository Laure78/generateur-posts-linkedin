import Link from 'next/link';
import { BeWorkLogo } from './BeWorkLogo';

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="bework-blueprint-bg min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10">
        <BeWorkLogo variant="auth" href="/" className="mx-auto items-center [&_img]:object-center" showTagline />

        <div className="bework-card mt-8 p-6 shadow-md">
          <h1 className="font-display text-xl font-bold text-[var(--bework-navy)]">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>

        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </div>
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
