import type { TermeLexique } from './lexique-btp';

/** Lexique Lot 03 — Charpente, couverture, zinguerie (DCE Millas Nord). */
export const LEXIQUE_CHARPENTE_COUVERTURE: TermeLexique[] = [
  {
    id: 'fermette-industrielle',
    terme: 'Fermette industrielle',
    famille: 'Charpente & couverture',
    definition:
      'Charpente préfabriquée en bois (sapin) avec connecteurs métalliques — entraxe max 60 cm, combles perdus.',
    exemple: 'MITEK ou équivalent — dimensionnée par notes de calcul validées bureau de contrôle.',
  },
  {
    id: 'chevetre-charpente',
    terme: 'Chevêtre',
    famille: 'Charpente & couverture',
    definition:
      'Renfort en bois pour laisser passer une trappe, un conduit de fumée, VMC ou châssis de désenfumage.',
  },
  {
    id: 'fond-de-noue',
    terme: 'Fond de noue',
    famille: 'Charpente & couverture',
    definition: 'Support bois au creux de deux pans de toiture — habillé en zinc, raccord zinguerie.',
  },
  {
    id: 'platelage-combles',
    terme: 'Platelage combles perdus',
    famille: 'Charpente & couverture',
    definition:
      'Plancher léger en combles pour accès VMC (3 m²/bloc) et circulation sécurisée — garde-corps.',
  },
  {
    id: 'stabilite-charpente-go',
    terme: 'Stabilité charpente / GO',
    famille: 'Charpente & couverture',
    definition:
      'Le charpentier assure la stabilité horizontale ; le GO reprend les efforts verticaux, pas les efforts horizontaux.',
    vigilance: 'Point singulier de coordination charpente ↔ gros œuvre.',
  },
  {
    id: 'charpente-traditionnelle',
    terme: 'Charpente traditionnelle',
    famille: 'Charpente & couverture',
    definition:
      'Chevrons/pannes bois massif C24 — carports, marquises, celliers — traitement classe emploi 3.',
  },
  {
    id: 'dtu-31-1',
    terme: 'DTU 31.1',
    famille: 'Charpente & couverture',
    definition: 'DTU charpentes et escaliers bois — référence du lot charpente-couverture.',
  },
  {
    id: 'pare-pluie-sous-toiture',
    terme: 'Pare-pluie sous-toiture',
    famille: 'Charpente & couverture',
    definition:
      'Membrane (ex. DELTA-VENT S) posée sur charpente avant liteaux — protège avant tuiles.',
    exemple: 'Variante marché : suppression film sur la plupart des toitures sauf maison PV.',
  },
  {
    id: 'liteaux-contre-liteaux',
    terme: 'Liteaux / contre-liteaux',
    famille: 'Charpente & couverture',
    definition:
      'Lattes bois 27×32 mm clouées sur charpente — support des tuiles et ventilation sous couverture.',
  },
  {
    id: 'tuile-canal-s',
    terme: 'Tuile romane Canal S',
    famille: 'Charpente & couverture',
    definition: 'Tuile à emboîtement type EDILIANS Canal S ou équivalent — couverture principale du projet.',
    exemple: '1 tuile sur 5 fixée mécaniquement.',
  },
  {
    id: 'chatieres-ventilation-combles',
    terme: 'Chatières (ventilation combles)',
    famille: 'Charpente & couverture',
    definition: 'Tuiles spéciales avec grillage moustiquaire — aèrent les combles (obligations réglementaires).',
  },
  {
    id: 'faitiere-aretiers',
    terme: 'Faîtières et arêtiers',
    famille: 'Charpente & couverture',
    definition:
      'Tuiles de faîtage (crête) et arêtiers (angles) — pose à sec avec closoir alu, scellement mortier bâtard.',
  },
  {
    id: 'gouttiere-descente-ep',
    terme: 'Gouttière / descente EP',
    famille: 'Charpente & couverture',
    definition:
      'Évacuation des eaux pluviales : gouttière alu demi-rond + descente + dauphin si chemin piéton.',
  },
  {
    id: 'dauphin-ep',
    terme: 'Dauphin (EP)',
    famille: 'Charpente & couverture',
    definition: 'Deflecteur en pied de descente — éloigne l\'eau du mur et du piéton (hauteur ~2 m).',
  },
  {
    id: 'solin-rive',
    terme: 'Solin de rive',
    famille: 'Charpente & couverture',
    definition: 'Relevé étanche en rive de toiture contre un mur — alu teinté tuile, joint de dilatation.',
  },
  {
    id: 'zinguerie-noue',
    terme: 'Zinguerie de noue',
    famille: 'Charpente & couverture',
    definition: 'Façon de noue en zinc ou PREFAL sur fond bois — étanchéité au creux de toit.',
  },
  {
    id: 'chassis-desenfumage',
    terme: 'Châssis de désenfumage',
    famille: 'Charpente & couverture',
    definition:
      'Velux GGL 2076 ou équivalent — ouverture ≥ 110°, cages escalier collectifs, commande gaz RDC.',
  },
  {
    id: 'chassis-acces-toiture',
    terme: 'Châssis d\'accès toiture',
    famille: 'Charpente & couverture',
    definition: 'Trappe Velux GVT — accès combles/toiture bâtiments collectifs, passage 49×76 cm.',
  },
  {
    id: 'crochets-securite-toiture',
    terme: 'Crochets de sécurité toiture',
    famille: 'Charpente & couverture',
    definition:
      'Ancrage pour double longe — tous les 1,50 m, 2 lignes (faîtage + milieu pan), résistance 2 000 daN.',
  },
  {
    id: 'tuiles-photovoltaiques-integrees',
    terme: 'Tuiles photovoltaïques intégrées',
    famille: 'Charpente & couverture',
    definition:
      'Tuiles PV 100 Wc encastrées dans toiture tuile — onduleur Enphase, raccordement lot électricité.',
    exemple: 'Maison I logement 36 — 8 modules, AT CSTB obligatoire.',
  },
];
