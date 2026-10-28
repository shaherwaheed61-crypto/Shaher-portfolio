export type AtlasRegion = "riyadh" | "jeddah" | "alula" | "cairo";
export type ProjectMediaKind = "site" | "drawing" | "visualization" | "model";
export type ProjectImage = { src: string; alt: string; caption: string; group?: string; kind?: ProjectMediaKind };

// Client-agency groups; keep each case study's own consultant and contractor.
export const projectCollections = [
  { id: "kaig", title: "King Abdullah International Gardens", context: "Owner: Riyadh Municipality · Consultant: Dar Al-Handasah · Contractor: Zaid Al-Hussein and Brothers", projectSlugs: ["king-abdullah-international-gardens"] },
  { id: "housing", title: "Ministry of Municipalities and Housing", context: "11 Housing Parks · AlUla landscape project", projectSlugs: ["housing-projects-parks", "alula-housing"] },
  { id: "nhc", title: "National Housing Company (NHC)", context: "Marsa Khuzam · Sedayem Jeddah streetscape · Jeddah Park", projectSlugs: ["marsa-khuzam", "sedayem-jeddah-streetscape", "jeddah-park"] },
  { id: "aviation", title: "Security Aviation Leadership Building", context: "Architectural redesign · IFC / LOD 300 · Shop drawings · BIM coordination", projectSlugs: ["security-aviation-leadership-building"] },
  { id: "selected", title: "Selected Architectural Work", context: "Blue Development · Niqat Project · Zad Engineering", projectSlugs: ["blue-development", "niqat-project", "zad-engineering"] },
];

export function getProjectCollection(slug: string) {
  return projectCollections.find((collection) => collection.projectSlugs.includes(slug));
}

export type Project = {
  slug: string;
  code: string;
  title: string;
  company: string;
  companyLabel?: string;
  location: string;
  period: string;
  duration?: string;
  role: string;
  client?: string;
  consultant?: string;
  officialUrl?: string;
  mapUrl?: string;
  atlasRegion?: AtlasRegion;
  confidential?: boolean;
  confidentialNote?: string;
  galleryNote?: string;
  roleSummary?: string;
  technicalStrengths?: { title: string; description: string }[];
  metrics?: { value: string; label: string }[];
  categories: string[];
  featured: boolean;
  image?: string;
  imageKind?: ProjectMediaKind;
  interactiveModel?: boolean;
  modelSrc?: string;
  summary: string;
  caseStudyHeading: string;
  overview: string;
  responsibilities: string[];
  deliverables: string[];
  tools: string[];
  workSamples?: {
    title: string;
    focus: string;
    contribution: string;
    output: string;
    imageSources: string[];
    stageLabels?: string[];
    contextStage?: {
      label: string;
      src: string;
      alt: string;
      caption: string;
    };
  }[];
  gallery: ProjectImage[];
};

