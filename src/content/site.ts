/**
 * ALL site copy lives here. Components never hard-code text.
 *
 * Rules for editing:
 * - Anything starting with "TODO:" renders as a visible placeholder on the page
 *   until you replace it. Search this file for "TODO:" to see what's left.
 * - Keep `en` and `es` in the same shape; TypeScript will complain if they drift.
 * - Never put numbers here that aren't true.
 */

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A string that may still be a "TODO: ..." placeholder. */
export type Copy = string;

export const isTodo = (value: string | null | undefined): boolean =>
  typeof value === "string" && value.trimStart().startsWith("TODO:");

type LinkItem = { label: string; href: string };


type Client = {
  id: string;
  name: string;
  kind: string;
  place?: string;
  role: string;
  /** Full URL, or a TODO string. */
  url: Copy;
  /** Shown without protocol, e.g. "777impro.art". Empty when url is a TODO. */
  urlLabel: string;
  /** Path under /public/clients, or null until you add the logo. */
  logo: string | null;
  note?: Copy;
};


export type SiteContent = {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  nav: {
    skip: string;
    home: string;
    work: string;
    contact: string;
    /** Label for the link that switches to the *other* language. */
    otherLanguage: string;
    otherLanguageName: string;
    theme: { label: string; light: string; dark: string; system: string };
  };
  hero: {
    brand: string;
    tagline: string;
    founded: string;
    ctaWork: string;
    ctaContact: string;
    place: string;
    timezone: string;
  };
  services: {
    title: string;
    items: { id: string; title: string; body: string; artifact: string; sample: string }[];
  };
  clients: {
    title: string;
    intro: string;
    items: Client[];
    logoPending: string;
  };
  caseInspira: {
    title: string;
    lede: string;
    facts: { value: string; label: string }[];
    learned: string;
    screenshots: Copy;
  };
  openImpro: {
    title: string;
    lede: string;
    pillars: { title: string; body: string }[];
    today: string;
    repoStatus: string;
    repoLink: LinkItem;
    siteLink: LinkItem;
  };
  stack: {
    title: string;
    lede: string;
    tools: string[];
    supabaseLabel: string;
    /** Edit freely: remove anything you haven't used in production. */
    supabaseFeatures: string[];
    counter: {
      label: string;
      live: string;
      connecting: string;
      polling: string;
      fallback: string;
      /** Static number shown when Supabase env vars are missing. */
      fallbackValue: number | null;
      fallbackTodo: Copy;
    };
    ai: { title: string; tools: string[]; body: string };
    cycle: { title: string; body: string };
  };
  founder: {
    title: string;
    name: string;
    lines: string[];
    quote: string;
    link: LinkItem;
  };
  contact: {
    title: string;
    lede: string;
    email: Copy;
    emailLabel: string;
    links: LinkItem[];
  };
  notFound: { title: string; body: string; back: string };
  todoLabel: string;
  ui: {
    illustrative: string;
    photoSlot: string;
    photoTodo: Copy;
    screenshotSlot: string;
    footer: string;
  };
};


// Illustrative samples for the services section (labelled "illustrative" on the page).
const sampleTicket = "qr";
const sampleBot = `insert into bot_messages (intent, created_at)
values ('ticket_price', now());`;
const sampleData = `select show, sold, capacity
from show_sales
where sold >= capacity;  -- sold out: alert`;

const github: LinkItem = { label: "GitHub @eserafasi", href: "https://github.com/eserafasi" };
const instagram: LinkItem[] = [
  { label: "Instagram @openimpro.tech", href: "https://www.instagram.com/openimpro.tech/" },
  { label: "Instagram @777impro", href: "https://www.instagram.com/777impro/" },
  { label: "Instagram @proyectococoloco", href: "https://www.instagram.com/proyectococoloco/" },
];

const CONTACT_EMAIL: Copy = "TODO: contact email (e.g. hola@im-pro.tech)";

const clientsBase = {
  cocoloco: {
    id: "cocoloco",
    name: "Proyecto Cocoloco",
    url: "TODO: Proyecto Cocoloco website URL",
    urlLabel: "",
    logo: null,
  },
  s777: { id: "777", name: "777", url: "https://777impro.art", urlLabel: "777impro.art", logo: null },
  lugoschol: {
    id: "lugoschol",
    name: "Lugoschol",
    url: "TODO: Lugoschol website URL",
    urlLabel: "",
    logo: null,
  },
  inspira: {
    id: "inspira",
    name: "Inspira Impro Fest",
    url: "https://inspiraimprofest.art",
    urlLabel: "inspiraimprofest.art",
    logo: null,
  },
  omi: {
    id: "omi",
    name: "Omi Farm Colombia",
    url: "TODO: Omi Farm Colombia website URL",
    urlLabel: "",
    logo: null,
  },
} as const;

