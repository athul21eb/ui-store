import type { SectionMeta, RegistryItem } from '../../types';
import { Booking, BookingMinimal, BookingDateFocused, BookingWithInfo } from './index';
import type { BookingProps, BookingMinimalProps, BookingDateFocusedProps, BookingWithInfoProps } from './types';

// Metadata for the Booking section
export const bookingMeta: SectionMeta = {
  name: 'booking',
  category: 'forms',
  variants: ['minimal', 'dateFocused', 'withInfo'],
  description: 'Booking and reservation sections with date/time selection',
  dependencies: [],
};

// Minimal variant registry
export const bookingMinimalRegistry: RegistryItem<BookingMinimalProps> = {
  meta: {
    ...bookingMeta,
    name: 'booking-minimal',
    variants: ['minimal'],
  },
  component: BookingMinimal,
  defaultProps: {
    variant: 'minimal',
    title: 'Reserve Your Spot',
    description: 'Fill out the form below to make a reservation',
    theme: 'light',
    submitLabel: 'Book Now',
    successMessage: 'Booking confirmed! We\'ll send you a confirmation email shortly.',
  },
};

// Date Focused variant registry
export const bookingDateFocusedRegistry: RegistryItem<BookingDateFocusedProps> = {
  meta: {
    ...bookingMeta,
    name: 'booking-dateFocused',
    variants: ['dateFocused'],
  },
  component: BookingDateFocused,
  defaultProps: {
    variant: 'dateFocused',
    title: 'Book Your Reservation',
    description: 'Select your preferred date and time',
    theme: 'light',
    submitLabel: 'Confirm Booking',
    successMessage: 'Your reservation has been confirmed! We look forward to seeing you.',
    guestCountOptions: [1, 2, 3, 4, 5, 6, 7, 8],
    additionalFields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-4567', required: false },
    ],
  },
};

// With Info variant registry
export const bookingWithInfoRegistry: RegistryItem<BookingWithInfoProps> = {
  meta: {
    ...bookingMeta,
    name: 'booking-withInfo',
    variants: ['withInfo'],
  },
  component: BookingWithInfo,
  defaultProps: {
    variant: 'withInfo',
    title: 'Make a Reservation',
    description: 'Book your experience with us',
    theme: 'light',
    submitLabel: 'Complete Booking',
    successMessage: 'Your booking has been confirmed! Check your email for details.',
    bookingInfo: [
      {
        icon: '⏰',
        title: 'Advance Booking',
        description: 'We recommend booking at least 24 hours in advance to ensure availability.',
      },
      {
        icon: '✅',
        title: 'Confirmation',
        description: 'You\'ll receive an email confirmation immediately after booking with all the details.',
      },
      {
        icon: '🔄',
        title: 'Modifications',
        description: 'Need to change your booking? Contact us at least 12 hours before your scheduled time.',
      },
      {
        icon: '💳',
        title: 'Payment',
        description: 'Payment is required at the time of service. We accept all major credit cards.',
      },
    ],
    policiesText: 'Cancellation Policy: Free cancellation up to 24 hours before your reservation. Late cancellations may incur a fee.\n\nPlease arrive 10 minutes before your scheduled time.\n\nIf you need to make changes, contact us as soon as possible.',
  },
};

// Main registry object
export const bookingRegistry = {
  minimal: bookingMinimalRegistry,
  dateFocused: bookingDateFocusedRegistry,
  withInfo: bookingWithInfoRegistry,
};