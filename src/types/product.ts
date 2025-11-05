import { Image, SEO } from "./common";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  price: number;
  oldPrice?: number;
  currency?: string;
  inStock: boolean;
  quantity?: number;
  badge?: "new" | "sale" | "hit" | "exclusive";
  rating?: number;
  reviewsCount?: number;
  images: ProductImage[];
  description: string;
  features?: string[];
  specifications?: ProductSpecifications;
  seo?: SEO;
}

export interface ProductImage extends Image {
  type?: "main" | "gallery" | "thumbnail";
}

export interface ProductSpecifications {
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  material?: {
    frame?: string;
    upholstery?: string;
    filler?: string;
  };
  weight?: number;
  color?: string;
  style?: string;
  manufacturer?: string;
  warranty?: string;
  [key: string]: any;
}

export interface ProductFilter {
  priceRange?: {
    min: number;
    max: number;
  };
  styles?: string[];
  materials?: string[];
  colors?: string[];
  categories?: string[];
  inStock?: boolean;
}



