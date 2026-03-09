'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
};

const VARIANTS = {
  primary: 'bg-[#377CF3] text-white hover:bg-[#2d6ad4]',
  secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
  ghost: 'text-neutral-600 hover:bg-neutral-100',
  outline: 'border-2 border-[#377CF3] text-[#377CF3] bg-white hover:bg-[#377CF3]/5',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] md:min-h-0 touch-manipulation ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
