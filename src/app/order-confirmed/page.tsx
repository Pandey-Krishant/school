"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SplitHeading from "@/components/SplitHeading";
import { formatInr } from "@/lib/catalog";

type LastOrder = {
  orderId: string;
  createdAt: string;
  method: "cod" | "card";
  details: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    notes: string;
  };
  items: Array<{
    id: string;
    name: string;
    image: string;
    priceInr: number;
    qty: number;
  }>;
  subtotalInr: number;
};

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("ss_last_order_v1");
    if (!raw) return;
    try {
      setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      setOrder(null);
    }
  }, []);

  const createdDate = useMemo(() => {
    if (!order?.createdAt) return "";
    try {
      return new Date(order.createdAt).toLocaleString();
    } catch {
      return "";
    }
  }, [order?.createdAt]);

  return (
    <main className="relative pt-28">
      <section className="py-16">
        <Container>
          <div className="rounded-[2rem] border border-ink/10 bg-cream/70 p-10 shadow-sm shadow-ink/5">
            <div className="text-xs font-extrabold tracking-wide text-ink/60">
              Order Status
            </div>
            <SplitHeading
              text="Order Confirmed"
              className="mt-2 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-ink md:text-5xl"
            />

            {!order ? (
              <div className="mt-6 text-sm font-semibold text-ink/65">
                No recent order found on this device.
              </div>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-ink/10 bg-ink/5 p-6">
                    <div className="text-xs font-extrabold tracking-wide text-ink/60">
                      Order ID
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-ink">
                      {order.orderId}
                    </div>
                    <div className="mt-3 text-sm font-semibold text-ink/65">
                      Placed: {createdDate}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-ink/65">
                      Payment:{" "}
                      <span className="font-extrabold uppercase">
                        {order.method}
                      </span>
                    </div>
                    <div className="mt-4 text-sm font-semibold text-ink/65">
                      Total:{" "}
                      <span className="font-extrabold">
                        {formatInr(order.subtotalInr)}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-ink/10 bg-ink/5 p-6">
                    <div className="text-xs font-extrabold tracking-wide text-ink/60">
                      Delivery Details
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-7 text-ink/65">
                      <span className="font-extrabold text-ink">
                        {order.details.fullName}
                      </span>
                      <br />
                      {order.details.phone}
                      <br />
                      {order.details.address}
                      <br />
                      {order.details.city} — {order.details.pincode}
                      {order.details.notes ? (
                        <>
                          <br />
                          Notes: {order.details.notes}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.5rem] border border-ink/10 bg-cream/60 p-6">
                  <div className="text-sm font-extrabold tracking-wide text-ink/70">
                    Items
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {order.items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-cream/70 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <div className="truncate font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-ink">
                            {it.name}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-ink/65">
                            {it.qty} × {formatInr(it.priceInr)}
                          </div>
                        </div>
                        <div className="text-sm font-extrabold text-ink">
                          {formatInr(it.qty * it.priceInr)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products">Shop More</Button>
              <Button href="/" variant="ghost">
                Back Home
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

