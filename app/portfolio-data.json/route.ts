import { credentials, portfolio, projects } from "@/data/portfolio";

export function GET() {
  return Response.json(
    {
      schemaVersion: 1,
      portfolio,
      projects,
      credentials,
      editorialRules: {
        sourceOfTruth: "data/portfolio.ts",
        confidentialProject: "security-aviation-leadership-building",
        metricsPolicy: "Use only verified figures supplied by Shaher or present in his approved CV.",
      },
    },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" } },
  );
}
