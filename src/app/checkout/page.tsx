"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SplitHeading from "@/components/SplitHeading";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart";
import { formatInr } from "@/lib/catalog";

type PaymentMethod = "cod" | "card";

type CheckoutDetails = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
};

function makeOrderId() {
  const part = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `SS-${Date.now().toString(36).toUpperCase()}-${part}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();

  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [error, setError] = useState<string | null>(null);

  const canPlace = useMemo(() => {
    if (cart.items.length === 0) return false;
    if (!details.fullName.trim()) return false;
    if (!details.phone.trim()) return false;
    if (!details.address.trim()) return false;
    if (!details.city.trim()) return false;
    if (!details.pincode.trim()) return false;
    if (method === "card") {
      if (!card.number.trim() || !card.expiry.trim() || !card.cvv.trim())
        return false;
    }
    return true;
  }, [card, cart.items.length, details, method]);

  const placeOrder = () => {
    setError(null);
    if (!canPlace) {
      setError("Please fill all required details before placing the order.");
      return;
    }

    const orderId = makeOrderId();
    const payload = {
      orderId,
      createdAt: new Date().toISOString(),
      method,
      details,
      items: cart.items,
      subtotalInr: cart.subtotalInr,
    };

    localStorage.setItem("ss_last_order_v1", JSON.stringify(payload));
    cart.clear();
    router.push("/order-confirmed");
  };

  return (
    <main className="relative pt-28">
      <section className="py-16">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-extrabold tracking-wide text-ink/60">
                Checkout
              </div>
              <SplitHeading
                text="My Order"
                className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
              />
              <div className="mt-4 text-sm font-semibold leading-7 text-ink/65">
                Review items, then choose{" "}
                <span className="font-extrabold">COD</span> or{" "}
                <span className="font-extrabold">Card</span> to confirm.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button href="/products" variant="ghost">
                Add more
              </Button>
            </div>
          </div>

          {cart.items.length === 0 ? (
            <div className="mt-10 rounded-[2rem] border border-ink/10 bg-cream/70 p-10 text-center shadow-sm shadow-ink/5">
              <div className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
                Your order is empty
              </div>
              <div className="mt-2 text-sm font-semibold text-ink/65">
                Go to Our Products and add a few items.
              </div>
              <div className="mt-6">
                <Button href="/products">Browse Products</Button>
              </div>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] border border-ink/10 bg-cream/70 p-6 shadow-sm shadow-ink/5">
                <div className="text-sm font-extrabold tracking-wide text-ink/70">
                  Items ({cart.totalItems})
                </div>

                <div className="mt-5 flex flex-col gap-4">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream/70 p-4"
                    >
                      <div className="relative h-16 w-20 overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-ink">
                          {item.name}
                        </div>
                        <div className="mt-1 text-sm font-extrabold text-ink/60">
                          {formatInr(item.priceInr)} each
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            cart.setQty(item.id, Math.max(1, item.qty - 1))
                          }
                          className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-cream/60 text-sm font-extrabold text-ink/75 transition-colors hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <div className="w-8 text-center text-sm font-extrabold text-ink">
                          {item.qty}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            cart.setQty(item.id, Math.min(99, item.qty + 1))
                          }
                          className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-cream/60 text-sm font-extrabold text-ink/75 transition-colors hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => cart.remove(item.id)}
                        className="rounded-full border border-ink/10 bg-cream/60 px-3 py-2 text-xs font-extrabold tracking-wide text-ink/70 transition-colors hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-ink/10 bg-ink/5 px-5 py-4">
                  <div className="text-sm font-extrabold tracking-wide text-ink/70">
                    Subtotal
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
                    {formatInr(cart.subtotalInr)}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-ink/10 bg-cream/70 p-6 shadow-sm shadow-ink/5">
                <div className="text-sm font-extrabold tracking-wide text-ink/70">
                  Payment + Details
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod("cod")}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm font-extrabold tracking-wide transition-colors",
                      method === "cod"
                        ? "border-ink/10 bg-ink text-cream"
                        : "border-ink/10 bg-cream/60 text-ink/70 hover:text-ink",
                    )}
                  >
                    COD
                    <div
                      className={cn(
                        "mt-1 text-xs font-semibold",
                        method === "cod" ? "text-cream/85" : "text-ink/55",
                      )}
                    >
                      Cash on delivery
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm font-extrabold tracking-wide transition-colors",
                      method === "card"
                        ? "border-ink/10 bg-ink text-cream"
                        : "border-ink/10 bg-cream/60 text-ink/70 hover:text-ink",
                    )}
                  >
                    Card
                    <div
                      className={cn(
                        "mt-1 text-xs font-semibold",
                        method === "card" ? "text-cream/85" : "text-ink/55",
                      )}
                    >
                      Debit/Credit card
                    </div>
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3">
                  <Input
                    label="Full Name *"
                    value={details.fullName}
                    onChange={(v) =>
                      setDetails((p) => ({ ...p, fullName: v }))
                    }
                  />
                  <Input
                    label="Phone *"
                    value={details.phone}
                    onChange={(v) =>
                      setDetails((p) => ({ ...p, phone: v }))
                    }
                  />
                  <Input
                    label="Address *"
                    value={details.address}
                    onChange={(v) =>
                      setDetails((p) => ({ ...p, address: v }))
                    }
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="City *"
                      value={details.city}
                      onChange={(v) =>
                        setDetails((p) => ({ ...p, city: v }))
                      }
                    />
                    <Input
                      label="Pincode *"
                      value={details.pincode}
                      onChange={(v) =>
                        setDetails((p) => ({ ...p, pincode: v }))
                      }
                    />
                  </div>
                  <Input
                    label="Notes (optional)"
                    value={details.notes}
                    onChange={(v) =>
                      setDetails((p) => ({ ...p, notes: v }))
                    }
                  />
                </div>

                {method === "card" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-5 rounded-2xl border border-ink/10 bg-ink/5 p-4"
                  >
                    <div className="text-xs font-extrabold tracking-wide text-ink/60">
                      Card details
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3">
                      <Input
                        label="Card Number *"
                        value={card.number}
                        onChange={(v) => setCard((p) => ({ ...p, number: v }))}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Expiry (MM/YY) *"
                          value={card.expiry}
                          onChange={(v) => setCard((p) => ({ ...p, expiry: v }))}
                        />
                        <Input
                          label="CVV *"
                          value={card.cvv}
                          onChange={(v) => setCard((p) => ({ ...p, cvv: v }))}
                        />
                      </div>
                      <div className="text-xs font-semibold text-ink/55">
                        Demo only: we don’t process real payments here.
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <div className="mt-5 rounded-2xl border border-strawberry/25 bg-strawberry/10 px-4 py-3 text-sm font-semibold text-ink">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  <Button onClick={placeOrder}>
                    Confirm Order ({formatInr(cart.subtotalInr)})
                  </Button>
                  <Button onClick={() => cart.clear()} variant="ghost">
                    Clear cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-extrabold tracking-wide text-ink/60">
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm font-semibold text-ink outline-none ring-0 placeholder:text-ink/40 focus:border-ink/20 focus:bg-cream"
      />
    </label>
  );
}

