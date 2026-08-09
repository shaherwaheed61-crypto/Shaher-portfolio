export type ProjectLocation = {
  label: string;
  slug: string;
  lat: number;
  lng: number;
};

export const locations: ProjectLocation[] = [
  { label: "King Abdullah International Gardens - Riyadh", slug: "king-abdullah-gardens", lat: 24.7136, lng: 46.6753 },
  { label: "Marsa, Khuzam - Riyadh", slug: "marsa-khuzam", lat: 24.6877, lng: 46.7219 },
  { label: "AlUla Housing - Tabuk/Medina region", slug: "alula-housing", lat: 26.6084, lng: 37.9209 },
  { label: "Zad Engineering - Egypt", slug: "zad-engineering", lat: 30.0444, lng: 31.2357 },
  { label: "Freelance - Taif, Saudi Arabia", slug: "freelance-visualization", lat: 21.2703, lng: 40.4158 },
  { label: "Freelance - 6th of October City, Egypt", slug: "freelance-visualization", lat: 29.9097, lng: 30.9746 }
];
