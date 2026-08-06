/**
 * Groups a project's flat `stack` array into architecture layers for the case
 * study breakdown.
 *
 * This is a classification of technologies that are already listed in the
 * project data — it adds structure, not claims. Anything unrecognised falls
 * into "Tooling" rather than being dropped, so adding a technology to a project
 * can never make it silently disappear from the page.
 */

export type StackLayer =
  | "Frontend"
  | "Backend"
  | "Data"
  | "Blockchain"
  | "Integrations"
  | "Tooling";

const LAYER_BY_TECH: Record<string, StackLayer> = {
  // Frontend
  React: "Frontend",
  "Next.js": "Frontend",
  "Vue.js": "Frontend",
  Angular: "Frontend",
  TypeScript: "Frontend",
  JavaScript: "Frontend",
  Bootstrap: "Frontend",
  "Material UI": "Frontend",
  "Chakra UI": "Frontend",
  "Tailwind CSS": "Frontend",
  Elementor: "Frontend",
  jQuery: "Frontend",
  Redux: "Frontend",

  // Backend
  "Node.js": "Backend",
  "Express.js": "Backend",
  PHP: "Backend",
  Django: "Backend",
  FastAPI: "Backend",
  WordPress: "Backend",
  "MERN Stack": "Backend",

  // Data
  MongoDB: "Data",
  MySQL: "Data",
  SQL: "Data",
  PostgreSQL: "Data",
  SQLite: "Data",
  Firebase: "Data",
  Supabase: "Data",
  Redis: "Data",

  // Blockchain
  Solidity: "Blockchain",
  Ethereum: "Blockchain",
  MetaMask: "Blockchain",

  // Integrations
  "Twilio API": "Integrations",
  "QR.io API": "Integrations",
  Axios: "Integrations",
  GraphQL: "Integrations",
  REST: "Integrations",
  "REST API": "Integrations",
  Analytics: "Integrations",
};

/** Display order — layers render top-down in this sequence. */
const LAYER_ORDER: StackLayer[] = [
  "Blockchain",
  "Frontend",
  "Backend",
  "Data",
  "Integrations",
  "Tooling",
];

export function groupStackByLayer(
  stack: string[],
): { layer: StackLayer; items: string[] }[] {
  const grouped = new Map<StackLayer, string[]>();

  for (const tech of stack) {
    const layer = LAYER_BY_TECH[tech] ?? "Tooling";
    grouped.set(layer, [...(grouped.get(layer) ?? []), tech]);
  }

  return LAYER_ORDER.filter((layer) => grouped.has(layer)).map((layer) => ({
    layer,
    items: grouped.get(layer)!,
  }));
}
