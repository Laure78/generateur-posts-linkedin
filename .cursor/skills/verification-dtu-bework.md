---
name: verification-dtu-bework
description: >-
  Rapproche chaque ligne d'un devis BTP du DTU (Document Technique Unifié) qui l'encadre, sans jamais reproduire le texte officiel. Produit un tableau d'analyse "Ligne devis / Ouvrage détecté / DTU probable / Articles à vérifier / Niveau confiance" et un rapport Word aux couleurs BeWork (bework.fr). Déclencher ce skill dès que l'utilisateur mentionne — "vérifier les DTU", "à quel DTU correspond cette ligne", "DTU concerné", "DTU applicable", "rapprocher devis et DTU", "norme à vérifier sur ce devis", "quel DTU pour [ouvrage]", "AFNOR CSTB DTU", "contrôle normatif d'un devis", "article DTU à vérifier", "fiche DTU par ligne". Déclencher AUSSI quand l'utilisateur colle un devis BTP, un DPGF ou une liste de prestations et demande la conformité normative, l'identification des DTU concernés ou un repérage des articles à contrôler. Compatible tous corps d'état : gros œuvre, second œuvre, revêtements, étanchéité, couverture, menuiserie, plâtrerie, peinture, plomberie, chauffage, électricité, isolation.
disable-model-invocation: true
---

# Skill : Vérification DTU × Devis (BeWork)

## Implémentation laureolivie.fr vs chemins « skill Claude »

| Rôle | Chemin type `/mnt/…` ou script Python (Claude) | Équivalent dépôt **site-formation** |
|------|-------------------------------------------------|-------------------------------------|
| Base DTU JSON | `/mnt/skills/user/verification-dtu-bework/data/base-dtu.json` | `lib/dtu-verification/base-dtu.json` |
| Logo blueprint rapport | `/mnt/skills/user/verification-dtu-bework/assets/BeWork_logo_officiel.jpg` | `public/images/bework-logo-blueprint.png` |
| Rapport `.docx` | `scripts/generer_rapport_dtu.py` + `office/soffice.py` PDF | `app/api/verification-dtu-bework/docx/route.ts` (**docx** Node ; PDF hors périmètre actuel) |
| Page prototype noindex | — | `app/outils/verification-dtu-bework/page.tsx` (`LINKS.verificationDtuBeworkTest`) |
| UI + exports client | — | `components/dtu-verification/VerificationDtuBeworkTool.tsx` + `lib/dtu-verification/export-devis-rectifie.ts` (.txt, .csv, copie) |
| Mémo / rectification | — | `lib/dtu-verification/memo-explicatif.ts`, `rectification.ts` |
| Types payload | Format JSON entrée ci-dessous + **extensions site** (`ligne_devis_rectifiee`, `rectifications_appliquees`, `memo_paragraphs`) | `lib/dtu-verification/types.ts` |

## CONTEXTE D'UTILISATION

Ce skill produit un outil interne BeWork (partenaire administratif BTP — bework.fr) qui rapproche chaque ligne d'un devis du DTU (Document Technique Unifié) qui l'encadre. Objectif : permettre à un conducteur de travaux, métreur ou dirigeant BTP de vérifier rapidement la conformité normative d'un devis sans avoir à acheter et lire les 110+ DTU.

Cas d'usage typiques :

- Contrôle d'un devis sous-traitant avant signature
- Préparation d'un mémoire technique (référence aux DTU concernés)
- Vérification de la cohérence d'un DPGF avec les CCTP
- Repérage des articles DTU à invoquer en cas de réserve ou de litige
- Onboarding d'un nouveau conducteur de travaux sur les normes applicables

⚠️ **RÈGLES JURIDIQUES (NON NÉGOCIABLE)**

