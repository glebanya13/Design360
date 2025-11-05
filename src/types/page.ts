import { SEO, Button, Image } from "./common";

export interface Page {
  slug: string;
  title: string;
  type: string;
  layout: "default" | "admin" | "minimal";
  seo?: SEO;
  sections: Section[];
}

export interface Section {
  type: string;
  props: any;
}

// Hero Section
export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  buttons?: Button[];
  align?: "left" | "center" | "right";
}

// Features Section
export interface FeaturesProps {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  layout?: "grid" | "list";
}

export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

// Pricing Section
export interface PricingProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export interface PricingPlan {
  name: string;
  price: number;
  unit?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

// Process Section
export interface ProcessProps {
  title: string;
  steps: ProcessStep[];
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  image?: string;
}

// Gallery Section
export interface GalleryProps {
  title: string;
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
}

export interface GalleryItem extends Image {
  title: string;
  description?: string;
  category?: string;
  link?: string;
}

// Stats Section
export interface StatsProps {
  title?: string;
  items: StatItem[];
}

export interface StatItem {
  number: string;
  label: string;
  icon?: string;
}

// CTA Section
export interface CTAProps {
  title: string;
  description?: string;
  button: Button;
  background?: string;
}

// Text Section
export interface TextProps {
  title?: string;
  content: string;
  align?: "left" | "center" | "right";
}



