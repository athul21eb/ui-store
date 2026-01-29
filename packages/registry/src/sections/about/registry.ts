import type { SectionMeta } from "../../types";

// Metadata for the About section - exported for CLI use (no component imports)
export const aboutMeta: SectionMeta = {
  name: "about",
  category: "content",
  variants: ["textHeavy", "imageFocused", "values"],
  description: "About sections to showcase your story, mission, and values",
  dependencies: [],
};
