---
name: verification-dtu-bework
description: Rapproche chaque ligne d'un devis BTP du DTU (Document Technique Unifié) qui l'encadre, sans jamais reproduire le texte officiel. Produit un tableau d'analyse "Ligne devis / Ouvrage détecté / DTU probable / Articles à vérifier / Niveau confiance" et un rapport Word aux couleurs BeWork (bework.fr). Déclencher ce skill dès que l'utilisateur mentionne — "vérifier les DTU", "à quel DTU correspond cette ligne", "DTU concerné", "DTU applicable", "rapprocher devis et DTU", "norme à vérifier sur ce devis", "quel DTU pour [ouvrage]", "AFNOR CSTB DTU", "contrôle normatif d'un devis", "article DTU à vérifier", "fiche DTU par ligne". Déclencher AUSSI quand l'utilisateur colle un devis BTP, un DPGF ou une liste de prestations et demande la conformité normative, l'identification des DTU concernés ou un repérage des articles à contrôler. Compatible tous corps d'état : gros œuvre, second œuvre, revêtements, étanchéité, couverture, menuiserie, plâtrerie, peinture, plomberie, chauffage, électricité, isolation.
---

# Skill : Vérification DTU × Devis (BeWork)

## CONTEXTE D'UTILISATION

Ce skill produit un outil interne BeWork (partenaire administratif BTP — bework.fr) qui rapproche chaque ligne d'un devis du DTU (Document Technique Unifié) qui l'encadre. Objectif : permettre à un conducteur de travaux, métreur ou dirigeant BTP de vérifier rapidement la conformité normative d'un devis sans avoir à acheter et lire les 110+ DTU.

**Cas d'usage typiques** :
- Contrôle d'un devis sous-traitant avant signature
- Préparation d'un mémoire technique (référence aux DTU concernés)
- Vérification de la cohérence d'un DPGF avec les CCTP
- Repérage des articles DTU à invoquer en cas de réserve ou de litige
- Onboarding d'un nouveau conducteur de travaux sur les normes applicables

## ⚠️ RÈGLES JURIDIQUES (NON NÉGOCIABLE)

Les DTU sont des documents normatifs **payants**, édités et diffusés exclusivement par AFNOR (boutique.afnor.org) et CSTB (boutique.cstb.fr). Reproduire leur contenu textuel sans licence est interdit.

**Ce skill respecte ces règles strictement** :
- ❌ JAMAIS reproduire le texte officiel d'un DTU, même partiellement
- ❌ JAMAIS citer un article entre guillemets
- ❌ JAMAIS donner de chiffrage normatif précis non vérifié (pentes, épaisseurs exactes, classes de matériaux)
- ✅ Reformuler en interne, en mots à soi, le contenu attendu d'un DTU
- ✅ Identifier la référence et la famille d'ouvrage
- ✅ Renvoyer systématiquement vers AFNOR/CSTB pour la consultation officielle
- ✅ Mention obligatoire : "Article exact à confirmer dans le document officiel"

Le rapport Word généré contient un **encadré d'avertissement légal en page 1** qui explicite ce cadre. Ne pas le retirer.

## DÉCLENCHEUR DU SKILL

Activer dès que Laure (ou un utilisateur BeWork) :
- colle un devis, un DPGF ou une liste de prestations BTP
- demande "à quel DTU correspond cette ligne ?"
- demande "vérifie les DTU de ce devis"
- prépare un mémoire technique et veut sourcer les normes
- mentionne un litige et veut identifier le DTU à invoquer
- veut un rapport "Vérification DTU" pour un client BeWork

Ne PAS déclencher pour :
- Une simple demande d'explication sur un DTU (répondre en conversationnel)
- Une question sur les normes hors DTU (NF P, fascicules CCTG, Eurocodes)

## WORKFLOW

### Étape 1 — Récupérer le devis

Demander à l'utilisateur de fournir le devis :
- Texte collé dans la conversation (préféré pour démarrer vite)
- Fichier PDF, Excel ou Word uploadé dans `/mnt/user-data/uploads/`
- Liste de lignes saisies directement

Si le devis est dans un fichier, le lire avec les outils appropriés (cf. skill `pdf-reading` ou lecture xlsx).

### Étape 2 — Extraire les lignes pertinentes

Garder uniquement les lignes correspondant à des **prestations techniques d'exécution** (fourniture/pose, mise en œuvre, réalisation). Écarter :
- Lignes "Compte prorata", "Installations de chantier", "Plans EXE", "Compte général" → pas de DTU concerné
- Lignes "Études", "Coordination SPS", "Bureau d'études" → pas de DTU
- Totaux, sous-totaux, TVA, options non chiffrées

### Étape 3 — Matcher chaque ligne contre la base DTU

Charger la base : `/mnt/skills/user/verification-dtu-bework/data/base-dtu.json`

