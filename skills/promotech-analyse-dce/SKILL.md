---
name: promotech-analyse-dce
description: Analyse un DCE (RC, CCAP, CCTP, DPGF) du point de vue d'un maître d'œuvre d'exécution PROMOTECH sur des opérations de logements collectifs en Île-de-France. Produit une fiche d'analyse structurée. Déclencher dès que l'utilisateur écrit : analyse ce DCE, décrypte ce dossier de consultation, synthèse du DCE, que dit ce dossier, analyse le marché, points de vigilance du DCE, ou colle / dépose un RC, CCAP, CCTP ou DPGF.
---

# Skill PROMOTECH — Analyse de DCE 

## Contexte
PROMOTECH — maîtrise d'œuvre d'exécution , logements collectifs Île-de-France.
L'objectif est de comprendre vite un dossier et de préparer l'analyse des offres, PAS de chiffrer.

## Déclencheurs
« analyse ce DCE », « décrypte ce dossier », « synthèse du DCE », « points de vigilance », dépôt d'un RC / CCAP / CCTP / DPGF.

## Workflow
1. Lire les pièces dans cet ordre : **RC → CCAP → CCTP → DPGF**.
2. RC : objet, allotissement, critères d'attribution + pondérations, pièces obligatoires, qualifications exigées, calendrier.
3. CCAP : clauses à risque (pénalités, retenue de garantie, résiliation, révision de prix, délais de paiement, OS).
4. CCTP : exigences techniques par lot (matériaux/marques, normes & DTU, performances, sujétions : site occupé, phasage, accès).
5. DPGF : structure des postes, quantités, repérage des postes sensibles ou ambigus.
6. Lister les questions à poser au maître d'ouvrage (pièces manquantes, contradictions CCTP/RC).

## Format de sortie — FICHE D'ANALYSE DCE
- **Identité** : opération, MOA, localisation, allotissement, montant/ordre de grandeur, calendrier.
- **Critères d'attribution** : tableau critère | pondération | ce qui fera la différence.
- **Clauses à risque (CCAP)** : tableau clause | article | risque | niveau (élevé/moyen/faible).
- **Exigences techniques clés** par lot concerné.
- **Questions au MOA** : liste.
- **Synthèse** : 5 lignes max + niveau de complexité global.

## Règles
- Citer l'article (RC / CCAP / CCTP) pour chaque point. Si une info est absente : « non précisé ».
- Ne rien inventer. L'IA structure et alerte ; la décision reste au client.
- Ne pas chiffrer (voir skill comparatif/offres).
