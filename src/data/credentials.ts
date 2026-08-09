export type Credential = {
  title: string;
  issuer: string;
  url?: string;
  credentialId?: string;
  badges: string[];
};

export const credentials: Credential[] = [
  {
    title: "Level 1 Information Manager - Basics",
    issuer: "Plannerly - The BIM Management Platform",
    url: "https://plannerly.com/tutor-certificate?cert_hash=fcee2c6bb11ec33b",
    badges: ["/images/certifications/certified-information-manager.jpg"]
  },
  {
    title: "Level 3 Information Manager - ISO 19650 Expert",
    issuer: "Plannerly - The BIM Management Platform",
    url: "https://plannerly.com/tutor-certificate?cert_hash=285f5c57c7dd1283",
    badges: [
      "/images/certifications/iso-19650-readiness.jpg",
      "/images/certifications/revit-coordinates-workshop.jpg"
    ]
  },
  {
    title: "BIM Management - BIM Modeling - BIM Coordination - BIM Documentation",
    issuer: "Niqat Global",
    credentialId: "EM303567098129285534575",
    badges: [
      "/images/certifications/certified-bim-modeler.jpg",
      "/images/certifications/certified-bim-coordinator.jpg",
      "/images/certifications/bim-diploma-management.jpg"
    ]
  }
];
