---
name: balas-analyser-dce-mh
description: "Analyse un DCE Monument Historique pour le Groupe Balas (BALAS SAS, CCR, Ateliers Uni-Marbres). Extrait les 18 informations critiques d'un AO MH : pondération valeur technique vs prix, qualifications Qualibat MH éliminatoires (3194, 3163, 2194, 6593), références ACMH < 5 ans exigées, visite obligatoire, contraintes ABF, sujétions patrimoniales cachées (parapluie M1, mock-ups, échantillons, DOE enrichi, plomb d'art). Produit une fiche d'analyse spécialisée MH exploitable par les chargés d'affaires Balas/CCR. Déclencher ce skill dès qu'un utilisateur Balas/CCR mentionne : analyser un DCE Monument Historique, lire un AO patrimoine, décortiquer un CCTP ACMH, points de vigilance ABF, exigences Qualibat MH, références ACMH, ou colle un DCE de restauration patrimoniale (Ville de Paris DCPA, OPPIC, DRAC, CMN, Région IDF). Compatible tous corps d'état Balas : couverture-zinguerie-plomb d'art, maçonnerie-pierre, ravalement chaux, taille de pierre, plâtres, modénatures."
license: Proprietary
---

# Skill — Analyser un DCE Monument Historique (Groupe Balas)

## Contexte

