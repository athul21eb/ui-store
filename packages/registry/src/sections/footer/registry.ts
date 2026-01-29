import type { SectionMeta, RegistryItem } from '../../types';
import { Footer, FooterMinimal, FooterMultiColumn, FooterNewsletter } from './index';
import type { FooterProps, FooterMinimalProps, FooterMultiColumnProps, FooterNewsletterProps } from './types';

// Metadata for the Footer section
export const footerMeta: SectionMeta = {
  name: 'footer',
  category: 'layout',
  variants: ['minimal', 'multiColumn', 'newsletter'],
  description: 'Footer sections for site-wide navigation and information',
  dependencies: [],
};

// Minimal variant registry
export const footerMinimalRegistry: RegistryItem<FooterMinimalProps> = {
  meta: {
    ...footerMeta,
    name: 'footer-minimal',
    variants: ['minimal'],
  },
  component: FooterMinimal,
  defaultProps: {
    variant: 'minimal',
    companyName: 'Your Company',
    tagline: 'Building amazing products',
    theme: 'light',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
    socialLinks: [
      { platform: 'Twitter', icon: '𝕏', href: 'https://twitter.com', ariaLabel: 'Follow us on Twitter' },
      { platform: 'LinkedIn', icon: 'in', href: 'https://linkedin.com', ariaLabel: 'Connect on LinkedIn' },
      { platform: 'GitHub', icon: 'GH', href: 'https://github.com', ariaLabel: 'View our GitHub' },
    ],
  },
};

// Multi-column variant registry
export const footerMultiColumnRegistry: RegistryItem<FooterMultiColumnProps> = {
  meta: {
    ...footerMeta,
    name: 'footer-multiColumn',
    variants: ['multiColumn'],
  },
  component: FooterMultiColumn,
  defaultProps: {
    variant: 'multiColumn',
    companyName: 'Your Company',
    description: 'We build innovative solutions that empower businesses to thrive in the digital age.',
    theme: 'light',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Documentation', href: '/docs' },
          { label: 'API Reference', href: '/api' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Blog', href: '/blog' },
          { label: 'Press Kit', href: '/press' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '/help' },
          { label: 'Contact Us', href: '/contact' },
          { label: 'Status', href: '/status' },
          { label: 'Community', href: '/community' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'Twitter', icon: '𝕏', href: 'https://twitter.com', ariaLabel: 'Follow us on Twitter' },
      { platform: 'LinkedIn', icon: 'in', href: 'https://linkedin.com', ariaLabel: 'Connect on LinkedIn' },
      { platform: 'GitHub', icon: 'GH', href: 'https://github.com', ariaLabel: 'View our GitHub' },
      { platform: 'YouTube', icon: 'YT', href: 'https://youtube.com', ariaLabel: 'Subscribe on YouTube' },
    ],
  },
};

// Newsletter variant registry
export const footerNewsletterRegistry: RegistryItem<FooterNewsletterProps> = {
  meta: {
    ...footerMeta,
    name: 'footer-newsletter',
    variants: ['newsletter'],
  },
  component: FooterNewsletter,
  defaultProps: {
    variant: 'newsletter',
    companyName: 'Your Company',
    description: 'Building the future of technology, one innovation at a time.',
    theme: 'light',
    newsletterTitle: 'Stay Updated',
    newsletterDescription: 'Subscribe to our newsletter for the latest updates, insights, and exclusive content.',
    newsletterSuccessMessage: 'Thanks for subscribing! Check your inbox for confirmation.',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Updates', href: '/updates' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/docs' },
          { label: 'Guides', href: '/guides' },
          { label: 'Blog', href: '/blog' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Careers', href: '/careers' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'Twitter', icon: '𝕏', href: 'https://twitter.com', ariaLabel: 'Follow us on Twitter' },
      { platform: 'Facebook', icon: 'f', href: 'https://facebook.com', ariaLabel: 'Like us on Facebook' },
      { platform: 'Instagram', icon: 'IG', href: 'https://instagram.com', ariaLabel: 'Follow us on Instagram' },
      { platform: 'LinkedIn', icon: 'in', href: 'https://linkedin.com', ariaLabel: 'Connect on LinkedIn' },
    ],
  },
};

// Main registry object
export const footerRegistry = {
  minimal: footerMinimalRegistry,
  multiColumn: footerMultiColumnRegistry,
  newsletter: footerNewsletterRegistry,
};