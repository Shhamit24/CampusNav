import { mockFloorPlan, type MapRoom, type MockRoute } from "@/data/mockData";
import { Dropdown } from "./Dropdown";

const categoryFill: Record<MapRoom["category"], string> = {
  plain: "var(--room-plain)",
  classroom: "var(--room-classroom)",
  "comp-lab": "var(--room-lab)",
  restroom: "var(--room-restroom)",
  staff: "var(--room-staff)",
  "physics-lab": "var(--room-physics)",
  "chem-lab": "var(--room-chem)",
};

function Stairs({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  const steps = Math.floor(h / 9);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="var(--card)" stroke="var(--map-line)" />
      {Array.from({ length: steps }, (_, i) => (
        <line
          key={i}
          x1={x}
          x2={x + w}
          y1={y + (i + 1) * (h / (steps + 1))}
          y2={y + (i + 1) * (h / (steps + 1))}
          stroke="var(--map-line)"
        />
      ))}
      <path
        d={`M${x + w / 2},${y + h - 8} L${x + w / 2},${y + 8} M${x + w / 2 - 3},${y + 11} L${x + w / 2},${y + 6} L${x + w / 2 + 3},${y + 11}`}
        stroke="var(--foreground)"
        strokeWidth={0.8}
        fill="none"
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        fontSize={5}
        fill="var(--muted-foreground)"
        textAnchor="middle"
        transform={`rotate(-90 ${x + w / 2} ${y + h / 2})`}
      >
        {label}
      </text>
    </g>
  );
}

function Marker({ points, at }: { points: string; at: "start" | "end" }) {
  const list = points.split(" ");
  const raw = at === "start" ? list[0] : list[list.length - 1];
  const [x, y] = (raw ?? "0,0").split(",").map(Number);
  if (at === "end") {
    return <circle cx={x} cy={y} r={5} fill="var(--nav)" stroke="var(--card)" strokeWidth={2} />;
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0,0 C-9,-10 -8,-22 0,-22 C8,-22 9,-10 0,0 Z"
        fill="var(--nav)"
      />
      <circle cx={0} cy={-14} r={3.5} fill="var(--card)" />
    </g>
  );
}

type FloorMapProps = {
  floor: string;
  floors: string[];
  onFloorChange: (floor: string) => void;
  route: MockRoute | null;
  highlightLabel?: string;
};

export function FloorMap({ floor, floors, onFloorChange, route, highlightLabel }: FloorMapProps) {
  return (
    <section className="overflow-hidden rounded-[13px] border border-border bg-map-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between px-3 py-3">
        <Dropdown
          label=""
          value={floor}
          options={floors}
          onChange={onFloorChange}
          className="w-[112px]"
        />
      </div>

      <div className="px-3 pb-3">
        <svg viewBox="0 0 440 592" className="w-full" role="img" aria-label={`${floor} plan`}>
          <rect x={4} y={4} width={432} height={584} rx={8} fill="var(--map-surface)" />

          {mockFloorPlan.hollows.map((h) => (
            <g key={h.label}>
              <rect
                x={h.x}
                y={h.y}
                width={h.w}
                height={h.h}
                fill="var(--secondary)"
                stroke="var(--map-line)"
              />
              <text
                x={h.x + h.w / 2}
                y={h.y + h.h / 2 + 3}
                fontSize={8}
                letterSpacing={0.6}
                fill="var(--muted-foreground)"
                textAnchor="middle"
              >
                {h.label}
              </text>
            </g>
          ))}

          <rect
            x={mockFloorPlan.bridge.x}
            y={mockFloorPlan.bridge.y}
            width={mockFloorPlan.bridge.w}
            height={mockFloorPlan.bridge.h}
            fill="var(--secondary)"
            stroke="var(--map-line)"
          />
          <text
            x={mockFloorPlan.bridge.x + mockFloorPlan.bridge.w / 2}
            y={mockFloorPlan.bridge.y + 19}
            fontSize={6.5}
            letterSpacing={0.5}
            fill="var(--muted-foreground)"
            textAnchor="middle"
          >
            {mockFloorPlan.bridge.label}
          </text>

          {mockFloorPlan.staircases.map((s, i) => (
            <Stairs key={i} {...s} />
          ))}

          {mockFloorPlan.rooms.map((room) => {
            const isFrom = route?.from === room.id;
            const isTo = route?.to === room.id;
            const active = isFrom || isTo;
            return (
              <g key={room.id}>
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.w}
                  height={room.h}
                  fill={active ? "var(--nav-soft)" : categoryFill[room.category]}
                  stroke={active ? "var(--nav)" : "var(--map-line)"}
                  strokeWidth={active ? 1.2 : 0.8}
                />
                <text
                  x={room.x + room.w / 2}
                  y={room.y + (room.sub ? room.h / 2 - 2 : room.h / 2 + 3)}
                  fontSize={9}
                  fontWeight={500}
                  fill={isTo && highlightLabel ? "var(--success)" : "var(--foreground)"}
                  textAnchor="middle"
                >
                  {isTo && highlightLabel ? highlightLabel : room.label}
                </text>
                {room.sub ? (
                  <text
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2 + 8}
                    fontSize={6.5}
                    fill="var(--muted-foreground)"
                    textAnchor="middle"
                  >
                    {room.sub}
                  </text>
                ) : null}
              </g>
            );
          })}

          {route ? (
            <>
              <polyline
                points={route.path}
                fill="none"
                stroke="var(--nav)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Marker points={route.path} at="start" />
              <Marker points={route.path} at="end" />
            </>
          ) : null}
        </svg>
      </div>
    </section>
  );
}