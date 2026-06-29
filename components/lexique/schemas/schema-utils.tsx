import type { ReactNode } from 'react';

export const S = {
  bleu: '#2563eb',
  bleuClair: '#377cf3',
  bleuSoft: '#dbeafe',
  navy: '#0f172a',
  gris: '#64748b',
  grisClair: '#f1f5f9',
  blanc: '#ffffff',
  bordure: '#e2e8f0',
  vert: '#059669',
  ambre: '#d97706',
} as const;

type BoiteProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  fill?: string;
  stroke?: string;
  textFill?: string;
};

export function Boite({
  x,
  y,
  w,
  h,
  label,
  sub,
  fill = S.bleuSoft,
  stroke = S.bleu,
  textFill = S.navy,
}: BoiteProps) {
  const cx = x + w / 2;
  const cy = sub ? y + h / 2 - 6 : y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textFill}
        fontSize={12}
        fontWeight={600}
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={S.gris}
          fontSize={9}
          fontFamily="system-ui, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function Fleche({
  x1,
  y1,
  x2,
  y2,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill={S.bleu} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={S.bleu}
        strokeWidth={1.5}
        markerEnd="url(#arrow)"
      />
      {label && (
        <text
          x={midX}
          y={midY - 6}
          textAnchor="middle"
          fill={S.gris}
          fontSize={8}
          fontFamily="system-ui, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function SchemaSvg({ children, viewBox }: { children: ReactNode; viewBox: string }) {
  return (
    <svg
      viewBox={viewBox}
      className="mx-auto w-full max-w-lg"
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