export const portfolio = {
  name: "Shaher Wahid Rushdi",
  displayName: {
    primary: "Shaher Wahid",
    secondary: "Rushdi",
  },
  role: "Architect & Landscape Architect",
  headline: "Architect & Landscape Architect | Technical Office | BIM",
  location: "Riyadh, Saudi Arabia",
  experience: "5+ years",
  registration: "SCE Accredited Architect",
  email: "shaherwaheed61@gmail.com",
  phone: "+966 54 304 2167",
  tel: "+966543042167",
  whatsapp: "https://wa.me/966543042167",
  cv: "/Shaher-Wahid-Rushdi-CV.pdf",
  workSamplesPdf: "/Shaher-Wahid-Rushdi-Selected-Portfolio.pdf",
  website: "https://shaher-waheed-portfolio.shaherwaheed61.chatgpt.site",
  linkedin: "https://www.linkedin.com/in/shaher-waheed-79598a1a4/",
  behance: "https://www.behance.net/shaherwaheed",
  positioning:
    "Technical-office delivery across architecture and landscape, from design development and shop drawings to construction-ready details.",
  personalIntro:
    "I’m Shaher Wahid Rushdi, an architect and landscape architect based in Riyadh. I bring design intent and construction requirements together through coordinated drawings, details, and technical packages.",
  personalApproach:
    "My work spans buildings, parks, and large-scale developments in Saudi Arabia and Egypt. I focus on the decisions behind each drawing—how a space should feel, how it will be built, and what the team needs to deliver it clearly.",
  summary:
    "Architect & Landscape Architect with 5+ years of experience delivering architectural and landscape packages across buildings, parks, streetscape, and large-scale developments in Saudi Arabia and Egypt. SCE-accredited Architect experienced in design development, shop drawings, technical detailing, quantity take-offs, material submittals, and consultant approvals, supported by BIM-based documentation workflows.",
  proofPoints: [
    { value: "1 MEGA PROJECT", label: "2,000,000 m² total project area" },
    { value: "19 PARKS", label: "231,000 m² total parks area" },
  ],
  deliverySteps: [
    {
      title: "Design development",
      description: "Refining architectural and landscape intent around project requirements, site conditions, and approved inputs.",
    },
    {
      title: "BIM-enabled documentation",
      description: "Using models as a reliable basis for clearer drawings, technical decisions, and package consistency.",
    },
    {
      title: "Shop drawings & details",
      description: "Translating design information into coordinated, construction-ready plans, sections, and details.",
    },
    {
      title: "Quantities & submittals",
      description: "Preparing quantity take-offs, material reviews, technical reports, RFIs, and approval packages.",
    },
    {
      title: "Construction support",
      description: "Responding to review comments, verified site conditions, and technical queries through controlled revisions.",
    },
  ],
  registrationDetails: {
    authority: "Saudi Council of Engineers (SCE)",
    accreditation: "Professional Accreditation: Architect",
    specialization: "Urban Planning",
    membership: "1010660",
    accreditedSince: "13 February 2024",
    validUntil: "13 February 2027",
    certificate: {
      image: "/images/certifications/sce-professional-accreditation.webp",
      document: "/certificates/sce-professional-accreditation.pdf",
    },
  },
  languages: [
    { language: "Arabic", proficiency: "Native" },
    { language: "English", proficiency: "Professional working proficiency" },
  ],
  tooling: {
    name: "SHAHER TOOLS",
    title: "Digital practice / Revit workflow development",
    summary: "Selected in-house Revit workflow development shaped around repetitive technical-office tasks—supporting documentation quality without replacing architectural judgment.",
    platform: "Revit 2025+",
    modules: [
      {
        id: "gypsum-board-designer",
        code: "GBD",
        title: "Gypsum Board Designer",
        status: "Development build",
        purpose: "Structure suspended-ceiling layouts, system adjustments, openings, and quantity information inside one controlled workflow.",
        inputs: ["Room or drawn boundary", "Ceiling system type", "Member spacing", "System height"],
        operations: ["Lay out carrying and omega channels", "Coordinate TEE and anchor positions", "Create and frame service openings", "Lock, unlock, and revise system members"],
        outputs: ["Coordinated ceiling system", "RCP visibility control", "Linear-metre quantities", "TEE and component counts"],
      },
      {
        id: "apartment-view-splitter",
        code: "AVS",
        title: "Apartment View Splitter",
        status: "Workflow development",
        purpose: "Turn large residential floor plans into controlled apartment views using explicit model or drafting boundaries.",
        inputs: ["Room boundaries", "Closed detail or model lines", "Source floor plan", "View naming rules"],
        operations: ["Read the selected enclosure", "Create the apartment view", "Apply a focused crop", "Organize repeatable view naming"],
        outputs: ["Separate apartment plans", "Consistent view extents", "Cleaner sheet preparation", "Repeatable multi-floor workflow"],
      },
      {
        id: "raised-access-floor",
        code: "RAF",
        title: "Raised Access Floor",
        status: "Workflow development",
        purpose: "Generate a modular raised-floor system with controllable grid origin, height, supports, and quantity outputs.",
        inputs: ["Selected floor area", "600 × 600 mm tile module", "Grid start point", "Finished-floor height"],
        operations: ["Lay out the tile grid", "Place pedestals and stringers", "Resolve boundary members", "Adjust individual support heights"],
        outputs: ["3D floor-system layout", "Pedestal count", "Stringer linear metres", "Tile quantity"],
      },
    ],
    principles: [
      { title: "Modular", description: "Each tool is developed as an independent module under one SHAHER TOOLS ribbon." },
      { title: "Technical-office led", description: "Workflows begin with a recurring documentation problem, then organize inputs, revisions, and outputs." },
      { title: "Evidence-aware", description: "The public portfolio shows workflow logic only—never client models, restricted drawings, or unverified savings claims." },
    ],
  },
  capabilities: [
    {
      title: "Landscape design development",
      description: "Hardscape plans, grading, levels, sections, details, and technical submittals developed for construction.",
      tools: ["AutoCAD", "Civil 3D", "Revit"],
      evidence: [
        { projectSlug: "king-abdullah-international-gardens", statement: "Landscape plans, levels, sections, construction details, and public drawing studies within a 2,000,000 m² development." },
        { projectSlug: "marsa-khuzam", statement: "Design refinement and construction-ready landscape packages across six parks." },
      ],
    },
    {
      title: "Architectural shop drawings",
      description: "Coordinated architectural packages, as-built documentation, detailing, and drawing control for technical-office delivery.",
      tools: ["Revit", "AutoCAD", "ACC"],
      evidence: [
        { projectSlug: "security-aviation-leadership-building", statement: "Architectural redesign, LOD 300 architectural IFC package, and shop drawings under controlled information requirements." },
        { projectSlug: "zad-engineering", statement: "Working, shop, as-built, permit, and quantity take-off packages for residential and commercial work." },
      ],
    },
    {
      title: "BIM-enabled documentation",
      description: "Model-based drawing production and issue resolution that improves accuracy without losing focus on architectural delivery.",
      tools: ["Revit", "Navisworks", "ACC"],
      evidence: [
        { projectSlug: "security-aviation-leadership-building", statement: "Project BIM coordination alongside the LOD 300 architectural IFC package and architectural shop drawings, without publishing restricted files." },
      ],
    },
    {
      title: "3D visualization",
      description: "Exterior and landscape visuals used to clarify design decisions, support approvals, and communicate with clients.",
      tools: ["SketchUp", "Lumion", "Revit"],
      evidence: [
        { projectSlug: "zad-engineering", statement: "Client-ready architectural and landscape visuals across villas, masterplans, and commercial projects." },
        { projectSlug: "alula-housing", statement: "Landscape models and presentation visuals supporting design review in a heritage-sensitive setting." },
      ],
    },
    {
      title: "Technical detailing & interfaces",
      description: "Resolving architectural details and interfaces with structural and MEP disciplines before site execution.",
      tools: ["Navisworks", "Revit", "ACC"],
      evidence: [
        { projectSlug: "king-abdullah-international-gardens", statement: "Plans checked against sections, details, levels, and related-discipline interfaces before execution." },
        { projectSlug: "security-aviation-leadership-building", statement: "Architectural details and multidisciplinary interfaces resolved within controlled project information." },
      ],
    },
    {
      title: "Quantities & submittals",
      description: "BOQs, technical reports, RFIs, design justifications, and organized material-approval workflows.",
      tools: ["AutoCAD", "Revit", "Excel"],
      evidence: [
        { projectSlug: "king-abdullah-international-gardens", statement: "Technical submittal packages, reports, SCRs, RFIs, and design justifications." },
        { projectSlug: "housing-projects-parks", statement: "Supplier requirements, material reviews, and consultant-submission packages across 11 parks." },
      ],
    },
  ],
  experienceItems: [
    {
      period: "11/2025 — Present",
      role: "Architect & Landscape Architect — Technical Office (Head Office)",
      company: "Safwa Riyadh General Contracting Co.",
      location: "Saudi Arabia",
      description: "Delivering architectural and landscape technical-office packages across building, park, and streetscape projects, covering design development, shop drawings, quantity take-offs, technical reviews, drawing revisions, material submittals, and consultant approvals.",
    },
    {
      period: "11/2023 — 11/2025",
      role: "Technical Office Landscape Architect",
      company: "Zaid Al-Hussein and Brothers Contracting Group",
      location: "Saudi Arabia",
      description: "Delivered landscape and hardscape shop drawings, grading, levels, sections, technical details, as-built packages, site verification, and buildable revisions for King Abdullah International Gardens.",
    },
    {
      period: "07/2021 — 11/2023",
      role: "Technical Office Architect",
      company: "Zad Engineering Consulting Office",
      location: "Egypt",
      description: "Delivered architectural shop, working, as-built, permit, quantity take-off, and 3D visualization packages for residential and commercial projects.",
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
    officialUrl: "https://www.alriyadh.gov.sa/ar/initiatives/Kaga",
    mapUrl: "https://maps.app.goo.gl/2KxZjrquMFstN6BC7",
    atlasRegion: "riyadh",
    location: "Riyadh, Saudi Arabia",
    period: "11/2023 — 11/2025",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Technical Office"],
    featured: true,
    image: "/images/gardens-project/aerial-main-dome.jpg",
    imageKind: "site",
    summary: "Landscape technical-office delivery within a landmark botanical-garden development covering 2 million m² overall in Riyadh.",
    caseStudyHeading: "Landscape packages resolved across a complex botanical-garden environment.",
    overview: "Preparing and reviewing landscape shop drawings and as-built sheets within one of the world's largest covered botanical-garden developments, combining themed gardens, climate-controlled environments, the Wadi Walk, observation towers, educational facilities, and visitor amenities.",
    roleSummary: "Delivered and reviewed landscape and hardscape shop drawings, construction details, as-built packages, site verification, and buildable revisions responding to consultant feedback and site conditions.",
    technicalStrengths: [
      { title: "Buildable Solutions", description: "Translated landscape design into clear, construction-ready shop drawings." },
      { title: "Engineering Problem-Solving", description: "Resolved drawing discrepancies and refined details around site requirements." },
      { title: "Grading & Levels", description: "Coordinated levels, grading, plans, and sections into consistent drawing packages." },
      { title: "Multidisciplinary Coordination", description: "Addressed landscape interfaces with architectural, structural, and MEP disciplines." },
      { title: "Technical Decisions", description: "Prepared RFIs and design justifications to support consultant review and approvals." },
    ],
    galleryNote: "Built-project images show the wider development context. Shop-drawing samples are cropped and downscaled for public presentation; title blocks, signatures, issue status, and sheet-control data are removed. The contribution described here is limited to landscape technical-office packages, and the samples are not construction documents.",
    metrics: [
      { value: "2M m²", label: "Overall project area" },
      { value: "SAR 3B", label: "Approx. project value" },
    ],
    responsibilities: [
      "Developed hardscape plans, coordinates, levels, grading, sections, and construction details.",
      "Prepared full technical submittal packages, reports, SCRs, RFIs, and design justifications.",
      "Coordinated landscape interfaces with architectural, structural, and MEP disciplines before execution.",
      "Produced design and technical visuals to communicate complex zones and support decision-making.",
    ],
    deliverables: ["Landscape shop drawings", "As-built sheets", "Grading & levels", "Sections & details", "Technical submittals", "RFIs & SCRs"],
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion"],
    workSamples: [
      {
        title: "Wadi 1 — plan and section coordination",
        focus: "Connecting the landscape layout with its sectional information.",
        contribution: "Produced and reviewed landscape plans, levels, and sections as part of the technical-office package.",
        output: "A plan excerpt paired with cross sections A–B shows the layout and vertical relationships together.",
        imageSources: ["/images/gardens-project/shop-drawings/wadi-1-plan.webp", "/images/gardens-project/shop-drawings/wadi-1-sections-a-b.webp"],
        stageLabels: ["Shop drawing plan", "Cross sections A–B"],
        contextStage: {
          label: "Built project context",
          src: "/images/gardens-project/aerial-water-feature-wadi-walk.jpg",
          alt: "Aerial view of the King Abdullah International Gardens development",
          caption: "Wider built-project context shown separately from the Wadi 1 drawing excerpt.",
        },
      },
      {
        title: "Family Garden — from layout to construction detail",
        focus: "Carrying the garden layout into paving, stair, and tree-pit details.",
        contribution: "Developed and reviewed hardscape plans and construction details for landscape documentation.",
        output: "The layout is presented alongside its paving, stair, and tree-pit detail excerpts.",
        imageSources: ["/images/gardens-project/shop-drawings/family-garden-plan.webp", "/images/gardens-project/shop-drawings/family-garden-construction-details.webp"],
        stageLabels: ["Shop drawing plan", "Paving, stair & tree-pit details"],
      },
      {
        title: "Discovery Garden — coordinated drawing package",
        focus: "Keeping plans, sections, and details consistent within a garden package.",
        contribution: "Prepared and reviewed landscape drawing packages, checking plans against sections and construction details.",
        output: "Plan and detail excerpts make the relationship between the overall layout and its technical documentation visible.",
        imageSources: ["/images/gardens-project/shop-drawings/discovery-garden-plan.webp", "/images/gardens-project/shop-drawings/discovery-garden-sections-details.webp"],
        stageLabels: ["Shop drawing plan", "Sections & construction details"],
      },
    ],
    gallery: [
      { src: "/images/gardens-project/aviary-dome-site-photo.jpg", alt: "Aviary dome on site", caption: "Aviary dome — site progress", group: "Built project context" },
      { src: "/images/gardens-project/aerial-main-dome.jpg", alt: "Aerial view of the main dome", caption: "Main dome and landscape zones", group: "Built project context" },
      { src: "/images/gardens-project/aerial-water-feature-wadi-walk.jpg", alt: "Aerial view of water feature and Wadi Walk", caption: "Water feature and Wadi Walk", group: "Built project context" },
      { src: "/images/gardens-project/elevated-boardwalk-rock-formations.jpg", alt: "Elevated boardwalk through rock formations", caption: "Elevated boardwalk interface", group: "Built project context" },
      { src: "/images/gardens-project/faux-rock-tunnel-interior.jpg", alt: "Interior of faux-rock tunnel", caption: "Faux-rock tunnel detailing", group: "Built project context" },
      { src: "/images/gardens-project/planting-inside-aviary-dome.jpg", alt: "Planting inside aviary dome", caption: "Planting inside the aviary dome", group: "Built project context" },
      { src: "/images/gardens-project/shop-drawings/aviary-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Aviary Garden landscape shop drawing plan", caption: "Aviary Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/butterfly-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Butterfly Garden landscape shop drawing plan", caption: "Butterfly Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/carboniferous-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Carboniferous Garden landscape shop drawing plan", caption: "Carboniferous Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/cretaceous-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Cretaceous Garden landscape shop drawing plan", caption: "Cretaceous Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/devonian-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Devonian Garden landscape shop drawing plan", caption: "Devonian Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/discovery-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Discovery Garden landscape shop drawing plan", caption: "Discovery Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/family-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Family Garden landscape shop drawing plan", caption: "Family Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/maze-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Maze Garden landscape shop drawing plan", caption: "Maze Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/pliocene-garden-plan.webp", alt: "Cropped public portfolio excerpt of the Pliocene Garden landscape shop drawing plan", caption: "Pliocene Garden — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/wadi-1-plan.webp", alt: "Cropped public portfolio excerpt of the Wadi 1 landscape shop drawing plan", caption: "Wadi 1 — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/wadi-2-plan.webp", alt: "Cropped public portfolio excerpt of the Wadi 2 landscape shop drawing plan", caption: "Wadi 2 — landscape shop drawing plan", group: "Landscape shop drawing plans" },
      { src: "/images/gardens-project/shop-drawings/discovery-garden-sections-details.webp", alt: "Cropped public portfolio excerpt of Discovery Garden landscape sections and construction details", caption: "Discovery Garden — sections and construction details", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/family-garden-sections-overview.webp", alt: "Cropped public portfolio excerpt of Family Garden longitudinal and enclosure sections", caption: "Family Garden — longitudinal and enclosure sections", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/family-garden-construction-details.webp", alt: "Cropped public portfolio excerpt of Family Garden paving, stair and tree-pit construction details", caption: "Family Garden — paving, stair and tree-pit details", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/maze-garden-sections-details.webp", alt: "Cropped public portfolio excerpt of Maze Garden sections and boundary details", caption: "Maze Garden — sections and boundary details", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/pliocene-garden-landscape-sections.webp", alt: "Cropped public portfolio excerpt of Pliocene Garden landscape sections", caption: "Pliocene Garden — landscape sections", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/pliocene-garden-construction-details.webp", alt: "Cropped public portfolio excerpt of Pliocene Garden stair and landscape interface details", caption: "Pliocene Garden — stair and interface details", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/wadi-1-sections-a-b.webp", alt: "Cropped public portfolio excerpt of Wadi 1 landscape cross sections A-A and B-B", caption: "Wadi 1 — cross sections A–B", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/wadi-1-sections-c-e.webp", alt: "Cropped public portfolio excerpt of Wadi 1 landscape cross sections C-C through E-E", caption: "Wadi 1 — cross sections C–E", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/wadi-1-sections-f-h.webp", alt: "Cropped public portfolio excerpt of Wadi 1 landscape cross sections F-F through H-H", caption: "Wadi 1 — cross sections F–H", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/wadi-2-sections-a-b.webp", alt: "Cropped public portfolio excerpt of Wadi 2 landscape cross sections A-A and B-B", caption: "Wadi 2 — cross sections A–B", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/wadi-2-section-b-continuation.webp", alt: "Cropped public portfolio excerpt of the continued Wadi 2 landscape cross section B-B", caption: "Wadi 2 — cross-section B continuation", group: "Sections & construction details" },
      { src: "/images/gardens-project/shop-drawings/wadi-2-section-c.webp", alt: "Cropped public portfolio excerpt of Wadi 2 landscape cross section C-C", caption: "Wadi 2 — cross-section C details", group: "Sections & construction details" },
    ],
  },
  {
    slug: "security-aviation-leadership-building",
    code: "SALB",
    title: "Security Aviation Leadership Building",
    company: "Safwa Riyadh General Contracting Co.",
    atlasRegion: "riyadh",
    location: "Riyadh, Saudi Arabia",
    period: "2026 — Present",
    duration: "18 months",
    role: "Architect / BIM Coordinator",
    categories: ["Architecture", "Shop Drawings", "BIM"],
    featured: true,
    image: "/images/security-aviation-leadership-building/approved-exterior-visualization.webp",
    imageKind: "visualization",
    confidential: true,
    confidentialNote: "Public presentation: exterior architectural visualization and a summary of Shaher's project contribution.",
    galleryNote: "Exterior architectural visualization of the Security Aviation Leadership Building.",
    summary: "Architectural redesign, an LOD 300 architectural IFC package, shop drawings, and project BIM coordination for a leadership building in Riyadh.",
    caseStudyHeading: "From architectural redesign to the LOD 300 IFC package and shop drawings.",
    overview: "Shaher redesigned the building, developed the architectural design IFC package to LOD 300, produced the architectural shop drawings, and served as BIM Coordinator for the project. The exterior visualization presents the building's architectural character.",
    roleSummary: "Responsible for the building's architectural redesign, the LOD 300 architectural IFC package, and architectural shop drawings; also served as the project's BIM Coordinator within controlled information requirements.",
    responsibilities: [
      "Redesigned the building's architectural scheme and developed the architectural design package.",
      "Prepared the architectural IFC package at LOD 300.",
      "Produced architectural shop drawings, details, and technical-office documentation.",
      "Served as BIM Coordinator for the project, managing model-based coordination and cross-discipline interfaces.",
      "Supported technical queries, drawing reviews, quantities, and material-approval workflows.",
    ],
    deliverables: ["Architectural redesign", "Architectural IFC package · LOD 300", "Architectural shop drawings", "BIM coordination", "Material submittals", "RFIs", "Approval tracking"],
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion", "Revit", "Navisworks"],
    gallery: [
      { src: "/images/security-aviation-leadership-building/approved-exterior-visualization.webp", alt: "Exterior architectural visualization of the Security Aviation Leadership Building", caption: "Security Aviation Leadership Building — exterior architectural visualization", kind: "visualization" },
    ],
  },
  {
    slug: "housing-projects-parks",
    code: "MMH",
    title: "11 Housing Parks",
    company: "Safwa Riyadh General Contracting Co.",
    client: "Ministry of Municipalities and Housing",
    consultant: "Aldarh Engineering Consulting Co. / Parsons",
    mapUrl: "https://maps.app.goo.gl/5rw4fvaDH8mavvf26",
    atlasRegion: "riyadh",
    location: "Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Technical Office"],
    featured: true,
    summary: "Technical-office packages for 11 parks totaling approximately 98,000 m² across three housing-project locations.",
    caseStudyHeading: "Eleven park packages adapted across three housing locations.",
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
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion"],
    gallery: [],
  },
  {
    slug: "marsa-khuzam",
    code: "MKZ",
    title: "Marsa Khuzam",
    company: "Safwa Riyadh General Contracting Co.",
    client: "NHC",
    consultant: "Zuhair Fayez Partnership",
    mapUrl: "https://maps.app.goo.gl/JAQAqpuXfhR4KXEw5",
    atlasRegion: "riyadh",
    location: "Riyadh, Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Visualization"],
    featured: true,
    image: "/images/safwa-shopdrawing/al-khuzama-gardens-zone-8.jpg",
    imageKind: "drawing",
    summary: "Landscape shop drawings and design refinement for the Al-Khuzama Gardens zones.",
    caseStudyHeading: "Landscape design refined into six construction-ready park packages.",
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
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion"],
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
    mapUrl: "https://maps.app.goo.gl/NcA1qo7W1PuDorNq6",
    atlasRegion: "jeddah",
    location: "Jeddah, Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Technical Office"],
    featured: false,
    summary: "Construction-ready streetscape and landscape documentation for an NHC development in Jeddah.",
    caseStudyHeading: "Streetscape requirements translated into consistent construction packages.",
    overview: "Translating streetscape and landscape requirements into clear shop drawings, technical details, and implementation solutions while maintaining consistency across related packages.",
    roleSummary: "Prepared streetscape shop drawings and details, integrated related-discipline requirements, and supported material-submittal packages through consultant review.",
    responsibilities: [
      "Translated landscape and streetscape requirements into construction-ready shop drawings.",
      "Developed technical details and site implementation solutions.",
      "Integrated related-discipline requirements into consistent drawing packages.",
      "Supported material-submittal reviews and consultant submissions.",
    ],
    deliverables: ["Streetscape shop drawings", "Technical details", "Implementation solutions", "Material submittals"],
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion"],
    gallery: [],
  },
  {
    slug: "jeddah-park",
    code: "JDP",
    title: "Jeddah Park",
    company: "Safwa Riyadh General Contracting Co.",
    client: "National Housing Company (NHC)",
    consultant: "Khatib & Alami",
    atlasRegion: "jeddah",
    location: "Jeddah, Saudi Arabia",
    period: "Current Safwa role",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Technical Office"],
    featured: false,
    summary: "Landscape technical-office scope for a 78,000 m² park in Jeddah.",
    caseStudyHeading: "Landscape documentation for a 78,000 m² park.",
    overview: "Landscape technical-office work for an NHC park in Jeddah, with Khatib & Alami as consultant.",
    roleSummary: "Prepared landscape shop drawings, technical details, and material-submittal packages for consultant review.",
    metrics: [{ value: "78,000 m²", label: "Park area" }],
    responsibilities: ["Developed landscape shop drawings and technical details.", "Integrated related-discipline requirements into landscape documentation.", "Supported material submittals and consultant review."],
    deliverables: ["Landscape shop drawings", "Technical details", "Material submittals"],
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion"],
    gallery: [],
  },
  {
    slug: "alula-housing",
    code: "ALU",
    title: "Al Ula Project — Landscape",
    company: "Safwa Riyadh General Contracting Co.",
    client: "Ministry of Municipalities and Housing",
    consultant: "Aldarh Engineering Consulting Co.",
    mapUrl: "https://maps.app.goo.gl/RzZjFnmmRYyciqpHA",
    atlasRegion: "alula",
    location: "AlUla Region, Saudi Arabia",
    period: "11/2025 — Present",
    role: "Technical Office Landscape Architect",
    categories: ["Landscape", "Shop Drawings", "Visualization"],
    featured: true,
    image: "/images/safwa-shopdrawing/alula-housing-park.jpg",
    imageKind: "drawing",
    summary: "Landscape shop drawings and technical documentation for an approximately 20,000 m² development in Al Ula.",
    caseStudyHeading: "Landscape delivery adapted to a heritage-sensitive setting.",
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
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion"],
    gallery: [
      { src: "/images/safwa-shopdrawing/alula-housing-park.jpg", alt: "Landscape proposal for AlUla housing park", caption: "Housing park landscape proposal" },
    ],
  },
  {
    slug: "zad-engineering",
    code: "ZAD",
    title: "Zad Engineering — Selected Design Work",
    company: "Zad Engineering Consulting Office",
    companyLabel: "Design office",
    client: "Private clients",
    location: "Egypt / Saudi Arabia",
    period: "07/2021 — 11/2023",
    role: "Technical Office Architect",
    categories: ["Architecture", "Landscape", "Visualization"],
    featured: false,
    image: "/images/zad-design/residential-facade-perspective.jpg",
    imageKind: "visualization",
    summary: "Architectural shop drawings, masterplans, villa design, permits, and visualization for private clients.",
    caseStudyHeading: "Design work carried across drawing, permit, and presentation stages.",
    overview: "Preparing and reviewing architectural shop drawings and as-built sheets, including a private resort masterplan in Taif, a services complex, a commercial forecourt, private villas, and residential entrance landscape studies.",
    roleSummary: "Delivered architectural shop, working, as-built, permit, quantity take-off, and 3D visualization packages for residential and commercial projects.",
    responsibilities: [
      "Prepared architectural shop drawings, as-built packages, and quantity take-offs.",
      "Developed residential and commercial building-permit packages under local codes.",
      "Produced exterior and landscape models for villas, resorts, and mixed-use projects.",
    ],
    deliverables: ["Architecture shop drawings", "As-built drawings", "Permit packages", "Quantity surveying", "3D visualization"],
    tools: ["AutoCAD", "Civil 3D", "SketchUp", "Lumion"],
    galleryNote: "Selected architectural, commercial, and landscape visuals produced during Shaher's work with Zad Engineering Consulting Office.",
    gallery: [
      { src: "/images/zad-design/private-resort-masterplan-taif.jpg", alt: "Private resort masterplan in Taif", caption: "Private resort masterplan — Taif", group: "Masterplanning & mixed-use" },
      { src: "/images/zad-design/services-complex-site-plan.jpg", alt: "Services complex site plan", caption: "Services complex — site plan", group: "Masterplanning & mixed-use" },
      { src: "/images/zad-design/services-complex-aerial.jpg", alt: "Aerial visualization of a services complex", caption: "Services complex — aerial view", group: "Masterplanning & mixed-use" },
      { src: "/images/zad-design/u-zone-design-evolution.jpg", alt: "U-Zone design evolution", caption: "U-Zone — design evolution", group: "Masterplanning & mixed-use" },
      { src: "/images/zad-design/private-villa-taif-exterior.jpg", alt: "Private villa exterior in Taif", caption: "Private villa exterior — Taif", group: "Residential architecture" },
      { src: "/images/zad-design/villa-facade-6th-october.jpg", alt: "Villa facade in 6th of October City", caption: "Villa facade — 6th of October City", group: "Residential architecture" },
      { src: "/images/zad-design/residential-facade-perspective.jpg", alt: "Residential facade perspective visualization", caption: "Residential facade — perspective view", group: "Residential architecture" },
      { src: "/images/zad-design/residential-facade-front.jpg", alt: "Residential facade front visualization", caption: "Residential facade — front study", group: "Residential architecture" },
      { src: "/images/zad-design/residential-entrance-detail.jpg", alt: "Detailed residential entrance and planting visualization", caption: "Residential entrance — material and planting detail", group: "Residential architecture" },
      { src: "/images/zad-design/golden-petrol-station.jpg", alt: "Commercial petrol station forecourt visualization", caption: "Commercial forecourt — street view", group: "Commercial architecture" },
      { src: "/images/zad-design/golden-petrol-station-aerial.jpg", alt: "Aerial visualization of a commercial petrol station forecourt", caption: "Commercial forecourt — aerial view", group: "Commercial architecture" },
      { src: "/images/zad-design/villa-entrance-landscape-day.jpg", alt: "Villa entrance landscape visualization in daylight", caption: "Villa entrance landscape — daylight", group: "Landscape & entrance studies" },
      { src: "/images/zad-design/villa-entrance-landscape-night.jpg", alt: "Villa entrance landscape lighting visualization at night", caption: "Villa entrance landscape — night lighting", group: "Landscape & entrance studies" },
      { src: "/images/zad-design/villa-entrance-water-feature-night.jpg", alt: "Villa entrance water feature and planting visualized at night", caption: "Entrance water feature — night detail", group: "Landscape & entrance studies" },
    ],
  },
  {
    slug: "blue-development",
    code: "BLUE",
    title: "Blue Development",
    company: "Niqat",
    companyLabel: "Project team",
    atlasRegion: "cairo",
    location: "Fifth Settlement, Egypt",
    period: "Selected work",
    role: "Architect",
    categories: ["Architecture", "BIM"],
    featured: false,
    image: "/images/blue-development/model-overview.jpg",
    imageKind: "model",
    interactiveModel: true,
    modelSrc: "/models/niqat-team-architecture.glb",
    summary: "Architectural work with the Niqat team, explored through an interactive IFC-derived model.",
    caseStudyHeading: "Explore Blue Development from every angle.",
    overview: "Blue Development is located in the Fifth Settlement, Egypt. Shaher worked on the project as Architect alongside the Niqat team. The interactive preview presents the architectural geometry from the supplied IFC model.",
    roleSummary: "Contributed to the project's architectural work as part of the Niqat team.",
    responsibilities: ["Worked as Architect alongside the Niqat project team."],
    deliverables: ["Architectural model", "Interactive 3D geometry preview"],
    tools: ["IFC"],
    galleryNote: "The interactive viewer and model views show architectural geometry. The original IFC file and element properties are not included in this preview.",
    gallery: [
      { src: "/images/blue-development/model-overview.jpg", alt: "Isometric architectural model view of Blue Development", caption: "Blue Development — architectural model overview", kind: "model" },
      { src: "/images/blue-development/model-side.jpg", alt: "Side perspective of the Blue Development architectural model", caption: "Blue Development — side perspective", kind: "model" },
      { src: "/images/blue-development/model-reverse.jpg", alt: "Reverse perspective of the Blue Development architectural model", caption: "Blue Development — reverse perspective", kind: "model" },
    ],
  },
  {
    slug: "niqat-project",
    code: "NIQ",
    title: "Niqat Project",
    company: "Niqat",
    companyLabel: "Project team",
    atlasRegion: "cairo",
    location: "Cairo, Egypt",
    period: "Selected work",
    role: "Architectural collaboration",
    categories: ["Architecture", "BIM"],
    featured: false,
    image: "/images/niqat-project/model-overview.jpg",
    imageKind: "model",
    interactiveModel: true,
    modelSrc: "/models/niqat-project.glb",
    summary: "Architectural work with the Niqat team in Cairo, presented through an interactive 3D model.",
    caseStudyHeading: "Explore the Niqat project in three dimensions.",
    overview: "An architectural project with Niqat in Cairo. Explore the building's form and architectural geometry through an interactive model and three perspective views.",
    responsibilities: ["Collaborated with the Niqat team on the architectural project."],
    deliverables: ["Architectural model", "Interactive 3D geometry preview", "Model overview and perspective views"],
    tools: ["IFC"],
    galleryNote: "Views are generated from the supplied project model. The interactive preview contains geometry and appearance only.",
    gallery: [
      { src: "/images/niqat-project/model-overview.jpg", alt: "Isometric view of the Niqat Project architectural model in Cairo", caption: "Niqat Project — architectural model overview", kind: "model" },
      { src: "/images/niqat-project/model-side.jpg", alt: "Side perspective of the Niqat Project architectural model", caption: "Niqat Project — side perspective", kind: "model" },
      { src: "/images/niqat-project/model-reverse.jpg", alt: "Reverse perspective of the Niqat Project architectural model", caption: "Niqat Project — reverse perspective", kind: "model" },
    ],
  },
];

