import type { SectionMeta } from "../../types";

// Metadata for the Contact section - exported for CLI use (no component imports)
export const contactMeta: SectionMeta = {
  name: "contact",
  category: "forms",
  variants: ["simple", "withInfo", "cta"],
  description: "Contact sections with forms and validation",
  dependencies: [],
};
