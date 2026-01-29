import type { BaseProps, CTAButton, Alignment } from '../../types';

// Union type for variants - TypeScript knows exactly which variant is used
export type HeroVariant = 'centered' | 'split' | 'fullWidth';

// Props that ALL Hero variants share
interface BaseHeroProps extends BaseProps {
  variant: HeroVariant;
  heading: string;
  subheading?: string;
  ctas?: CTAButton[];
}

// Centered variant - simple, text-focused
export interface HeroCenteredProps extends BaseHeroProps {
  variant: 'centered';
  alignment?: Alignment;
  backgroundImage?: string;
}

// Split variant - content on one side, media on other
export interface HeroSplitProps extends BaseHeroProps {
  variant: 'split';
  imageUrl: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  reverse?: boolean;
}

// FullWidth variant - immersive background
export interface HeroFullWidthProps extends BaseHeroProps {
  variant: 'fullWidth';
  backgroundImage: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

// Discriminated union - TypeScript magic!
export type HeroProps =
  | HeroCenteredProps
  | HeroSplitProps
  | HeroFullWidthProps;