/**
 * Arguments commerciaux par lot — source : Missions_BeWork_par_lot.pdf (v2, 19 pages).
 */

export type LotPitch = {
  douleur: string[];
  risque: string[];
  gain: string[];
};

export const LOT_PITCHES: Record<string, LotPitch> = {
  'lot-01': {
    douleur: [
      'Vos coffreurs sont payés pour couler, pas pour classer des plans de réservations : chaque heure de bureau volée à la production, vous la perdez deux fois.',
      'Le lot 01 ouvre le chantier et récolte les demandes de tous les autres corps d’état : sans quelqu’un pour tracer, vous devenez la boîte aux lettres de tout le monde.',
    ],
    risque: [
      'Une réservation non transmise à temps, et c’est VOUS qui payez le percement après coup. Tracé par BeWork, c’est l’oublieux qui règle l’addition.',
      'Pas de constat d’huissier, et la fissure du voisin devient votre problème.',
      'Un PV d’essai béton égaré, et le bureau de contrôle bloque.',
    ],
    gain: [
      'Un DOE gros œuvre complet = votre retenue de garantie (5 %) libérée à l’heure, pas six mois plus tard.',
      'Votre conducteur de travaux repasse sur le chantier au lieu de classer : il ouvre le lot suivant plus vite.',
    ],
  },
  'lot-02': {
    douleur: [
      'Le façadier a un seul vrai ennemi administratif : le PV de réception des supports que personne n’écrit jamais à temps.',
      'Vos équipes patientent pendant la validation des surfaces témoins, l’échafaudage tourne à vide.',
    ],
    risque: [
      'Sans réception écrite, vous héritez des murs de travers du gros œuvre — et une reprise en pleine façade, ça se voit de la rue.',
      'Une teinte non validée par écrit, et l’architecte vous fait tout refaire à la réception.',
    ],
    gain: [
      'Un PV de réception, c’est l’assurance la moins chère du chantier : une pièce contre une façade entière.',
      'Dossier produit et avis CSTB prêts = vous démarrez le jour où le support est bon, pas trois jours après.',
    ],
  },
  'lot-03': {
    douleur: [
      'Notes de calcul, visas, certificats bois, dossier photovoltaïque : votre bureau déborde pendant que vos équipes sont sur les toits.',
      'Les variantes exigées sont noyées dans le CCTP — les rater, c’est chiffrer à côté.',
    ],
    risque: [
      'Une variante exigée non repérée = des ouvrages faits gratuitement. BeWork les sort avant que vous signiez.',
      'Une note de calcul non visée = un point d’arrêt qui immobilise vos équipes en hauteur.',
    ],
    gain: [
      'Le dossier photovoltaïque (Consuel, garanties) monté pour vous : vous vendez du clé en main sans y passer vos soirées.',
      'Certificats et visas prêts = une couverture posée sans attendre le feu vert administratif.',
    ],
  },
  'lot-04': {
    douleur: [
      'Vos marges se jouent dans les tableaux de nomenclature autant qu’à l’atelier — et personne n’a le temps de les vérifier.',
      'Les preuves de performance (Uw, dB, CEKAL) traînent, et la réception attend.',
    ],
    risque: [
      'Une baie oubliée reste due : c’est une menuiserie offerte. BeWork vérifie chaque baie sur plan avant que ça vous coûte.',
      'Fabriquer sur les cotes du CCTP, c’est fabriquer des fenêtres qui ne rentrent pas.',
    ],
    gain: [
      'Preuves de performance prêtes = une réception qui ne traîne pas et un solde qui tombe.',
      'Vos poseurs posent, BeWork suit les échantillons et l’architecte : plus d’allers-retours qui bloquent la fabrication.',
    ],
  },
  'lot-05': {
    douleur: [
      'Blocs-portes, cylindres, PV acoustiques : beaucoup de références à suivre, zéro temps pour les tableaux.',
      'L’organigramme des clés, c’est le détail qui vire au cauchemar quand il est mal tenu.',
    ],
    risque: [
      'Un organigramme bâclé = des cylindres à recommander et reposer, à vos frais.',
      'Un PV acoustique 38/39 dB manquant = une réception refusée sur un simple papier.',
    ],
    gain: [
      'Nomenclature carrée = plus de blocs-portes commandés en double ou oubliés.',
      'Le client prend possession sans accroc : la remise des clés est nette, votre image suit.',
    ],
  },
  'lot-06': {
    douleur: [
      'Vos garde-corps doivent être justifiés par le calcul et visés : la sécurité se prouve sur le papier autant qu’à l’atelier.',
      'Fiches produit et visas s’accumulent pendant que l’atelier tourne.',
    ],
    risque: [
      'Un garde-corps, c’est la sécurité des gens : sans note de calcul visée, vous êtes exposé le jour où on vous la réclame.',
      'Une fiche QUALIMARINE manquante = un doute sur votre garantie anticorrosion.',
    ],
    gain: [
      'Vos visas prêts = pas de point d’arrêt qui immobilise la pose.',
      'Vous soudez, BeWork classe : le dossier de conformité est à jour sans que vous y touchiez.',
    ],
  },
  'lot-07': {
    douleur: [
      'L’étanchéité à l’air, c’est VOTRE signature sur le test RE2020 — et personne n’archive les preuves.',
      'Vous montez des kilomètres de cloisons ; les avis techniques et PV feu s’entassent.',
    ],
    risque: [
      'Une traçabilité d’étanchéité à l’air absente = un test d’infiltrométrie raté et des reprises sur tout un bâtiment.',
      'Un PV de réception des supports manquant = vous doublez sur des murs défectueux, à vos frais.',
    ],
    gain: [
      'Preuves d’étanchéité prêtes = l’infiltrométrie passe du premier coup.',
      'Vos plaquistes avancent, le DOE se remplit au fil de l’eau : zéro rush en fin de chantier.',
    ],
  },
  'lot-08': {
    douleur: [
      'PAC, ballons, VMC, réseaux d’eau : des équipements sous garantie et des essais à prouver, sinon pas de mise en service.',
      'Les PV d’essais et attestations RE2020 se perdent entre le chantier et le bureau.',
    ],
    risque: [
      'Une fuite non tracée peut vous coûter une saison de trésorerie : BeWork archive chaque PV avant le litige.',
      'Pas de PV de mise en service, pas de solde.',
    ],
    gain: [
      'Conformité prête à livrer : fiches PAC, VMC, attestations centralisées.',
      'Vos équipes branchent, BeWork boucle le dossier : la mise en service tombe à la date.',
    ],
  },
  'lot-09': {
    douleur: [
      'Pas de Consuel, pas de courant, pas de livraison : votre conformité se joue dans le dossier autant que dans le tableau.',
      'Comptages Enedis, VDI, fibre : un suivi permanent que personne n’a le temps d’assurer.',
    ],
    risque: [
      'Un dossier Consuel incomplet retarde toute la livraison — et vous portez le chapeau.',
      'Un jour de retard sur le raccordement Enedis = des pénalités.',
    ],
    gain: [
      'Le dossier qui débloque la mise en service, verrouillé et prêt.',
      'Vos électriciens tirent les câbles, BeWork tient le récolement : le dossier suit le rythme du chantier.',
    ],
  },
  'lot-10': {
    douleur: [
      'UPEC, SPEC, résilients : vos garanties reposent sur des avis techniques que personne n’archive.',
      'Les PV de réception des chapes passent à la trappe — jusqu’au jour où ça fissure.',
    ],
    risque: [
      'Un SPEC non tracé en pièce d’eau = une infiltration à votre charge, en décennale.',
      'Une chape non réceptionnée = des fissures qui reviennent toujours vers le carreleur.',
    ],
    gain: [
      'Traçabilité UPEC / colles / résilients prête = vous tenez en cas de sinistre.',
      'Vos carreleurs collent, BeWork classe : le dossier vous couvre sans effort.',
    ],
  },
  'lot-11': {
    douleur: [
      'Le peintre passe en dernier et révèle les défauts de tout le monde : sans PV, ils deviennent les siens.',
      'La signalétique et les plans d’évacuation réglementaires, on y pense toujours trop tard.',
    ],
    risque: [
      'Le PV de réception des subjectiles, c’est votre assurance de ne pas peindre — et payer — les défauts des autres.',
      'Une variante exigée non chiffrée à part = une prestation offerte.',
    ],
    gain: [
      'Variante chiffrée = une prestation que vous facturez au lieu de l’offrir.',
      'Signalétique et plans d’évacuation bouclés = livraison sans réserve administrative.',
    ],
  },
  'lot-12': {
    douleur: [
      'DICT, essais, caméra, récolement : le VRD, c’est autant de preuves à produire que de terre à déplacer.',
      'Les arrêtés et autorisations de voirie tombent toujours au dernier moment.',
    ],
    risque: [
      'Une DICT oubliée et vous êtes responsable de la casse d’un réseau. BeWork sécurise chaque déclaration avant le premier coup de pelle.',
      'Essai ou caméra non tracés avant remblai = une tranchée à rouvrir à vos frais.',
    ],
    gain: [
      'Récolement prêt à la réception = un maître d’œuvre qui signe sans relancer.',
      'Vos conducteurs d’engins avancent, BeWork tient les preuves : pas d’arrêt administratif.',
    ],
  },
  'lot-13': {
    douleur: [
      'Tout se pose avant les enrobés : la moindre attente oubliée se paie en voirie rouverte.',
      'Raccordements Enedis, télécom, IRVE : un suivi multi-concessionnaires chronophage.',
    ],
    risque: [
      'Un fourreau oublié sous l’enrobé = une chaussée à rouvrir à vos frais. BeWork coordonne les attentes à temps.',
      'Un récolement absent = des raccordements qui traînent des semaines.',
    ],
    gain: [
      'Plan de récolement à jour = une réception qui ne bute pas sur un plan manquant.',
      'BeWork relance les concessionnaires : vous n’êtes plus suspendu à leurs délais.',
    ],
  },
  'lot-14': {
    douleur: [
      'Essais de pression, désinfection, défense incendie : sans les PV, l’eau ne coule pas et la livraison attend.',
      'Le dossier défense incendie est un mille-feuille que personne n’a envie de monter.',
    ],
    risque: [
      'Pas de PV de désinfection, pas de mise en eau. BeWork tient la pièce qui ouvre le robinet.',
      'Un dossier défense incendie incomplet repousse la réception — et votre solde avec.',
    ],
    gain: [
      'Essais archivés = un solde qui tombe sans discussion.',
      'Dossier DECI complet = une réception qui ne recule pas.',
    ],
  },
  'lot-15': {
    douleur: [
      'La marge du paysagiste se joue sur le calendrier et l’entretien, pas seulement sur la plantation.',
      'SOSED, bordereaux, garantie de reprise : de l’administratif saisonnier qu’on oublie vite.',
    ],
    risque: [
      'Une garantie de reprise non suivie = des remplacements offerts au client au printemps.',
      'Un SOSED absent = un blocage administratif entre vous et votre paiement.',
    ],
    gain: [
      'Calendrier d’entretien tenu = c’est VOUS qui décidez quand ça repart, pas le client qui réclame.',
      'Bordereaux prêts = une réception fluide et un solde débloqué.',
    ],
  },
  'lot-16': {
    douleur: [
      'Sur l’amiante, le dossier EST le chantier : un papier qui manque et tout s’arrête.',
      'Plan de retrait, contrôles d’air, BSDA : une charge réglementaire écrasante, en continu.',
    ],
    risque: [
      'Un plan de retrait non notifié = un chantier illégal et votre responsabilité pénale engagée.',
      'Un BSDA manquant = une traçabilité déchets contestable le jour d’un contrôle inopiné.',
    ],
    gain: [
      'Dossier réglementaire irréprochable, du repérage aux contrôles libératoires : vous êtes couvert.',
      'Vous retirez, BeWork trace : votre sérénité vaut de l’or sur ce lot.',
    ],
  },
};
