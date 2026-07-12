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
  CalendarDays,
  FolderOpen,
  Send,
  BookOpen,
  TableProperties,
  Calculator,
  Landmark,
  Shield,
  FileCheck,
  Phone,
  Presentation,
  FileSignature,
  Users,
  BadgeCheck,
  Wallet,
  Search,
  HardHat,
  Archive,
  BarChart3,
  FlaskConical,
  Network,
  FileSpreadsheet,
} from 'lucide-react';
import type { MoexMissionTypeId } from './moex-platform';

const ICONS: Partial<Record<MoexMissionTypeId, LucideIcon>> = {
  'cr-chantier-3dm': FileText,
  'cr-chantier-moex': ClipboardList,
  'suivi-observations': ListTodo,
  'ordre-du-jour-reunions': CalendarDays,
  'diffusion-cr-ged': Send,
  'courrier-moe': Mail,
  'registre-plans-exe': BookOpen,
  'reservations-reseaux': Network,
  'ordre-service': FilePen,
  'pieces-ecrites-dce': Layers,
  'tableau-dpgf': TableProperties,
  'comparatif-offres': Scale,
  'relances-consultation': Mail,
  'analyse-dce-moex': Layers,
  'conformite-offre': ShieldCheck,
  'memoire-technique-ao': FileSpreadsheet,
  'situation-travaux': Receipt,
  'tableau-financier-affaire': Calculator,
  'decompte-general-definitif': Landmark,
  'cautions-retenues': Wallet,
  'pv-reserves': CircleCheckBig,
  'suivi-levees-reserves': FileCheck,
  'relances-gpa-sav': Mail,
  'constitution-doe': FolderOpen,
  'suivi-acquereurs': Home,
  'trames-iso9001': FileText,
  'ged-archivage': Archive,
  'reporting-projet': BarChart3,
  'agenda-convocations': CalendarDays,
  'veille-appels-offres': Search,
  'dossier-candidature': FileSignature,
  'controle-attestations-entreprises': BadgeCheck,
  'dossier-intervention': HardHat,
  'essais-beton-proctor': FlaskConical,
  'ppsps-plan-prevention': Shield,
  'accueil-telephonique': Phone,
  'presentations-clients': Presentation,
  'dc4-sous-traitance': FileSignature,
  'controle-pieces-sous-traitant': BadgeCheck,
  'agrement-sous-traitance': Send,
  'paiement-direct-delegation': Wallet,
  'vigilance-urssaf-semestrielle': ShieldCheck,
  'registre-sous-traitants': Users,
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

/** Icône assistant BeWork — style moderne, bleu BeWork. */
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
