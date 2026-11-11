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

type IncidentStep = {
  id: "context" | "broke" | "did" | "result" | "next";
  label: string;
  body: Copy;
  /** Short handwritten-style note shown in the margin (direction A) or as a caption (B). */
  note?: Copy;
};

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

type TimelineEntry = {
  org: string;
  dates: string;
  place?: string;
  role: string;
  points: string[];
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
    cvTitle: string;
    cvDescription: string;
  };
  nav: {
    skip: string;
    home: string;
    work: string;
    cv: string;
    /** Label for the link that switches to the *other* language. */
    otherLanguage: string;
    otherLanguageName: string;
    theme: { label: string; light: string; dark: string; system: string };
  };
  hero: {
    name: string;
    brand: string;
    tagline: string;
    ctaWork: string;
    ctaCv: string;
    place: string;
    timezone: string;
    note: Copy;
  };
  services: {
    title: string;
    items: { id: string; title: string; body: string; artifact: string }[];
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
  incident: {
    title: string;
    duration: string;
    durationLabel: string;
    steps: IncidentStep[];
    sql: { label: string; caption: string; code: string };
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
  timeline: {
    title: string;
    entries: TimelineEntry[];
  };
  beyond: {
    title: string;
    roles: string[];
    line: string;
  };
  contact: {
    title: string;
    lede: string;
    email: Copy;
    emailLabel: string;
    links: LinkItem[];
  };
  cv: {
    title: string;
    download: string;
    pdfPath: string;
    summary: Copy;
    sections: {
      current: string;
      experience: string;
      education: string;
      skills: string;
      contact: string;
    };
    current: TimelineEntry;
    education: { school: string; degree: string; year: string };
    skills: Copy;
    back: string;
  };
  notFound: { title: string; body: string; back: string };
  todoLabel: string;
  /** Labels only used by the /lab prototypes. Delete with /lab. */
  lab: { a: string; b: string; compare: string; illustrative: string; photoSlot: string; photoTodo: Copy };
};

const sql = `-- simplified, illustrative: not the production query
with recent as (
  select intent
  from bot_messages
  where created_at >= now() - interval '30 days'
),
per_intent as (
  select intent, count(*) as messages
  from recent
  group by intent
)
select
  intent,
  messages,
  rank() over (order by messages desc)                 as rank,
  round(100.0 * messages / sum(messages) over (), 1)   as pct
from per_intent
order by rank
limit 10;`;

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
    title: "Rafa Forero — im-pro.tech",
    description:
      "Developer support engineer & storyteller. I build and run the tech behind Bogotá's independent improv scene — on Supabase and Postgres.",
    ogAlt: "Rafa Forero — im-pro.tech. Developer support engineer & storyteller in Bogotá.",
    cvTitle: "CV — Rafa Forero",
    cvDescription:
      "CV of Rafael Andrés Forero Alvarado: developer support engineer, ex-Unity, founder of im-pro.tech.",
  },
  nav: {
    skip: "Skip to content",
    home: "Home",
    work: "Work",
    cv: "CV",
    otherLanguage: "Leer en español",
    otherLanguageName: "Español",
    theme: { label: "Color theme", light: "Light", dark: "Dark", system: "System" },
  },
  hero: {
    name: "Rafa Forero",
    brand: "im-pro.tech",
    tagline:
      "Developer support engineer & storyteller. I build and run the tech behind Bogotá's independent improv scene — on Supabase and Postgres.",
    ctaWork: "See the work",
    ctaCv: "CV",
    place: "Bogotá, Colombia",
    timezone: "UTC-5",
    note: "since May 2025, after four years at Unity",
  },
  services: {
    title: "What im-pro.tech does",
    items: [
      {
        id: "ticketing",
        title: "Ticketing & payments",
        body: "Presale and box office, Mercado Pago, bank transfer with receipt photos, QR check-in at the door.",
        artifact: "A ticket, validated at the door",
      },
      {
        id: "bots",
        title: "Bots & automation",
        body: "WhatsApp ticket bot, deterministic flows with AI where it helps, data logged in Supabase.",
        artifact: "A conversation, logged as a row",
      },
      {
        id: "data",
        title: "Websites & data",
        body: "Next.js sites, Google Sheets and Supabase dashboards, alerts for capacity and sales.",
        artifact: "A capacity alert",
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
  incident: {
    title: "Case study: the 1‑hour bot incident",
    duration: "~1 h",
    durationLabel: "downtime",
    steps: [
      {
        id: "context",
        label: "Context",
        body: "An AI-driven WhatsApp bot (repo wa-777-tickets) answered ticket questions for the 777 group — about 100 conversations a month.",
        note: "777, about 100 chats a month",
      },
      {
        id: "broke",
        label: "What broke",
        body: "Midweek, the bot hit the usage limit of the AI provider (Grok) and stopped answering.",
        note: "silence, midweek",
      },
      {
        id: "did",
        label: "What I did",
        body: "I was already logging conversations to Supabase. I grouped messages by intent, found the top questions with SQL, and built a deterministic workflow for those intents — keeping AI only for the long tail.",
        note: "the logs were already there",
      },
      {
        id: "result",
        label: "Result",
        body: "About 1 hour of downtime, until the deterministic bot shipped. After that, common questions no longer depended on the AI provider being available.",
        note: "back in ~1 hour",
      },
      {
        id: "next",
        label: "What I'd do next",
        body: "TODO: what you'd do next (e.g. alerting on provider errors, a fallback switch)",
      },
    ],
    sql: {
      label: "Simplified",
      caption: "Count messages per intent over the last 30 days and rank them.",
      code: sql,
    },
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
  timeline: {
    title: "Before im-pro.tech",
    entries: [
      {
        org: "Unity Technologies",
        dates: "Jun 2021 – May 2025",
        place: "Remote",
        role: "Senior Lead Developer Support Engineer",
        points: [
          "Led 6 engineers across Version Control subproducts.",
          "Lead technical contact for enterprise game studios.",
          "Answered Unity Version Control (Plastic SCM) questions on the Unity forums and Stack Overflow.",
          "Built an AI-assisted Zendesk plugin: +9% CSAT, 21% faster response/solve time.",
          "Zero-downtime migration for ~500k users.",
        ],
      },
      {
        org: "vLex",
        dates: "2020 – 2021",
        role: "Full-stack / technical support engineer",
        points: ["Jira automation cut tickets reaching tier 3 by 25%, with satisfaction held at 96%."],
      },
      {
        org: "Accenture",
        dates: "2020",
        role: "Full-stack engineer (Angular, Spring Boot)",
        points: [],
      },
      {
        org: "Universidad de los Andes",
        dates: "2020",
        role: "B.S. Software & Computing Engineering",
        points: [],
      },
    ],
  },
  beyond: {
    title: "Beyond code",
    roles: [
      "Improv director and actor-trainer (Proyecto Cocoloco, 777).",
      "Certified breathwork facilitator (The Breath Act).",
    ],
    line: "The stage and the support queue train the same thing: listening, staying calm, and saying yes to what's actually happening.",
  },
  contact: {
    title: "Contact",
    lede: "Write to me — in English or Spanish.",
    email: CONTACT_EMAIL,
    emailLabel: "Email",
    links: [github, ...instagram],
  },
  cv: {
    title: "Rafael Andrés Forero Alvarado",
    download: "Download PDF",
    pdfPath: "/cv/Rafael-Forero-CV.pdf",
    summary: "TODO: two-line CV summary in your own words",
    sections: {
      current: "Now",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
    },
    current: {
      org: "im-pro.tech",
      dates: "May 2025 – present",
      place: "Bogotá, Colombia",
      role: "Founder & engineer",
      points: [
        "Run all the technology for a group of Bogotá improv companies and a family agri-business.",
        "Building Open Impro, an open-source ticketing and community platform (Next.js, Supabase).",
        "Inspira Impro Fest ticketing: ~300 tickets, Mercado Pago, QR validation at the door.",
        "Recovered an AI WhatsApp bot from a provider outage in ~1 hour with a deterministic workflow built from Supabase logs.",
      ],
    },
    education: { school: "Universidad de los Andes", degree: "B.S. Software & Computing Engineering", year: "2020" },
    skills: "TODO: skills and languages list for the CV",
    back: "Back to the site",
  },
  notFound: {
    title: "That scene isn't in the script.",
    body: "The page you were looking for doesn't exist. Let's go back to the top.",
    back: "Back to home",
  },
  todoLabel: "To do",
  lab: {
    a: "Direction A — the prompt book",
    b: "Direction B — the Barichara door",
    compare: "Compare with",
    illustrative: "illustrative",
    photoSlot: "Photo slot",
    photoTodo: "TODO: a photo from a Cocoloco or 777 show (landscape, 21:9, at least 2100px wide)",
  },
};

const es: SiteContent = {
  meta: {
    title: "Rafa Forero — im-pro.tech",
    description:
      "Ingeniero de soporte para desarrolladores y narrador. Construyo y opero la tecnología detrás de la escena independiente de improvisación de Bogotá — sobre Supabase y Postgres.",
    ogAlt: "Rafa Forero — im-pro.tech. Ingeniero de soporte para desarrolladores y narrador en Bogotá.",
    cvTitle: "Hoja de vida — Rafa Forero",
    cvDescription:
      "Hoja de vida de Rafael Andrés Forero Alvarado: ingeniero de soporte para desarrolladores, ex-Unity, fundador de im-pro.tech.",
  },
  nav: {
    skip: "Saltar al contenido",
    home: "Inicio",
    work: "Trabajo",
    cv: "Hoja de vida",
    otherLanguage: "Read in English",
    otherLanguageName: "English",
    theme: { label: "Tema de color", light: "Claro", dark: "Oscuro", system: "Sistema" },
  },
  hero: {
    name: "Rafa Forero",
    brand: "im-pro.tech",
    tagline:
      "Ingeniero de soporte para desarrolladores y narrador. Construyo y opero la tecnología detrás de la escena independiente de improvisación de Bogotá — sobre Supabase y Postgres.",
    ctaWork: "Ver el trabajo",
    ctaCv: "Hoja de vida",
    place: "Bogotá, Colombia",
    timezone: "UTC-5",
    note: "desde mayo de 2025, después de cuatro años en Unity",
  },
  services: {
    title: "Qué hace im-pro.tech",
    items: [
      {
        id: "ticketing",
        title: "Boletería y pagos",
        body: "Preventa y taquilla, Mercado Pago, transferencia bancaria con foto del comprobante, check-in con QR en la puerta.",
        artifact: "Una boleta, validada en la puerta",
      },
      {
        id: "bots",
        title: "Bots y automatización",
        body: "Bot de boletas por WhatsApp, flujos deterministas con IA donde ayuda, datos registrados en Supabase.",
        artifact: "Una conversación, guardada como fila",
      },
      {
        id: "data",
        title: "Sitios web y datos",
        body: "Sitios en Next.js, tableros en Google Sheets y Supabase, alertas de aforo y ventas.",
        artifact: "Una alerta de aforo",
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
  incident: {
    title: "Caso: el incidente de una hora del bot",
    duration: "~1 h",
    durationLabel: "fuera de servicio",
    steps: [
      {
        id: "context",
        label: "Contexto",
        body: "Un bot de WhatsApp con IA (repo wa-777-tickets) respondía preguntas sobre boletas para el grupo 777 — unas 100 conversaciones al mes.",
        note: "777, unas 100 conversaciones al mes",
      },
      {
        id: "broke",
        label: "Qué se rompió",
        body: "A mitad de semana, el bot llegó al límite de uso del proveedor de IA (Grok) y dejó de responder.",
        note: "silencio, a mitad de semana",
      },
      {
        id: "did",
        label: "Qué hice",
        body: "Ya estaba registrando las conversaciones en Supabase. Agrupé los mensajes por intención, encontré las preguntas más frecuentes con SQL y construí un flujo determinista para esas intenciones — dejando la IA solo para la cola larga.",
        note: "los registros ya estaban ahí",
      },
      {
        id: "result",
        label: "Resultado",
        body: "Cerca de 1 hora fuera de servicio, hasta que salió el bot determinista. Desde entonces, las preguntas comunes ya no dependen de que el proveedor de IA esté disponible.",
        note: "de vuelta en ~1 hora",
      },
      {
        id: "next",
        label: "Qué haría después",
        body: "TODO: qué harías después (p. ej. alertas ante errores del proveedor, un interruptor de respaldo)",
      },
    ],
    sql: {
      label: "Simplificado",
      caption: "Contar mensajes por intención en los últimos 30 días y ordenarlos.",
      code: sql,
    },
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
  timeline: {
    title: "Antes de im-pro.tech",
    entries: [
      {
        org: "Unity Technologies",
        dates: "jun 2021 – may 2025",
        place: "Remoto",
        role: "Senior Lead Developer Support Engineer",
        points: [
          "Lideré 6 ingenieros en los subproductos de Version Control.",
          "Contacto técnico principal para estudios de videojuegos enterprise.",
          "Respondí preguntas de Unity Version Control (Plastic SCM) en los foros de Unity y en Stack Overflow.",
          "Construí un plugin de Zendesk asistido por IA: +9% CSAT, 21% más rápido en tiempo de respuesta/resolución.",
          "Migración sin downtime para ~500k usuarios.",
        ],
      },
      {
        org: "vLex",
        dates: "2020 – 2021",
        role: "Ingeniero full-stack / de soporte técnico",
        points: [
          "Una automatización en Jira redujo en 25% los tickets que llegaban a nivel 3, con la satisfacción sostenida en 96%.",
        ],
      },
      {
        org: "Accenture",
        dates: "2020",
        role: "Ingeniero full-stack (Angular, Spring Boot)",
        points: [],
      },
      {
        org: "Universidad de los Andes",
        dates: "2020",
        role: "Ingeniería de Sistemas y Computación",
        points: [],
      },
    ],
  },
  beyond: {
    title: "Más allá del código",
    roles: [
      "Director de improvisación y formador de actores (Proyecto Cocoloco, 777).",
      "Facilitador certificado de breathwork (The Breath Act).",
    ],
    line: "El escenario y la cola de soporte entrenan lo mismo: escuchar, mantener la calma y decirle que sí a lo que de verdad está pasando.",
  },
  contact: {
    title: "Contacto",
    lede: "Escríbeme — en español o en inglés.",
    email: CONTACT_EMAIL,
    emailLabel: "Correo",
    links: [github, ...instagram],
  },
  cv: {
    title: "Rafael Andrés Forero Alvarado",
    download: "Descargar PDF",
    pdfPath: "/cv/Rafael-Forero-CV.pdf",
    summary: "TODO: resumen de la hoja de vida en dos líneas, en tus palabras",
    sections: {
      current: "Ahora",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      contact: "Contacto",
    },
    current: {
      org: "im-pro.tech",
      dates: "may 2025 – hoy",
      place: "Bogotá, Colombia",
      role: "Fundador e ingeniero",
      points: [
        "Opero toda la tecnología de un grupo de compañías de improvisación de Bogotá y de un agronegocio familiar.",
        "Construyo Open Impro, una plataforma de boletería y comunidad de código abierto (Next.js, Supabase).",
        "Boletería de Inspira Impro Fest: ~300 boletas, Mercado Pago, validación con QR en la puerta.",
        "Recuperé un bot de WhatsApp con IA de una caída del proveedor en ~1 hora, con un flujo determinista construido a partir de registros en Supabase.",
      ],
    },
    education: { school: "Universidad de los Andes", degree: "Ingeniería de Sistemas y Computación", year: "2020" },
    skills: "TODO: lista de habilidades e idiomas para la hoja de vida",
    back: "Volver al sitio",
  },
  notFound: {
    title: "Esa escena no está en el libreto.",
    body: "La página que buscabas no existe. Volvamos al inicio.",
    back: "Volver al inicio",
  },
  todoLabel: "Pendiente",
  lab: {
    a: "Dirección A — el libreto de dirección",
    b: "Dirección B — la puerta de Barichara",
    compare: "Comparar con",
    illustrative: "ilustrativo",
    photoSlot: "Espacio para foto",
    photoTodo: "TODO: una foto de una función de Cocoloco o 777 (horizontal, 21:9, mínimo 2100px de ancho)",
  },
};

export const site: Record<Locale, SiteContent> = { en, es };

export const getContent = (locale: Locale): SiteContent => site[locale];
