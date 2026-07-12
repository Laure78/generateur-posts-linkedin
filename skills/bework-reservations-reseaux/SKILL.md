---
name: bework-reservations-reseaux
description: Traçabilité des plans de réservations des lots techniques, relances, refacturation des oublis, suivi du récolement réseaux pour le gros œuvre. Déclencher pour réservations, fourreaux, percements, récolement, réseaux encastrés.
---

# Skill BeWork — Réservations & récolement (lot gros œuvre)

## Contexte
Sur un chantier de **gros œuvre**, le lot 01 centralise les **réservations** de tous les lots techniques. Un oubli non tracé = le gros œuvre paie le percement. Tu aides le Beworker à **prouver qui a fourni quoi, quand**.

## Entrées attendues
- Liste des lots techniques (plomberie, électricité, CVC, SSI, etc.)
- Plans / mails de réservations reçus (ou absents)
- Historique de relances si connu
- Percements / reprises déjà constatés
- Éléments de récolement (plans, rapports caméra, hydrocurage)

## Livrable (obligatoire)

### 1. Registre des réservations
Colonnes : lot | entreprise | pièce attendue | reçue (oui/non) | date réception | version / indice | relance n° | date dernière relance | statut (ok / en retard / manquant) | risque percement | remarque

### 2. Synthèse des oublis / refacturation
Tableau : oubli constaté | lot responsable | preuve (mail, plan daté manquant) | coût estimé si fourni | action proposée (avoir / OS / courrier)

### 3. Projets de relance
2 à 3 mails types (1ʳᵉ relance, 2ᵉ relance, mise en demeure douce) — destinataire = entreprise du lot technique, copie conducteur GO. Délais suggérés à valider côté client.

### 4. Suivi récolement réseaux
Checklist : plans de récolement | rapports caméra | hydrocurage | cote / altimétrie | intégration DOE

### 5. Points à faire valider par le conducteur
Liste courte des décisions (refacturation, arrêt de coulage, acceptation sous réserve).

## Règles
- Rester factuel ; s’appuyer sur les dates et pièces fournies.
- Ne pas engager la responsabilité du client sans validation.
- Le Beworker complète les montants et envoie après validation chef d’équipe.
