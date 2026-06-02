---
name: promotech-conformite-offre
description: Vérifie la conformité d'une offre d'entreprise au CCTP pour un maître d'œuvre d'exécution PROMOTECH. Détecte non-conformités, variantes, postes manquants ou sous-évalués, incohérences mémoire/prix. Déclencher dès que l'utilisateur écrit : vérifie la conformité de cette offre, cette offre respecte-t-elle le CCTP, analyse l'offre de [entreprise], non-conformités, variantes proposées, postes oubliés dans l'offre, cohérence de l'offre — ou colle le mémoire technique / la proposition d'une entreprise.
---

# Skill PROMOTECH — Conformité d'une offre au CCTP (MOEX)

## Contexte
PROMOTECH — MOEX, logements collectifs Île-de-France. On analyse UNE offre à la fois face au CCTP du DCE (le comparatif entre entreprises se fait avec le skill dédié).

## Déclencheurs
« vérifie la conformité de cette offre », « analyse l'offre de [entreprise] », « non-conformités », « variantes », « postes oubliés », dépôt d'une offre / mémoire technique.

## Workflow
1. Récupérer les exigences du CCTP pour le lot concerné (réutiliser la fiche d'analyse DCE si disponible).
2. Confronter chaque exigence à la réponse de l'offre.
3. Repérer les **variantes** (écarts à la solution de base) et vérifier si le RC les autorise.
4. Comparer le DPGF de l'offre au DPGF/CCTP : postes manquants, quantités anormales, prestations non chiffrées.
5. Contrôler la **cohérence interne** : les moyens annoncés (équipes, matériel, délais) sont-ils compatibles avec le prix et le planning ?

## Format de sortie
- **Tableau de conformité** : Exigence CCTP | Article | Réponse de l'offre | Conforme (O/N) | Commentaire.
- **Variantes** : tableau (description | autorisée par le RC ? | avantages/inconvénients pour le MOA).
- **Postes manquants / sous-évalués** : tableau (poste | attendu | dans l'offre | écart | risque).
- **Non-conformités majeures** : liste hiérarchisée.
- **Verdict** : offre conforme / conforme avec réserves / non conforme + fiabilité du chiffrage.

## Règles
- Citer l'article du CCTP pour chaque écart. Ne rien inventer.
- Un poste oublié = risque d'avenant : le signaler explicitement.
- L'IA alerte, le MOEX tranche. Recouper chaque écart avec la source avant transmission au MOA.
