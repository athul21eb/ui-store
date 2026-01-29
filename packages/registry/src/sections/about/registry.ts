import type { SectionMeta, RegistryItem } from '../../types';
import { About, AboutTextHeavy, AboutImageFocused, AboutValues } from './index';
import type { AboutProps, AboutTextHeavyProps, AboutImageFocusedProps, AboutValuesProps } from './types';

// Metadata for the About section
export const aboutMeta: SectionMeta = {
  name: 'about',
  category: 'content',
  variants: ['textHeavy', 'imageFocused', 'values'],
  description: 'About sections to showcase your story, mission, and values',
  dependencies: [],
};

// Text Heavy variant registry
export const aboutTextHeavyRegistry: RegistryItem<AboutTextHeavyProps> = {
  meta: {
    ...aboutMeta,
    name: 'about-textHeavy',
    variants: ['textHeavy'],
  },
  component: AboutTextHeavy,
  defaultProps: {
    variant: 'textHeavy',
    title: 'Our Story',
    description: 'Learn about our journey and mission',
    theme: 'light',
    sections: [
      {
        heading: 'Who We Are',
        content: 'We are a team of passionate individuals dedicated to creating innovative solutions that make a difference. Founded in 2020, we\'ve grown from a small startup to a trusted partner for businesses worldwide.',
      },
      {
        heading: 'What We Do',
        content: 'We specialize in building cutting-edge technology solutions that empower businesses to thrive in the digital age. Our expertise spans software development, cloud infrastructure, and digital transformation.',
      },
    ],
    stats: [
      { value: '500+', label: 'Clients' },
      { value: '50+', label: 'Team Members' },
      { value: '10+', label: 'Countries' },
      { value: '99%', label: 'Satisfaction' },
    ],
  },
};

// Image Focused variant registry
export const aboutImageFocusedRegistry: RegistryItem<AboutImageFocusedProps> = {
  meta: {
    ...aboutMeta,
    name: 'about-imageFocused',
    variants: ['imageFocused'],
  },
  component: AboutImageFocused,
  defaultProps: {
    variant: 'imageFocused',
    title: 'Built by Creators, for Creators',
    description: 'Our mission is to empower the next generation',
    content: 'We believe in the power of creativity and innovation. Our platform is designed by creators who understand the challenges and opportunities in the modern digital landscape.\n\nEvery feature we build is crafted with care, tested rigorously, and refined based on real user feedback.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    imageAlt: 'Our team collaborating',
    imagePosition: 'right',
    theme: 'light',
    highlights: [
      'User-centered design philosophy',
      'Continuous innovation and improvement',
      'Commitment to accessibility and inclusion',
      'Sustainable and ethical practices',
    ],
  },
};

// Values variant registry
export const aboutValuesRegistry: RegistryItem<AboutValuesProps> = {
  meta: {
    ...aboutMeta,
    name: 'about-values',
    variants: ['values'],
  },
  component: AboutValues,
  defaultProps: {
    variant: 'values',
    title: 'Our Core Values',
    content: 'These principles guide everything we do, from product development to customer support.',
    theme: 'light',
    columns: 3,
    values: [
      {
        icon: '🎯',
        title: 'Customer First',
        description: 'We put our customers at the heart of everything we do, ensuring their success is our success.',
      },
      {
        icon: '💡',
        title: 'Innovation',
        description: 'We constantly push boundaries and embrace new technologies to stay ahead of the curve.',
      },
      {
        icon: '🤝',
        title: 'Collaboration',
        description: 'We believe in the power of teamwork and foster a culture of open communication.',
      },
      {
        icon: '⚡',
        title: 'Excellence',
        description: 'We strive for excellence in every project, delivering quality that exceeds expectations.',
      },
      {
        icon: '🌱',
        title: 'Growth',
        description: 'We invest in continuous learning and development for our team and our clients.',
      },
      {
        icon: '🔒',
        title: 'Integrity',
        description: 'We operate with honesty and transparency, building trust through ethical practices.',
      },
    ],
  },
};

// Main registry object
export const aboutRegistry = {
  textHeavy: aboutTextHeavyRegistry,
  imageFocused: aboutImageFocusedRegistry,
  values: aboutValuesRegistry,
};