Les DTU sont des documents normatifs payants, édités et diffusés exclusivement par AFNOR ([boutique.afnor.org](https://boutique.afnor.org)) et CSTB ([boutique.cstb.fr](https://boutique.cstb.fr)). Reproduire leur contenu textuel sans licence est interdit.

Ce skill respecte ces règles strictement :

- ❌ JAMAIS reproduire le texte officiel d'un DTU, même partiellement
- ❌ JAMAIS citer un article entre guillemets
- ❌ JAMAIS donner de chiffrage normatif précis non vérifié (pentes, épaisseurs exactes, classes de matériaux)
- ✅ Reformuler en interne, en mots à soi, le contenu attendu d'un DTU
- ✅ Identifier la référence et la famille d'ouvrage
- ✅ Renvoyer systématiquement vers AFNOR/CSTB pour la consultation officielle
- ✅ Mention obligatoire : "Article exact à confirmer dans le document officiel"

Le rapport Word généré contient un encadré d'avertissement légal en page 1 qui explicite ce cadre. **Ne pas le retirer.**

## DÉCLENCHEUR DU SKILL

**Activer dès que** Laure (ou un utilisateur BeWork) :

- colle un devis, un DPGF ou une liste de prestations BTP
- demande "à quel DTU correspond cette ligne ?"
- demande "vérifie les DTU de ce devis"
- prépare un mémoire technique et veut sourcer les normes
- mentionne un litige et veut identifier le DTU à invoquer
- veut un rapport "Vérification DTU" pour un client BeWork

**Ne PAS déclencher pour** :

- une simple demande d'explication sur un DTU (répondre en conversationnel)
- une question sur les normes hors DTU (NF P, fascicules CCTG, Eurocodes)

## WORKFLOW

### Étape 1 — Récupérer le devis

Demander à l'utilisateur de fournir le devis :

- Texte collé dans la conversation (préféré pour démarrer vite)
- Fichier PDF, Excel ou Word uploadé *(sur Claude : `/mnt/user-data/uploads/` ; sur laureolivie.fr : non implémenté — collage texte uniquement pour l'instant)*.
- Liste de lignes saisies directement

Si le devis est dans un fichier, le lire avec les outils appropriés (skill pdf-reading ou lecture xlsx).

### Étape 2 — Extraire les lignes pertinentes

Garder uniquement les lignes correspondant à des prestations techniques d'exécution (fourniture/pose, mise en œuvre, réalisation). Écarter :

- Lignes "Compte prorata", "Installations de chantier", "Plans EXE", "Compte général" → pas de DTU concerné
- Lignes "Études", "Coordination SPS", "Bureau d'études" → pas de DTU
- Totaux, sous-totaux, TVA, options non chiffrées

*(Implémenté dans `extract-lines.ts`.)*

### Étape 3 — Matcher chaque ligne contre la base DTU

Charger la base (**site** : `lib/dtu-verification/base-dtu.json`). Pour chaque ligne, identifier le DTU probable selon la logique suivante (par ordre de priorité) :

1. **Match par métier** : si la ligne mentionne explicitement un métier (carrelage, peinture, plomberie…), filtrer sur le champ `metiers` de la base.
2. **Match par mots-clés** : croiser le libellé avec le champ `mots_cles`.
3. **Match par famille d'ouvrage** : si plusieurs DTU possibles, retenir celui de la famille la plus spécifique.
4. **Cas multi-DTU** : si une ligne couvre plusieurs DTU (ex : "plomberie sanitaire complète" → 60.1 + 60.11 + 60.5), retenir le DTU principal et signaler les autres en notes (`DTU_CONCURRENT`).
5. **Cas hors DTU** : voirie, enrobé routier, géotechnique pure, étude → `dtu_probable: "—"`, confiance Faible, orientations norme/fascicule en notes *(ex. NF P 98-150, fascicule 27 CCTG où pertinent — à confirmer au dossier).*

### Étape 4 — Évaluer le niveau de confiance

- **Élevé** : un seul DTU clairement applicable, libellé non ambigu, métier identifié.
- **Moyen** : DTU identifié mais le libellé manque d'une précision qui change la classe ou la version (ex : peinture sans classe de finition, isolation sans technique précisée).
- **Faible** : ouvrage probablement hors DTU, DTU incertain (libellé très flou), ou la ligne couvre plusieurs ouvrages distincts.

*(Le moteur site affine avec le nombre et la gravité des alertes.)*

### Étape 5 — Sélectionner les articles à vérifier

Pour chaque ligne, lister **3 à 5 points clés** à contrôler dans le DTU officiel. Utiliser `articles_typiques` comme point de départ et adapter au libellé.

**Exemple** : pour "Carrelage 60×60 collé en salle de bain", aller au-delà du NF DTU 52.2 générique : prévoir aussi le système sous carrelage en local humide (SEL/SPEC, formulation maison sans texte officiel).

### Étape 6 — Alertes de complétude (codage obligatoire)

Format JSON : `"CODE: explication courte"`.

| Code | Signification | Exemples concrets |
|------|----------------|-------------------|
| `MANQUE_CLASSE` | Classe technique normative absente au libellé | Peinture sans indice finition décoratif · colle / PVC sans précision projet · vitrage sans performance déclarée |
| `MANQUE_SUPPORT` | Support / subjectile non précisé | « Carrelage collé » sans préciser chape, dalle, ancien carrelage… |
| `MANQUE_CONTEXTE` | Local / exposition non précisé | « Carrelage » sans pièce humide ou non · « Peinture » sans façade/intérieur |
| `MANQUE_SURFACE` | Quantité ou linéaire absent au libellé | Pas de m², ml, u visibles |
| `MANQUE_ACCESSOIRES` | Interfaces ou lots associés nécessaires non explicites | Local humide : système sous carrelage à traiter dans le dossier · bardage rapporté sans continuités d'étanchéité évoquées · plancher chauffant sans essais évoqués · chape sans dispositifs périphériques évoqués |
| `MANQUE_TECHNIQUE` | Technique de mise en œuvre non choisie | « Isolation combles » sans soufflé/déroulé · « Étanchéité » sans famille de système projet · pose menuiserie sans mode de pose |
| `INCOHERENCE` | Données potentiellement incompatibles | Signalement à arbitrer métier (sans chiffrer la norme) |
| `DTU_CONCURRENT` | Plusieurs DTU probables sans arbitrage | « Plomberie sanitaire » / « Charpente » bois vs métallique |
| `HORS_DTU` | Prestation hors champ DTU catalogue courant | Enrobé, géotechnique, études, coordination SPS |
| `AUTRE` | Point d'attention à expliciter | Texte libre court |

Une ligne peut avoir 0, 1 ou plusieurs alertes. **Règle de cohérence** : 0 alerte → confiance Élevé possible ; 1–2 alertes mineures → souvent Moyen ; 3+ alertes ou `INCOHERENCE` → Faible.

### Étape 7 — Produire la sortie

**Sortie 1 — Tableau (chat ou UI)**  
Format compact :

| Ligne devis | Ouvrage détecté | DTU probable | Articles à vérifier | Confiance |

Si **plus de 10 lignes** dans le chat : n'afficher que les **5 premières** et orienter vers le rapport Word / export.

**Sortie 2 — Rapport Word BeWork**  
- **Claude / script historique** : JSON → `generer_rapport_dtu.py` → `.docx` puis `soffice` → PDF, copie `/mnt/user-data/outputs/`, `present_files`.  
- **laureolivie.fr** : `POST /api/verification-dtu-bework/docx` avec `RapportDtuPayload` (inclut mémo + tableau devis rectifié). PDF **non** généré automatiquement sur le site.

**Sorties complémentaires site** : devis rectifié `.txt` / `.csv` (Excel) et copie presse-papiers des libellés rectifiés — **sans montants** (reprise manuelle dans le tableau de prix).

## FORMAT JSON (entrée rapport / cohérence types)

**Cœur BeWork (inchangé)** :

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
      "notes": ""
    }
  ]
}
```

Niveaux : **exactement** `"Élevé"`, `"Moyen"`, `"Faible"` (avec accents).

**Extensions obligatoires sur laureolivie.fr** (export Word serveur et cohérence UI) :

- Par ligne : `ligne_devis_rectifiee` (string), `rectifications_appliquees` (string[])
- À la racine : `memo_paragraphs` (string[])

## BASE DTU INTERNE

Référencée côté site par `lib/dtu-verification/base-dtu.json` (~échantillon extensible vers ~75+ DTU). Champs : `reference`, `titre`, `titre_court`, `famille`, `metiers`, `mots_cles`, `articles_typiques`, `resume_maison` — **reformulations maison uniquement** ; jamais de texte AFNOR/CSTB copié. Si ouvrage absent de la base : `dtu_probable: "À identifier"`, confiance Faible ; orienter FFB / AFNOR. Mettre à jour `_metadata.date_maj` après modification.

## CHARTE BEWORK OFFICIELLE (mai 2026)

- **BLUE** `#1D4ED8`
- **LIGHT_BLUE** `#DBEAFE`
- **DARK** `#0F172A`
- **GRAY** `#64748B`
- **LIGHT_GRAY** `#F1F5F9`
- **FONT** Century Gothic (fallback Calibri) *(police rapport Word selon environnement Lecteur)*

