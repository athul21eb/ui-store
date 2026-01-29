import React from "react";
import { HeroProps } from "./types";
import { HeroCentered } from "./HeroCentered";
import { HeroSplit } from "./HeroSplit";
import { HeroFullWidth } from "./HeroFullWidth";

// Export all variants individually
export { HeroCentered } from "./HeroCentered";
export { HeroSplit } from "./HeroSplit";
export { HeroFullWidth } from "./HeroFullWidth";
export * from "./types";

// Main Hero component - intelligently routes to correct variant
export const Hero: React.FC<HeroProps> = (props) => {
  switch (props.variant) {
    case "centered":
      return <HeroCentered {...props} />;
    case "split":
      return <HeroSplit {...props} />;
    case "fullWidth":
      return <HeroFullWidth {...props} />;
    default:
      // TypeScript ensures this is unreachable
      const _exhaustive: never = props;
      return _exhaustive;
  }
};
