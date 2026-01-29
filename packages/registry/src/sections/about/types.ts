import type { BaseProps } from '../../types';

// Union type for About variants
export type AboutVariant = 'textHeavy' | 'imageFocused' | 'values';

// Base props shared across all About variants
interface BaseAboutProps extends BaseProps {
  variant: AboutVariant;
  title: string;
  description?: string;
}

// Text-heavy variant - Focus on written content
export interface AboutTextHeavyProps extends BaseAboutProps {
  variant: 'textHeavy';
  sections: {
    heading: string;
    content: string;
  }[];
  stats?: {
    label: string;
    value: string;
  }[];
}

// Image-focused variant - Visual storytelling
export interface AboutImageFocusedProps extends BaseAboutProps {
  variant: 'imageFocused';
  content: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  highlights?: string[];
}

// Values/highlights variant - Company culture/values
export interface AboutValuesProps extends BaseAboutProps {
  variant: 'values';
  content: string;
  values: {
    icon?: string;
    title: string;
    description: string;
  }[];
  columns?: 2 | 3 | 4;
}

// Discriminated union
export type AboutProps =
  | AboutTextHeavyProps
  | AboutImageFocusedProps
  | AboutValuesProps;