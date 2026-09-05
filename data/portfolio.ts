export type Project = {
  slug: string;
  code: string;
  title: string;
  company: string;
  location: string;
  period: string;
  role: string;
  client?: string;
  consultant?: string;
  categories: string[];
  featured: boolean;
  image?: string;
  summary: string;
  overview: string;
  responsibilities: string[];
  deliverables: string[];
  tools: string[];
  gallery: { src: string; alt: string; caption: string }[];
};

export const portfolio = {
  name: "Shaher Waheed Roshdy",
  role: "Architect & Landscape Architect",
  location: "Riyadh, Saudi Arabia",
  experience: "5+ years",
  email: "shaherwaheed61@gmail.com",
  phone: "+966 54 304 2167",
  tel: "+966543042167",
  linkedin: "https://www.linkedin.com/in/shaher-waheed-79598a1a4/",
  behance: "https://www.behance.net/shaherwaheed",
  positioning:
    "Design development and shop drawings that turn architectural and landscape concepts into coordinated, buildable construction packages.",
  summary:
    "Architect and Landscape Architect with more than five years of experience across Saudi Arabia and Egypt. My work sits between design intent and site execution: developing concepts, resolving technical details, and producing precise drawing packages supported by BIM workflows.",
  capabilities: [
    {
      title: "Landscape design development",
      description: "Hardscape plans, grading, levels, sections, details, and technical submittals developed for construction.",
      tools: ["AutoCAD", "Civil 3D", "Revit"],
    },
    {
      title: "Architectural shop drawings",
      description: "Coordinated architectural packages, as-built documentation, detailing, and drawing control for technical-office delivery.",
      tools: ["Revit", "AutoCAD", "ACC"],
    },
    {
      title: "BIM-enabled documentation",
      description: "Model-based drawing production and issue resolution that improves accuracy without losing focus on architectural delivery.",
      tools: ["Revit", "Navisworks", "ACC"],
    },
    {
      title: "3D visualization",
      description: "Exterior and landscape visuals used to clarify design decisions, support approvals, and communicate with clients.",
      tools: ["SketchUp", "Lumion", "Revit"],
    },
    {
      title: "Technical coordination",
      description: "Resolving architectural interfaces with structural and MEP disciplines before they reach site execution.",
      tools: ["Navisworks", "Revit", "ACC"],
    },
    {
      title: "Quantities & submittals",
      description: "BOQs, technical reports, RFIs, design justifications, and organized material-approval workflows.",
      tools: ["AutoCAD", "Revit", "Excel"],
    },
  ],
  experienceItems: [
    {
      period: "11/2025 — Present",
      role: "Architect & Landscape Architect — Technical Office",
      company: "Safwa Riyadh General Contracting Co.",
      description: "Architectural and landscape shop drawings, design development, technical approvals, and BIM-enabled documentation for projects in Riyadh and AlUla.",
    },
    {
      period: "11/2023 — 11/2025",
      role: "Technical Office Landscape Architect",
      company: "Zaid Al-Hussein and Brothers Contracting Group",
      description: "Landscape shop drawings, grading, sections, technical reports, RFIs, and as-built packages for King Abdullah International Gardens.",
    },
    {
      period: "07/2021 — 11/2023",
      role: "Technical Office Architect",
      company: "Zad Engineering Consulting Office",
      description: "Architecture shop drawings, as-built documentation, quantities, 3D design, and building-permit packages for private projects in Egypt and Saudi Arabia.",
    },
    {
      period: "04/2019 — Present",
      role: "Architectural & Landscape Visualization",
      company: "Freelance",
      description: "Independent exterior, landscape, villa, and masterplan visualization developed from early design through final client presentation.",
    },
  ],
};

