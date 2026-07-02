/**
 * Quiz spécial Gros œuvre — 15 questions scénarisées (CCTP Lot 01, logements collectifs).
 * Complète le quiz lexique auto-généré : situations chantier, pièges métier, vrai contexte terrain.
 */

export type ChapitreQuizGo = 'Fondations' | 'Terrassement' | 'Béton' | 'Structure' | 'Réseaux' | 'Chantier & marché';

export type QuestionQuizGoSpeciale = {
  id: string;
  chapitre: ChapitreQuizGo;
  /** Mise en situation courte */
  contexte?: string;
  question: string;
  options: { id: string; label: string }[];
  bonneReponse: string;
  explication: string;
  /** Lien vers le dictionnaire (data/lexique-btp.ts) */
  termesLies?: string[];
};

export const QUIZ_GO_SPECIAL_META = {
  id: 'quiz-special-gros-oeuvre',
  titre: 'Quiz spécial Gros œuvre',
  sousTitre: '15 questions terrain — Lot 01 Fondations & GO',
  duree: '8 min',
  description:
    'Situations réelles de chantier : fondations, béton, réseaux enterrés, garanties et documents. Pas seulement des définitions — du réflexe métier.',
} as const;

export const QUESTIONS_QUIZ_GO_SPECIALE: QuestionQuizGoSpeciale[] = [
  {
    id: 'go-01',
    chapitre: 'Fondations',
    contexte: 'Étude G2 PRO sur 38 logements : le sol de surface ne porte pas à 1,5 m.',
    question: 'Quelle solution de fondation est la plus adaptée ?',
    options: [
      { id: 'a', label: 'Pieux pour atteindre le bon sol' },
      { id: 'b', label: 'Dallage direct sur terre-plein' },
      { id: 'c', label: 'Semelle filante seule, sans étude complémentaire' },
      { id: 'd', label: 'Radier sans armatures' },
    ],
    bonneReponse: 'a',
    explication:
      'Quand la couche superficielle ne porte pas, on descend vers le bon sol avec des fondations profondes (pieux, micropieux). Les fondations superficielles (semelles, radier) supposent un sol porteur accessible.',
    termesLies: ['pieux', 'fondations-superficielles', 'etude-geotechnique', 'bon-sol'],
  },
  {
    id: 'go-02',
    chapitre: 'Fondations',
    contexte: 'Fouille pour semelle filante — fond nivelé, propre.',
    question: 'À quoi sert la couche de ~5 cm de béton maigre coulée avant la semelle ?',
    options: [
      { id: 'a', label: 'Béton de propreté — surface plane, non structurelle' },
      { id: 'b', label: 'Remplace les armatures inférieures' },
      { id: 'c', label: 'Doit être en C35/45 minimum' },
      { id: 'd', label: 'Équivaut au gros béton armé de liaison' },
    ],
    bonneReponse: 'a',
    explication:
      'Le béton de propreté facilite la pose des armatures sur un fond propre. Il n\'a pas de rôle porteur. Le gros béton, lui, peut servir de rattrapage de niveau sous les semelles.',
    termesLies: ['beton-proprete', 'gros-beton', 'semelle-filante'],
  },
  {
    id: 'go-03',
    chapitre: 'Fondations',
    question: 'Quel risque est considéré comme le n°1 sur les fondations ?',
    options: [
      { id: 'a', label: 'Tassement différentiel (fissures par enfoncement inégal)' },
      { id: 'b', label: 'Bullage en surface de dalle' },
      { id: 'c', label: 'Retard de décoffrage de 24 h' },
      { id: 'd', label: 'Pente EP à 0,8 % au lieu de 1 %' },
    ],
    bonneReponse: 'a',
    explication:
      'Un tassement inégal des appuis provoque des fissures structurelles. D\'où l\'importance de l\'étude géotechnique, de l\'homogénéité du sol traité et du contrôle des fondations.',
    termesLies: ['tassement-differentiel', 'etude-geotechnique'],
  },
  {
    id: 'go-04',
    chapitre: 'Terrassement',
    contexte: 'Fouille de 2 m en terrain meuble, paroi non stabilisée.',
    question: 'Quelle obligation sécurité est en principe manquante ?',
    options: [
      { id: 'a', label: 'Blindage / soutènement provisoire des parois' },
      { id: 'b', label: 'Visa MOE sur le mortier de jointoiement' },
      { id: 'd', label: 'RFCT du bureau de contrôle' },
      { id: 'c', label: 'Passage caméra ITV des EU' },
    ],
    bonneReponse: 'a',
    explication:
      'Le blindage évite l\'effondrement des parois de fouille. C\'est une sujétion chantier souvent incluse au forfait GO et une obligation de protection collective prioritaire sur les EPI.',
    termesLies: ['blindage', 'sujetions', 'protections-collectives'],
  },
  {
    id: 'go-05',
    chapitre: 'Terrassement',
    question: 'La cote NGF indiquée sur le plan correspond à :',
    options: [
      { id: 'a', label: 'Une altitude officielle (référence nationale)' },
      { id: 'b', label: 'La profondeur hors gel uniquement' },
      { id: 'c', label: 'Le fil d\'eau des canalisations EU' },
      { id: 'd', label: 'L\'épaisseur d\'enrobage des semelles' },
    ],
    bonneReponse: 'a',
    explication:
      'NGF = Nivellement Général de la France. Le géomètre implante le bâtiment et les niveaux à partir de ces altitudes de référence.',
    termesLies: ['ngf', 'geometre', 'implantation', 'trait-niveau'],
  },
  {
    id: 'go-06',
    chapitre: 'Réseaux',
    contexte: 'Avant d\'ouvrir une tranchée à 1,20 m pour des réseaux enterrés.',
    question: 'Quelle démarche réglementaire est obligatoire en amont ?',
    options: [
      { id: 'a', label: 'DICT auprès des concessionnaires de réseaux' },
      { id: 'b', label: 'DOE provisoire au MOA' },
      { id: 'c', label: 'Uniquement l\'OS de démarrage du lot GO' },
      { id: 'd', label: 'Signature du CCAG par l\'entreprise' },
    ],
    bonneReponse: 'a',
    explication:
      'La DICT (Déclaration d\'Intention de Commencement de Travaux) alerte Enedis, GRDF, opérateurs télécom et eau avant tout creusement — pour éviter les coupures et accidents.',
    termesLies: ['dict', 'concessionnaires-reseaux', 'fourreau'],
  },
  {
    id: 'go-07',
    chapitre: 'Réseaux',
    question: 'Sur un réseau séparatif, les eaux de WC sont évacuées vers :',
    options: [
      { id: 'a', label: 'Le réseau EV (eaux vannes)' },
      { id: 'b', label: 'Le réseau EP (eaux pluviales)' },
      { id: 'c', label: 'Le même collecteur que les EU de cuisine' },
      { id: 'd', label: 'Un regard EP uniquement' },
    ],
    bonneReponse: 'a',
    explication:
      'EU = éviers, douches, machines. EV = WC. EP = pluie. Les trois réseaux restent séparés (DTU 60.1). Confondre EV et EP est une erreur classique à la réception.',
    termesLies: ['eaux-vannes-ev', 'assainissement', 'pente-minimale-assainissement'],
  },
  {
    id: 'go-08',
    chapitre: 'Réseaux',
    contexte: 'Canalisations posées sous le futur plancher bas — avant coulage.',
    question: 'Quel contrôle vérifie la conformité des réseaux avant de couler ?',
    options: [
      { id: 'a', label: 'Passage caméra (ITV)' },
      { id: 'b', label: 'Sclérométrie du béton de propreté' },
      { id: 'c', label: 'Essai Proctor du remblai' },
      { id: 'd', label: 'Visa architecte sur le PIC' },
    ],
    bonneReponse: 'a',
    explication:
      'L\'inspection vidéo des canalisations (ITV) détecte affaissements, joints ou défauts avant qu\'elles ne soient noyées dans le béton. L\'hydrocurage peut précéder la réception des réseaux.',
    termesLies: ['passage-camera-itv', 'hydrocurage'],
  },
  {
    id: 'go-09',
    chapitre: 'Béton',
    question: 'Sur un chantier sérieux, le béton livré par centrale certifiée NF EN 206 s\'appelle :',
    options: [
      { id: 'a', label: 'BPS — Béton à Propriétés Spécifiées' },
      { id: 'b', label: 'Béton de propreté structural' },
      { id: 'c', label: 'Mortier hydrofuge de façade' },
      { id: 'd', label: 'Gros béton armé de liaison' },
    ],
    bonneReponse: 'a',
    explication:
      'Le BPS est commandé par ses performances (classe C25/30, exposition XA2…), pas « au tas ». Les éprouvettes au coulage vérifient la résistance à 28 jours.',
    termesLies: ['bps-beton', 'beton-classe', 'classes-exposition', 'eprouvette-beton'],
  },
  {
    id: 'go-10',
    chapitre: 'Béton',
    contexte: 'Voile banché — barres en fond de coffrage.',
    question: 'L\'épaisseur de béton entre l\'acier et la face du coffrage s\'appelle :',
    options: [
      { id: 'a', label: 'Enrobage (souvent 5 cm en fondations)' },
      { id: 'b', label: 'Chaînage horizontal' },
      { id: 'c', label: 'Reprise de bétonnage' },
      { id: 'd', label: 'Béton de propreté' },
    ],
    bonneReponse: 'a',
    explication:
      'L\'enrobage protège l\'acier de la corrosion et du feu. Les cales d\'enrobage maintiennent les armatures à la bonne distance pendant le coulage.',
    termesLies: ['enrobage', 'voile-beton-banche', 'coffrage'],
  },
  {
    id: 'go-11',
    chapitre: 'Structure',
    question: 'Un plancher avec éléments préfabriqués en usine + coulage sur place, c\'est :',
    options: [
      { id: 'a', label: 'Prédalle + dalle de compression' },
      { id: 'b', label: 'Dallage sur terre-plein' },
      { id: 'c', label: 'Radier porteur unique' },
      { id: 'd', label: 'Longrine filante seule' },
    ],
    bonneReponse: 'a',
    explication:
      'Les prédalles (souvent précontraintes) forment le fond de plancher ; la dalle de compression coulée sur place solidarise l\'ensemble. ≠ dalle pleine coulée entièrement en place.',
    termesLies: ['predalle', 'dalle-compression', 'beton-precontraint'],
  },
  {
    id: 'go-12',
    chapitre: 'Structure',
    contexte: 'Mur porteur entre deux baies — largeur 65 cm.',
    question: 'Selon le DTU 20.1, ce trumeau porteur doit être :',
    options: [
      { id: 'a', label: 'En béton armé (< 80 cm)' },
      { id: 'b', label: 'En agglo creux standard sans renfort' },
      { id: 'c', label: 'Supprimé — linteau bois suffit' },
      { id: 'd', label: 'Au choix de l\'entreprise' },
    ],
    bonneReponse: 'a',
    explication:
      'Un trumeau porteur étroit (< 80 cm) doit être en béton armé pour reprendre les efforts. Les chaînages horizontal et vertical solidarisent la maçonnerie.',
    termesLies: ['trumeau', 'chainage', 'parpaing-agglos'],
  },
  {
    id: 'go-13',
    chapitre: 'Structure',
    question: 'À +15 cm du sol fini, la barrière au mortier hydrofuge dans le mur est :',
    options: [
      { id: 'a', label: 'L\'arase étanche (coupure de capillarité)' },
      { id: 'b', label: 'Le chaînage de rive' },
      { id: 'c', label: 'La reprise de bétonnage' },
      { id: 'd', label: 'Le béton de propreté du radier' },
    ],
    bonneReponse: 'a',
    explication:
      'L\'arase étanche bloque les remontées d\'humidité par capillarité dans les murs en contact avec le sol. À distinguer de l\'arase = niveau supérieur fini d\'un ouvrage.',
    termesLies: ['arase-etanche', 'arase', 'mortier'],
  },
  {
    id: 'go-14',
    chapitre: 'Chantier & marché',
    contexte: 'Marché à prix global et forfaitaire — Lot 01 GO.',
    question: 'Une prestation indispensable au lot mais non écrite au CCTP :',
    options: [
      { id: 'a', label: 'Est réputée comprise dans le forfait' },
      { id: 'b', label: 'Est toujours exclue — avenant obligatoire' },
      { id: 'c', label: 'Relève automatiquement du lot VRD' },
      { id: 'd', label: 'Ne peut jamais être exigée par le MOE' },
    ],
    bonneReponse: 'a',
    explication:
      'Au forfait, tout ce qui est nécessaire à l\'ouvrage complet est dû, même non détaillé (« réputé compris »). Les limites de prestation entre lots restent à lire attentivement au CCTP.',
    termesLies: ['marche-forfait', 'limite-prestation', 'cctp'],
  },
  {
    id: 'go-15',
    chapitre: 'Chantier & marché',
    question: 'Un dommage compromettant la solidité de l\'ouvrage, 8 ans après réception, relève de :',
    options: [
      { id: 'a', label: 'La garantie décennale (10 ans)' },
      { id: 'b', label: 'La GPA — 1 an seulement' },
      { id: 'c', label: 'La garantie biennale sur équipements' },
      { id: 'd', label: 'Le compte prorata chantier' },
    ],
    bonneReponse: 'a',
    explication:
      'GPA = 1 an (parfait achèvement). Biennale = 2 ans (équipements dissociables). Décennale = 10 ans (solidité / destination de l\'ouvrage — art. 1792 Code civil).',
    termesLies: ['garantie-decennale', 'gpa', 'garantie-biennale', 'reception'],
  },
];

export function melangerQuestionsGo<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