const supabaseFeatures = ["Postgres", "Auth", "RLS", "Storage", "Edge Functions", "Realtime"];
const tools = [
  "Next.js",
  "TypeScript",
  "Supabase",
  "Prisma",
  "Vercel",
  "Mercado Pago",
  "Wompi / Stripe",
  "Google Sheets API",
  "WhatsApp",
];
const aiTools = ["Claude Code", "Cursor", "Codex", "Grok", "n8n"];

const en: SiteContent = {
  meta: {
    title: "im-pro.tech",
    description:
      "The tech behind Bogotá's independent improv scene: ticketing, bots and data, built and run on Supabase and Postgres.",
    ogAlt: "im-pro.tech: the tech behind Bogotá's independent improv scene.",
  },
  nav: {
    skip: "Skip to content",
    home: "Home",
    work: "Work",
    contact: "Contact",
    otherLanguage: "Leer en español",
    otherLanguageName: "Español",
    theme: { label: "Color theme", light: "Light", dark: "Dark", system: "System" },
  },
  hero: {
    brand: "im-pro.tech",
    tagline:
      "The tech behind Bogotá's independent improv scene: ticketing, bots and data, built and run on Supabase and Postgres.",
    founded: "Founded by Rafa Forero in May 2025.",
    ctaWork: "See the work",
    ctaContact: "Contact",
    place: "Bogotá, Colombia",
    timezone: "UTC-5",
  },
  services: {
    title: "What im-pro.tech does",
    items: [
      {
        id: "ticketing",
        title: "Ticketing & payments",
        body: "Presale and box office, Mercado Pago, bank transfer with receipt photos, QR check-in at the door.",
        artifact: "A ticket, validated at the door",
        sample: sampleTicket,
      },
      {
        id: "bots",
        title: "Bots & automation",
        body: "WhatsApp ticket bot, deterministic flows with AI where it helps, data logged in Supabase.",
        artifact: "A conversation, logged as a row",
        sample: sampleBot,
      },
      {
        id: "data",
        title: "Websites & data",
        body: "Next.js sites, Google Sheets and Supabase dashboards, alerts for capacity and sales.",
        artifact: "A capacity alert",
        sample: sampleData,
      },
    ],
  },
  clients: {
    title: "Who I work with",
    intro: "I'm the tech lead for each of these.",
    logoPending: "Logo coming",
    items: [
      { ...clientsBase.cocoloco, kind: "Improv company", role: "Tech lead", note: "I also direct and train actors here" },
      { ...clientsBase.s777, kind: "Improv company", role: "Tech lead", note: "home of the WhatsApp bot" },
      { ...clientsBase.lugoschol, kind: "Improv company", role: "Tech lead" },
      { ...clientsBase.inspira, kind: "Improv festival", role: "Tech lead", note: "~300 tickets, one festival" },
      {
        ...clientsBase.omi,
        kind: "Family fertilizer company",
        place: "Tunja, Boyacá",
        role: "CTO, rebuilding the website",
        note: "the family business",
      },
    ],
  },
  caseInspira: {
    title: "Case study: Inspira Impro Fest ticketing",
    lede: "A ticketing site I developed continuously during the festival itself.",
    facts: [
      { value: "~300", label: "tickets sold" },
      { value: "Mercado Pago", label: "payments" },
      { value: "QR", label: "validated at the door" },
    ],
    learned: "What I learned from it became the base of Open Impro.",
    screenshots: "TODO: screenshots of the Inspira ticketing site (add to /public/work/inspira/)",
  },
  openImpro: {
    title: "Open Impro",
    lede: "An open-source, community-governed platform for independent improv companies.",
    pillars: [
      { title: "Ticketing", body: "Presale, box office and check-in for each company." },
      { title: "Org dashboards", body: "Each company sees its own shows, sales and audience." },
      { title: "Network graph", body: "In progress: a living map of every registered company." },
    ],
    today: "Today: 3 member companies, each moving ~100 tickets a month.",
    repoStatus: "Repo going public soon — public release planned for the end of 2026.",
    repoLink: github,
    siteLink: { label: "openimpro.tech", href: "https://openimpro.tech" },
  },
  stack: {
    title: "Built on Supabase",
    lede: "How I build.",
    tools,
    supabaseLabel: "Supabase, in production",
    supabaseFeatures,
    counter: {
      label: "tickets sold through im-pro.tech systems this month",
      live: "live",
      connecting: "connecting",
      polling: "updating every minute",
      fallback: "static",
      fallbackValue: null,
      fallbackTodo: "TODO: static fallback number for the ticket counter",
    },
    ai: {
      title: "AI-assisted engineering",
      tools: aiTools,
      body: "Agents for building; deterministic code for anything that must not fail.",
    },
    cycle: {
      title: "My weekly cycle",
      body: "Feedback comes in after the weekend shows, and live changes ship by Thursday.",
    },
  },
  founder: {
    title: "Who's behind it",
    name: "Rafa Forero",
    lines: [
      "Software engineer, improviser and actor-trainer in Bogotá.",
      "Before im-pro.tech: Senior Lead Developer Support Engineer at Unity Technologies (2021 – 2025).",
      "Improv director and actor-trainer (Proyecto Cocoloco, 777). Certified breathwork facilitator (The Breath Act).",
    ],
    quote:
      "The stage and the support queue train the same thing: listening, staying calm, and saying yes to what's actually happening.",
    link: github,
  },
  contact: {
    title: "Contact",
    lede: "Write to me — in English or Spanish.",
    email: CONTACT_EMAIL,
    emailLabel: "Email",
    links: [github, ...instagram],
  },
  notFound: {
    title: "That scene isn't in the script.",
    body: "The page you were looking for doesn't exist. Let's go back to the top.",
    back: "Back to home",
  },
  todoLabel: "To do",
  ui: {
    illustrative: "Illustrative",
    photoSlot: "Photo slot",
    photoTodo: "TODO: a photo from a Cocoloco or 777 show (landscape, 21:9, at least 2100px wide), in /public/work/",
    screenshotSlot: "Screenshot slot",
    footer: "im-pro.tech, Bogotá, Colombia",
  },
};

