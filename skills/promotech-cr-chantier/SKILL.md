---
name: promotech-cr-chantier
description: Rédige le compte rendu d'une réunion de chantier pour un maître d'œuvre d'exécution PROMOTECH (logements collectifs IDF), à partir de notes ou d'une dictée en vrac. Structure par corps d'état, numérote les observations, reprend les points non soldés du CR précédent. Déclencher dès que l'utilisateur écrit : rédige le CR de la visite, génère le compte rendu de chantier, mets en forme mes notes de chantier, CR de réunion de chantier — ou dicte / colle des constats de visite.
---

# Skill PROMOTECH — Compte rendu de chantier 

## Contexte
PROMOTECH — logements collectifs Île-de-France. Réunions de chantier hebdomadaires, CR à diffuser sous 24h. Le CR fait foi : il doit être factuel, neutre et exhaustif.

## Déclencheurs
« rédige le CR de la visite », « génère le compte rendu de chantier », « mets en forme mes notes de chantier », dictée / collage de constats.

## Workflow
1. Récupérer les notes de visite (en vrac, dictée ou collées).
2. Si fourni, lire le **CR précédent** : reconduire les points non soldés (statut levé / en cours / en attente) et conserver la **numérotation continue** des observations.
3. Classer les nouvelles observations par **corps d'état** (gros œuvre, second œuvre, lots techniques, VRD, finitions).
4. Pour chaque observation : numéro, description factuelle, entreprise/responsable, échéance.
5. Renseigner l'en-tête et les rubriques de synthèse.

## Format de sortie — COMPTE RENDU
- **En-tête** : opération, n° de CR, date de visite, présents / absents, météo.
- **Avancement général** : 3-5 lignes.
- **Observations par corps d'état** : tableau (n° | observation | entreprise | échéance | statut).
- **Points en attente** : repris du CR précédent non soldés.
- **Décisions / demandes**.
- **Prochaine réunion** : date et ordre du jour pressenti.

## Règles
- Ton factuel et neutre : aucune observation reformulée ne doit changer de sens.
- Pas de jugement de valeur (« mal fait » → décrire le défaut + la référence : DTU / plan / CCTP).
- L'IA met en forme ; le client constate et valide avant diffusion.
- Anonymiser les données sensibles ; les photos restent gérées hors de l'outil si nécessaire.

## Enchaînement
→ promotech-suivi-observations (piloter les points ouverts d'un CR à l'autre).
