// lib/medusa/types.ts
// Shared TypeScript types for Medusa API responses

export interface MedusaProductVariant {
  id: string;
  title: string;
  prices: Array<{ amount: number; currency_code: string }>;
  options: Array<{ option_title: string; value: string }>;
  inventory_quantity: number;
  sku?: string;
}

export interface MedusaProductImage {
  url: string;
  id?: string;
}

export interface MedusaProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  status: string;
  is_giftcard: boolean;
  thumbnail?: string;
  images?: MedusaProductImage[];
  variants?: MedusaProductVariant[];
  options?: Array<{ id: string; title: string; values: string[] }>;
  tags?: Array<{ id: string; value: string }>;
  metadata?: Record<string, string>;
  collection?: { id: string; title: string; handle: string };
}

export interface MedusaCartLine {
  id: string;
  variant_id: string;
  quantity: number;
  unit_price?: number;
  item_id?: string;
}

export interface MedusaCart {
  id: string;
  email?: string;
  line_items: MedusaCartLine[];
  subtotal?: number;
  total?: number;
  tax_total?: number;
  shipping_total?: number;
  region_id?: string;
  shipping_address?: MedusaAddress;
  billing_address?: MedusaAddress;
  payment_sessions?: Array<{ id: string; status: string; provider_id: string }>;
  payment_authorized_at?: string;
}

export interface MedusaAddress {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country_code?: string;
  phone?: string;
}

export interface MedusaRegion {
  id: string;
  name: string;
  currency_code: string;
  tax_rate: number;
  countries: string[];
}

export interface MedusaCollection {
  id: string;
  title: string;
  handle: string;
  products?: MedusaProduct[];
}
