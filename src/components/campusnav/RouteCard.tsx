import {
  ArrowUp,
  Clock,
  CornerUpRight,
  LogOut,
  MapPin,
  Route as RouteIcon,
  Footprints,
} from "lucide-react";
import type { MockRoute, RouteStep } from "@/data/mockData";

const stepIcons: Record<RouteStep["icon"], typeof ArrowUp> = {
  exit: LogOut,
  straight: ArrowUp,
  "turn-right": CornerUpRight,
  stairs: Footprints,
  destination: MapPin,
};

export function RouteCard({ route }: { route: MockRoute }) {
  return (
    <section className="rounded-[13px] border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-border" />

      <div className="grid grid-cols-3 gap-2">
        <Stat icon={<RouteIcon className="size-4" />} value={route.distance} label="Distance" />
        <Stat icon={<Clock className="size-4" />} value={route.time} label="Est. Time" />
        <Stat
          icon={<Footprints className="size-4" />}
          value={route.floorsCrossed}
          label="Floors Crossed"
        />
      </div>

      <ol className="mt-4 divide-y divide-border border-t border-border">
        {route.steps.map((step, i) => {
          const Icon = stepIcons[step.icon];
          const first = i === 0;
          return (
            <li key={step.title} className="flex items-start gap-3 py-3">
              <span
                className={
                  first
                    ? "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-nav text-[10.5px] font-semibold text-primary-foreground"
                    : "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-[10.5px] font-semibold text-muted-foreground"
                }
              >
                {i + 1}
              </span>
              <Icon className="mt-0.5 size-4 shrink-0 text-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] leading-[1.3] font-medium text-foreground">
                  {step.title}
                </span>
                {step.detail ? (
                  <span className="block text-xs text-muted-foreground">{step.detail}</span>
                ) : null}
              </span>
              {step.distance ? (
                <span className="shrink-0 text-xs text-muted-foreground">{step.distance}</span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[13.5px] leading-tight font-semibold text-foreground">
          {value}
        </span>
        <span className="block text-[10.5px] leading-tight text-muted-foreground">{label}</span>
      </span>
    </div>
  );
}