export const credentials = [
  { title: "Level 1 Information Manager — Basics", issuer: "Plannerly", image: "/images/certifications/certified-information-manager.jpg" },
  { title: "Company Level ISO 19650 Certification Readiness", issuer: "Plannerly", image: "/images/certifications/iso-19650-readiness.jpg" },
  { title: "BIM Diploma — BIM Management", issuer: "Niqat Global / Autodesk Authorized Training Center", image: "/images/certifications/bim-diploma-management.jpg", id: "EM303567098129285534575" },
  { title: "Certified BIM Coordinator", issuer: "Niqat Global", image: "/images/certifications/certified-bim-coordinator.jpg" },
  { title: "Certified BIM Modeler (Architectural)", issuer: "Niqat Global", image: "/images/certifications/certified-bim-modeler.jpg" },
  { title: "Revit Coordinates Workshop", issuer: "KAITECH Engineering & Technology", image: "/images/certifications/revit-coordinates-workshop.jpg" },
];

export type TechnicalProofStage = {
  id: string;
  label: string;
  src: string;
  alt: string;
  caption: string;
};

export type TechnicalProofStudy = {
  id: string;
  title: string;
  focus: string;
  contribution: string;
  output: string;
  stages: TechnicalProofStage[];
};

export function getTechnicalProofStudies(project: Project): TechnicalProofStudy[] {
  return (project.workSamples ?? []).map((sample, studyIndex) => {
    const stages = sample.imageSources.map((src, stageIndex) => {
      const galleryImage = project.gallery.find((image) => image.src === src);
      return {
        id: `study-${studyIndex + 1}-stage-${stageIndex + 1}`,
        label: sample.stageLabels?.[stageIndex] ?? `Drawing ${stageIndex + 1}`,
        src,
        alt: galleryImage?.alt ?? sample.title,
        caption: galleryImage?.caption ?? sample.title,
      };
    });

    if (sample.contextStage) {
      stages.push({
        id: `study-${studyIndex + 1}-stage-${stages.length + 1}`,
        ...sample.contextStage,
      });
    }

    return {
      id: `study-${studyIndex + 1}`,
      title: sample.title,
      focus: sample.focus,
      contribution: sample.contribution,
      output: sample.output,
      stages,
    };
  });
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type ProjectMediaCollection = {
  id: "site-photos" | "drawings" | "visualizations" | "model-views";
  kind: ProjectMediaKind;
  title: string;
  description: string;
  images: ProjectImage[];
};

export function getProjectMediaKind(image: ProjectImage): ProjectMediaKind {
  if (image.kind) return image.kind;
  if (image.group === "Built project context" || image.group === "Site photography") return "site";
  if (image.group === "Landscape shop drawing plans" || image.group === "Sections & construction details" || image.src.includes("/safwa-shopdrawing/")) return "drawing";
  return "visualization";
}

export function getProjectMediaCollections(project: Project): ProjectMediaCollection[] {
  const sections: Omit<ProjectMediaCollection, "images">[] = [
    { id: "site-photos", kind: "site", title: "Site Photos", description: "Real photographs of the development and on-site project context." },
    { id: "drawings", kind: "drawing", title: "Drawings & Details", description: "Shop drawing plans, sections, levels, and construction details." },
    { id: "visualizations", kind: "visualization", title: "Design & Visualization", description: "Architectural studies, masterplans, landscape concepts, and rendered views." },
    { id: "model-views", kind: "model", title: "3D Model", description: "Explore the architectural geometry interactively and inspect selected model views." },
  ];
  return sections.map((section) => ({ ...section, images: project.gallery.filter((image) => getProjectMediaKind(image) === section.kind) })).filter((section) => section.images.length > 0 || (section.kind === "model" && project.interactiveModel));
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
