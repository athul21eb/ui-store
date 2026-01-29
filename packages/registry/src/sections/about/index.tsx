import React from 'react';
import type { AboutProps, AboutTextHeavyProps, AboutImageFocusedProps, AboutValuesProps } from './types';
import { AboutTextHeavy } from './AboutTextHeavy';
import { AboutImageFocused } from './AboutImageFocused';
import { AboutValues } from './AboutValues';

// Export all variants individually
export { AboutTextHeavy } from './AboutTextHeavy';
export { AboutImageFocused } from './AboutImageFocused';
export { AboutValues } from './AboutValues';
export * from './types';

// Main About component - intelligently routes to correct variant
export const About: React.FC<AboutProps> = (props) => {
  switch (props.variant) {
    case 'textHeavy':
      return <AboutTextHeavy {...(props as AboutTextHeavyProps)} />;
    case 'imageFocused':
      return <AboutImageFocused {...(props as AboutImageFocusedProps)} />;
    case 'values':
      return <AboutValues {...(props as AboutValuesProps)} />;
    default:
      // Exhaustiveness check - TypeScript ensures this is unreachable
      const _exhaustive: never = props;
      return _exhaustive;
  }
};