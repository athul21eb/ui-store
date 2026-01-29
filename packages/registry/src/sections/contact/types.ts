import type { BaseProps } from '../../types';

// Union type for Contact variants
export type ContactVariant = 'simple' | 'withInfo' | 'cta';

// Base props shared across all Contact variants
interface BaseContactProps extends BaseProps {
  variant: ContactVariant;
  title: string;
  description?: string;
}

// Form field configuration
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  rows?: number;
}

// Contact information item
export interface ContactInfo {
  icon?: string;
  label: string;
  value: string;
  href?: string;
}

// Simple form variant - Just the form
export interface ContactSimpleProps extends BaseContactProps {
  variant: 'simple';
  fields?: FormField[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  successMessage?: string;
}

// Form with company info variant
export interface ContactWithInfoProps extends BaseContactProps {
  variant: 'withInfo';
  fields?: FormField[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  successMessage?: string;
  contactInfo: ContactInfo[];
  companyName?: string;
  companyDescription?: string;
}

// CTA-based variant - Less form, more call-to-action
export interface ContactCtaProps extends BaseContactProps {
  variant: 'cta';
  ctaText: string;
  ctaButtonLabel: string;
  ctaButtonHref?: string;
  onCtaClick?: () => void;
  contactMethods: ContactInfo[];
  showQuickForm?: boolean;
  quickFormFields?: FormField[];
  onQuickFormSubmit?: (data: Record<string, string>) => void | Promise<void>;
}

// Discriminated union
export type ContactProps =
  | ContactSimpleProps
  | ContactWithInfoProps
  | ContactCtaProps;