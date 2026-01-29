import React from 'react';
import type { BookingProps } from './types';
import { BookingMinimal } from './BookingMinimal';
import { BookingDateFocused } from './BookingDateFocused';
import { BookingWithInfo } from './BookingWithInfo';

// Export all variants individually
export { BookingMinimal } from './BookingMinimal';
export { BookingDateFocused } from './BookingDateFocused';
export { BookingWithInfo } from './BookingWithInfo';
export * from './types';

// Main Booking component - intelligently routes to correct variant
export const Booking: React.FC<BookingProps> = (props) => {
  switch (props.variant) {
    case 'minimal':
      return <BookingMinimal {...props} />;
    case 'dateFocused':
      return <BookingDateFocused {...props} />;
    case 'withInfo':
      return <BookingWithInfo {...props} />;
    default:
      // Exhaustiveness check - TypeScript ensures this is unreachable
      const _exhaustive: never = props;
      return _exhaustive;
  }
};