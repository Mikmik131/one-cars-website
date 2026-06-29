# RM Luxury — Site vitrine

Site vitrine ultra-premium pour **RM Luxury**, agence parisienne de location de
voitures de prestige, sportives et supercars (avec ou sans chauffeur).

> *On ne vend pas du rêve, on en loue.*

## Stack

100 % statique, zéro framework, zéro backend.

- `index.html` — page unique immersive (hero, stats, manifeste, catalogue, avec chauffeur, conditions, contact/configurateur, footer).
- `assets/css/styles.css` — système de design (luxe éditorial sombre, accent or unique, anti-slop, reduced-motion-safe).
- `assets/js/data.js` — les 27 véhicules (slug, nom, gamme, couleur).
- `assets/js/i18n.js` — dictionnaire trilingue complet **FR · EN · ES** (toutes les clés + points forts / « pourquoi » / descriptions des 27 modèles).
- `assets/js/main.js` — preloader, nav, switcher de langue, reveals, compteurs, rendu des cartes, fiche modale, configurateur → WhatsApp.
- `mentions-legales.html`, `conditions-generales.html`, `confidentialite.html` — squelettes légaux (placeholders `[…]` à compléter).
- `robots.txt`, `sitemap.xml`, `favicon.svg`, `favicon-512.png`, `og-image.jpg`.

## Lancer en local

```bash
python3 -m http.server 4188
# puis http://localhost:4188/  (jamais file://)
```

## Multilingue

i18n vanilla : chaque texte porte `data-i18n="cle"`. Choix mémorisé en
`localStorage`, sinon `navigator.language`, sinon FR. Met à jour `<html lang>`,
`<title>`, la meta description et le message WhatsApp dans la langue active.

## Réservation

Configurateur 3 étapes (véhicule → détails → récap) qui construit un lien
`wa.me` pré-rempli dans la langue active. Numéro : **06 63 23 41 17**.

## ⏳ Étape suivante — Images IA (Higgsfield)

Le squelette utilise des **placeholders élégants** (`.media-ph`). Les 29 visuels
photoréalistes (hero + chauffeur + 27 véhicules) restent à générer via
Higgsfield (`nano_banana_pro`, 2K, 16:9, ~2 cr/image, **cap 60 crédits**), puis
à intégrer en WebP dans `assets/img/` avec `width`/`height` explicites.
Voir le brief §7 pour la procédure et les prompts.

## ⚠️ À valider avant mise en ligne

- Aucun chiffre technique (ch, 0-100, places) n'a été inventé — les fiches
  restent en architecture moteur + occasion, conformément au brief.
- Compléter les placeholders `[…]` des pages légales.
- Remplacer le domaine `rmluxury.fr` (canonical / hreflang / OG / JSON-LD) par
  le domaine définitif.
