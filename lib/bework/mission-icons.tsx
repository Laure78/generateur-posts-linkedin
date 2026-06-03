import type { LucideIcon } from 'lucide-react';
import {
  ClipboardList,
  FileText,
  ListTodo,
  Mail,
  CircleCheckBig,
  FilePen,
  Layers,
  Scale,
  ShieldCheck,
  Receipt,
  Home,
  MessageSquareMore,
} from 'lucide-react';
import type { MoexMissionTypeId } from './moex-platform';

const ICONS: Record<MoexMissionTypeId, LucideIcon> = {
  'cr-chantier-3dm': FileText,
  'cr-chantier-moex': ClipboardList,
  'suivi-observations': ListTodo,
  'courrier-moe': Mail,
  'pv-reserves': CircleCheckBig,
  'ordre-service': FilePen,
  'analyse-dce-moex': Layers,
  'comparatif-offres': Scale,
  'conformite-offre': ShieldCheck,
  'situation-travaux': Receipt,
  'suivi-acquereurs': Home,
  autre: MessageSquareMore,
};

export function getMissionIcon(missionTypeId: string): LucideIcon {
  return ICONS[missionTypeId as MoexMissionTypeId] ?? MessageSquareMore;
}

export type MissionIconProps = {
  missionTypeId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZES = {
  sm: { box: 'h-9 w-9', icon: 18 },
  md: { box: 'h-11 w-11', icon: 22 },
  lg: { box: 'h-12 w-12', icon: 24 },
} as const;

/** Icône assistant MOEX — style moderne, bleu BeWork. */
export function MissionIcon({ missionTypeId, size = 'md', className = '' }: MissionIconProps) {
  const IconComponent = getMissionIcon(missionTypeId);
  const s = SIZES[size];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--bework-blue-soft)] to-white text-[var(--bework-blue)] ring-1 ring-[var(--bework-blue)]/15 ${s.box} ${className}`}
      aria-hidden
    >
      <IconComponent size={s.icon} strokeWidth={2} />
    </span>
  );
}