**Logo** : fichier image blueprint (sur site : `public/images/bework-logo-blueprint.png` ; référence BeWork PNG : https://www.bework.fr/BeWork.logo.blueprint.png)

### Mentions interdites dans le rapport BeWork

❌ « Laure Olivié », « OFC », « Qualiopi », « NDA », « SIRET 905… » · toute mention organisme de formation · tagline au singulier « Assistant travaux augmenté par l’IA »

### Mentions obligatoires

✅ Header : logo blueprint (image réelle si possible — pas uniquement titre stylé)  
✅ Tagline : « Assistants travaux augmentés par l’IA » (**pluriel**)  
✅ Footer : « BeWork — Assistants travaux augmentés par l’IA · bework.fr — Relais bureau-chantier BTP »  
✅ Encadré avertissement légal page 1 (AFNOR / CSTB)  
✅ Signature : « Un assistant travaux à vos côtés pour tenir le rythme du chantier. »  
✅ CTA : « Faire appel à un Beworker » — pas « Assistant Travaux BeWork »  
✅ Stats : « 3 à 5 jours opérationnel / 0 recrutement / 100% supervisé en France »  

## CONVENTION DE NOMMAGE

- Word : `Rapport_DTU_[Client]_[AAAAMMJJ].docx`
- PDF (où disponible) : `Rapport_DTU_[Client]_[AAAAMMJJ].pdf`
- JSON entrée Claude : `/home/claude/dtu_input_[client_slug].json`

**Sur site**, les fichiers « devis rectifié » téléchargés côté client : `Devis_rectifie_[slug]_[AAAAMMJJ].txt` ou `.csv`

## CHECKLIST AVANT LIVRAISON

- [ ] Toutes les lignes techniques analysées (exclusions justifiées)
- [ ] Chaque NF DTU cité existe dans la base projet ou liste officielle
- [ ] Aucun extrait textuel officiel DTU dans la sortie
- [ ] Articles à vérifier = reformulations maison uniquement
- [ ] Confiance Élevé seulement si match net et peu ou pas d'alertes
- [ ] Au moins une alerte typée par ligne si confiance Moyen / Faible (sauf stratégie outil défini autrement)
- [ ] Encadré légal présent dans le Word — logo en en-tête — bleu `#1D4ED8`
- [ ] Footer relais bureau-chantier BTP · pas de données OFC / formation dans le corpus BeWork
- [ ] Où prévu : Word + PDF + `present_files` *(site : PDF en option future)*  

## EXEMPLES DE SORTIE TABLEAU

**Exemple 1 — confiance élevée**  
| Fourniture et pose carrelage grès cérame 60×60 collé | Revêtement de sol carrelé en pose collée | NF DTU 52.2 | • supports admissibles<br>• classe de colle (C1/C2)<br>• joints<br>• tolérances de planéité | Élevé |

*(Les libellés type C1/C2 dans les puces désignent des **familles habituellement contrôlées dans le dossier officiel payant**, pas une citation normative.)*

**Exemple 2 — confiance moyenne**  
| Peinture acrylique murs et plafonds, finition mate | Peinture intérieure | NF DTU 59.1 | • subjectiles admissibles<br>• préparation support<br>• classe de finition (A/B/C/D) à préciser au devis<br>• nombre de couches | Moyen |  
→ Note : précision finition/classe à clarifier avec le client.

**Exemple 3 — hors DTU**  
| Réfection enrobé parking 150 m² | Voirie / revêtement bitumineux | — | • voir norme NF P 98-150 (enrobés)<br>• fascicule 27 du CCTG | Faible |

## LIVRAISON

Après génération :

[ présentation des fichiers — sur Claude via `present_files` ; sur site par téléchargement navigateur ]

**Synthèse rapide**  

- X lignes analysées  
- Y DTU distincts identifiés : [liste]  
- Confiances : A élevé · B moyen · C faible  
- [Z lignes hors DTU avec normes/fascicules à confirmer]  

**Points de vigilance immédiats**  

- [2–3 points sur lignes Moyen ou Faible]  

**À faire côté chantier**  

- Confronter aux DTU officiels les points signalés (« article exact à confirmer dans le document officiel »).  
- Clarifier avec le MOA les lignes en confiance Moyen.  
- Archiver rapport + entrée brute devis avant rectification.  

## CONTACT DE MAINTENANCE

Pour enrichir la base : modifier `lib/dtu-verification/base-dtu.json` (format existant ; pas de texte officiel brut ; mise à jour `_metadata.date_maj`).
