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
  confidential?: boolean;
  confidentialNote?: string;
  roleSummary?: string;
  metrics?: { value: string; label: string }[];
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
  headline: "Technical Office Architect | Architecture & Landscape",
  location: "Riyadh, Saudi Arabia",
  experience: "5+ years",
  registration: "SCE Accredited Architect",
  email: "shaherwaheed61@gmail.com",
  phone: "+966 54 304 2167",
  tel: "+966543042167",
  whatsapp: "https://wa.me/966543042167",
  cv: "/Shaher-Waheed-Roshdy-CV.pdf",
  linkedin: "https://www.linkedin.com/in/shaher-waheed-79598a1a4/",
  behance: "https://www.behance.net/shaherwaheed",
  positioning:
    "Technical-office delivery across architecture and landscape, from design development and shop drawings to construction-ready details.",
  summary:
    "Technical Office Architect with more than five years of experience delivering architectural and landscape packages across buildings, parks, streetscape, and large-scale developments in Saudi Arabia and Egypt. Professionally accredited as an Architect by the Saudi Council of Engineers, with experience in design development, shop drawings, technical detailing, quantity take-offs, material submittals, and consultant approvals.",
  proofPoints: [
    { value: "5+", label: "Years of experience" },
    { value: "5", label: "Current project portfolio" },
    { value: "1.5M m²", label: "KAIG project scale" },
    { value: "11 parks", label: "Housing parks scope" },
  ],
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
      title: "Technical detailing & interfaces",
      description: "Resolving architectural details and interfaces with structural and MEP disciplines before site execution.",
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
      role: "Architect & Landscape Architect — Technical Office (Head Office)",
      company: "Safwa Riyadh General Contracting Co.",
      description: "Delivering architectural and landscape technical-office packages across five projects, covering design development, shop drawings, quantity take-offs, technical reviews, drawing revisions, material submittals, and consultant approvals.",
    },
    {
      period: "11/2023 — 11/2025",
      role: "Technical Office Landscape Architect",
      company: "Zaid Al-Hussein and Brothers Contracting Group",
      description: "Delivered landscape and hardscape shop drawings, grading, levels, sections, technical details, as-built packages, site verification, and buildable revisions for King Abdullah International Gardens.",
    },
    {
      period: "07/2021 — 11/2023",
      role: "Technical Office Architect",
      company: "Zad Engineering Consulting Office",
      description: "Delivered architectural shop, working, as-built, permit, quantity take-off, and 3D visualization packages for residential and commercial projects.",
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
    summary: "Landscape technical-office delivery for a 1.5 million m² landmark development in Riyadh.",
    overview: "Preparing and reviewing landscape shop drawings and as-built sheets for a large themed-garden complex centered on an aviary dome, faux-rock tunnels, an elevated boardwalk, a water feature, and the Wadi Walk.",
    roleSummary: "Delivered and reviewed landscape and hardscape shop drawings, construction details, as-built packages, site verification, and buildable revisions responding to consultant feedback and site conditions.",
    metrics: [
      { value: "1.5M m²", label: "Project area" },
      { value: "SAR 3B", label: "Approx. project value" },
    ],
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
    location: "Riyadh, Saudi Arabia",
    period: "2025 — Present",
    role: "Architect — Technical Office",
    categories: ["Architecture", "Shop Drawings", "BIM"],
    featured: true,
    confidential: true,
    confidentialNote: "Confidential project — selected professional scope only. Project imagery and restricted technical information are intentionally withheld.",
    summary: "Confidential leadership-building project in Riyadh; selected professional scope shown without project imagery or restricted technical information.",
    overview: "Supporting architectural redesign and construction documentation for a confidential government project. This public case study is limited to role, workflow, and non-sensitive deliverables.",
    roleSummary: "Developed architectural redesign, Revit-based design information, working drawings, shop drawings, technical details, quantity take-offs, and material-review packages within controlled information requirements.",
    responsibilities: [
      "Produced BIM-based architectural shop drawings and model-driven documentation within controlled information requirements.",
      "Developed construction-ready architectural details and technical-office packages from approved design information.",
      "Supported technical queries, review cycles, and material-approval workflows.",
      "Maintained drawing quality, issue tracking, and cross-discipline interface resolution.",
    ],
    deliverables: ["Architectural shop drawings", "BIM model", "Material submittals", "RFIs", "Technical proposals", "Approval tracking"],
    tools: ["Revit", "AutoCAD", "Navisworks", "ACC"],
    gallery: [],
  },
  {
    slug: "housing-projects-parks",
    code: "HPP",
    title: "Housing Projects Parks",
    company: "Safwa Riyadh General Contracting Co.",
    client: "Ministry of Municipalities and Housing",
    consultant: "Aldarh Engineering Consulting Co. / Parsons",
    location: "Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Technical Office"],
    featured: true,
    summary: "Technical-office packages for 11 parks totaling approximately 98,000 m² across three housing-project locations.",
    overview: "Delivering landscape shop-drawing, technical-detail, and documentation packages for parks in West Airport, Qiran, and Al Uyaynah, adapting design solutions to project and site requirements.",
    roleSummary: "Prepared landscape shop drawings and technical details, reviewed supplier requirements and materials, and supported compliant consultant-submission packages.",
    metrics: [
      { value: "11", label: "Parks" },
      { value: "98,000 m²", label: "Landscape area" },
      { value: "3", label: "Project locations" },
    ],
    responsibilities: [
      "Delivered landscape shop-drawing, technical-detail, and documentation packages for 11 parks.",
      "Adapted design solutions to project requirements and verified site conditions.",
      "Reviewed supplier requirements, materials, and submittals against project specifications.",
      "Supported consultant review and approval through clear, consistent technical packages.",
    ],
    deliverables: ["Landscape shop drawings", "Construction details", "Material reviews", "Technical submittals", "Drawing revisions"],
    tools: ["AutoCAD", "Civil 3D", "Revit", "SketchUp", "Lumion"],
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
    roleSummary: "Developed landscape shop drawings and refined design details for six parks, supported by 3D models and visualizations for technical reviews and client presentations.",
    metrics: [
      { value: "6", label: "Landscape parks" },
      { value: "35,000 m²", label: "Approx. project area" },
    ],
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
    slug: "sedayem-jeddah-streetscape",
    code: "SDM",
    title: "Sedayem Jeddah — Streetscape",
    company: "Safwa Riyadh General Contracting Co.",
    client: "National Housing Company (NHC)",
    consultant: "Khatib & Alami",
    location: "Jeddah, Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Technical Office"],
    featured: false,
    summary: "Construction-ready streetscape and landscape documentation for an NHC development in Jeddah.",
    overview: "Translating streetscape and landscape requirements into clear shop drawings, technical details, and implementation solutions while maintaining consistency across related packages.",
    roleSummary: "Prepared streetscape shop drawings and details, integrated related-discipline requirements, and supported material-submittal packages through consultant review.",
    responsibilities: [
      "Translated landscape and streetscape requirements into construction-ready shop drawings.",
      "Developed technical details and site implementation solutions.",
      "Integrated related-discipline requirements into consistent drawing packages.",
      "Supported material-submittal reviews and consultant submissions.",
    ],
    deliverables: ["Streetscape shop drawings", "Technical details", "Implementation solutions", "Material submittals"],
    tools: ["AutoCAD", "Civil 3D", "Revit"],
    gallery: [],
  },
  {
    slug: "alula-housing",
    code: "ALU",
    title: "Al Ula Project — Landscape",
    company: "Safwa Riyadh General Contracting Co.",
    client: "Ministry of Municipalities and Housing",
    consultant: "Aldarh Engineering Consulting Co.",
    location: "AlUla Region, Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Visualization"],
    featured: true,
    image: "/images/safwa-shopdrawing/alula-housing-park.jpg",
    summary: "Landscape shop drawings and technical documentation for an approximately 20,000 m² development in Al Ula.",
    overview: "Delivering landscape shop drawings, construction details, and technical documentation while adapting solutions to project requirements, site conditions, and the heritage-sensitive setting.",
    roleSummary: "Delivered technical landscape packages and produced 3D models and presentation visuals supporting design reviews and stakeholder discussions.",
    metrics: [
      { value: "20,000 m²", label: "Approx. project area" },
    ],
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
    roleSummary: "Delivered architectural shop, working, as-built, permit, quantity take-off, and 3D visualization packages for residential and commercial projects.",
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
    roleSummary: "Developed architectural and landscape models, day and night studies, and client-ready visuals from early concepts through final presentation.",
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
