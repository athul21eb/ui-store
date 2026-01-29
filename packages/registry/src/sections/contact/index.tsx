import React from 'react';
import type { ContactProps } from './types';
import { ContactSimple } from './ContactSimple';
import { ContactWithInfo } from './ContactWithInfo';
import { ContactCta } from './ContactCta';

// Export all variants individually
export { ContactSimple } from './ContactSimple';
export { ContactWithInfo } from './ContactWithInfo';
export { ContactCta } from './ContactCta';
export * from './types';

// Main Contact component - intelligently routes to correct variant
export const Contact: React.FC<ContactProps> = (props) => {
  switch (props.variant) {
    case 'simple':
      return <ContactSimple {...props} />;
    case 'withInfo':
      return <ContactWithInfo {...props} />;
    case 'cta':
      return <ContactCta {...props} />;
    default:
      // Exhaustiveness check - TypeScript ensures this is unreachable
      const _exhaustive: never = props;
      return _exhaustive;
  }
};