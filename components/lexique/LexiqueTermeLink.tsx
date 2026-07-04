import Link from 'next/link';
import { LEXIQUE } from '@/data/lexique-btp';

type Props = {
  id: string;
  className?: string;
};

/** Lien vers la fiche du terme dans l'onglet Lexique (?mode=dictionnaire&terme=…). */
export function LexiqueTermeLink({ id, className }: Props) {
  const terme = LEXIQUE.find((t) => t.id === id);
  if (!terme) return null;

  return (
    <Link
      href={`/lexique?mode=dictionnaire&terme=${encodeURIComponent(id)}`}
      className={
        className ??
        'inline-flex items-center rounded-md bg-bework-blue-soft px-2 py-0.5 text-xs font-medium text-bework-blue transition-colors hover:bg-bework-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bework-blue'
      }
    >
      {terme.terme}
    </Link>
  );
}
