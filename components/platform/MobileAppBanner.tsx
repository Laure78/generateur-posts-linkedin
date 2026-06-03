import { Smartphone } from 'lucide-react';

/** Encart installation app mobile (Expo) — visible sur le tableau de bord. */
export function MobileAppBanner() {
  return (
    <div className="bework-card mt-6 flex flex-wrap items-start gap-3 border-blue-100 bg-blue-50/60 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--bework-blue)]">
        <Smartphone size={20} aria-hidden />
      </span>
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-semibold text-slate-900">Application mobile BeWork</p>
        <p className="mt-1 leading-relaxed text-slate-600">
          Installez l&apos;app iOS/Android (Expo) pour créer des demandes et valider les livrables depuis le
          chantier. Guide : dossier <code className="text-xs">mobile/README.md</code> du projet.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Sur iPhone : vous pouvez aussi ajouter le site à l&apos;écran d&apos;accueil (PWA) via Safari → Partager.
        </p>
      </div>
    </div>
  );
}
