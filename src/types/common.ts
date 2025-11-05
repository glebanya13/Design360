// Общие типы для всего приложения

export interface SiteConfig {
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  socialMedia?: {
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
    vk?: string;
  };
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Button {
  text: string;
  link: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  icon?: string;
  disabled?: boolean;
  external?: boolean;
}

export type LayoutType = "default" | "admin" | "minimal";
export type SectionLayout = "full" | "contained" | "wide";



