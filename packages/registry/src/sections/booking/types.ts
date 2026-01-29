import type { BaseProps } from '../../types';

// Union type for Booking variants
export type BookingVariant = 'minimal' | 'dateFocused' | 'withInfo';

// Base props shared across all Booking variants
interface BaseBookingProps extends BaseProps {
  variant: BookingVariant;
  title: string;
  description?: string;
}

// Booking form field configuration
export interface BookingFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'time' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  min?: string | number;
  max?: string | number;
}

// Time slot configuration
export interface TimeSlot {
  time: string;
  available: boolean;
  label?: string;
}

// Booking info item
export interface BookingInfo {
  icon?: string;
  title: string;
  description: string;
}

// Minimal booking variant - Simple and straightforward
export interface BookingMinimalProps extends BaseBookingProps {
  variant: 'minimal';
  fields?: BookingFormField[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  successMessage?: string;
}

// Date & time focused variant - Emphasis on scheduling
export interface BookingDateFocusedProps extends BaseBookingProps {
  variant: 'dateFocused';
  availableDates?: string[]; // ISO date strings
  timeSlots?: TimeSlot[];
  guestCountOptions?: number[];
  additionalFields?: BookingFormField[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  successMessage?: string;
  minDate?: string;
  maxDate?: string;
}

// Booking with info variant - Includes additional information
export interface BookingWithInfoProps extends BaseBookingProps {
  variant: 'withInfo';
  fields?: BookingFormField[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  successMessage?: string;
  bookingInfo: BookingInfo[];
  policiesText?: string;
}

// Discriminated union
export type BookingProps =
  | BookingMinimalProps
  | BookingDateFocusedProps
  | BookingWithInfoProps;