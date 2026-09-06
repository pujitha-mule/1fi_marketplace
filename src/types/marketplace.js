export interface ProductVariant {
  id: string;
  name: string; // "Color", "Storage", etc.
  value: string; // "Black", "256GB", etc.
  available: boolean;
}

export interface EMIPlan {
  id: string;
  months: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
  features: string[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

export interface SelectedVariants {
  [variantGroupName: string]: string; // e.g., { "Color": "v1", "Storage": "v4" }
}