import React from 'react';
import type { FooterProps } from './types';
import { FooterMinimal } from './FooterMinimal';
import { FooterMultiColumn } from './FooterMultiColumn';
import { FooterNewsletter } from './FooterNewsletter';

// Export all variants individually
export { FooterMinimal } from './FooterMinimal';
export { FooterMultiColumn } from './FooterMultiColumn';
export { FooterNewsletter } from './FooterNewsletter';
export * from './types';

// Main Footer component - intelligently routes to correct variant
export const Footer: React.FC<FooterProps> = (props) => {
  switch (props.variant) {
    case 'minimal':
      return <FooterMinimal {...props} />;
    case 'multiColumn':
      return <FooterMultiColumn {...props} />;
    case 'newsletter':
      return <FooterNewsletter {...props} />;
    default:
      // Exhaustiveness check - TypeScript ensures this is unreachable
      const _exhaustive: never = props;
      return _exhaustive;
  }
};