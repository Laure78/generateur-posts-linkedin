import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LEGAL } from '@/lib/bework/legal';
import { NOINDEX_FOLLOW } from '@/lib/bework/seo';

export const metadata: Metadata = {
  title: 'Politique cookies',
  description: 'Utilisation des cookies et traceurs sur BeWork.',
  ...NOINDEX_FOLLOW,
};

export default function CookiesPage() {
  return (
    <LegalPageShell title="Politique cookies">
      <section>
        <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier déposé sur votre terminal lors de la visite d&apos;un site. Il permet de
          mémoriser des informations (session, préférences) ou de mesurer l&apos;audience.
        </p>
      </section>

      <section>
        <h2>2. Cookies utilisés sur BeWork</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Finalité</th>
              <th>Durée indicative</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Strictement nécessaires</strong>
              </td>
              <td>
                Authentification (session Supabase / jetons), sécurité, maintien de la connexion à la plateforme
              </td>
              <td>Session ou selon fournisseur auth</td>
            </tr>
            <tr>
              <td>
                <strong>Fonctionnels</strong>
              </td>
              <td>Mémorisation de préférences d&apos;interface (le cas échéant)</td>
              <td>12 mois max.</td>
            </tr>
            <tr>
              <td>
                <strong>Mesure d&apos;audience</strong>
              </td>
              <td>
                Non activés par défaut sur la plateforme. Si un outil d&apos;analytics est ajouté ultérieurement,
                votre consentement sera recueilli lorsque requis.
              </td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>3. Consentement</h2>
        <p>
          Les cookies strictement nécessaires au fonctionnement du service ne requièrent pas de consentement (directive
          ePrivacy / lignes directrices CNIL).
        </p>
        <p>
          Tout cookie non essentiel (publicité, réseaux sociaux, analytics tiers) fera l&apos;objet d&apos;un bandeau
          de choix conforme avant dépôt.
        </p>
      </section>

      <section>
        <h2>4. Gestion depuis votre navigateur</h2>
        <p>
          Vous pouvez configurer votre navigateur pour refuser les cookies ou les supprimer. Le refus des cookies
          essentiels peut empêcher l&apos;accès à votre compte {LEGAL.siteUrl}.
        </p>
        <p>
          Aide : Chrome, Firefox, Safari et Edge proposent des paramètres « Confidentialité » / « Cookies ».
        </p>
      </section>

      <section>
        <h2>5. Contact</h2>
        <p>
          Questions : <a href={`mailto:${LEGAL.editor.email}`}>{LEGAL.editor.email}</a>. Voir aussi la{' '}
          <a href="/politique-confidentialite">politique de confidentialité</a>.
        </p>
      </section>
    </LegalPageShell>
  );
}
