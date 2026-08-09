const LANDSCAPE_SOFTWARE = ["Revit", "AutoCAD", "Civil 3D", "SketchUp", "Lumion"];
const ARCHITECTURE_SOFTWARE = ["AutoCAD", "Revit", "SketchUp", "Adobe Creative Suite"];
const BIM_SOFTWARE = ["Revit", "Navisworks", "ACC Platform", "BIM Documentation"];

export function softwareForTags(tags: readonly string[]): string[] {
  const set = new Set<string>();
  if (tags.some((t) => t.includes("Landscape"))) LANDSCAPE_SOFTWARE.forEach((s) => set.add(s));
  if (tags.some((t) => t.includes("Architecture"))) ARCHITECTURE_SOFTWARE.forEach((s) => set.add(s));
  if (tags.some((t) => t.includes("BIM"))) BIM_SOFTWARE.forEach((s) => set.add(s));
  if (set.size === 0) LANDSCAPE_SOFTWARE.forEach((s) => set.add(s));
  return Array.from(set);
}
