---
name: balas-gonogo-mh
description: "Décision Go/No Go argumentée en 30 minutes pour les appels d'offres Monument Historique du Groupe Balas (BALAS SAS, CCR, Ateliers Uni-Marbres). Applique une grille pondérée à 9 critères calibrée pour les marchés MH : zone géographique, type chantier, qualifications Qualibat MH détenues, références ACMH disponibles, plan de charge équipes patrimoine, marge cible (≥ 8%), MO connu, délai de réponse, solvabilité. Donne un score /100, une recommandation Go / Go conditionnel / No Go et les 5 risques majeurs chiffrés. Déclencher ce skill dès qu'un utilisateur Balas/CCR mentionne : décision Go/No Go, faut-il répondre à cet AO, vaut-il la peine de répondre, rentabilité prévisionnelle AO MH, marge cible patrimoine, on y va ou pas, risque appel d'offres, analyse opportunité commerciale, grille de décision, faire un Go/No Go. Compatible tous corps d'état Balas : couverture-plomb d'art, maçonnerie-pierre, taille de pierre, ravalement chaux, plâtres, modénatures."
license: Proprietary
---

# Skill — Décision Go/No Go sur AO Monument Historique (Groupe Balas)

## Contexte

Skill de décision commerciale pour le Groupe Balas (BALAS SAS, CCR, Uni-Marbres). Permet de répondre en **30 minutes** à la question « vaut-il la peine d'investir 50 à 80 heures pour répondre à cet AO MH ? ».

