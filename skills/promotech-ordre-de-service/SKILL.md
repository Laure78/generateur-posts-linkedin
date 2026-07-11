---
name: promotech-ordre-de-service
description: Rédige des ordres de service (OS) conformes pour un maître d'œuvre d'exécution PROMOTECH (logements collectifs IDF) — prolongation de délai, arrêt/reprise, prescription technique. Garantit les mentions obligatoires et l'opposabilité. Déclencher dès que l'utilisateur écrit : rédige un OS, ordre de service, OS de prolongation, OS d'arrêt, OS de reprise, prescription par OS, prolonger le délai du lot, suspendre les travaux.
---

# Skill PROMOTECH — Ordre de service 

## Contexte
PROMOTECH — logements collectifs Île-de-France. L'OS est un acte qui engage : il n'est opposable que complet et notifié dans les formes.

## Déclencheurs
« rédige un OS », « OS de prolongation / d'arrêt / de reprise », « prescription par OS », « prolonger le délai », « suspendre les travaux ».

## Workflow
1. Identifier la nature de l'OS (prolongation de délai, arrêt, reprise, prescription technique).
2. Récupérer le contexte : marché/lot, entreprise, motif, dates, fondement (plan / CCTP / décision MOA).
3. Rédiger l'OS à la trame PROMOTECH avec toutes les mentions obligatoires.
4. Calculer et indiquer l'incidence sur le délai et le prix (« sans incidence » si applicable).
5. Signaler toute mention manquante au lieu de l'inventer.

## Format de sortie — ORDRE DE SERVICE
- En-tête (opération, MOA, MOE) ; **n° d'OS** ; marché / lot ; entreprise destinataire.
- **Objet** et **prescription** précise.
- **Date d'effet** et délai d'exécution.
- **Incidence** sur le délai et/ou le prix (ou « sans incidence »).
- Pour un arrêt : conséquences (gardiennage, repli, conservation des ouvrages).
- Mention de **notification** + emplacement de signature.

## Règles
- Rattacher toute prescription à une pièce (plan / CCTP / décision MOA).
- Ton neutre et factuel. L'IA met en forme ; la décision reste au client (et au MOA quand requis).
- Toujours préciser l'incidence prix, même nulle. Dater, numéroter, notifier.

## Enchaînement
→ promotech-courrier-moe (relance ou mise en demeure si l'OS n'est pas suivi d'effet).
