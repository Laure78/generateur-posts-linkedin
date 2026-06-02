import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LEGAL, formatSiretDisplay } from '@/lib/bework/legal';
import { BEWORK } from '@/lib/bework/config';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site et de la plateforme BeWork.',
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  const { editor, hosting } = LEGAL;

  return (
    <LegalPageShell title="Mentions légales">
      <section>
        <h2>1. Éditeur du site</h2>
        <p>
          Le site <strong>{LEGAL.siteUrl}</strong> et la plateforme <strong>{BEWORK.name}</strong> sont édités par :
        </p>
        <ul>
          <li>
            <strong>{editor.name}</strong> — {editor.legalForm}
          </li>
          <li>Marque exploitée : {editor.tradeName}</li>
          <li>Siège / adresse : {editor.address}</li>
          <li>SIRET : {formatSiretDisplay(editor.siret)}</li>
          {editor.rcs && <li>RCS : {editor.rcs}</li>}
          {editor.vatNumber && <li>N° TVA intracommunautaire : {editor.vatNumber}</li>}
          <li>
            Contact :{' '}
            <a href={`mailto:${editor.email}`}>{editor.email}</a>
            {editor.phone && <> — {editor.phone}</>}
          </li>
          <li>Directeur de la publication : {editor.publicationDirector}</li>
        </ul>
      </section>

      <section>
        <h2>2. Hébergement</h2>
        <p>L’application est hébergée par :</p>
        <ul>
          <li>
            <strong>{hosting.name}</strong>
          </li>
          <li>{hosting.address}</li>
          <li>
            <a href={hosting.website} target="_blank" rel="noopener noreferrer">
              {hosting.website}
            </a>
          </li>
        </ul>
        <p>
          Les données métier (comptes, demandes) peuvent être stockées via{' '}
          <strong>Supabase</strong> (base de données et authentification), selon la configuration du projet.
        </p>
      </section>

      <section>
        <h2>3. Objet du service</h2>
        <p>
          {BEWORK.name} est un <strong>relais administratif</strong> à destination des entreprises du BTP et des
          bureaux de maîtrise d&apos;œuvre : préparation de documents, synthèses et assistants IA spécialisés,
          avec <strong>validation humaine</strong> par le client avant toute utilisation opérationnelle ou diffusion.
        </p>
        <p>
          {BEWORK.name} ne se substitue pas à un bureau d&apos;études, à un architecte, à un MOE titulaire de
          marché, ni à un conseil juridique. Les livrables générés doivent être relus et validés par vos équipes.
        </p>
      </section>

      <section>
        <h2>4. Propriété intellectuelle</h2>
        <p>
          L’ensemble des éléments du site (textes, graphismes, logo, structure, logiciels) est protégé par le droit
          de la propriété intellectuelle. Toute reproduction non autorisée est interdite.
        </p>
        <p>
          Les contenus que vous déposez (briefs, pièces, notes de chantier) restent votre propriété. Vous accordez à
          l&apos;éditeur une licence limitée de traitement aux seules fins d&apos;exécution de la demande.
        </p>
      </section>

      <section>
        <h2>5. Signalement de contenu illicite</h2>
        <p>
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN),
          vous pouvez signaler tout contenu illicite à{' '}
          <a href={`mailto:${editor.email}`}>{editor.email}</a>, en précisant l&apos;URL concernée et les motifs du
          signalement.
        </p>
      </section>

      <section>
        <h2>6. Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers (ex. site vitrine {LEGAL.vitrineUrl}). L&apos;éditeur
          n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </section>

      <section>
        <h2>7. Droit applicable</h2>
        <p>
          Les présentes mentions sont régies par le droit français. En cas de litige, et à défaut de résolution
          amiable, les tribunaux français seront seuls compétents, sous réserve des dispositions légales impératives.
        </p>
      </section>
    </LegalPageShell>
  );
}
