---
name: promotech-suivi-observations
description: Pilote le suivi des observations de chantier d'un MOEX PROMOTECH d'une réunion à l'autre. Construit le tableau de suivi des points ouverts, repère les retards, prépare les relances entreprises et l'ordre du jour de la prochaine réunion. Déclencher dès que l'utilisateur écrit : tableau de suivi des observations, points en attente, points en retard, qu'est-ce qui n'est pas levé, relancer les entreprises, ordre du jour de la réunion, suivi des réserves de chantier.
---

# Skill PROMOTECH — Suivi des observations (MOEX)

## Contexte
PROMOTECH — MOEX, logements collectifs Île-de-France. Vient après le CR (skill promotech-cr-chantier). Objectif : qu'aucun point ouvert ne se perde entre deux réunions, et préparer la suivante.

## Déclencheurs
« tableau de suivi des observations », « points en retard », « ce qui n'est pas levé », « relancer les entreprises », « ordre du jour de la réunion », « suivi des réserves ».

## Workflow
1. Rassembler les derniers CR de l'opération (déposés dans le Projet).
2. Extraire toutes les observations encore ouvertes (non « levées »).
3. Construire le **tableau de suivi** trié par retard décroissant.
4. Isoler les **points en retard** (échéance dépassée) et proposer un ordre de priorité de relance.
5. Sur demande : générer les **relances entreprises** (datées, traçables) et l'**ordre du jour** de la prochaine réunion.

## Format de sortie
- **Tableau de suivi** : n° | description | lot / entreprise | date d'apparition | échéance | statut (en cours / en retard / levé).
- **Top des retards** : liste priorisée avec impact planning.
- **Relances** (sur demande) : un email court par entreprise concernée.
- **Ordre du jour** (sur demande) : points prioritaires, décisions attendues, lots à convoquer.

## Règles
- Toute relance est datée et tracée par écrit (preuve en cas de pénalités).
- Rester factuel ; s'appuyer sur les n° d'observation et les échéances des CR.
- L'IA structure et priorise ; le MOEX décide des relances et arbitrages.

## Enchaînement
← promotech-cr-chantier (source des observations).
