import type { SectionMeta } from "../../types";

// Metadata for the Booking section - exported for CLI use (no component imports)
export const bookingMeta: SectionMeta = {
  name: "booking",
  category: "forms",
  variants: ["minimal", "dateFocused", "withInfo"],
  description: "Booking and reservation sections with date/time selection",
  dependencies: [],
};
