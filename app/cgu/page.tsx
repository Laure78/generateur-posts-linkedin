import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LEGAL } from '@/lib/bework/legal';
import { BEWORK } from '@/lib/bework/config';

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "CGU de la plateforme BeWork — accès, compte, assistants IA, responsabilités.",
  robots: { index: true, follow: true },
};

export default function CguPage() {
  return (
    <LegalPageShell title="Conditions générales d'utilisation (CGU)">
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;usage de la
          plateforme <strong>{BEWORK.name}</strong> ({LEGAL.siteUrl}), service de relais administratif pour les
          marchés travaux BTP et la maîtrise d&apos;œuvre.
        </p>
        <p>
          En créant un compte ou en utilisant la plateforme, vous acceptez sans réserve les CGU, la{' '}
          <a href="/politique-confidentialite">politique de confidentialité</a> et, le cas échéant, les{' '}
          <a href="/cgv">conditions générales de vente (CGV)</a>.
        </p>
      </section>

      <section>
        <h2>2. Compte utilisateur</h2>
        <ul>
          <li>
            L&apos;accès est réservé aux <strong>professionnels</strong> (entreprises, artisans, bureaux MOE, etc.).
          </li>
          <li>
            Vous vous engagez à fournir des informations exactes (identité, société, e-mail professionnel) et à
            maintenir la confidentialité de vos identifiants.
          </li>
          <li>
            Toute activité réalisée depuis votre compte est réputée effectuée par vous ou sous votre
            responsabilité.
          </li>
          <li>
            L&apos;éditeur peut suspendre ou clôturer un compte en cas de manquement aux CGU, de fraude ou de risque
            pour la sécurité du service.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Description du service</h2>
        <p>La plateforme permet notamment de :</p>
        <ul>
          <li>déposer des demandes administratives ou techniques (CR chantier, courriers, analyses, etc.) ;</li>
          <li>bénéficier d&apos;assistants IA configurés par métier (skills) ;</li>
          <li>télécharger des livrables dans les formats proposés (Word, PDF, Excel, PowerPoint, etc.) ;</li>
          <li>utiliser certains outils intégrés (ex. vérification DTU × devis).</li>
        </ul>
        <p>
          Le traitement peut s&apos;appuyer sur des modèles d&apos;intelligence artificielle. Les résultats sont des{' '}
          <strong>brouillons ou aides à la rédaction</strong> : vous restez seul responsable de la validation, de la
          conformité réglementaire et de la diffusion de tout document sur chantier ou auprès des tiers.
        </p>
      </section>

      <section>
        <h2>4. Charte des skills et formats</h2>
        <p>
          Lors du dépôt d&apos;une demande, vous pouvez choisir d&apos;appliquer la <strong>charte du skill</strong>{' '}
          (structure, mentions, modèles propriétaires du client ou du partenaire métier) ou un mode neutre BeWork.
          Vous êtes responsable du choix effectué et de l&apos;adéquation du livrable à votre marché et à vos
          obligations contractuelles.
        </p>
      </section>

      <section>
        <h2>5. Obligations de l&apos;utilisateur</h2>
        <ul>
          <li>Ne pas déposer de données illicites, diffamatoires ou portant atteinte aux droits de tiers.</li>
          <li>
            Ne pas tenter d&apos;accéder aux systèmes, comptes ou données d&apos;autres utilisateurs.
          </li>
          <li>
            Ne pas utiliser le service pour contourner la réglementation du BTP, la propriété intellectuelle (DTU,
            normes) ou les secrets d&apos;affaires.
          </li>
          <li>
            Vérifier systématiquement les livrables avant envoi aux entreprises, au maître d&apos;ouvrage ou aux
            autorités.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Propriété intellectuelle</h2>
        <p>
          La plateforme, ses interfaces et ses logiciels restent la propriété de l&apos;éditeur ou de ses
          concédants. Vous conservez vos contenus sources ; les livrables générés vous sont destinés pour votre usage
          professionnel interne, sous réserve des droits des tiers (chartes, logos, modèles).
        </p>
      </section>

      <section>
        <h2>7. Disponibilité et évolution</h2>
        <p>
          Le service est fourni « en l&apos;état ». L&apos;éditeur s&apos;efforce d&apos;assurer une disponibilité
          raisonnable mais ne garantit pas l&apos;absence d&apos;interruption (maintenance, hébergement, tiers).
        </p>
        <p>
          Les fonctionnalités, assistants et tarifs peuvent évoluer ; les utilisateurs seront informés des
          modifications substantielles des CGU.
        </p>
      </section>

      <section>
        <h2>8. Limitation de responsabilité</h2>
        <p>
          Dans les limites autorisées par la loi, l&apos;éditeur ne saurait être tenu responsable des dommages
          indirects (perte d&apos;exploitation, retard de chantier, pénalités de marché) résultant de l&apos;usage
          des livrables non relus ou d&apos;une mauvaise interprétation des sorties IA.
        </p>
        <p>
          Aucune disposition des CGU ne limite la responsabilité en cas de faute lourde, de dol ou de dommages
          corporels.
        </p>
      </section>

      <section>
        <h2>9. Données personnelles</h2>
        <p>
          Le traitement des données est décrit dans la{' '}
          <a href="/politique-confidentialite">politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2>10. Droit applicable — litiges</h2>
        <p>
          Les CGU sont soumises au <strong>droit français</strong>. En cas de litige entre professionnels, les
          parties rechercheront une solution amiable avant toute action judiciaire. À défaut, les tribunaux du ressort
          du siège de l&apos;éditeur seront compétents, sauf règle impérative contraire.
        </p>
        <p>
          Contact : <a href={`mailto:${LEGAL.editor.email}`}>{LEGAL.editor.email}</a>
        </p>
      </section>
    </LegalPageShell>
  );
}