export const projects: Project[] = [
  {
    slug: "king-abdullah-international-gardens",
    code: "KAIG",
    title: "King Abdullah International Gardens",
    company: "Zaid Al-Hussein and Brothers Contracting Group",
    client: "Riyadh Municipality",
    consultant: "Dar Al-Handasah",
    location: "Riyadh, Saudi Arabia",
    period: "11/2023 — 11/2025",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "BIM"],
    featured: true,
    image: "/images/gardens-project/night-masterplan-aerial.jpg",
    summary: "Landscape construction documentation for a 2.1 million m² botanical and eco-tourism landmark in Riyadh.",
    overview: "Preparing and reviewing landscape shop drawings and as-built sheets for a large themed-garden complex centered on an aviary dome, faux-rock tunnels, an elevated boardwalk, a water feature, and the Wadi Walk.",
    responsibilities: [
      "Developed hardscape plans, coordinates, levels, grading, sections, and construction details.",
      "Prepared full technical submittal packages, reports, SCRs, RFIs, and design justifications.",
      "Coordinated landscape interfaces with architectural, structural, and MEP disciplines before execution.",
      "Produced design and technical visuals to communicate complex zones and support decision-making.",
    ],
    deliverables: ["Landscape shop drawings", "As-built sheets", "Grading & levels", "Sections & details", "Technical submittals", "RFIs & SCRs"],
    tools: ["AutoCAD", "Revit", "Civil 3D", "SketchUp", "Lumion"],
    gallery: [
      { src: "/images/gardens-project/aviary-dome-site-photo.jpg", alt: "Aviary dome on site", caption: "Aviary dome — site progress" },
      { src: "/images/gardens-project/aerial-main-dome.jpg", alt: "Aerial view of the main dome", caption: "Main dome and landscape zones" },
      { src: "/images/gardens-project/aerial-water-feature-wadi-walk.jpg", alt: "Aerial view of water feature and Wadi Walk", caption: "Water feature and Wadi Walk" },
      { src: "/images/gardens-project/elevated-boardwalk-rock-formations.jpg", alt: "Elevated boardwalk through rock formations", caption: "Elevated boardwalk interface" },
      { src: "/images/gardens-project/faux-rock-tunnel-interior.jpg", alt: "Interior of faux-rock tunnel", caption: "Faux-rock tunnel detailing" },
      { src: "/images/gardens-project/planting-inside-aviary-dome.jpg", alt: "Planting inside aviary dome", caption: "Planting inside the aviary dome" },
      { src: "/images/gardens-project/butterfly-garden.jpg", alt: "Butterfly Garden", caption: "Butterfly Garden" },
      { src: "/images/gardens-project/wadi-1.jpg", alt: "Wadi landscape zone", caption: "Wadi landscape zone" },
    ],
  },
  {
    slug: "security-aviation-leadership-building",
    code: "SALB",
    title: "Security Aviation Leadership Building",
    company: "Safwa Riyadh General Contracting Co.",
    client: "Aviation Security",
    consultant: "El Seif",
    location: "Riyadh, Saudi Arabia",
    period: "2025 — Present",
    role: "BIM Architect / Technical Office Architect",
    categories: ["Architecture", "Shop Drawings", "BIM"],
    featured: true,
    summary: "Architectural redesign and execution documentation for a leadership building in Riyadh.",
    overview: "Developing coordinated architectural information for the redesign and execution of a 1,400 m²-per-floor leadership building, translating approved information and tender requirements into construction-ready packages.",
    responsibilities: [
      "Developing architectural shop drawings and BIM-based documentation for execution.",
      "Managing architectural material submittals and mapping proposed systems against BOQ requirements.",
      "Coordinating curtain walls, gypsum-board ceilings, waterproofing systems, blocks, finishes, and interfaces.",
      "Preparing technical queries and proposals where site conditions conflict with tender information.",
    ],
    deliverables: ["Architectural shop drawings", "BIM model", "Material submittals", "RFIs", "Technical proposals", "Approval tracking"],
    tools: ["Revit", "AutoCAD", "Navisworks", "ACC"],
    gallery: [],
  },
  {
    slug: "marsa-khuzam",
    code: "MKZ",
    title: "Marsa, Khuzam",
    company: "Safwa Riyadh General Contracting Co.",
    client: "NHC",
    consultant: "Zuhair Fayez Partnership",
    location: "Riyadh, Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Visualization"],
    featured: true,
    image: "/images/safwa-shopdrawing/al-khuzama-gardens-zone-8.jpg",
    summary: "Landscape shop drawings and design refinement for the Al-Khuzama Gardens zones.",
    overview: "Preparing shop drawings, improving landscape design concepts, and developing 3D outputs for the Al-Khuzama Gardens zones in coordination with NHC and Zuhair Fayez Partnership.",
    responsibilities: [
      "Prepared landscape shop drawings and technical details for multiple garden zones.",
      "Refined design concepts to improve clarity, constructability, and presentation.",
      "Produced 3D models and visuals supporting design decisions and client reviews.",
    ],
    deliverables: ["Landscape shop drawings", "Design development", "Technical details", "3D visualizations"],
    tools: ["AutoCAD", "Revit", "SketchUp", "Lumion"],
    gallery: [
      { src: "/images/safwa-shopdrawing/al-khuzama-gardens-zone-8.jpg", alt: "Al-Khuzama Gardens zone 8", caption: "Al-Khuzama Gardens — Zone 8" },
      { src: "/images/safwa-shopdrawing/al-khuzama-gardens-zone-9.jpg", alt: "Al-Khuzama Gardens zone 9", caption: "Al-Khuzama Gardens — Zone 9" },
    ],
  },
  {
    slug: "alula-housing",
    code: "ALU",
    title: "AlUla Housing Landscape",
    company: "Safwa Riyadh General Contracting Co.",
    client: "Ministry of Municipalities and Housing",
    consultant: "Aldarh Engineering Consulting Co.",
    location: "AlUla Region, Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Visualization"],
    featured: true,
    image: "/images/safwa-shopdrawing/alula-housing-park.jpg",
    summary: "Landscape design refinement and technical documentation within a heritage-sensitive setting.",
    overview: "Participating in landscape works for a housing park in the AlUla region, with a focus on shop drawings, design refinement, and visuals that improve design clarity while respecting the setting.",
    responsibilities: [
      "Developed landscape shop drawings and coordinated technical information for implementation.",
      "Refined the design response around the project's heritage-sensitive context.",
      "Produced 3D models and visual outputs to support approvals and design understanding.",
    ],
    deliverables: ["Shop drawings", "Design refinement", "3D model", "Client presentation visuals"],
    tools: ["AutoCAD", "Revit", "SketchUp", "Lumion"],
    gallery: [
      { src: "/images/safwa-shopdrawing/alula-housing-park.jpg", alt: "Landscape proposal for AlUla housing park", caption: "Housing park landscape proposal" },
    ],
  },
  {
    slug: "zad-engineering",
    code: "ZAD",
    title: "Zad Engineering — Selected Design Work",
    company: "Zad Engineering Consulting Office",
    client: "Private clients",
    location: "Egypt / Saudi Arabia",
    period: "07/2021 — 11/2023",
    role: "Technical Office Architect",
    categories: ["Architecture", "Landscape", "Visualization"],
    featured: false,
    image: "/images/zad-design/private-resort-masterplan-taif.jpg",
    summary: "Architectural shop drawings, masterplans, villa design, permits, and visualization for private clients.",
    overview: "Preparing and reviewing architectural shop drawings and as-built sheets, including a private resort masterplan in Taif, a services complex, and private villa designs in Taif and 6th of October City.",
    responsibilities: [
      "Prepared architectural shop drawings, as-built packages, and quantity take-offs.",
      "Developed residential and commercial building-permit packages under local codes.",
      "Produced exterior and landscape models for villas, resorts, and mixed-use projects.",
    ],
    deliverables: ["Architecture shop drawings", "As-built drawings", "Permit packages", "Quantity surveying", "3D visualization"],
    tools: ["AutoCAD", "Revit", "SketchUp", "Lumion"],
    gallery: [
      { src: "/images/zad-design/private-resort-masterplan-taif.jpg", alt: "Private resort masterplan in Taif", caption: "Private resort masterplan — Taif" },
      { src: "/images/zad-design/u-zone-design-evolution.jpg", alt: "U-Zone design evolution", caption: "U-Zone design evolution" },
      { src: "/images/zad-design/services-complex-site-plan.jpg", alt: "Services complex site plan", caption: "Services complex site plan" },
      { src: "/images/zad-design/private-villa-taif-exterior.jpg", alt: "Private villa exterior in Taif", caption: "Private villa exterior — Taif" },
      { src: "/images/zad-design/villa-facade-6th-october.jpg", alt: "Villa facade in 6th of October City", caption: "Villa facade — 6th of October City" },
    ],
  },
  {
    slug: "freelance-visualization",
    code: "VIS",
    title: "Freelance Visualization Work",
    company: "Independent practice",
    location: "Remote",
    period: "04/2019 — Present",
    role: "3D Modeler — Architect & Landscape Architect",
    categories: ["Architecture", "Landscape", "Visualization"],
    featured: false,
    image: "/images/freelance/estate-pool-garden.jpg",
    summary: "Independent exterior, landscape, villa, estate, and mixed-use visualization for private clients.",
    overview: "Independent 3D modeling and visualization carried from initial concepts through final design presentation, spanning villa facades, estate landscapes, courtyards, pools, and mixed-use masterplans.",
    responsibilities: [
      "Developed architectural and landscape models from sketches and drawing references.",
      "Produced day and night studies to evaluate facade lighting and atmosphere.",
      "Created client-ready visuals and design-evolution presentations.",
    ],
    deliverables: ["3D models", "Exterior renders", "Landscape visuals", "Day / night studies", "Design evolution"],
    tools: ["SketchUp", "Lumion", "Revit", "AutoCAD"],
    gallery: [
      { src: "/images/freelance/classic-villa-day.jpg", alt: "Classic villa facade during the day", caption: "Classic villa — day study" },
      { src: "/images/freelance/classic-villa-night.jpg", alt: "Classic villa facade at night", caption: "Classic villa — night study" },
      { src: "/images/freelance/estate-courtyard-firepit.jpg", alt: "Private estate courtyard and firepit", caption: "Private estate courtyard" },
      { src: "/images/freelance/estate-pool-garden.jpg", alt: "Private estate pool and garden", caption: "Private estate pool landscape" },
      { src: "/images/freelance/modern-villa-exterior.jpg", alt: "Modern villa exterior", caption: "Modern villa exterior" },
      { src: "/images/freelance/services-plaza-aerial.jpg", alt: "Aerial view of mixed-use services plaza", caption: "Services plaza masterplan" },
    ],
  },
];

export const credentials = [
  { title: "Level 1 Information Manager — Basics", issuer: "Plannerly", image: "/images/certifications/iso-19650-readiness.jpg" },
  { title: "Level 3 Information Manager — ISO 19650 Expert", issuer: "Plannerly", image: "/images/certifications/certified-information-manager.jpg" },
  { title: "BIM Management, Modeling, Coordination & Documentation", issuer: "Niqat Global", image: "/images/certifications/bim-diploma-management.jpg", id: "EM303567098129285534575" },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
