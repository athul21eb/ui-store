import { SectionMeta, RegistryItem } from '../../types';
import { Hero, HeroCentered, HeroSplit, HeroFullWidth } from './index';
import type { HeroProps, HeroCenteredProps, HeroSplitProps, HeroFullWidthProps } from './types';

// Metadata for the Hero section
export const heroMeta: SectionMeta = {
  name: 'hero',
  category: 'layout',
  variants: ['centered', 'split', 'fullWidth'],
  description: 'Hero sections for landing pages with multiple layout options',
  dependencies: [], // No extra dependencies needed
};

// Registry entries for each variant
export const heroCenteredRegistry: RegistryItem<HeroCenteredProps> = {
  meta: {
    ...heroMeta,
    name: 'hero-centered',
    variants: ['centered'],
  },
  component: HeroCentered,
  defaultProps: {
    variant: 'centered',
    heading: 'Welcome to Our Platform',
    subheading: 'Build amazing things with our tools',
    alignment: 'center',
    theme: 'light',
    ctas: [
      { label: 'Get Started', variant: 'primary', href: '#' },
      { label: 'Learn More', variant: 'outline', href: '#' },
    ],
  },
};

export const heroSplitRegistry: RegistryItem<HeroSplitProps> = {
  meta: {
    ...heroMeta,
    name: 'hero-split',
    variants: ['split'],
  },
  component: HeroSplit,
  defaultProps: {
    variant: 'split',
    heading: 'Transform Your Workflow',
    subheading: 'Powerful tools designed for modern teams',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    imageAlt: 'Team collaboration',
    imagePosition: 'right',
    theme: 'light',
    ctas: [
      { label: 'Start Free Trial', variant: 'primary', href: '#' },
    ],
  },
};

export const heroFullWidthRegistry: RegistryItem<HeroFullWidthProps> = {
  meta: {
    ...heroMeta,
    name: 'hero-fullWidth',
    variants: ['fullWidth'],
  },
  component: HeroFullWidth,
  defaultProps: {
    variant: 'fullWidth',
    heading: 'Your Vision, Realized',
    subheading: 'Enterprise-grade solutions that scale with you',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    overlay: true,
    overlayOpacity: 0.6,
    ctas: [
      { label: 'Schedule Demo', variant: 'primary', href: '#' },
      { label: 'Watch Video', variant: 'outline', href: '#' },
    ],
  },
};

// Main registry object
export const heroRegistry = {
  centered: heroCenteredRegistry,
  split: heroSplitRegistry,
  fullWidth: heroFullWidthRegistry,
};