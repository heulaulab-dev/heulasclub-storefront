// lib/medusa/products.ts
import { medusaFetch } from "./client";
import type { MedusaProduct } from "./types";

interface ListProductsParams {
  limit?: number;
  offset?: number;
  category?: string;
  tags?: string[];
  status?: string;
}

interface ListProductsResponse {
  products: MedusaProduct[];
  count: number;
  offset: number;
  limit: number;
}

interface GetProductResponse {
  product: MedusaProduct;
}

export async function listProducts(
  params: ListProductsParams = {}
): Promise<ListProductsResponse> {
  const { limit = 100, offset = 0, category, tags } = params;

  const query = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    expand: "variants,images,tags",
  });

  if (category) {
    query.set("collection_handle", category.toLowerCase());
  }

  if (tags && tags.length > 0) {
    query.set("tags", tags.join(","));
  }

  return medusaFetch<ListProductsResponse>(`/products?${query}`);
}

export async function getProduct(handle: string): Promise<MedusaProduct> {
  const res = await medusaFetch<GetProductResponse>(
    `/products/${handle}?expand=variants,images,tags`
  );
  return res.product;
}

export async function getProductsByCategory(
  category: string,
  limit = 20
): Promise<MedusaProduct[]> {
  const res = await listProducts({ category, limit });
  return res.products;
}
