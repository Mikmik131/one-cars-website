/* RM Luxury — Données véhicules
 * Source unique de vérité : slug, nom (jamais traduit), gamme, couleur.
 * Les points forts / "pourquoi" traduits vivent dans i18n.js (clé = slug).
 * colorEn = couleur en anglais, utilisée pour les prompts Higgsfield.
 */
const RANGES = [
  { key: "supercar",  i18n: "range.supercar"  },
  { key: "suv",       i18n: "range.suv"        },
  { key: "berline",   i18n: "range.berline"    },
  { key: "cabriolet", i18n: "range.cabriolet"  },
  { key: "compacte",  i18n: "range.compacte"   }
];

const VEHICLES = [
  /* ── SUPERCAR & PRESTIGE ───────────────────────────────────────── */
  { slug: "lamborghini-huracan-evo-spyder", name: "Lamborghini Huracán EVO Spyder", range: "supercar", color: "Vert lime",  colorEn: "lime green" },
  { slug: "lamborghini-urus-s",             name: "Lamborghini Urus S",             range: "supercar", color: "Bleu nuit",  colorEn: "midnight blue" },
  { slug: "ferrari-296-gts",                name: "Ferrari 296 GTS",                range: "supercar", color: "Bordeaux",   colorEn: "deep burgundy" },
  { slug: "ferrari-roma",                   name: "Ferrari Roma",                   range: "supercar", color: "Noir",       colorEn: "black" },
  { slug: "porsche-911-carrera-gts",        name: "Porsche 911 Carrera GTS",        range: "supercar", color: "Argent",     colorEn: "silver" },
  { slug: "porsche-911-targa-4s",           name: "Porsche 911 Targa 4S",           range: "supercar", color: "Gris",       colorEn: "grey" },
  { slug: "porsche-718-boxster-gts",        name: "Porsche 718 Boxster GTS",        range: "supercar", color: "Rouge",      colorEn: "red" },

  /* ── SUV SPORTIVE & LUXE ───────────────────────────────────────── */
  { slug: "audi-rsq8",                      name: "Audi RSQ8",                      range: "suv", color: "Gris",       colorEn: "grey" },
  { slug: "audi-sq8",                       name: "Audi SQ8",                       range: "suv", color: "Gris foncé", colorEn: "dark grey" },
  { slug: "bmw-x6-m",                       name: "BMW X6 M",                       range: "suv", color: "Noir",       colorEn: "black" },
  { slug: "mercedes-amg-g63",              name: "Mercedes-AMG G63",               range: "suv", color: "Blanc",      colorEn: "white" },
  { slug: "land-rover-defender-v8",         name: "Land Rover Defender V8",         range: "suv", color: "Gris",       colorEn: "grey" },
  { slug: "range-rover-sport",              name: "Range Rover Sport",              range: "suv", color: "Blanc",      colorEn: "white" },
  { slug: "range-rover-svr",                name: "Range Rover SVR",                range: "suv", color: "Argent",     colorEn: "silver" },
  { slug: "porsche-cayenne-s-coupe",        name: "Porsche Cayenne S Coupé",        range: "suv", color: "Gris",       colorEn: "grey" },
  { slug: "porsche-macan-gts",              name: "Porsche Macan GTS",              range: "suv", color: "Noir",       colorEn: "black" },
  { slug: "mercedes-gls-450",               name: "Mercedes GLS 450",               range: "suv", color: "Noir",       colorEn: "black" },

  /* ── BERLINE DE LUXE ───────────────────────────────────────────── */
  { slug: "mercedes-classe-s-580",          name: "Mercedes Classe S 580",          range: "berline", color: "Noir",   colorEn: "black" },

  /* ── SPORTIVE PREMIUM & CABRIOLET ──────────────────────────────── */
  { slug: "audi-rs6-performance",           name: "Audi RS6 Performance",           range: "cabriolet", color: "Noir",        colorEn: "black" },
  { slug: "mercedes-amg-sl-63",             name: "Mercedes-AMG SL 63",             range: "cabriolet", color: "Gris bleuté", colorEn: "blue-grey" },
  { slug: "bmw-m4-competition",             name: "BMW M4 Competition",             range: "cabriolet", color: "Noir",        colorEn: "black" },
  { slug: "mercedes-amg-glc-63-s",          name: "Mercedes-AMG GLC 63 S",          range: "cabriolet", color: "Blanc",       colorEn: "white" },

  /* ── SPORTIVE COMPACTE ─────────────────────────────────────────── */
  { slug: "audi-rs3",                       name: "Audi RS3",                       range: "compacte", color: "Gris",         colorEn: "grey" },
  { slug: "mercedes-amg-a45-s",             name: "Mercedes-AMG A45 S",             range: "compacte", color: "Noir",         colorEn: "black" },
  { slug: "volkswagen-golf-8-gti",          name: "Volkswagen Golf 8 GTI",          range: "compacte", color: "Rouge",        colorEn: "red" },
  { slug: "volkswagen-golf-8-r",            name: "Volkswagen Golf 8 R (Akrapovič)",range: "compacte", color: "Gris",         colorEn: "grey" },
  { slug: "mini-john-cooper-works",         name: "Mini John Cooper Works",         range: "compacte", color: "Rouge & noir", colorEn: "red with black roof" }
];

/* Durées par gamme (rappel affiché dans la fiche modale) — clé i18n */
const RANGE_DURATION = {
  supercar:  "duration.supercar",
  suv:       "duration.suv",
  berline:   "duration.berline",
  cabriolet: "duration.cabriolet",
  compacte:  "duration.compacte"
};
