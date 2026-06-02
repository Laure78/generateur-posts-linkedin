import Link from 'next/link';
import { VerificationDtuBeworkTool } from '@/components/dtu-verification/VerificationDtuBeworkTool';

export default function VerificationDtuPage() {
  return (
    <div className="p-8">
      <Link href="/plateforme" className="text-sm text-[var(--bework-blue)] hover:underline">
        ← Tableau de bord
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold">Vérification DTU × devis</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Rapprochez chaque ligne de devis du DTU applicable. Rapport Word aux couleurs BeWork — sans reproduire le texte
        officiel AFNOR.
      </p>
      <div className="mt-8">
        <VerificationDtuBeworkTool />
      </div>
    </div>
  );
}
