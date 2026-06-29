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

/* Images générées (Higgsfield · nano_banana_pro · 2K · 16:9) servies depuis le CDN.
 * Clé = slug du véhicule (+ "hero" et "chauffeur"). Voir image-prompts.md. */
const IMG_BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3FK6JRPURIeVWZoIdPqFrRGzOje/";
const IMAGES = {
  hero:                              IMG_BASE + "hf_20260629_004332_5f25d993-7051-46cf-bc8d-a14b3de386c7_min.webp",
  chauffeur:                         IMG_BASE + "hf_20260629_004346_af7c0a61-af24-4e31-93db-bc2be75d8af7_min.webp",
  "lamborghini-huracan-evo-spyder":  IMG_BASE + "hf_20260629_004350_e74b4db5-53cd-40e4-900e-fdd90bfebc75_min.webp",
  "lamborghini-urus-s":              IMG_BASE + "hf_20260629_004354_8e52f7b6-dc4d-41b0-8af6-e9a6c5b3baac_min.webp",
  "ferrari-296-gts":                 IMG_BASE + "hf_20260629_004357_b5b960c9-213b-440c-80ad-18fd001521ee_min.webp",
  "ferrari-roma":                    IMG_BASE + "hf_20260629_004400_e5f267e9-ae4e-4d6b-955e-10a877358786_min.webp",
  "porsche-911-carrera-gts":         IMG_BASE + "hf_20260629_004403_04c4fd6a-fddb-48e8-8bd5-c500c880ac6c_min.webp",
  "porsche-911-targa-4s":            IMG_BASE + "hf_20260629_004407_c4a63874-a750-4d41-9e45-57e0842b46da_min.webp",
  "porsche-718-boxster-gts":         IMG_BASE + "hf_20260629_004410_fb24be3a-c66b-41d3-a39f-ac2cfeb8d9a7_min.webp",
  "audi-rsq8":                       IMG_BASE + "hf_20260629_004442_3c6a9c1a-54d8-4bfc-ade7-56708c69b170_min.webp",
  "audi-sq8":                        IMG_BASE + "hf_20260629_004446_15105e4c-8a6b-4155-91f7-b91cc7ed1fc9_min.webp",
  "bmw-x6-m":                        IMG_BASE + "hf_20260629_004449_baa68639-948a-4131-854f-16a64ceb69bd_min.webp",
  "mercedes-amg-g63":                IMG_BASE + "hf_20260629_004452_3a63a8c6-0c23-4316-8d1d-c09dcf77ea8b_min.webp",
  "land-rover-defender-v8":          IMG_BASE + "hf_20260629_004455_ae9bd917-b87f-48fb-835f-c7a43fb8bb6c_min.webp",
  "range-rover-sport":               IMG_BASE + "hf_20260629_004459_55dbf60d-6e38-4eb3-9305-c6f75c3fec87_min.webp",
  "range-rover-svr":                 IMG_BASE + "hf_20260629_004502_f7b0488f-ff7d-4bc3-87f8-599fe09409ee_min.webp",
  "porsche-cayenne-s-coupe":         IMG_BASE + "hf_20260629_004506_d3ff4e84-06af-40c9-89ac-7421709c78c0_min.webp",
  "porsche-macan-gts":               IMG_BASE + "hf_20260629_004509_0cead46e-9f4b-4fb7-886c-03296660a8ab_min.webp",
  "mercedes-gls-450":                IMG_BASE + "hf_20260629_004512_1d707729-30ee-4605-8b0d-37fd291463b0_min.webp",
  "mercedes-classe-s-580":           IMG_BASE + "hf_20260629_004516_6f72bd22-85ec-45d6-b6a6-b039b618548f_min.webp",
  "audi-rs6-performance":            IMG_BASE + "hf_20260629_004519_88e69cad-c285-4607-8b9c-d82f9b25a50a_min.webp",
  "mercedes-amg-sl-63":              IMG_BASE + "hf_20260629_004522_bc858dc7-2c97-4c8f-bf8a-a0d9a06ae2b6_min.webp",
  "bmw-m4-competition":              IMG_BASE + "hf_20260629_004526_ea09354f-0986-4470-8e97-4f6c535e0dbd_min.webp",
  "mercedes-amg-glc-63-s":           IMG_BASE + "hf_20260629_004529_9223bdb4-eed5-4791-bea5-83881fd17976_min.webp",
  "audi-rs3":                        IMG_BASE + "hf_20260629_004532_b06c7133-7eda-4be6-98b5-dc31b996e185_min.webp",
  "mercedes-amg-a45-s":              IMG_BASE + "hf_20260629_004535_feb906a1-7eaf-4dcc-9418-7072d558af88_min.webp",
  "volkswagen-golf-8-gti":           IMG_BASE + "hf_20260629_004539_020f6f7f-45c5-4f21-9f6b-d435518c3781_min.webp",
  "volkswagen-golf-8-r":             IMG_BASE + "hf_20260629_004542_a5eb0978-b820-4db0-b8ce-90fee4f44de0_min.webp",
  "mini-john-cooper-works":          IMG_BASE + "hf_20260629_004545_b9072c01-22d1-4cd8-95e1-34166270bb89_min.webp"
};

/* Durées par gamme (rappel affiché dans la fiche modale) — clé i18n */
const RANGE_DURATION = {
  supercar:  "duration.supercar",
  suv:       "duration.suv",
  berline:   "duration.berline",
  cabriolet: "duration.cabriolet",
  compacte:  "duration.compacte"
};
