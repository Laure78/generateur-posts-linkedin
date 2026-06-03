import { redirect } from 'next/navigation';

/** Outil hors périmètre MOEX — redirige vers le tableau de bord. */
export default function VerificationDtuPage() {
  redirect('/plateforme');
}