const es: SiteContent = {
  meta: {
    title: "im-pro.tech",
    description:
      "La tecnología detrás de la escena independiente de improvisación de Bogotá: boletería, bots y datos, construidos y operados sobre Supabase y Postgres.",
    ogAlt: "im-pro.tech: la tecnología detrás de la escena independiente de improvisación de Bogotá.",
  },
  nav: {
    skip: "Saltar al contenido",
    home: "Inicio",
    work: "Trabajo",
    contact: "Contacto",
    otherLanguage: "Read in English",
    otherLanguageName: "English",
    theme: { label: "Tema de color", light: "Claro", dark: "Oscuro", system: "Sistema" },
  },
  hero: {
    brand: "im-pro.tech",
    tagline:
      "La tecnología detrás de la escena independiente de improvisación de Bogotá: boletería, bots y datos, construidos y operados sobre Supabase y Postgres.",
    founded: "Fundada por Rafa Forero en mayo de 2025.",
    ctaWork: "Ver el trabajo",
    ctaContact: "Contacto",
    place: "Bogotá, Colombia",
    timezone: "UTC-5",
  },
  services: {
    title: "Qué hace im-pro.tech",
    items: [
      {
        id: "ticketing",
        title: "Boletería y pagos",
        body: "Preventa y taquilla, Mercado Pago, transferencia bancaria con foto del comprobante, check-in con QR en la puerta.",
        artifact: "Una boleta, validada en la puerta",
        sample: sampleTicket,
      },
      {
        id: "bots",
        title: "Bots y automatización",
        body: "Bot de boletas por WhatsApp, flujos deterministas con IA donde ayuda, datos registrados en Supabase.",
        artifact: "Una conversación, guardada como fila",
        sample: sampleBot,
      },
      {
        id: "data",
        title: "Sitios web y datos",
        body: "Sitios en Next.js, tableros en Google Sheets y Supabase, alertas de aforo y ventas.",
        artifact: "Una alerta de aforo",
        sample: sampleData,
      },
    ],
  },
  clients: {
    title: "Con quién trabajo",
    intro: "Soy el líder técnico de cada uno.",
    logoPending: "Logo pendiente",
    items: [
      {
        ...clientsBase.cocoloco,
        kind: "Compañía de improvisación",
        role: "Líder técnico",
        note: "aquí también dirijo y formo actores",
      },
      { ...clientsBase.s777, kind: "Compañía de improvisación", role: "Líder técnico", note: "la casa del bot de WhatsApp" },
      { ...clientsBase.lugoschol, kind: "Compañía de improvisación", role: "Líder técnico" },
      { ...clientsBase.inspira, kind: "Festival de improvisación", role: "Líder técnico", note: "~300 boletas, un festival" },
      {
        ...clientsBase.omi,
        kind: "Empresa familiar de fertilizantes",
        place: "Tunja, Boyacá",
        role: "CTO, reconstruyendo el sitio web",
        note: "el negocio de la familia",
      },
    ],
  },
  caseInspira: {
    title: "Caso: la boletería de Inspira Impro Fest",
    lede: "Un sitio de boletería que desarrollé de forma continua durante el propio festival.",
    facts: [
      { value: "~300", label: "boletas vendidas" },
      { value: "Mercado Pago", label: "pagos" },
      { value: "QR", label: "validado en la puerta" },
    ],
    learned: "Lo que aprendí ahí se volvió la base de Open Impro.",
    screenshots: "TODO: capturas del sitio de boletería de Inspira (agregar en /public/work/inspira/)",
  },
  openImpro: {
    title: "Open Impro",
    lede: "Una plataforma de código abierto, gobernada por su comunidad, para compañías independientes de improvisación.",
    pillars: [
      { title: "Boletería", body: "Preventa, taquilla y check-in para cada compañía." },
      { title: "Tableros por organización", body: "Cada compañía ve sus funciones, ventas y público." },
      { title: "Grafo de la red", body: "En construcción: un mapa vivo de cada compañía registrada." },
    ],
    today: "Hoy: 3 compañías miembro, cada una mueve ~100 boletas al mes.",
    repoStatus: "El repo se hará público pronto — lanzamiento público planeado para finales de 2026.",
    repoLink: github,
    siteLink: { label: "openimpro.tech", href: "https://openimpro.tech" },
  },
  stack: {
    title: "Construido sobre Supabase",
    lede: "Cómo construyo.",
    tools,
    supabaseLabel: "Supabase, en producción",
    supabaseFeatures,
    counter: {
      label: "boletas vendidas este mes a través de sistemas de im-pro.tech",
      live: "en vivo",
      connecting: "conectando",
      polling: "se actualiza cada minuto",
      fallback: "estático",
      fallbackValue: null,
      fallbackTodo: "TODO: número estático de respaldo para el contador de boletas",
    },
    ai: {
      title: "Ingeniería asistida por IA",
      tools: aiTools,
      body: "Agentes para construir; código determinista para todo lo que no puede fallar.",
    },
    cycle: {
      title: "Mi ciclo semanal",
      body: "La retroalimentación llega después de las funciones del fin de semana, y los cambios salen en vivo a más tardar el jueves.",
    },
  },
  founder: {
    title: "Quién está detrás",
    name: "Rafa Forero",
    lines: [
      "Ingeniero de software, improvisador y formador de actores en Bogotá.",
      "Antes de im-pro.tech: Senior Lead Developer Support Engineer en Unity Technologies (2021 – 2025).",
      "Director de improvisación y formador de actores (Proyecto Cocoloco, 777). Facilitador certificado de breathwork (The Breath Act).",
    ],
    quote:
      "El escenario y la cola de soporte entrenan lo mismo: escuchar, mantener la calma y decirle que sí a lo que de verdad está pasando.",
    link: github,
  },
  contact: {
    title: "Contacto",
    lede: "Escríbeme — en español o en inglés.",
    email: CONTACT_EMAIL,
    emailLabel: "Correo",
    links: [github, ...instagram],
  },
  notFound: {
    title: "Esa escena no está en el libreto.",
    body: "La página que buscabas no existe. Volvamos al inicio.",
    back: "Volver al inicio",
  },
  todoLabel: "Pendiente",
  ui: {
    illustrative: "Ilustrativo",
    photoSlot: "Espacio para foto",
    photoTodo: "TODO: una foto de una función de Cocoloco o 777 (horizontal, 21:9, mínimo 2100px de ancho), en /public/work/",
    screenshotSlot: "Espacio para captura",
    footer: "im-pro.tech, Bogotá, Colombia",
  },
};

export const site: Record<Locale, SiteContent> = { en, es };

export const getContent = (locale: Locale): SiteContent => site[locale];
