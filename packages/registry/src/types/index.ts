import React from "react";

// Base props that ALL sections share
export interface BaseProps {
  className?: string;
  theme?: "light" | "dark";
}

// Theme configuration
export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

// Section metadata for registry
export interface SectionMeta {
  name: string;
  category: string;
  variants: string[];
  description: string;
  dependencies?: string[];
}

// Registry item structure
export interface RegistryItem<T = any> {
  meta: SectionMeta;
  component: React.ComponentType<T>;
  defaultProps: Partial<T>;
}

// CTA (Call-to-Action) button used across sections
export interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

// Common variant types
export type Alignment = "left" | "center" | "right";
export type Size = "sm" | "md" | "lg" | "xl";
