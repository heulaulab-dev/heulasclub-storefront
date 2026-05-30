// lib/medusa/regions.ts
import { medusaFetch } from "./client";
import type { MedusaRegion } from "./types";

interface ListRegionsResponse {
  regions: MedusaRegion[];
}

export async function listRegions(): Promise<MedusaRegion[]> {
  const res = await medusaFetch<ListRegionsResponse>("/regions");
  return res.regions;
}
