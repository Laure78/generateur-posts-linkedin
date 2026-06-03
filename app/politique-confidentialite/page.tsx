import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LEGAL } from '@/lib/bework/legal';
import { BEWORK } from '@/lib/bework/config';

export const metadata: Metadata = {
  title: 'Confidentialité BeWork',
  description: 'Conditions de confidentialité et protection des données (RGPD) — plateforme MOEX BeWork.',
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageShell title="Confidentialité BeWork (RGPD)">
      <section>
        <h2>1. Responsable de traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées via {BEWORK.name} est :
        </p>
        <ul>
          <li>
            <strong>{LEGAL.editor.name}</strong> — {LEGAL.editor.legalForm}
          </li>
          <li>{LEGAL.editor.address}</li>
          <li>
            Contact données personnelles :{' '}
            <a href={`mailto:${LEGAL.editor.email}`}>{LEGAL.editor.email}</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>Selon votre usage, nous pouvons traiter :</p>
        <ul>
          <li>
            <strong>Données de compte :</strong> nom, e-mail professionnel, société, mot de passe (hashé), rôle.
          </li>
          <li>
            <strong>Données de demande :</strong> titres, briefs, références chantier, pièces jointes ou textes
            collés, historique des missions et livrables.
          </li>
          <li>
            <strong>Données techniques :</strong> logs de connexion, adresse IP, identifiants de session, cookies
            strictement nécessaires (voir <a href="/cookies">politique cookies</a>).
          </li>
          <li>
            <strong>Données de facturation</strong> (le cas échéant) : coordonnées de facturation, historique
            commandes.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités et bases légales</h2>
        <table>
          <thead>
            <tr>
              <th>Finalité</th>
              <th>Base légale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Création et gestion du compte</td>
              <td>Exécution du contrat (CGU/CGV)</td>
            </tr>
            <tr>
              <td>Traitement des demandes et assistants IA</td>
              <td>Exécution du contrat ; intérêt légitime (amélioration du service)</td>
            </tr>
            <tr>
              <td>Support et sécurité</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Facturation et obligations comptables</td>
              <td>Obligation légale / contrat</td>
            </tr>
            <tr>
              <td>Prospection B2B (si applicable)</td>
              <td>Intérêt légitime ou consentement</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>4. Intelligence artificielle</h2>
        <p>
          Certaines demandes sont traitées via des modèles d&apos;IA (ex. Anthropic). Le contenu de vos briefs peut
          être transmis à ce prestataire <strong>uniquement pour produire le livrable demandé</strong>, dans le cadre
          de clauses contractuelles de protection des données.
        </p>
        <p>
          Ne déposez pas de données inutilement sensibles (santé, données bancaires complètes, etc.). Vous restez
          responsable de l&apos;anonymisation ou du masquage des informations personnelles de tiers lorsque cela est
          pertinent.
        </p>
      </section>

      <section>
        <h2>5. Destinataires et sous-traitants</h2>
        <ul>
          {LEGAL.processors.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong> — {p.role}
            </li>
          ))}
        </ul>
        <p>
          Des transferts hors Union européenne peuvent avoir lieu (hébergement ou IA aux États-Unis) ; ils sont
          encadrés par les mécanismes prévus par le RGPD (clauses contractuelles types, mesures complémentaires selon
          le prestataire).
        </p>
      </section>

      <section>
        <h2>6. Durées de conservation</h2>
        <ul>
          <li>Compte actif : durée de la relation contractuelle.</li>
          <li>
            Après clôture du compte : suppression ou anonymisation sous 24 mois, sauf obligation légale de
            conservation (comptabilité : 10 ans pour les pièces comptables).
          </li>
          <li>Logs techniques : durée limitée (généralement 12 mois maximum).</li>
        </ul>
      </section>

      <section>
        <h2>7. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>accès, rectification, effacement ;</li>
          <li>limitation du traitement, opposition (motifs légitimes) ;</li>
          <li>portabilité des données fournies ;</li>
          <li>
            retrait du consentement lorsque le traitement est fondé sur le consentement (sans affecter la licéité
            antérieure).
          </li>
        </ul>
        <p>
          Pour exercer vos droits : <a href={`mailto:${LEGAL.editor.email}`}>{LEGAL.editor.email}</a>, en joignant
          une copie d&apos;un justificatif d&apos;identité si nécessaire.
        </p>
        <p>
          Réclamation auprès de la CNIL :{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>
          .
        </p>
      </section>

      <section>
        <h2>8. Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (authentification, HTTPS,
          cloisonnement des comptes, sauvegardes selon hébergeur). Aucune transmission sur Internet n&apos;est
          totalement invulnérable.
        </p>
      </section>

      <section>
        <h2>9. Modifications</h2>
        <p>
          Cette politique peut être mise à jour. La date en tête de page sera révisée. En cas de changement majeur,
          les utilisateurs connectés pourront en être informés par e-mail ou notification sur la plateforme.
        </p>
      </section>
    </LegalPageShell>
  );
}