> **Repère économique** : un MT MH loupé = ~8 000 € de coût interne sec (50 h × salaire chargé d'affaires). Avec une discipline Go/No Go, le taux de transformation post-grille est multiplié par 3.

Spécificités MH par rapport au BTP courant :
- Marge brute cible plus élevée (8-12 % vs 5-7 % en courant) compte tenu de la sujétion technique
- Plan de charge des compagnons qualifiés patrimoine = ressource rare
- Références ACMH = condition d'entrée sur le marché
- Délais de réponse souvent tendus (30-45 jours pour des MT volumineux)
- DGD souvent payée 6 à 12 mois après réception : impact trésorerie majeur

## Public cible

Dirigeants, BRH, responsables études de prix, chargés d'affaires Groupe Balas.

---

## Workflow

### Étape 1 — Pré-requis
Avant de lancer ce skill, l'analyse DCE doit être faite (skill `balas-analyser-dce-mh`). Le résultat de cette analyse alimente la grille.

### Étape 2 — Lancer la grille Go/No Go
Coller le prompt principal ci-dessous. Si le DCE est en mémoire dans le Project, Claude appliquera automatiquement la grille.

### Étape 3 — Réunion d'arbitrage
Le rendu produit par Claude est un support de discussion en réunion commerciale, **pas une décision automatique**. Le chef d'entreprise tranche.

---

## Prompt principal — « Grille Go/No Go MH Balas »

```
Tu es directeur commercial du Groupe Balas. Tu dois prendre la décision Go/No Go pour cet appel d'offres de restauration de Monument Historique.

Applique la GRILLE GO/NO GO BALAS — 9 critères pondérés sur 100 points :

## CRITÈRE 1 — Zone géographique (20 pts)
- Paris intra-muros : 20 pts
- Petite couronne 92/93/94 : 18 pts
- Grande couronne 77/78/91/95 : 15 pts
- Île-de-France élargie / Picardie / Centre : 10 pts
- Hors IDF/Centre/Picardie : 5 pts (sauf opportunité stratégique)

## CRITÈRE 2 — Type de chantier (15 pts)
- MH classé / cathédrale / palais / monument national : 15 pts
- MH inscrit : 13 pts
- Bâtiment patrimoine ancien (PLU + secteur sauvegardé) : 10 pts
- Bâtiment courant ancien : 6 pts
- Construction neuve : 3 pts

## CRITÈRE 3 — Qualifications Qualibat MH détenues (15 pts)
- Toutes les qualifs exigées détenues + valorisantes : 15 pts
- Toutes les qualifs strictement obligatoires détenues : 12 pts
- 1 qualif manquante mais récupérable rapidement (extension) : 8 pts
- 1 qualif manquante non récupérable à temps : 3 pts (No Go probable)
- Plusieurs qualifs manquantes : 0 pt (No Go)

Référentiel Qualibat MH Groupe Balas (à vérifier) :
- BALAS : 3194 (couverture MH), 3163 mention ornement (plomb d'art), 3193, 5413
- CCR : 2194 (pierre de taille MH), 6593 (plâtres-chaux MH), 2183, 2192
- Uni-Marbres : 2171 (taille pierre), 6342, 6583 (sculpture attributs)

## CRITÈRE 4 — Références ACMH < 5 ans (15 pts)
Nombre de références patrimoine récentes mobilisables sur ce type de chantier :
- ≥ 5 références similaires, dont 2+ très récentes (< 24 mois) : 15 pts
- 5 références exactement, conformes aux exigences : 12 pts
- 3-4 références (à compléter avec patrimoine ancien) : 8 pts
- 1-2 références : 4 pts
- 0 référence : 0 pt (No Go probable)

Références fortes Groupe Balas mobilisables (cf. skill `balas-references-chantiers`) :
- Hôtel National des Invalides (OPPIC) — BALAS — façades, couverture plomb, ardoise
- BNF Richelieu / Tolbiac — CCR — pierre de taille, ravalement
- Église Saint-Julien-le-Pauvre 5ᵉ — BALAS — couverture tuiles plates 12ᵉ
- CNAM Landy 2 Saint-Denis — BALAS — CVC + plomberie
- Église Saint-Pierre-Saint-Paul Montreuil — CCR — restauration façade + structure
- Abbaye de Royaumont — CCR
- École Nationale des Chartes — CCR
- Tour Carpe Diem La Défense — BALAS
- Magasins Généraux + Grands Moulins de Pantin — BALAS

## CRITÈRE 5 — Plan de charge équipes patrimoine (10 pts)
Période d'exécution du chantier croisée avec la charge prévisionnelle :
- < 60 % de charge prévue : 10 pts (équipes très disponibles)
- 60-75 % : 8 pts
- 75-85 % : 6 pts
- 85-95 % : 3 pts (tension, prévoir intérim ou refus partiel)
- > 95 % : 0 pt (No Go opérationnel)

## CRITÈRE 6 — Marge cible patrimoine ≥ 8 % (10 pts)
Estimation préliminaire de la marge brute atteignable :
- Marge ≥ 12 % : 10 pts
- Marge 10-12 % : 9 pts
- Marge 8-10 % : 7 pts (objectif minimum MH)
- Marge 5-8 % : 4 pts (limite, conditionner)
- Marge < 5 % : 0 pt (No Go financier)

## CRITÈRE 7 — Maître d'ouvrage connu (5 pts)
- MO récurrent Groupe Balas, relation excellente : 5 pts
- MO institutionnel reconnu (OPPIC, DRAC, Ville Paris, CMN) : 4 pts
- MO institutionnel inconnu : 3 pts
- MO privé reconnu et solvable : 3 pts
- MO inconnu, peu d'infos : 1 pt
- MO connu pour litiges / mauvais payeur : 0 pt (No Go)

## CRITÈRE 8 — Délai de réponse (5 pts)
- ≥ 60 jours : 5 pts (confortable)
- 45-60 jours : 4 pts (normal)
- 30-45 jours : 2 pts (tendu mais faisable)
- < 30 jours : 0 pt (rejet probable sauf MT préexistant à recycler)

## CRITÈRE 9 — Solvabilité MO (5 pts)
- MO public Ville Paris / OPPIC / Région / Département : 5 pts
- MO public commune > 50 000 hab. : 5 pts
- MO public commune < 50 000 hab. : 4 pts
- MO privé grand groupe coté : 4 pts
- MO privé propriétaire MH (fondation, association) : 3 pts
- MO inconnu, solvabilité à vérifier : 0-3 pts selon enquête

## RÈGLES D'INTERPRÉTATION DU SCORE TOTAL /100

- **≥ 80** : GO sans réserve — lancer la production du MT immédiatement
- **65 — 79** : GO CONDITIONNEL — identifier 1 à 3 conditions à lever (plan de charge à valider, sous-traitant à identifier, ressource à libérer)
- **50 — 64** : GO TRÈS CONDITIONNEL — analyse approfondie, possibilité de répondre en groupement avec co-traitant complémentaire
- **35 — 49** : NO GO PROBABLE — répondre uniquement si valeur stratégique (apprentissage marché, référence emblématique, relation client à entretenir)
- **< 35** : NO GO — ne pas répondre

## OUTPUT ATTENDU

Pour ce DCE, produis :
1. Le tableau détaillé des 9 critères avec score, justification (1 phrase), commentaire éventuel
2. Le score total /100
3. La recommandation Go / Go conditionnel / No Go avec arguments
4. Les 5 risques majeurs identifiés, chiffrés en € ou % du marché, avec mesures de mitigation
5. Une note finale en 3 lignes pour la réunion d'arbitrage du dirigeant
```

---

## Prompts complémentaires

### Analyse des clauses pénalisantes pour la marge
```
Pour cet AO, identifie les 5 clauses du CCAP qui ont l'impact le plus négatif sur la marge prévisionnelle. Pour chacune : article concerné, contenu, impact financier estimé en € et en % du marché, mesure de mitigation possible. Classe par ordre décroissant d'impact.
```

### Analyse de la trésorerie
```
Simule l'évolution de la trésorerie nette du Groupe Balas sur ce chantier, mois par mois, depuis la notification jusqu'au paiement de la DGD. Intègre : avance forfaitaire 5%, retenue de garantie 5%, délai de paiement 30 jours, échéancier d'avancement physique réaliste, DGD versée [X mois] après réception. Identifie le point bas trésorerie et son montant.
```

### Comparaison de 2 AO concurrents
```
Compare ces 2 AO MH sur lesquels nous pourrions répondre. Pour chacun : score Go/No Go détaillé, marge estimée, charge plan d'études, complémentarité avec autres chantiers en cours. Quel est l'AO prioritaire ? Pourquoi ?
```

### Stratégie de groupement
```
Pour cet AO, identifie les co-traitants pertinents en complément du Groupe Balas. Quels lots/savoir-faire seraient à externaliser ? Quels partenaires connus du marché MH (taille pierre, ferronnerie, vitrail, sculpture) seraient à solliciter ? Quelle est la répartition financière optimale ?
```

---

## Format de sortie

Le résultat est un document structuré exportable en Word :
`GONOGO-MH_[NOM-CHANTIER]_[AAAAMMJJ].docx`

À insérer dans le Project Claude « AO-[Nom chantier]-MH » pour archivage et capitalisation des décisions Go/No Go (utile pour les revues annuelles taux de transformation).

---

## Liens avec les autres skills Balas

- Pré-requis : `balas-analyser-dce-mh` (la fiche DCE alimente la grille)
- Si Go : passer à `balas-memoire-technique-mh` et `balas-chiffrage-mh`
- En appui : `balas-references-chantiers` pour évaluer le critère 4
