export type Service = {
  title: string;
  description: string;
  tools: string[];
};

export const services: Service[] = [
  {
    title: "Landscape Shop Drawings & Design Development",
    description:
      "Hardscape plans, coordinates, levels and grading, sections, and full submittal packages for landscape and garden projects.",
    tools: ["Revit", "AutoCAD", "Civil 3D"]
  },
  {
    title: "Architectural Shop Drawings & As-Built Documentation",
    description:
      "Executive drawings, as-built sheets, and residential/commercial building-permit packages under local codes.",
    tools: ["AutoCAD", "Revit"]
  },
  {
    title: "3D Exterior & Landscape Visualization",
    description:
      "Exterior renders and landscape visualizations that support design decisions and client presentations.",
    tools: ["SketchUp", "Lumion", "Adobe Creative Suite"]
  },
  {
    title: "BIM Coordination & Clash Detection",
    description:
      "Multi-disciplinary model coordination (MEP, Structural, Architectural) and issue tracking to resolve clashes before site execution.",
    tools: ["Navisworks", "ACC Platform", "Revit"]
  },
  {
    title: "Quantity Surveying & BOQs",
    description: "Detailed shop-drawing-derived quantity surveying and bills of quantities.",
    tools: ["Revit", "AutoCAD"]
  }
];