Pour chaque ligne, identifier le DTU probable selon la logique suivante (par ordre de priorité) :

1. **Match par métier** : si la ligne mentionne explicitement un métier (carrelage, peinture, plomberie…), filtrer sur le champ `metiers` de la base.
2. **Match par mots-clés** : croiser le libellé de la ligne avec le champ `mots_cles` de chaque DTU.
3. **Match par famille d'ouvrage** : si plusieurs DTU possibles, retenir celui de la famille la plus spécifique.
4. **Cas multi-DTU** : si une ligne couvre plusieurs DTU (ex : "plomberie sanitaire complète" → DTU 60.1 + 60.11 + 60.5), retenir le DTU principal et signaler les autres en `notes`.
5. **Cas hors DTU** : si l'ouvrage ne relève pas d'un DTU (voirie, enrobé routier, géotechnique pure, étude), indiquer `dtu_probable: "—"`, niveau confiance **Faible**, et orienter vers la norme/fascicule pertinent en `notes` (NF P98-150 pour enrobés, fascicule 27 CCTG, etc.).

### Étape 4 — Évaluer le niveau de confiance

- **Élevé** : un seul DTU clairement applicable, libellé non ambigu, métier identifié.
- **Moyen** : DTU identifié mais le libellé manque d'une précision qui change la classe ou la version (ex : peinture sans classe de finition, isolation sans technique précisée).
- **Faible** : ouvrage probablement hors DTU, ou DTU incertain (libellé très flou), ou la ligne couvre plusieurs ouvrages distincts.

### Étape 5 — Sélectionner les articles à vérifier

Pour chaque ligne, lister 3 à 5 **points clés à contrôler** dans le DTU officiel. Utiliser le champ `articles_typiques` de la base comme point de départ et l'adapter au libellé spécifique de la ligne.

Exemple : pour "Carrelage 60x60 collé en salle de bain", les articles à vérifier vont au-delà du DTU 52.2 générique : ajouter le système d'étanchéité sous carrelage (SEL/SPEC) car contexte humide.

### Étape 6 — Détecter les ALERTES DE COMPLÉTUDE du devis

C'est le cœur de la valeur ajoutée. Au-delà du rapprochement ligne ↔ DTU, signaler ce qui MANQUE dans le libellé pour pouvoir affirmer la conformité. Une ligne peut très bien être conforme à un DTU sans qu'on puisse le démontrer parce que le devis est trop flou.

**Typologie standardisée** (utiliser ces codes dans le champ `alertes` du JSON) :

| Code | Signification | Exemples concrets |
|---|---|---|
| `MANQUE_CLASSE` | Classe technique normative absente | Peinture sans classe A/B/C/D · Colle sans classe C1/C2 · Sol PVC sans classe d'abrasion · Vitrage sans classe acoustique |
| `MANQUE_SUPPORT` | Support / subjectile non précisé | "Carrelage collé" sans préciser sur chape, dalle, ancien carrelage… |
| `MANQUE_CONTEXTE` | Local / exposition non précisé | "Carrelage" sans préciser pièce humide ou non · "Peinture" sans préciser façade ou intérieur |
| `MANQUE_SURFACE` | Quantité ou linéaire absent | Devis sans m², ml, u |
| `MANQUE_ACCESSOIRES` | Accessoires DTU-obligatoires non chiffrés | Carrelage en local humide sans SEL/SPEC · Bardage rapporté sans pare-pluie · Plancher chauffant sans essai en pression · Chape flottante sans bande périphérique |
| `MANQUE_TECHNIQUE` | Technique de mise en œuvre non choisie | "Isolation combles" sans préciser soufflé/déroulé · "Étanchéité" sans préciser bitume/PVC/EPDM · "Pose menuiserie" sans préciser applique/tunnel/rénovation |
| `INCOHERENCE` | Données incompatibles entre elles | Tuile mécanique avec pente 5% (trop faible pour zone 1) · Vitrage simple en exposition Est-1 · Carrelage scellé en sol chauffant |
| `DTU_CONCURRENT` | Plusieurs DTU possibles sans arbitrage | "Plomberie sanitaire" (60.1 + 60.11 + 60.5 ?) · "Charpente" (31.1 ou 31.3 ?) |
| `HORS_DTU` | Prestation hors champ des DTU | Enrobé routier, géotechnique, études, coordination SPS |
| `AUTRE` | Autre point d'attention à expliciter | Texte libre |

**Format dans le JSON** : chaque alerte est une chaîne `"CODE: explication courte"` dans un tableau `alertes`.

```json
"alertes": [
  "MANQUE_CLASSE: classe de finition A/B/C/D non précisée",
  "MANQUE_ACCESSOIRES: pas de SEL/SPEC chiffré alors que local humide"
]
```

