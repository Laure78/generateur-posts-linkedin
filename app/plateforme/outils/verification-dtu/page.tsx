import { redirect } from 'next/navigation';

/** Outil hors catalogue courant — redirige vers le tableau de bord. */
export default function VerificationDtuPage() {
  redirect('/plateforme');
}
