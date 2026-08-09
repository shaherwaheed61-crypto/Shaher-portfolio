export type ExperienceEntry = {
  employer: string;
  role: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string | "present";
  url?: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    employer: "Safwa Riyadh General Contracting Co.",
    role: "Architect & Landscape Architect - Technical Office",
    location: "Riyadh, Saudi Arabia",
    period: "11/2025 - Present",
    startDate: "2025-11",
    endDate: "present",
    url: "https://safwariyadh.com/disclosure-and-transparency-safwa/group-profile/",
    bullets: [
      "Preparing shop drawings, design development and landscape concept refinement for Marsa, Khuzam (client NHC, consultant Zuhair Fayez Partnership)",
      "Landscape works and heritage-sensitive coordination for AlUla Housing (client Ministry of Municipalities and Housing)",
      "Producing 3D models and visualizations supporting design decisions and client presentations"
    ]
  },
  {
    employer: "Zaid Al-Hussein and Brothers Contracting Group",
    role: "Technical Office Landscape Architect",
    location: "Riyadh, Saudi Arabia",
    period: "11/2023 - 11/2025",
    startDate: "2023-11",
    endDate: "2025-11",
    url: "https://zaidg.com/arabic/group-sectors/construction",
    bullets: [
      "Preparing and reviewing landscape shop drawings and as-built sheets for King Abdullah International Gardens (client Riyadh Municipality, consultant Dar Al-Handasah)",
      "Submittals: hardscape plans, coordinates, levels and grading, sections",
      "Technical reports, SCR/RFI, design justifications, and multi-disciplinary clash coordination (MEP, Structural, Architectural)"
    ]
  },
  {
    employer: "Zad Engineering Consulting Office",
    role: "Technical Office Architect",
    location: "Egypt",
    period: "07/2021 - 11/2023",
    startDate: "2021-07",
    endDate: "2023-11",
    bullets: [
      "Architecture shop drawings, as-built documentation, and quantity surveying",
      "3D exterior and landscape models for private villas and a resort masterplan",
      "Residential and commercial building-permit packages under local building codes"
    ]
  },
  {
    employer: "Freelance",
    role: "3D Modeler - Architect & Landscape Architect",
    location: "Remote",
    period: "04/2019 - Present",
    startDate: "2019-04",
    endDate: "present",
    url: "https://www.behance.net/shaherwaheed",
    bullets: [
      "Exterior and landscape 3D visualization for independent clients",
      "Detailed and executive landscape drawings"
    ]
  }
];
