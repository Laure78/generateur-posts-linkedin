import type { TermeLexique } from './lexique-btp';

/** Lexique Lot 02 — Enduits de façade (CCTP DCE 38 logements). */
export const LEXIQUE_ENDUITS_FACADE: TermeLexique[] = [
  // ── Métier & ouvrage ──
  {
    id: 'enduit-facade',
    terme: 'Enduit de façade',
    famille: 'Enduits & façades',
    definition:
      'Revêtement au mortier appliqué sur les murs extérieurs : protège de la pluie (imperméabilisation) et donne l\'aspect fini de la façade.',
  },
  {
    id: 'facadier-enduiseur',
    terme: 'Façadier / enduiseur',
    famille: 'Enduits & façades',
    definition: 'Entreprise ou ouvrier spécialisé dans l\'application des enduits de façade.',
  },
  {
    id: 'enduit-monocouche',
    terme: 'Enduit monocouche',
    famille: 'Enduits & façades',
    definition:
      'Enduit industriel prêt à gâcher : accrochage + imperméabilisation + finition en un produit, généralement en 2 passes.',
    exemple: 'Weber Pral F — s\'oppose à l\'enduit traditionnel 3 couches (gobetis + corps + finition).',
  },
  {
    id: 'enduit-hydraulique',
    terme: 'Enduit hydraulique',
    famille: 'Enduits & façades',
    definition: 'Enduit dont le liant fait prise avec l\'eau (ciment, chaux hydraulique).',
  },
  {
    id: 'teinte-masse',
    terme: 'Teinté dans la masse',
    famille: 'Enduits & façades',
    definition:
      'La couleur est incorporée dans le mortier : la teinte traverse toute l\'épaisseur (pas de peinture par-dessus).',
  },
  {
    id: 'impermeabilisation-facade',
    terme: 'Imperméabilisation (façade)',
    famille: 'Enduits & façades',
    definition:
      'Fonction principale de l\'enduit : bloquer la pluie tout en laissant le mur respirer (perméable à la vapeur d\'eau).',
  },
  {
    id: 'ou-equivalent',
    terme: 'Ou équivalent',
    famille: 'Enduits & façades',
    definition:
      'Après une marque citée au CCTP : produit autre marque aux performances égales, soumis à validation MOE/MOA.',
  },

  // ── Supports ──
  {
    id: 'support-subjectile',
    terme: 'Support (subjectile)',
    famille: 'Enduits & façades',
    definition: 'Surface d\'application : parpaings, briques, béton. « Subjectile » = terme technique équivalent.',
  },
  {
    id: 'reception-supports-facade',
    terme: 'Réception des supports',
    famille: 'Enduits & façades',
    definition:
      'Vérification formelle par l\'enduiseur que les murs GO sont conformes AVANT intervention.',
    vigilance:
      'Sans réception formelle, les supports sont réputés acceptés — les défauts deviennent le problème de l\'enduiseur.',
  },
  {
    id: 'classement-rt',
    terme: 'Classement RT (RT1, RT2, RT3)',
    famille: 'Enduits & façades',
    definition:
      'Résistance à l\'arrachement des supports maçonnés (DTU 20.1) : détermine l\'enduit compatible.',
    exemple: 'Parpaing courant = RT3, brique creuse = RT2.',
  },
  {
    id: 'categorie-oc',
    terme: 'Catégorie OC (OC1, OC2, OC3)',
    famille: 'Enduits & façades',
    definition:
      'Classement des enduits monocouches selon compatibilité support : support faible (RT1) → OC1 ; support résistant (RT3) → OC3.',
    vigilance: 'Ne jamais mettre un enduit plus dur que son support.',
  },
  {
    id: 'humidification-refus',
    terme: 'Humidification à refus',
    famille: 'Enduits & façades',
    definition:
      'Arrosage abondant et répété du support avant application : le mur doit être humide en profondeur mais ressuyé en surface.',
  },
  {
    id: 'salpetre',
    terme: 'Salpêtre',
    famille: 'Enduits & façades',
    definition: 'Dépôt blanchâtre de sels sur mur humide : à éliminer avant enduisage (adhérence).',
  },
  {
    id: 'adherence-enduit',
    terme: 'Adhérence (enduit)',
    famille: 'Enduits & façades',
    definition: 'Colle entre enduit et support. Mesurée à l\'arrachement — ≥ 0,3 MPa selon DTU 26.1.',
  },
  {
    id: 'piquer-boucharder',
    terme: 'Piquer / boucharder / brosser',
    famille: 'Enduits & façades',
    definition: 'Préparation d\'un support trop lisse pour créer de la rugosité et l\'accrochage.',
  },

  // ── Application ──
  {
    id: 'passe-enduit',
    terme: 'Passe (enduit)',
    famille: 'Enduits & façades',
    definition: 'Une couche d\'application.',
    exemple: 'Monocouche « en 2 passes frais sur frais ».',
  },
  {
    id: 'frais-sur-frais',
    terme: 'Frais sur frais',
    famille: 'Enduits & façades',
    definition: 'La couche suivante est posée sur la précédente encore fraîche — liaison parfaite.',
  },
  {
    id: 'projection-enduit',
    terme: 'Projection (enduit)',
    famille: 'Enduits & façades',
    definition: 'Application mécanique à la machine (pot de projection) — courante pour monocouches.',
  },
  {
    id: 'dressage-enduit',
    terme: 'Dressage',
    famille: 'Enduits & façades',
    definition: 'Mise à plat de l\'enduit à la règle pour obtenir une surface plane.',
  },
  {
    id: 'finition-gratte',
    terme: 'Finition grattée',
    famille: 'Enduits & façades',
    definition: 'Aspect granuleux mat obtenu en grattant l\'enduit mi-dur au gratton — la plus courante.',
  },
  {
    id: 'finition-talochee',
    terme: 'Finition talochée',
    famille: 'Enduits & façades',
    definition: 'Surface lissée à la taloche : plus fermée, souvent en soubassements (résistante, lessivable).',
  },
  {
    id: 'faiencage-enduit',
    terme: 'Faïençage',
    famille: 'Enduits & façades',
    definition:
      'Micro-fissures en réseau (comme une faïence) : excès d\'eau au gâchage ou dessiccation trop rapide.',
  },
  {
    id: 'reprise-enduit',
    terme: 'Reprise (enduit)',
    famille: 'Enduits & façades',
    definition:
      'Raccord entre deux zones. À placer sur joint ou zone peu visible — sinon « spectre de reprise » (différence de teinte).',
  },
  {
    id: 'surface-temoin-facade',
    terme: 'Surface témoin',
    famille: 'Enduits & façades',
    definition: 'Échantillon sur chantier validé par architecte/MOA (teinte + finition) avant toutes les façades.',
  },
  {
    id: 'conditions-climatiques-enduit',
    terme: 'Conditions climatiques d\'application',
    famille: 'Enduits & façades',
    definition:
      'Ni < +5°C ni > +30°C, ni pluie, ni support gelé, ni vent desséchant ou plein soleil.',
    exemple: 'Parade : bâche humidifiée sur l\'échafaudage.',
  },

  // ── Points singuliers ──
  {
    id: 'point-singulier-facade',
    terme: 'Point singulier',
    famille: 'Enduits & façades',
    definition:
      'Zone à risque de fissure : jonctions de matériaux, angles de baies, rives de planchers — traitement renforcé.',
  },
  {
    id: 'armature-trame-facade',
    terme: 'Armature / trame (façade)',
    famille: 'Enduits & façades',
    definition:
      'Treillis fibre de verre noyé dans l\'enduit aux points singuliers pour répartir les tensions.',
    exemple: 'Planelles, linteaux, angles de baies, changements de matériaux.',
  },
  {
    id: 'tableau-facade',
    terme: 'Tableau (façade)',
    famille: 'Enduits & façades',
    definition: 'Côté vertical intérieur d\'une ouverture — épaisseur de mur visible autour de la fenêtre.',
  },
  {
    id: 'lattis-metallique',
    terme: 'Lattis métallique nervuré',
    famille: 'Enduits & façades',
    definition: 'Grillage support d\'enduit sur support non maçonné (bois, parement charpente).',
  },
  {
    id: 'soubassement-facade',
    terme: 'Soubassement',
    famille: 'Enduits & façades',
    definition:
      'Partie basse de façade (contact sol) : plus exposée — souvent finition talochée. Coordination GO avant remblai.',
  },
  {
    id: 'arete-profil-facade',
    terme: 'Arête (façade)',
    famille: 'Enduits & façades',
    definition:
      'Angle sortant protégé par profilé. Arêtes supérieures (têtes de murs, appuis) à protéger avant enduisage.',
  },

  // ── Modénatures ──
  {
    id: 'modenature',
    terme: 'Modénature',
    famille: 'Enduits & façades',
    definition:
      'Élément décoratif en relief : bandeaux, corniches, encadrements, faux colombages, faux volets.',
  },
  {
    id: 'bandeau-facade',
    terme: 'Bandeau (façade)',
    famille: 'Enduits & façades',
    definition: 'Bande horizontale en saillie sur la façade, souvent au niveau des planchers.',
  },
  {
    id: 'chainage-decoratif',
    terme: 'Chaînage décoratif',
    famille: 'Enduits & façades',
    definition:
      'Bande verticale en relief aux angles imitant la pierre — ≠ chaînage structurel BA du GO.',
  },
  {
    id: 'surepaisseur-enduit',
    terme: 'Surépaisseur (modénature)',
    famille: 'Enduits & façades',
    definition: 'Épaisseur supplémentaire d\'enduit pour créer un relief — facturée en plus-value.',
  },
  {
    id: 'pse-modenature',
    terme: 'PSE (modénatures)',
    sigle: 'Polystyrène expansé',
    famille: 'Enduits & façades',
    definition:
      'Matériau léger pour modénatures rapportées préfabriquées, revêtues de résine.',
    exemple: 'Domostyl — PSE 35 kg/m³ + résine acrylique + quartz.',
  },
  {
    id: 'reaction-feu-euroclasses',
    terme: 'Réaction au feu (Euroclasses)',
    famille: 'Enduits & façades',
    definition:
      'Comportement au feu : A1 (incombustible) → F, + s (fumées) + d (gouttelettes).',
    exemple: 'D-s3,d0 = combustible, fumées importantes, pas de gouttelettes enflammées.',
  },
  {
    id: 'ton-pierre',
    terme: 'Ton pierre',
    famille: 'Enduits & façades',
    definition: 'Teinte beige clair imitant la pierre naturelle — classique Sud-Ouest.',
  },

  // ── Échafaudages ──
  {
    id: 'echafaudage-pied',
    terme: 'Échafaudage de pied',
    famille: 'Enduits & façades',
    definition: 'Échafaudage monté depuis le sol — équipement standard du façadier.',
  },
  {
    id: 'tubulure-galvanisee',
    terme: 'Tubulure galvano-zinguée',
    famille: 'Enduits & façades',
    definition: 'Tubes acier anti-corrosion (Ø 40-49 mm) — ossature de l\'échafaudage.',
  },
  {
    id: 'camarteau',
    terme: 'Camarteau (calage)',
    famille: 'Enduits & façades',
    definition: 'Cales sous les pieds d\'échafaudage pour répartir les charges sur le terrain.',
  },
  {
    id: 'verin-platine',
    terme: 'Vérin à platine',
    famille: 'Enduits & façades',
    definition: 'Pied réglable en hauteur avec plaque d\'appui — sol irrégulier.',
  },
  {
    id: 'bracon-tirant',
    terme: 'Bracon / tirant',
    famille: 'Enduits & façades',
    definition: 'Liaisons inclinées stabilisant l\'échafaudage contre la façade (ancrage bâtiment).',
  },
  {
    id: 'reception-echafaudage',
    terme: 'Réception d\'échafaudage',
    famille: 'Enduits & façades',
    definition:
      'Vérification obligatoire avant mise en service, puis examens réguliers (arrêté 21/12/2004, R408).',
  },
  {
    id: 'double-transport-echafaudage',
    terme: 'Double transport (échafaudage)',
    famille: 'Enduits & façades',
    definition: 'Aller ET retour du matériel comptés dans le prix (amenée + repli).',
  },

  // ── Contrat & coordination ──
  {
    id: 'lot-00-dispositions',
    terme: 'Lot 00 — Dispositions communes',
    famille: 'Enduits & façades',
    definition:
      'CCTP chapeau pour tous les lots : installations communes, nettoyage, dossiers fin de chantier.',
  },
  {
    id: 'interface-corps-etat',
    terme: 'Interface / coordination corps d\'état',
    famille: 'Enduits & façades',
    definition: 'Points de contact entre lots à organiser en amont.',
    exemple: 'Enduire soubassements AVANT remblai GO ; protéger menuiseries déjà posées.',
  },
  {
    id: 'protection-ouvrages-facade',
    terme: 'Protection des ouvrages',
    famille: 'Enduits & façades',
    definition:
      'Bâchage/masquage menuiseries avant projection — projections sur menuiserie neuve = frais enduiseur.',
  },
  {
    id: 'certification-enduit-cstb',
    terme: 'Certification CSTB / Avis Technique (enduit)',
    famille: 'Enduits & façades',
    definition:
      'Passeport technique obligatoire : certification « Enduits monocouches d\'imperméabilisation » ou AT valide.',
  },
  {
    id: 'dtu-26-1',
    terme: 'DTU 26.1',
    famille: 'Enduits & façades',
    definition: 'DTU de référence des travaux d\'enduits de mortiers — bible du façadier.',
  },
  {
    id: 'certificateur-prestaterre',
    terme: 'Certificateur (Prestaterre)',
    famille: 'Enduits & façades',
    definition: 'Organisme vérifiant l\'atteinte de labels ou certifications environnementales du bâtiment.',
    exemple: 'NF Habitat, RE2022…',
  },
];
