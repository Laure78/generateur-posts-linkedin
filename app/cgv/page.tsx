import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/legal/LegalPageShell';
import { LEGAL } from '@/lib/bework/legal';
import { BEWORK } from '@/lib/bework/config';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'CGV BeWork — prestations, tarifs, paiement, rétractation, garanties.',
  robots: { index: true, follow: true },
};

export default function CgvPage() {
  return (
    <LegalPageShell title="Conditions générales de vente (CGV)">
      <section>
        <h2>1. Champ d&apos;application</h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toute commande de prestations ou
          d&apos;abonnements liés à la plateforme <strong>{BEWORK.name}</strong>, passée par un client professionnel
          (B2B).
        </p>
        <p>
          Toute commande implique l&apos;adhésion aux CGV, aux{' '}
          <a href="/cgu">CGU</a> et à la{' '}
          <a href="/politique-confidentialite">politique de confidentialité</a>. Les conditions particulières
          convenues par écrit prévalent sur les CGV.
        </p>
      </section>

      <section>
        <h2>2. Prestataire</h2>
        <p>
          <strong>{LEGAL.editor.name}</strong> — {LEGAL.editor.legalForm}
          <br />
          {LEGAL.editor.address}
          <br />
          E-mail : <a href={`mailto:${LEGAL.editor.email}`}>{LEGAL.editor.email}</a>
        </p>
      </section>

      <section>
        <h2>3. Prestations</h2>
        <p>Les prestations peuvent inclure notamment :</p>
        <ul>
          <li>accès à la plateforme et aux assistants travaux ;</li>
          <li>traitement de demandes (forfaits, crédits ou abonnement selon l&apos;offre) ;</li>
          <li>accompagnement / supervision humaine (Beworker) lorsque prévu au contrat ;</li>
          <li>prestations complémentaires sur devis (paramétrage, formation à l&apos;usage, intégration).</li>
        </ul>
        <p>
          Le détail des prestations, volumes inclus et délais indicatifs figure sur le devis, la proposition
          commerciale ou la page tarifaire communiquée au client.
        </p>
      </section>

      <section>
        <h2>4. Tarifs et paiement</h2>
        <ul>
          <li>Les prix sont indiqués en euros hors taxes (HT), sauf mention contraire.</li>
          <li>La TVA applicable est celle en vigueur au jour de la facturation.</li>
          <li>
            Le paiement est exigible selon les modalités du devis (comptant, acompte, facturation mensuelle). En cas
            de retard, des pénalités légales et une indemnité forfaitaire de recouvrement (40 € pour les professionnels,
            art. L.441-10 C. com.) pourront être appliquées.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Commande — exécution</h2>
        <p>
          La commande est ferme après acceptation du devis ou validation en ligne du panier / abonnement. L&apos;accès
          au service peut être activé après réception du paiement ou selon les conditions convenues (essai, POC).
        </p>
        <p>
          Les délais de traitement des demandes sont indicatifs et dépendent de la complexité du dossier et de la
          complétude des éléments fournis par le client.
        </p>
      </section>

      <section>
        <h2>6. Droit de rétractation</h2>
        <p>
          <strong>Clients professionnels (B2B) :</strong> le droit de rétractation prévu pour les consommateurs (art.
          L221-18 C. conso.) ne s&apos;applique pas. Toute renonciation expresse ne concerne que les clients agissant
          en qualité de non-consommateur.
        </p>
        <p>
          <strong>Consommateurs (cas exceptionnel) :</strong> si un particulier accédait au service, il disposerait d&apos;un
          délai de 14 jours pour exercer son droit de rétractation, sauf exécution commencée avec son accord exprès
          pour une prestation numérique immédiate.
        </p>
      </section>

      <section>
        <h2>7. Garanties — conformité</h2>
        <p>
          Le prestataire s&apos;engage à exécuter les prestations avec diligence et selon les règles de l&apos;art
          informatique. Les livrables produits par IA sont des aides à la rédaction : le client doit les valider avant
          usage.
        </p>
        <p>
          En cas de défaut avéré imputable au prestataire, la responsabilité est limitée, sauf faute lourde, au
          remboursement des sommes versées pour la prestation concernée ou à une nouvelle exécution, au choix du
          prestataire.
        </p>
      </section>

      <section>
        <h2>8. Résiliation</h2>
        <p>
          Les abonnements peuvent être résiliés selon les conditions de l&apos;offre (préavis, fin de période). En
          cas de manquement grave non réparé sous 15 jours après mise en demeure, chaque partie pourra résilier de
          plein droit.
        </p>
      </section>

      <section>
        <h2>9. Force majeure</h2>
        <p>
          Aucune partie ne sera responsable de l&apos;inexécution due à un événement de force majeure au sens de
          l&apos;article 1218 du Code civil (catastrophe, panne généralisée, acte d&apos;autorité, etc.).
        </p>
      </section>

      <section>
        <h2>10. Médiation</h2>
        {LEGAL.mediator.name ? (
          <p>
            Conformément aux dispositions applicables, le client consommateur peut recourir gratuitement à un
            médiateur : {LEGAL.mediator.name} —{' '}
            {LEGAL.mediator.url && (
              <a href={LEGAL.mediator.url} target="_blank" rel="noopener noreferrer">
                {LEGAL.mediator.url}
              </a>
            )}{' '}
            {LEGAL.mediator.email && (
              <>
                — <a href={`mailto:${LEGAL.mediator.email}`}>{LEGAL.mediator.email}</a>
              </>
            )}
            .
          </p>
        ) : (
          <p>
            Pour tout litige de consommation, le client peut utiliser la plateforme européenne de règlement en ligne
            des litiges :{' '}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr
            </a>
            . Les litiges entre professionnels relèvent des tribunaux compétents français.
          </p>
        )}
      </section>

      <section>
        <h2>11. Droit applicable</h2>
        <p>
          Les CGV sont régies par le droit français. Contact commercial et facturation :{' '}
          <a href={`mailto:${LEGAL.editor.email}`}>{LEGAL.editor.email}</a>.
        </p>
      </section>
    </LegalPageShell>
  );
}
