import type { SectionMeta, RegistryItem } from '../../types';
import { Contact, ContactSimple, ContactWithInfo, ContactCta } from './index';
import type { ContactProps, ContactSimpleProps, ContactWithInfoProps, ContactCtaProps } from './types';

// Metadata for the Contact section
export const contactMeta: SectionMeta = {
  name: 'contact',
  category: 'forms',
  variants: ['simple', 'withInfo', 'cta'],
  description: 'Contact sections with forms and validation',
  dependencies: [],
};

// Simple variant registry
export const contactSimpleRegistry: RegistryItem<ContactSimpleProps> = {
  meta: {
    ...contactMeta,
    name: 'contact-simple',
    variants: ['simple'],
  },
  component: ContactSimple,
  defaultProps: {
    variant: 'simple',
    title: 'Get in Touch',
    description: 'Have a question? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    theme: 'light',
    submitLabel: 'Send Message',
    successMessage: 'Thank you for reaching out! We\'ll get back to you within 24 hours.',
  },
};

// With Info variant registry
export const contactWithInfoRegistry: RegistryItem<ContactWithInfoProps> = {
  meta: {
    ...contactMeta,
    name: 'contact-withInfo',
    variants: ['withInfo'],
  },
  component: ContactWithInfo,
  defaultProps: {
    variant: 'withInfo',
    title: 'Contact Us',
    description: 'We\'re here to help and answer any questions you might have.',
    theme: 'light',
    submitLabel: 'Send Message',
    successMessage: 'Message received! Our team will respond shortly.',
    companyName: 'Our Company',
    companyDescription: 'We\'re committed to providing exceptional service and support to all our clients.',
    contactInfo: [
      {
        icon: '📧',
        label: 'Email',
        value: 'hello@company.com',
        href: 'mailto:hello@company.com',
      },
      {
        icon: '📞',
        label: 'Phone',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
      },
      {
        icon: '📍',
        label: 'Address',
        value: '123 Business Street, Suite 100\nSan Francisco, CA 94102',
      },
      {
        icon: '🕐',
        label: 'Business Hours',
        value: 'Monday - Friday: 9am - 6pm\nWeekend: Closed',
      },
    ],
  },
};

// CTA variant registry
export const contactCtaRegistry: RegistryItem<ContactCtaProps> = {
  meta: {
    ...contactMeta,
    name: 'contact-cta',
    variants: ['cta'],
  },
  component: ContactCta,
  defaultProps: {
    variant: 'cta',
    title: 'Ready to Get Started?',
    description: 'Join thousands of satisfied customers who trust us with their business.',
    theme: 'light',
    ctaText: 'Schedule a free consultation with our team',
    ctaButtonLabel: 'Book Your Call',
    ctaButtonHref: '#booking',
    showQuickForm: true,
    contactMethods: [
      {
        icon: '💬',
        label: 'Live Chat',
        value: 'Available 24/7',
        href: '#chat',
      },
      {
        icon: '📧',
        label: 'Email Support',
        value: 'support@company.com',
        href: 'mailto:support@company.com',
      },
      {
        icon: '📞',
        label: 'Call Us',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
      },
    ],
  },
};

// Main registry object
export const contactRegistry = {
  simple: contactSimpleRegistry,
  withInfo: contactWithInfoRegistry,
  cta: contactCtaRegistry,
};