**Une ligne peut avoir 0, 1 ou plusieurs alertes**. Le niveau de confiance se cale dessus :
- 0 alerte → confiance Élevé possible
- 1-2 alertes mineures → Moyen
- 3+ alertes ou alerte INCOHERENCE → Faible

### Étape 7 — Produire la sortie

#### Sortie 1 : Tableau dans le chat (toujours)

Présenter immédiatement le tableau dans la conversation, format markdown :

```
| Ligne devis | Ouvrage détecté | DTU probable | Articles à vérifier | Confiance |
```

Format compact, lisible directement. Si le devis fait plus de 10 lignes, ne pas tout afficher dans le chat — produire seulement les 5 premières et orienter vers le Word.

#### Sortie 2 : Rapport Word BeWork (sur demande ou par défaut si > 5 lignes)

Construire un JSON conforme au format attendu par le script (cf. exemple plus bas), l'écrire dans `/home/claude/dtu_input_[client].json`, puis appeler :

```bash
python3 /mnt/skills/user/verification-dtu-bework/scripts/generer_rapport_dtu.py \
  /home/claude/dtu_input_[client].json \
  /home/claude/Rapport_DTU_[Client]_[AAAAMMJJ].docx
```

Puis convertir en PDF :
```bash
python3 /mnt/skills/public/docx/scripts/office/soffice.py --headless --convert-to pdf \
  /home/claude/Rapport_DTU_[Client]_[AAAAMMJJ].docx
```

Copier les deux fichiers vers `/mnt/user-data/outputs/` et les présenter via `present_files`.

## FORMAT JSON D'ENTRÉE (pour le script)

```json
{
  "client": "Entreprise Dupont SARL",
  "projet": "Lot 04 — Revêtements sols / Rénovation Paris 11",
  "date": "15/05/2026",
  "redacteur": "BeWork",
  "lignes": [
    {
      "ligne_devis": "Libellé exact de la ligne du devis",
      "ouvrage_detecte": "Catégorisation BTP",
      "dtu_probable": "NF DTU XX.X",
      "dtu_titre_court": "Titre court du DTU",
      "articles_a_verifier": ["point 1", "point 2", "point 3"],
      "niveau_confiance": "Élevé",
      "alertes": ["MANQUE_CLASSE: classe de finition non précisée"],
      "notes": "Note libre, ou chaîne vide"
    }
  ]
}
```

Niveaux de confiance acceptés : `"Élevé"`, `"Moyen"`, `"Faible"` (exactement ces chaînes, avec accents).
Le champ `alertes` est un tableau (vide ou non) de chaînes au format `"CODE: explication"`.

## BASE DTU INTERNE

Fichier : `/mnt/skills/user/verification-dtu-bework/data/base-dtu.json`

Contient ~75 DTU parmi les plus utilisés en bâtiment, structurés ainsi :
- `reference` : ex. "NF DTU 52.2"
- `titre` : titre officiel
- `famille` : catégorie d'ouvrage (Étanchéité, Revêtement, Couverture…)
- `metiers` : liste des corps d'état concernés
- `mots_cles` : mots-clés pour le matching
- `articles_typiques` : sections clés du DTU (formulées en mots maison)
- `resume_maison` : reformulation interne du contenu du DTU (jamais copié)

**Cette base est non exhaustive** (110+ DTU existent). Si un ouvrage n'est pas couvert :
- Indiquer le DTU probable d'après ses connaissances générales si elles sont fiables
- Sinon mettre `dtu_probable: "À identifier"` et `niveau_confiance: "Faible"`
- Toujours orienter vers la liste officielle FFB ou la boutique AFNOR

Pour enrichir la base : ajouter une entrée dans le fichier JSON en suivant le format existant. Ne PAS y mettre de texte officiel — uniquement des reformulations maison.

## CHARTE BEWORK OFFICIELLE (alignée bework.fr, mai 2026)

```
BLUE       = #1D4ED8  (Tailwind blue-700 — couleur officielle site bework.fr)
LIGHT_BLUE = #DBEAFE  (bordures fines, fond bandeaux)
DARK       = #0F172A  (texte principal, slate-900)
GRAY       = #64748B  (texte secondaire, slate-500)
LIGHT_GRAY = #F1F5F9  (fond encadrés, alternance ligne)
FONT       = Century Gothic (fallback Calibri)
```

**Logo officiel** : `/mnt/skills/user/verification-dtu-bework/assets/BeWork_logo_officiel.jpg` (style blueprint, ratio 3:1, à utiliser tel quel, ne pas recréer). Source : https://www.bework.fr/BeWork.logo.blueprint.png

**Mentions interdites dans le rapport** (rappel) :
- ❌ "Laure Olivié", "OFC", "Qualiopi", "NDA", "SIRET 905…"
- ❌ Toute mention organisme de formation
- ❌ Tagline au singulier "Assistant travaux augmenté par l'IA" (on parle d'une équipe, pas d'un seul assistant)

