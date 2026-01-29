import type { SectionMeta } from "../../types";

// Metadata for the Footer section - exported for CLI use (no component imports)
export const footerMeta: SectionMeta = {
  name: "footer",
  category: "layout",
  variants: ["minimal", "multiColumn", "newsletter"],
  description: "Footer sections for site-wide navigation and information",
  dependencies: [],
};
