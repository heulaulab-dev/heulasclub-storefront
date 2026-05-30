// lib/medusa/client.ts
// Medusa.js API client for the HEULASCLUB storefront

const MEDUSA_API = process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

interface MedusaResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

async function medusaFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${MEDUSA_API}/store${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key":
        process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new MedusaError(res.status, error.message || res.statusText, error);
  }

  return res.json();
}

export class MedusaError extends Error {
  constructor(
    public status: number,
    message: string,
    public error: Record<string, unknown>
  ) {
    super(message);
    this.name = "MedusaError";
  }
}

export { MEDUSA_API };
export type { MedusaResponse };
export { medusaFetch };
