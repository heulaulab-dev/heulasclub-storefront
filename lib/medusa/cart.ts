// lib/medusa/cart.ts
import { medusaFetch } from "./client";
import type { MedusaCart, MedusaAddress } from "./types";

interface CreateCartResponse {
  cart: MedusaCart;
}

interface GetCartResponse {
  cart: MedusaCart;
}

interface AddToCartResponse {
  cart: MedusaCart;
}

interface UpdateCartResponse {
  cart: MedusaCart;
}

interface CompleteCartResponse {
  data: { id: string; status: string };
  payment_authorization?: { status: string };
}

// ─── Cart ───────────────────────────────────────────────────────────────────

export async function createCart(regionId?: string): Promise<MedusaCart> {
  const body = regionId ? { region_id: regionId } : {};
  const res = await medusaFetch<CreateCartResponse>("/carts", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res.cart;
}

export async function getCart(cartId: string): Promise<MedusaCart> {
  const res = await medusaFetch<GetCartResponse>(`/carts/${cartId}`);
  return res.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<MedusaCart> {
  const res = await medusaFetch<AddToCartResponse>(
    `/carts/${cartId}/line-items`,
    {
      method: "POST",
      body: JSON.stringify({ variant_id: variantId, quantity }),
    }
  );
  return res.cart;
}

export async function updateLineItem(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<MedusaCart> {
  const res = await medusaFetch<UpdateCartResponse>(
    `/carts/${cartId}/line-items/${lineId}`,
    {
      method: "POST",
      body: JSON.stringify({ quantity }),
    }
  );
  return res.cart;
}

export async function removeLineItem(
  cartId: string,
  lineId: string
): Promise<MedusaCart> {
  const res = await medusaFetch<UpdateCartResponse>(
    `/carts/${cartId}/line-items/${lineId}`,
    { method: "DELETE" }
  );
  return res.cart;
}

export async function setShippingAddress(
  cartId: string,
  address: MedusaAddress
): Promise<MedusaCart> {
  const res = await medusaFetch<UpdateCartResponse>(
    `/carts/${cartId}/shipping-address`,
    {
      method: "POST",
      body: JSON.stringify(address),
    }
  );
  return res.cart;
}

export async function setBillingAddress(
  cartId: string,
  address: MedusaAddress
): Promise<MedusaCart> {
  const res = await medusaFetch<UpdateCartResponse>(
    `/carts/${cartId}/billing-address`,
    {
      method: "POST",
      body: JSON.stringify(address),
    }
  );
  return res.cart;
}

export async function addShippingMethod(
  cartId: string,
  optionId: string
): Promise<MedusaCart> {
  const res = await medusaFetch<UpdateCartResponse>(
    `/carts/${cartId}/shipping-methods`,
    {
      method: "POST",
      body: JSON.stringify({ option_id: optionId }),
    }
  );
  return res.cart;
}

export async function completeCart(cartId: string): Promise<{ id: string; status: string }> {
  const res = await medusaFetch<CompleteCartResponse>(
    `/carts/${cartId}/complete`,
    { method: "POST" }
  );
  return { id: res.data.id, status: res.data.status };
}
