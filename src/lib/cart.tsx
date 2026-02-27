"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CatalogProduct } from "@/lib/catalog";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  priceInr: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  subtotalInr: number;
  add: (product: CatalogProduct, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "ss_cart_v1";

function safeParseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((x) => {
        if (!x || typeof x !== "object") return null;
        const item = x as Partial<CartItem>;
        if (!item.id || !item.name || !item.image) return null;
        const priceInr = Number(item.priceInr);
        const qty = Number(item.qty);
        if (!Number.isFinite(priceInr) || !Number.isFinite(qty)) return null;
        return {
          id: String(item.id),
          name: String(item.name),
          image: String(item.image),
          priceInr,
          qty: Math.max(1, Math.min(99, Math.floor(qty))),
        } satisfies CartItem;
      })
      .filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(safeParseCart(localStorage.getItem(STORAGE_KEY)));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartState>(() => {
    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotalInr = items.reduce((sum, i) => sum + i.qty * i.priceInr, 0);

    const add = (product: CatalogProduct, qty = 1) => {
      const safeQty = Math.max(1, Math.min(99, Math.floor(qty)));
      setItems((prev) => {
        const idx = prev.findIndex((p) => p.id === product.id);
        if (idx === -1) {
          return [
            ...prev,
            {
              id: product.id,
              name: product.name,
              image: product.image,
              priceInr: product.priceInr,
              qty: safeQty,
            },
          ];
        }
        const next = prev.slice();
        next[idx] = {
          ...next[idx],
          qty: Math.min(99, next[idx].qty + safeQty),
        };
        return next;
      });
    };

    const remove = (id: string) =>
      setItems((prev) => prev.filter((p) => p.id !== id));

    const setQty = (id: string, qty: number) => {
      const safeQty = Math.max(1, Math.min(99, Math.floor(qty)));
      setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, qty: safeQty } : p)),
      );
    };

    const clear = () => setItems([]);

    return { items, totalItems, subtotalInr, add, remove, setQty, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

