---
name: 3dmanager-cr-chantier
description: Rédige et met en forme les comptes rendus de réunion de chantier de 3D MANAGER (bureau d'études TCE / maîtrise d'œuvre d'exécution, agence Île-de-France) à partir de notes brutes, d'une dictée en vrac ou d'un vocal transcrit, et d'un historique de CR. Produit un .docx à la charte graphique 3D MANAGER — structure par corps d'état, observations numérotées en continu, reprise et mise à jour des points non soldés du CR précédent (statut Levé / En cours / En attente), bandeau logoté et pied de page légal ISO 9001. Déclencher dès que l'utilisateur écrit « rédige le CR de la visite », « génère le compte rendu de chantier », « mets en forme mes notes de chantier », « CR à la charte 3D Manager », « compte rendu MOEX », « nouveau CR à partir du précédent », ou dès qu'il fournit, dicte ou colle des constats de visite avec ou sans le CR précédent. Compatible tous lots TCE. Toujours utiliser ce skill plutôt que de rédiger un CR à la main quand un compte rendu de chantier 3D MANAGER est demandé.
---

# 3D MANAGER — Compte rendu de chantier (MOEX, charte graphique)

## Contexte
3D MANAGER est un bureau d'études pluridisciplinaire TCE, maître d'œuvre d'exécution (MOEX), certifié ISO 9001, agence Île-de-France. Les réunions de chantier sont hebdomadaires et le CR doit être diffusable sous 24 h. **Le CR fait foi** : il doit être factuel, neutre, exhaustif et traçable. Le MOEX constate et valide ; l'outil met en forme.

## Workflow

1. **Récupérer la matière** : notes en vrac, dictée transcrite ou vocal retranscrit. Si un fichier audio est fourni, demander une transcription texte au préalable (Claude ne traite pas l'audio brut de façon fiable) — ou inviter l'utilisateur à dicter directement.
2. **Lire l'historique** s'il est fourni (CR précédent) :
   - reconduire **chaque point non soldé** avec son statut mis à jour : `Levé`, `En cours`, `En attente`, ou `Nouveau` ;
   - **conserver la numérotation continue** des observations (préfixe par lot : `GO-`, `FAC-`, `ETA-`, `MEXT-`, `CLO-`, `ELE-`, `CVC-`, `VRD-`, `GEN-` …). Ne jamais renuméroter un point existant.
3. **Classer les nouvelles observations par corps d'état** (gros œuvre → second œuvre → lots techniques → VRD → finitions → coordination/généralités).
4. Pour chaque observation : **numéro · description factuelle · échéance · statut**. Pas de jugement de valeur (décrire le défaut + la référence : DTU, plan, CCTP), ne jamais changer le sens d'un constat.
5. **Renseigner l'en-tête et les rubriques de synthèse** (avancement, points soldés, points en attente, décisions, prochaine réunion).
6. **Générer le .docx** via le script (voir ci-dessous), puis le présenter à l'utilisateur pour validation avant diffusion.

## Génération du document

Construire un fichier `cr_data.json` (schéma plus bas), puis :

```bash
cd <dossier-du-skill>
pip install python-docx Pillow --break-system-packages -q   # si nécessaire
python3 scripts/generate_cr.py cr_data.json /chemin/sortie/CR.docx
```

Sur BeWork, le script est invoqué automatiquement après production du JSON ; chemin skill : `skills/3dmanager-cr-chantier/`.

### Charte graphique officielle (implémentée dans `scripts/generate_cr.py`)

| Élément | Valeur |
|--------|--------|
| Anthracite (bandeaux, texte fort) | `#2A2A2A` |
| Rouge de marque (accents, filets, « D ») | `#CC2A2A` |
| Fonds clairs (en-têtes tableau, blocs info) | `#F2F2F2` |
| Logo | `assets/logo_3dmanager.png` — bandeau anthracite en **corps du document** (1re page) + en-tête Word ; version optimisée pour fond `#2A2A2A` |
| Pied de page | BET TCE · MOEX · ISO 9001 — réseau : Siège · Atlantique · Aquitaine · Méditerranée · Île-de-France |
| Coordonnées | Email / site en repli (à confirmer avec 3D MANAGER) |

Le rendu (couleurs, logo, polices, mentions légales) est centralisé dans le **bloc CHARTE** en tête de `scripts/generate_cr.py`. Ne pas déroger à ces codes couleur pour les bandeaux et accents.

## Schéma `cr_data.json`

```json
{
  "operation": "38 logements collectifs + local commercial · R+5 / 1 niveau de sous-sol",
  "adresse": "[n°, rue] — [Commune] (94)",
  "moex": "3D MANAGER · Agence Île-de-France",
  "architecte": "[ATELIER]",
  "bureau_controle": "[BC]",
  "csps": "CSPS [coordonnateur]",
  "cr_numero": 25,
  "date_visite": "jeudi 04 juin 2026, 9 h 30",
  "redacteur": "[Prénom NOM], 3D MANAGER",
  "diffusion": "sous 24 h, par voie dématérialisée",
  "meteo": "pluie en matinée, 16 °C",
  "presents": ["MOA", "MOEX", "Architecte", "BC", "Lot 02 GO", "Lot 14 CVC"],
  "absents": ["CSPS (excusé)"],
  "avancement": "Paragraphe de 3 à 5 lignes : phase, points bloquants, conformité planning.",
  "lots": [
    {
      "nom": "Lot 02 — Gros œuvre",
      "entreprise": "ENT. [A]",
      "observations": [
        {"num": "GO-29", "texte": "Reprise des balèvres trémie ascenseur R+2 : réalisée et contrôlée.", "echeance": "—", "statut": "Levé"},
        {"num": "GO-31", "texte": "Réservations fluides R+4 non conformes. Plan d'attentes à diffuser. Bloque le rebouchage.", "echeance": "09/06", "statut": "En attente"}
      ]
    }
  ],
  "points_soldes": ["GO-29", "ETA-09", "MEXT-06"],
  "points_attente": ["GO-31 (réservations R+4)", "CVC-07 (plan d'attentes)"],
  "decisions": ["Synthèse technique Lot 02 / Lot 14 le 09/06 à 14 h sur site.", "Protection lourde toiture autorisée."],
  "prochaine_reunion": {"date": "Jeudi 11 juin 2026, 9 h 30, sur site.", "ordre_du_jour": "Levée GO-31, avancement ITE R+5, point planning livraison."},
  "mention_approbation": "Le présent compte rendu est réputé approuvé sans observation écrite des destinataires dans un délai de 8 jours."
}
```

Champs facultatifs : tout champ vide est ignoré. Le nom de sortie par défaut suit le format `CR_[Operation]_N[xx].docx`.

## Statuts et code couleur (gérés automatiquement par le script)
- **Levé** — vert · **En cours** — orange · **En attente** — rouge charte · **Nouveau** — bleu charte.

## Règles d'or
- Ton **factuel et neutre** ; un constat reformulé ne doit jamais changer de sens.
- **Pas de jugement** (« mal fait » → décrire le défaut + référence DTU / plan / CCTP).
- **Continuité** : reprendre tous les points ouverts du CR précédent ; numérotation jamais réattribuée.
- **Anonymiser** les données sensibles ; les photos sont gérées hors de l'outil si nécessaire.
- Le MOEX **valide avant diffusion** : présenter le .docx, ne pas considérer le CR comme définitif.

## Enchaînement
→ Suivi des observations d'un CR à l'autre (tableau des points ouverts, relances, ordre du jour de la réunion suivante).
