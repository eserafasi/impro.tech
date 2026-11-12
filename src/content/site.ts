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

/** Keys of the photos and site captures in src/assets (mapped in src/content/media.ts). */
export type MediaKey =
  | "maestroBows"
  | "maestroRafa"
  | "maestroAudience"
  | "maestroCast"
  | "reunionCast"
  | "reunionRafa"
  | "reunionAudience"
  | "stage777"
  | "rafaNata777"
  | "audience777"
  | "site777"
  | "siteInspira"
  | "siteInspiraMobile"
  | "siteOpenImpro"
  | "siteOmi";

type MediaText = { alt: string; caption: string };


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
  /** Photo or site capture shown on the client's card; none shows the name on an añil panel. */
  media?: MediaKey;
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
  media: Record<MediaKey, MediaText> & { credits: string; railLabel: string };
  ui: {
    illustrative: string;
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
    media: "reunionCast" as const,
    name: "Proyecto Cocoloco",
    url: "TODO: Proyecto Cocoloco website URL",
    urlLabel: "",
    logo: null,
  },
  s777: { id: "777", media: "site777" as const, name: "777", url: "https://777impro.art", urlLabel: "777impro.art", logo: null },
  lugoschol: {
    id: "lugoschol",
    name: "Lugoschol",
    url: "TODO: Lugoschol website URL",
    urlLabel: "",
    logo: null,
  },
  inspira: {
    id: "inspira",
    media: "siteInspira" as const,
    name: "Inspira Impro Fest",
    url: "https://inspiraimprofest.art",
    urlLabel: "inspiraimprofest.art",
    logo: null,
  },
  omi: {
    id: "omi",
    media: "siteOmi" as const,
    name: "Omi Farm Colombia",
    url: "https://omifarmcolombia.com",
    urlLabel: "omifarmcolombia.com",
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
    title: "Tickets, bots and dashboards",
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
    title: "Four stages and a farm",
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
    title: "~300 tickets, one festival",
    lede: "A ticketing site I developed continuously during the festival itself.",
    facts: [
      { value: "~300", label: "tickets sold" },
      { value: "Mercado Pago", label: "payments" },
      { value: "QR", label: "validated at the door" },
    ],
    learned: "What I learned from it became the base of Open Impro.",
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
  media: {
    maestroBows: { alt: "Two improvisers take a bow with their arms raised while a third bends over laughing, on a dark stage.", caption: "Maestro, Proyecto Cocoloco" },
    maestroRafa: { alt: "Rafa mid-scene in a purple shirt and bandana, beside a chalkboard with the Maestro scores.", caption: "Rafa on Maestro, Proyecto Cocoloco" },
    maestroAudience: { alt: "The Maestro cast on stage with the audience behind them holding up phone lights.", caption: "Maestro audience, Proyecto Cocoloco" },
    maestroCast: { alt: "The Maestro cast in a line on stage under blue light.", caption: "Maestro cast, Proyecto Cocoloco" },
    reunionCast: { alt: "The Reunion cast raising their glasses in a toast under warm stage light.", caption: "The Reunion, Proyecto Cocoloco" },
    reunionRafa: { alt: "Rafa and a scene partner face to face under purple light.", caption: "Rafa on The Reunion, Proyecto Cocoloco" },
    reunionAudience: { alt: "A full house posing with the cast after The Reunion.", caption: "The Reunion audience, Proyecto Cocoloco" },
    stage777: { alt: "Four improvisers mid-scene under green light, arms stretched out.", caption: "777" },
    rafaNata777: { alt: "Rafa and Nata on stage during a 777 scene.", caption: "Rafa and Nata, 777" },
    audience777: { alt: "The 777 cast sitting on the stage floor with the audience behind them.", caption: "777 audience" },
    site777: { alt: "The 777impro.art home page: the next show, the cast and the ticket button.", caption: "777impro.art" },
    siteInspira: { alt: "The Inspira Impro Fest ticketing site with the festival poster.", caption: "inspiraimprofest.art" },
    siteInspiraMobile: { alt: "The Inspira Impro Fest ticketing site on a phone.", caption: "inspiraimprofest.art on a phone" },
    siteOpenImpro: { alt: "The openimpro.tech home page: a graph of improv companies drawn as planets.", caption: "openimpro.tech" },
    siteOmi: { alt: "The Omi Farm Colombia home page over a photo of fields in Boyacá.", caption: "omifarmcolombia.com" },
    credits: "Photographs: Camilo (777), Gio and Kim (Proyecto Cocoloco).",
    railLabel: "Clients, scroll sideways",
  },
  ui: {
    illustrative: "Illustrative",
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
    title: "Boletas, bots y tableros",
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
    title: "Cuatro escenarios y una finca",
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
    title: "~300 boletas, un festival",
    lede: "Un sitio de boletería que desarrollé de forma continua durante el propio festival.",
    facts: [
      { value: "~300", label: "boletas vendidas" },
      { value: "Mercado Pago", label: "pagos" },
      { value: "QR", label: "validado en la puerta" },
    ],
    learned: "Lo que aprendí ahí se volvió la base de Open Impro.",
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
  media: {
    maestroBows: { alt: "Dos improvisadores hacen la venia con los brazos arriba mientras un tercero se dobla de la risa, en un escenario oscuro.", caption: "Maestro, Proyecto Cocoloco" },
    maestroRafa: { alt: "Rafa en plena escena, con camiseta morada y pañoleta, junto a un tablero con los puntajes de Maestro.", caption: "Rafa en Maestro, Proyecto Cocoloco" },
    maestroAudience: { alt: "El elenco de Maestro en el escenario con el público detrás levantando las linternas de sus celulares.", caption: "Público de Maestro, Proyecto Cocoloco" },
    maestroCast: { alt: "El elenco de Maestro en fila sobre el escenario bajo luz azul.", caption: "Elenco de Maestro, Proyecto Cocoloco" },
    reunionCast: { alt: "El elenco de The Reunion levantando sus copas en un brindis bajo luz cálida.", caption: "The Reunion, Proyecto Cocoloco" },
    reunionRafa: { alt: "Rafa y su compañera de escena frente a frente bajo luz morada.", caption: "Rafa en The Reunion, Proyecto Cocoloco" },
    reunionAudience: { alt: "Sala llena posando con el elenco después de The Reunion.", caption: "Público de The Reunion, Proyecto Cocoloco" },
    stage777: { alt: "Cuatro improvisadores en plena escena bajo luz verde, con los brazos extendidos.", caption: "777" },
    rafaNata777: { alt: "Rafa y Nata en el escenario durante una escena de 777.", caption: "Rafa y Nata, 777" },
    audience777: { alt: "El elenco de 777 sentado en el piso del escenario con el público detrás.", caption: "Público de 777" },
    site777: { alt: "La página de inicio de 777impro.art: la próxima función, el elenco y el botón de boletas.", caption: "777impro.art" },
    siteInspira: { alt: "El sitio de boletería de Inspira Impro Fest con el afiche del festival.", caption: "inspiraimprofest.art" },
    siteInspiraMobile: { alt: "El sitio de boletería de Inspira Impro Fest en un celular.", caption: "inspiraimprofest.art en un celular" },
    siteOpenImpro: { alt: "La página de inicio de openimpro.tech: un grafo de compañías de impro dibujadas como planetas.", caption: "openimpro.tech" },
    siteOmi: { alt: "La página de inicio de Omi Farm Colombia sobre una foto de cultivos en Boyacá.", caption: "omifarmcolombia.com" },
    credits: "Fotografías: Camilo (777), Gio y Kim (Proyecto Cocoloco).",
    railLabel: "Clientes, desplázate hacia los lados",
  },
  ui: {
    illustrative: "Ilustrativo",
    footer: "im-pro.tech, Bogotá, Colombia",
  },
};

export const site: Record<Locale, SiteContent> = { en, es };

export const getContent = (locale: Locale): SiteContent => site[locale];
