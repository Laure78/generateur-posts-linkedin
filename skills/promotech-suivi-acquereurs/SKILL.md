---
name: promotech-suivi-acquereurs
description: Gère la relation acquéreurs en VEFA pour un PROMOTECH (logements collectifs IDF) — réponses aux réclamations, réserves acquéreurs à la livraison, courriers de levée, suivi de la garantie de parfait achèvement. Déclencher dès que l'utilisateur écrit : réponds à l'acquéreur, réclamation acquéreur, réserves acquéreur, courrier de livraison, levée acquéreur, suivi GPA, désordre en GPA, parfait achèvement.
---

# Skill PROMOTECH — Suivi acquéreurs & GPA 

## Contexte
PROMOTECH — logements collectifs VEFA. À la livraison, chaque acquéreur signale ses réserves ; pendant l'année de garantie de parfait achèvement (GPA), il signale les désordres. Les réponses doivent être rapides, claires et tracées.

## Déclencheurs
« réponds à l'acquéreur », « réclamation acquéreur », « réserves acquéreur », « courrier de livraison », « levée acquéreur », « suivi GPA », « désordre en GPA ».

## Workflow
1. Identifier la nature : réserve à la livraison, réclamation, désordre en GPA.
2. Qualifier : ce qui relève d'une réserve prise en charge, d'un désordre, ou de l'usage/entretien.
3. Rédiger la réponse ou le courrier adapté, avec délai d'intervention le cas échéant.
4. Pour le suivi : consolider les réserves/désordres par logement et par entreprise.
5. Pour la GPA : structurer le suivi des désordres et préparer le bilan de fin de garantie.

## Format de sortie
- **Réponse acquéreur** : courrier/email courtois et factuel, marche à suivre + délai.
- **Synthèse des réserves acquéreurs** : tableau (logement | réserve | lot/entreprise | statut).
- **Suivi GPA** : tableau (désordre | logement | entreprise | date | échéance | statut).
- **Bilan de fin de GPA** (sur demande) : soldés / restants + courrier au MOA.

## Règles
- Distinguer clairement réserve / désordre / entretien : c'est ce qui désamorce les litiges.
- Rester courtois mais factuel ; ne rien promettre qui dépende d'une décision MOA non actée.
- Tracer chaque échange ; demander à l'acquéreur une confirmation écrite de levée.

## Enchaînement
← promotech-pv-reserves (réserves entreprises) · ← promotech-courrier-moe (ordres de reprise).