**Mentions obligatoires** :
- ✅ Header : logo blueprint officiel (image, pas de texte stylé)
- ✅ Tagline : "Assistants travaux augmentés par l'IA" (toujours au PLURIEL)
- ✅ Footer : "BeWork — Assistants travaux augmentés par l'IA · bework.fr — Relais bureau-chantier BTP"
- ✅ Encadré avertissement légal page 1 (AFNOR / CSTB)
- ✅ Signature finale : "Un assistant travaux à vos côtés pour tenir le rythme du chantier." (slogan principal du site)
- ✅ Pour les CTA : "Faire appel à un Beworker" (pas "Assistant Travaux BeWork")
- ✅ Stats : "3 à 5 jours opérationnel / 0 recrutement / 100% supervisé en France"

## CONVENTION DE NOMMAGE

- Fichier Word : `Rapport_DTU_[Client]_[AAAAMMJJ].docx`
- Fichier PDF : `Rapport_DTU_[Client]_[AAAAMMJJ].pdf`
- JSON input temporaire : `/home/claude/dtu_input_[client_slug].json`

`[Client]` : nom court du client en CamelCase (DupontSARL, Bouygues, Vinci…).
`[AAAAMMJJ]` : date du jour au format compact.

## CHECKLIST AVANT LIVRAISON

- [ ] Toutes les lignes techniques du devis sont analysées (exclusions justifiées : comptes prorata, études, etc.)
- [ ] Chaque DTU cité existe (cf. base JSON ou liste officielle FFB/AFNOR)
- [ ] Aucun extrait textuel d'un DTU n'apparaît dans la sortie
- [ ] Les articles à vérifier sont reformulés en mots maison, jamais copiés
- [ ] Niveau de confiance cohérent (Élevé seulement si match net)
- [ ] Au moins une alerte typée par ligne en confiance Moyen / Faible
- [ ] Encadré avertissement légal AFNOR / CSTB présent dans le Word page 1
- [ ] Logo blueprint officiel dans le header (image, pas de texte)
- [ ] Bleu officiel #1D4ED8 partout (pas l'ancien #2563EB)
- [ ] Tagline pluriel "Assistants travaux augmentés par l'IA"
- [ ] Footer "Relais bureau-chantier BTP" (pas "Partenaire administratif BTP")
- [ ] Signature finale "Un assistant travaux à vos côtés pour tenir le rythme du chantier."
- [ ] Aucune mention OFC/Qualiopi/Laure Olivié/SIRET dans le rapport
- [ ] PDF + Word générés et copiés dans `/mnt/user-data/outputs/`
- [ ] Présentés via `present_files`

## EXEMPLES DE SORTIE TABLEAU (chat)

**Exemple 1 — confiance élevée**
```
| Fourniture et pose carrelage grès cérame 60x60 collé | Revêtement de sol carrelé en pose collée | NF DTU 52.2 | • supports admissibles<br>• classe de colle (C1/C2)<br>• joints<br>• tolérances de planéité | Élevé |
```

**Exemple 2 — confiance moyenne**
```
| Peinture acrylique murs et plafonds, finition mate | Peinture intérieure | NF DTU 59.1 | • subjectiles admissibles<br>• préparation support<br>• classe de finition (A/B/C/D) à préciser au devis<br>• nombre de couches | Moyen |
```
*Note : classe de finition non précisée — clarifier avec le client.*

**Exemple 3 — hors DTU**
```
| Réfection enrobé parking 150 m² | Voirie / revêtement bitumineux | — | • voir norme NF P98-150 (enrobés)<br>• fascicule 27 du CCTG | Faible |
```

## LIVRAISON

Format de réponse après génération du rapport :

```
[présentation des 2 fichiers via present_files]

Voilà le rapport DTU × Devis pour [Client] — PDF + Word.

**Synthèse rapide**
- X lignes analysées
- Y DTU distincts identifiés : [liste]
- Confiance : A élevé · B moyen · C faible
- [Z lignes hors DTU le cas échéant, avec normes à confirmer]

**Points de vigilance immédiats**
- [2-3 points sur les lignes en confiance Moyen ou Faible]

**À faire côté chantier**
- Vérifier dans les DTU officiels les articles signalés
- Clarifier avec le client les lignes en confiance Moyen
- Conserver ce rapport au dossier comme trace de la vérification normative préalable
```

## CONTACT DE MAINTENANCE

Si la base DTU doit être enrichie ou corrigée :
- Éditer `/mnt/skills/user/verification-dtu-bework/data/base-dtu.json`
- Respecter le format existant
- Ne JAMAIS y intégrer du texte officiel
- Mettre à jour le `_metadata.date_maj`
