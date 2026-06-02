---
name: controle-memoire-technique-btp
description: "Audite un mémoire technique BTP avec l'œil d'un évaluateur de marché public (acheteur, MOA, MOE, AMO). Attribue une note probable critère par critère, liste les faiblesses, les informations manquantes au regard du CCTP/RC, et les améliorations prioritaires avant remise. Produit un rapport d'audit Word : note globale estimée, scoring détaillé, top 10 faiblesses, top 5 améliorations à fort impact, verdict (conforme/à risque/non conforme). Tous corps d'état BTP : gros œuvre, second œuvre, étanchéité, couverture, bardage, plomberie, électricité, peinture, VRD, TP, génie civil, monuments historiques. Déclencher dès que l'utilisateur mentionne : relire mon mémoire technique, contrôler un MT, auditer mon offre, scorer ou noter mon mémoire, simuler la notation, anticiper la note, regard évaluateur, points faibles de mon MT, qu'est-ce qui manque, améliorer avant remise, relecture avant dépôt — ou qu'il fournit un MT à relire/auditer."
---

# Skill — Contrôler et auditer un Mémoire Technique BTP (regard évaluateur marché public)

## Contexte
Skill conçu pour les entreprises BTP (TPE, PME, ETI) qui veulent **anticiper la note** que va leur attribuer la commission d'évaluation d'un marché public, et **corriger les faiblesses avant remise**. Complète les skills de rédaction (`memoire-technique-btp`, `balas-memoire-technique-mh`, `lsr-memoire-technique`, `memoire-technique-cmco`) en jouant le rôle inverse : **celui qui note, pas celui qui rédige**.

## Public cible
Responsables d'affaires, chargés d'études, dirigeants TPE/PME BTP, AMO côté entreprise — tous corps d'état (gros œuvre, second œuvre, étanchéité, couverture, bardage, peinture, plomberie, électricité, VRD, TP, génie civil, monuments historiques).

## Pourquoi ce skill existe
La très grande majorité des mémoires techniques rédigés par les TPE/PME BTP sont notés **5 à 7/10** par les évaluateurs, alors qu'ils pourraient atteindre **8 à 9/10** avec 4-5 corrections ciblées. Un mémoire qui passe de 6/10 à 8/10 sur une pondération valeur technique de 60 % gagne **12 points de score final** — souvent l'écart entre attributaire et 2ᵉ.

---

## Prérequis avant lancement

