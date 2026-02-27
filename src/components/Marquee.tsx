import { cn } from "@/lib/cn";

export default function Marquee({
  items,
  className,
  reverse = false,
  duration = 28,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
}) {
  const row = (
    <div className="flex items-center gap-5 pr-5">
      {items.map((item, i) => (
        <div key={`${item}-${i}`} className="flex items-center gap-5">
          <span className="text-sm font-semibold tracking-wide text-ink/70">
            {item}
          </span>
          <span className="text-strawberry/70">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn("ss-marquee", reverse && "ss-marquee--reverse")}
        style={{ ["--ss-marquee-duration" as never]: `${duration}s` }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}

