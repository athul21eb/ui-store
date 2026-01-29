import type { BaseProps } from '../../types';

// Union type for Footer variants
export type FooterVariant = 'minimal' | 'multiColumn' | 'newsletter';

// Base props shared across all Footer variants
interface BaseFooterProps extends BaseProps {
  variant: FooterVariant;
  companyName?: string;
  copyrightText?: string;
}

// Footer link item
export interface FooterLink {
  label: string;
  href: string;
}

// Footer column
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Social media link
export interface SocialLink {
  platform: string;
  icon?: string;
  href: string;
  ariaLabel?: string;
}

// Minimal footer variant - Simple and clean
export interface FooterMinimalProps extends BaseFooterProps {
  variant: 'minimal';
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  tagline?: string;
}

// Multi-column footer variant - Comprehensive navigation
export interface FooterMultiColumnProps extends BaseFooterProps {
  variant: 'multiColumn';
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  description?: string;
  logo?: string;
  logoAlt?: string;
}

// Newsletter footer variant - Includes email signup
export interface FooterNewsletterProps extends BaseFooterProps {
  variant: 'newsletter';
  newsletterTitle?: string;
  newsletterDescription?: string;
  onNewsletterSubmit?: (email: string) => void | Promise<void>;
  newsletterSuccessMessage?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  description?: string;
}

// Discriminated union
export type FooterProps =
  | FooterMinimalProps
  | FooterMultiColumnProps
  | FooterNewsletterProps;