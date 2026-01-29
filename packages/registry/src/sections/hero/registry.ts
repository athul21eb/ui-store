import type { SectionMeta } from "../../types";

// Metadata for the Hero section - exported for CLI use (no component imports)
export const heroMeta: SectionMeta = {
  name: "hero",
  category: "layout",
  variants: ["centered", "split", "fullWidth"],
  description: "Hero sections for landing pages with multiple layout options",
  dependencies: [], // No extra dependencies needed
};