Skill spécialisé pour le **Groupe Balas** (BALAS SAS Gennevilliers + CCR Champagne-sur-Oise + Ateliers Uni-Marbres + B'Bath) et leurs chargés d'affaires sur les appels d'offres de restauration de Monuments Historiques.

Différences avec l'analyse DCE classique :
- Pondération typique 60/40 ou 70/30 en faveur de la valeur technique
- Qualifications Qualibat MH **éliminatoires** (et non simplement valorisées)
- Références ACMH < 5 ans systématiquement exigées
- Visite de site obligatoire (souvent condition de recevabilité)
- Contraintes ABF / ACMH / CRMH spécifiques au patrimoine
- Sujétions cachées coûteuses (parapluie M1, mock-ups, échantillons, DOE enrichi)

## Public cible

Chargés d'affaires, conducteurs de travaux, dirigeants, BRH du Groupe Balas (BALAS SAS, CCR, Uni-Marbres).
Métiers concernés : couverture / plomb d'art / zinguerie / maçonnerie MH / pierre de taille / ravalement chaux / plâtres et chaux / sculpture d'attributs / modénatures.

---

## Workflow

### Étape 1 — Préparer les pièces du DCE patrimoine

Récupérer les pièces standard du DCE :
- **RC** (Règlement de Consultation) — pondération, qualifs éliminatoires, références exigées, visite obligatoire
- **CCAP** — pénalités, retenue, garanties, clauses ABF/ACMH spécifiques, DGD
- **CCTP** — méthodologie patrimoine, matériaux imposés, mock-ups obligatoires
- **DPGF** ou Bordereau Prix
- **Plans architecte / structure / coupe / élévations** (souvent visa ACMH)
- **Diagnostic patrimoine** s'il est joint

### Étape 2 — Importer dans Claude Project « AO-[Nom chantier]-MH »

Créer un Project dédié, uploader les 6 à 12 pièces. Activer ce skill + `balas-references-chantiers` pour avoir les références du Groupe Balas disponibles en réponse.

### Étape 3 — Lancer le prompt principal

Coller le prompt « Auditeur AO Patrimoine » ci-dessous.

### Étape 4 — Produire la fiche d'analyse MH

Sauvegarder le résultat dans le Project ou exporter en Word :
`FICHE-DCE-MH_[NOM-CHANTIER]_[AAAAMMJJ].docx`

---

## Prompt principal — « Auditeur AO Patrimoine MH »

```
Tu es expert en appels d'offres BTP, spécialisé dans la restauration de Monuments Historiques en France. Tu travailles pour le Groupe Balas (BALAS SAS et CCR Champagne Construction Rénovation), qui répond aux marchés publics MH en Île-de-France et au-delà.

Analyse ce DCE et produis une FICHE D'ANALYSE PATRIMOINE structurée comportant les 18 informations critiques :

## 1. IDENTIFICATION
- Maître d'ouvrage (Ville de Paris DCPA / OPPIC / DRAC / Région / collectivité / privé)
- Maîtrise d'œuvre : nom de l'ACMH mandataire + co-traitants BET
- ABF de référence si mentionné
- Numéro de marché et n° d'inscription / classement MH
- Lot(s) concernés Balas/CCR et estimation HT

## 2. CADRE LÉGAL ET PATRIMONIAL
- Statut MH : inscrit / classé / secteur sauvegardé / site patrimonial remarquable
- Arrêté d'inscription ou de classement (date + portée)
- Contraintes ABF spécifiques mentionnées
- Visa ACMH obligatoire sur quoi (matériaux, mock-ups, modifications)
- Période de visite CRMH si découverte archéologique

## 3. PROCÉDURE ET CALENDRIER
- Type de procédure (AO ouvert, restreint, négocié, accord-cadre)
- Plateforme (PLACE, Maximilien, Achats publics, autre)
- Date limite remise offres (jour + heure + fuseau)
- Visite obligatoire ou facultative — DATES PRÉCISES
- Délai d'exécution (mois, dont préparation)
- Démarrage prévisionnel travaux

## 4. PONDÉRATION ET CRITÈRES DE JUGEMENT
- Valeur technique : pondération globale + détail des sous-critères
- Prix : pondération + méthode de notation
- Délai éventuellement noté
- Variantes : autorisées / interdites
- Options techniques imposées

## 5. EXIGENCES ÉLIMINATOIRES (DRAPEAU ROUGE — VÉRIFIER SYSTÉMATIQUEMENT)
- Qualifications Qualibat exigées (codes précis) :
  * Lot couverture/plomb : 3194 obligatoire, 3163 mention ornement
  * Lot maçonnerie/pierre/ravalement : 2194 obligatoire, 6593 souhaité
  * Mention RGE éventuelle
- Nombre de références MH < 5 ans exigées, avec spécificités (plomb d'art, modénatures, taille de pierre)
- Effectif minimum / encadrement / compagnons qualifiés (PNJP, Compagnons du Devoir)
- Assurances RC et décennale spécifiques MH
- Visite obligatoire = condition de recevabilité ?

## 6. CLAUSES CONTRACTUELLES À RISQUE FINANCIER
- Retenue de garantie (taux, remplacement par garantie à 1ère demande possible ?)
- Pénalités de retard (montant, plafond, plafonné ou non)
- Pénalités spécifiques (absence réunion, retard DOE, mock-up non livré)
- Révision de prix (formule, indice BT01 ou autre, période de mise en jeu)
- Avance forfaitaire (% et conditions)
- Acomptes mensuels (modalités, délai de paiement)
- DGD (délai de versement après réception, immobilisation trésorerie — souvent 6 à 12 mois en MH)
- Garantie de parfait achèvement et garantie décennale

## 7. SUJÉTIONS PATRIMONIALES SOUVENT CACHÉES (À CHIFFRER OBLIGATOIREMENT)
- Échafaudage classe 3 multidirectionnel toutes façades
- Parapluie intégral M1 sur échafaudage de toiture (résistance vent 130 km/h)
- Bâches anti-poussières + filets anti-chutes
- Autorisation d'occupation du domaine public (mairie d'arrondissement, redevance)
- Diagnostic contradictoire visuel + marteau avant chantier (relevé, marquage)
- Échantillons multiples (3 essais minimum sur joints chaux, 5 ardoises par teinte, etc.)
- Mock-ups OBLIGATOIRES (m² minimum à présenter à l'ACMH avant démarrage série)
- Cellule de synthèse hebdomadaire (présence conducteur travaux durée chantier)
- DOE patrimonial enrichi : reportage HD avant/pendant/après, fiches matériaux, attestations Pb, fiches pierres carrière
- Gestion plomb (DUERP, formation SS3, douches chantier, traçabilité, bennes étanches)
- Découvertes archéologiques (arrêt jusqu'à visite CRMH dans les 5 jours ouvrés)

## 8. CONTRAINTES TECHNIQUES PATRIMONIALES SPÉCIFIQUES
- Matériaux imposés et provenances exigées (ardoise Maine-et-Loire ou Galicie Cabrera, pierre Saint-Maximin banc royal/franc, chaux aérienne CL 90-S, etc.)
- Échantillonnage et validation préalable ACMH/ABF
- Techniques imposées (chaux aérienne, pose à pureau dégressif, soudures étain-plomb sans antimoine)
- Outillage interdit (disqueuse pour dégarnir, sablage, nettoyage chimique acide)
- Horaires de chantier (zones résidentielles dense)

## 9. INDICATEURS DE COMPLEXITÉ DE LA RÉPONSE
- Volume du DCE (nb de pages)
- Nombre de pièces et de plans
- Démarche QSE attendue
- Pondération QSE / déchets
- Variantes ou options à chiffrer séparément

## 10. POINTS DE VIGILANCE GROUPE BALAS
- Coactivité possible avec un autre lot Balas/CCR (penser à demander la liste des titulaires des autres lots)
- Co-traitance / sous-traitance opportune (taille de pierre vers CCR, plomb d'art vers BALAS, etc.)
- Pré-positionnement Groupe Balas si plusieurs lots (interlocuteur unique = argument fort)
- Capacité à mobiliser les compagnons (plan de charge sur la période)

## 11. SYNTHÈSE GO / NO GO PRÉLIMINAIRE
Conclusion en 5 lignes max : opportunité, risques principaux, contraintes opérationnelles, recommandation.
```

---

## Prompts complémentaires

### Détection des pièges contractuels
```
Repère dans ce DCE les 5 clauses les plus risquées pour le titulaire. Pour chacune : article concerné, contenu exact, niveau de risque (rouge/orange/jaune), impact financier estimé, mesure de mitigation. Distingue les clauses éliminatoires des clauses pénalisantes.
```

### Vérification des qualifications
```
Liste toutes les qualifications Qualibat, certifications et habilitations exigées dans ce DCE. Pour chacune : code précis, niveau exigé (obligatoire / souhaité / valorisé), où elle apparaît (article du RC). Croise ensuite avec les qualifications connues du Groupe Balas pour identifier d'éventuelles lacunes.
```

### Extraction des références exigées
```
Liste toutes les références d'opérations exigées dans ce DCE : nombre minimum, ancienneté maximale (5 ans, 10 ans), nature des chantiers (MH classés / inscrits / secteur sauvegardé), montant minimum, spécificités techniques requises (plomb d'art, taille de pierre, modénatures, etc.). Produit un tableau pour chaque lot.
```

### Analyse des contraintes patrimoniales
```
Détaille toutes les contraintes ABF / ACMH / CRMH présentes dans ce DCE. Pour chacune : article concerné, contenu, qui valide (ABF / ACMH / les deux), à quel moment de l'opération (échantillon, mock-up, démarrage série, réception), sanction en cas de non-respect.
```

---

## Format de sortie attendu

L'analyse doit produire un tableau structuré exportable en Word. Le formatage Markdown utilisé permet une conversion directe vers `.docx` via le skill `docx`.

Le document de référence est :
`FICHE-DCE-MH_[NOM-CHANTIER]_[AAAAMMJJ].docx`

Couleurs Balas (groupe-balas.com) : bleu marine + accent doré patrimoine — à appliquer si export pour usage interne.

---

## Liens avec les autres skills Balas

- Après l'analyse DCE → `balas-gonogo-mh` pour décider Go/No Go
- Si Go → `balas-memoire-technique-mh` pour structurer la réponse
- En parallèle → `balas-chiffrage-mh` pour analyser la DPGF et contrôler la rentabilité
- En appui sur tous → `balas-references-chantiers` pour piocher dans le palmarès du Groupe
