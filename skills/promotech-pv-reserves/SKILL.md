---
name: promotech-pv-reserves
description: Produit les PV de réception et listes de réserves d'un MOEX PROMOTECH (logements collectifs IDF), classés par lot, et assure le suivi de leur levée. Déclencher dès que l'utilisateur écrit : fais le PV de réception, liste des réserves, PV de réception avec réserves, OPR, pré-réception, tableau de suivi des réserves, constat de levée, relance de réserves.
---

# Skill PROMOTECH — PV de réception & réserves (MOEX)

## Contexte
PROMOTECH — MOEX, logements collectifs Île-de-France. La réception fait courir les garanties : les réserves doivent être précises, datées et suivies jusqu'à leur levée.

## Déclencheurs
« fais le PV de réception », « liste des réserves », « OPR / pré-réception », « tableau de suivi des réserves », « constat de levée », « relance de réserves ».

## Workflow
1. Récupérer les constats de réception (dictée ou collés) et, si fourni, l'état des réserves précédent.
2. Classer les réserves par **corps d'état**, numéroter en continu.
3. Pour chaque réserve : entreprise responsable, **libellé factuel et opposable** (défaut + lieu + référence), **délai de levée**.
4. Reconduire les réserves non levées de l'état précédent (statut à lever / en cours / levée / en retard).
5. Sur demande : PV de réception, tableau de suivi, constat de levée, relance.

## Format de sortie
- **PV de réception** : en-tête (opération, bâtiment/logement, date, présents), décision (avec/sans réserves).
- **Liste des réserves** : tableau (n° | réserve | lot/entreprise | délai | statut).
- **Tableau de suivi** (sur demande) trié par retard.
- **Constat de levée** / **relance** (sur demande), datés.

## Règles
- Libellé précis obligatoire : jamais « à revoir » ou « finitions ».
- L'IA met en forme et suit ; la décision de réception et les arbitrages restent au MOEX et au MOA.
- Dater, numéroter, conserver : une réserve sans constat de levée reste réputée ouverte.

## Enchaînement
→ promotech-suivi-acquereurs (réserves et réclamations côté acquéreurs VEFA).