Pour donner un avis utile, demander à l'utilisateur (et n'avancer qu'avec ces éléments) :
1. **Le mémoire technique à auditer** (Word, PDF ou copier-coller)
2. **Le Règlement de Consultation (RC)** ou au minimum la liste des **critères de jugement avec leur pondération** (ex : Valeur technique 60 %, Prix 40 %)
3. **Le CCTP** (au moins le sommaire et les pages d'exigences techniques clés) — pour détecter les manques
4. *(idéalement)* **La grille de notation détaillée du RC** si l'acheteur l'a publiée (sous-critères, barème)

Si un seul élément manque, demander avant de produire l'audit — un audit sans critères pondérés vaut très peu.

---

## Workflow d'audit en 6 étapes

### Étape 1 — Reconstituer la grille d'évaluation
Lire le RC (ou les éléments fournis), extraire la liste exacte des critères pondérés et leurs sous-critères. Si l'acheteur n'a pas détaillé les sous-critères, reconstituer une grille type à partir de `references/grille-notation.md`.

### Étape 2 — Noter section par section comme un évaluateur
Pour chaque critère pondéré, attribuer **une note probable sur le barème de l'acheteur** (généralement /10 ou /20), avec justification factuelle (ce qui est présent / ce qui manque / ce qui est faible). Ne **jamais** se contenter d'un avis général — toujours noter par critère.

### Étape 3 — Identifier les faiblesses récurrentes
Passer le mémoire au crible des 30 faiblesses récurrentes documentées dans `references/checklist-faiblesses.md` (généralités sans chiffres, plaquette générique, absence d'analyse du site, planning sans jalons, etc.).

### Étape 4 — Détecter les informations manquantes au regard du CCTP/RC
Pointer **explicitement** ce qui est exigé par le CCTP/RC mais absent du mémoire (méthodologie sur un poste précis, qualification, référence, etc.). Ces oublis sont les plus coûteux car ils sont **éliminatoires ou pénalisants sévèrement**.

### Étape 5 — Hiérarchiser les améliorations prioritaires
Sortir un **top 5 des améliorations à fort effet de levier** (impact estimé en points de notation), classées par ROI temps/gain de note.

### Étape 6 — Rendre le rapport d'audit final
Produire le rapport selon le template `assets/template-rapport-controle.md` : note globale estimée, scoring détaillé, top 10 faiblesses, top 5 améliorations, verdict.

---

## Prompt 1 — Reconstituer la grille d'évaluation

```
Tu es évaluateur senior de marchés publics BTP côté maître d'ouvrage (DCPA, OPPIC, bailleur social, MOA privée, AMO).

Voici les critères de jugement du Règlement de Consultation :
[Coller la section "critères de jugement" du RC]

Reconstitue la GRILLE D'ÉVALUATION COMPLÈTE que va appliquer la commission :
1. Liste chaque critère pondéré avec son poids
2. Pour chaque critère, décompose en 3 à 6 sous-critères évaluables (même si le RC ne les précise pas)
3. Indique pour chaque sous-critère : ce que cherche l'évaluateur (en 1 phrase) et le barème implicite
4. Précise les éventuels critères éliminatoires (qualifications, références, visite obligatoire)

Présente sous forme de tableau structuré exploitable pour noter le mémoire.
```

---

## Prompt 2 — Noter le mémoire critère par critère

```
Tu es évaluateur senior. Voici la grille reconstituée à l'étape 1 :
[Coller la grille]

Voici le mémoire technique à noter :
[Coller le mémoire — ou le PDF/Word fourni]

Voici le CCTP de référence (extrait pertinent) :
[Coller le CCTP ou son sommaire]

Note ce mémoire sous-critère par sous-critère.
Pour chaque sous-critère :
- Note attribuée (ex : 6/10)
- Justification factuelle (3 lignes max, citations du mémoire à l'appui)
- Ce qui manque pour atteindre la note maximale (1 à 3 points concrets)

À la fin :
- Note pondérée par critère (ex : Méthodologie 7/10 × 40 % = 28/40)
- Note globale estimée /100 sur la valeur technique
- Positionnement probable face à un concurrent moyen (avantage / équivalent / désavantage)

Reste FACTUEL et SÉVÈRE — c'est le rôle de l'évaluateur, pas celui du commercial.
```

---

## Prompt 3 — Détecter les faiblesses récurrentes

```
Tu es relecteur expert en mémoires techniques BTP. Voici le mémoire :
[Coller le mémoire]

Passe-le au crible des 30 FAIBLESSES RÉCURRENTES suivantes :

[Coller le contenu de references/checklist-faiblesses.md]

Pour chaque faiblesse détectée :
- Section concernée (page, paragraphe)
- Extrait fautif (citation littérale, 1 à 2 lignes)
- Impact estimé sur la note (-0,5 / -1 / -2 points)
- Correction recommandée en 1 phrase opérationnelle

Classe le résultat par impact décroissant. Ne signale que les faiblesses RÉELLEMENT présentes — pas un check générique.
```

---

## Prompt 4 — Détecter les informations manquantes (au regard du CCTP/RC)

```
Tu es évaluateur côté MOA. Voici le mémoire technique :
[Coller le mémoire]

Voici le CCTP / RC :
[Coller les passages exigeant des éléments dans la réponse]

Liste TOUTES les informations EXIGÉES par le CCTP/RC mais ABSENTES ou TRAITÉES TROP SUPERFICIELLEMENT dans le mémoire :
- Référence exacte de l'exigence (article CCTP / point du RC)
- Élément attendu (ex : note méthodologique sur le traitement des joints de dilatation)
- Présent dans le mémoire ? (Non / Oui mais insuffisant)
- Risque associé : éliminatoire / forte perte de points / perte modérée
- Action corrective concrète à entreprendre

Sois exhaustif. Un oubli passé inaperçu peut faire perdre le marché.
```

---

## Prompt 5 — Top 5 des améliorations prioritaires (ROI)

```
Tu es directeur d'études BTP. Tu disposes :
- Du scoring critère par critère (étape 2)
- De la liste des faiblesses (étape 3)
- Des manques au regard du CCTP (étape 4)

Le temps disponible avant remise est de [PRÉCISER : 48 h / 1 semaine / 2 semaines].

Propose le TOP 5 des AMÉLIORATIONS À FORT EFFET DE LEVIER, classées par ROI :
| # | Amélioration | Section concernée | Temps estimé | Gain de note estimé | Priorité |

Critères de sélection :
1. Gain de note ≥ 1 point sur 10
2. Réalisable dans le temps imparti
3. Pas de risque de fragiliser une autre section
4. Effet visible immédiatement pour l'évaluateur (chiffres, schéma, planning illustré)

Pour chaque amélioration, donne en 3 lignes le plan d'action opérationnel.
```

---

## Prompt 6 — Rapport d'audit final

```
Compile maintenant le RAPPORT D'AUDIT FINAL du mémoire technique selon ce template :

[Coller le contenu de assets/template-rapport-controle.md]

Sois clair, chiffré, sans complaisance. Le commercial pourra utiliser ce rapport pour décider, en 5 minutes, où concentrer les corrections avant remise.
```

---

## Production du livrable Word

Toujours générer un rapport `.docx` lisible par le dirigeant non-IA — pas seulement un échange chat.

### Format de sortie attendu
- Document Word `Rapport_Audit_MT_[NomChantier]_[Date].docx`
- Couverture : nom de l'AO, MOA, date d'audit, auditeur (l'entreprise)
- Synthèse exécutive (1 page) : note globale estimée + verdict + top 3 actions
- Scoring détaillé par critère (tableau)
- Top 10 faiblesses (tableau)
- Top 5 améliorations prioritaires (tableau avec ROI)
- Manques CCTP/RC (tableau + niveau de risque)
- Verdict final : Conforme / À risque / Non conforme + recommandation

Utiliser le skill `docx` pour générer ce livrable. Garder le template dans `assets/template-rapport-controle.md` comme structure de référence.

---

## Vocabulaire et posture de l'évaluateur

L'audit doit **se mettre dans la peau du jury** — pas dans celle du commercial qui défend son offre.

### Postures à adopter
- **Factuel** : ne juger que ce qui est écrit, pas l'intention
- **Sévère mais juste** : un évaluateur ne donne pas 10/10, il cherche les défauts
- **Comparatif** : raisonner « par rapport à un mémoire moyen de la profession »
- **Chiffré** : exiger des chiffres, des dates, des noms, des références
- **Suspicieux** : un mémoire générique = plaquette recyclée = note basse

### Phrases-types d'un évaluateur (à reproduire)
- « L'entreprise affirme X sans en démontrer la mise en œuvre concrète sur ce chantier. »
- « La méthodologie reste générique, sans adaptation aux contraintes du site. »
- « Aucune référence comparable n'est citée sur les 5 dernières années. »
- « Le planning fourni ne fait pas apparaître les jalons critiques. »
- « L'organisation QSE est présentée mais sans indicateurs de suivi. »
- « Les moyens humains ne sont pas nominativement affectés au chantier. »
- « L'analyse du site est absente — le candidat ne semble pas avoir lu le CCTP. »

---

## Ressources

- `references/grille-notation.md` — Grille type d'évaluation par critère (Valeur technique, Méthodologie, Moyens, QSE, Délais, Références) + barèmes
- `references/checklist-faiblesses.md` — Les 30 faiblesses récurrentes des mémoires techniques BTP, par section
- `references/criteres-elimitatoires.md` — Liste des motifs d'élimination ou de note plancher (à vérifier en priorité)
- `assets/template-rapport-controle.md` — Template du rapport d'audit Word

---

## Garde-fous

- **Ne jamais juger l'offre prix** — ce skill audite uniquement la valeur technique du mémoire
- **Ne pas réécrire le mémoire** — si l'utilisateur demande la réécriture après audit, basculer vers `memoire-technique-btp` ou le skill métier dédié
- **Ne pas inventer la grille de notation** si elle est absente — la reconstituer prudemment et le signaler au dirigeant
- **Toujours noter de manière chiffrée** — un audit qualitatif sans note est inexploitable
