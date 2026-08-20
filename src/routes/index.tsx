import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpDown, LocateFixed, Navigation, Search } from "lucide-react";
import { Dropdown } from "@/components/campusnav/Dropdown";
import { FloorMap } from "@/components/campusnav/FloorMap";
import { RouteCard } from "@/components/campusnav/RouteCard";
import {
  mockBranches,
  mockClassRoute,
  mockClassroom,
  mockFaculty,
  mockFloors,
  mockRoute,
  mockRooms,
  mockStartLocations,
  mockSubjects,
  type MockRoute,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusNav — Indoor Campus Navigation" },
      {
        name: "description",
        content:
          "CampusNav helps students find rooms and classes indoors with floor maps, shortest routes and step-by-step directions.",
      },
      { property: "og:title", content: "CampusNav — Indoor Campus Navigation" },
      {
        property: "og:description",
        content:
          "Find any room or class on campus with floor maps and step-by-step indoor directions.",
      },
    ],
  }),
  component: CampusNav,
});

type Mode = "room" | "class";

function CampusNav() {
  const [mode, setMode] = useState<Mode>("room");

  // ROOM mode state
  const [from, setFrom] = useState("Room 101");
  const [to, setTo] = useState("Room 108");

  // CLASS mode state
  const [start, setStart] = useState("Current Location");
  const [branch, setBranch] = useState("CSE");
  const [subject, setSubject] = useState("Data Structures");
  const [faculty, setFaculty] = useState("");
  const [classroomFound, setClassroomFound] = useState(false);

  const [floor, setFloor] = useState("Floor 1");
  const [route, setRoute] = useState<MockRoute | null>(mockRoute);

  const switchMode = (next: Mode) => {
    setMode(next);
    setRoute(next === "room" ? mockRoute : null);
    setClassroomFound(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[430px] pb-12">
        {/* Header */}
        <header className="flex items-center gap-4 px-4 pt-7 pb-4">
          <h1 className="font-display truncate text-[24px] leading-none tracking-tight text-foreground">
            CampusNav
          </h1>
        </header>
        <div className="h-px bg-border" />

        {/* Room / Class toggle */}
        <div className="px-4 pt-4">
          <div className="mx-auto grid w-[215px] grid-cols-2 rounded-full border border-border bg-card p-1 shadow-[var(--shadow-card)]">
            {(["room", "class"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={cn(
                  "rounded-full py-1.5 text-[13.5px] font-medium capitalize transition-colors",
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Mode panels */}
        <div className="space-y-4 px-4 pt-4">
          {mode === "room" ? (
            <>
              <div className="flex items-center gap-3">
                <Dropdown
                  className="min-w-0 flex-1"
                  label="From"
                  value={from}
                  options={mockRooms}
                  onChange={setFrom}
                />
                <button
                  type="button"
                  aria-label="Swap rooms"
                  onClick={() => {
                    setFrom(to);
                    setTo(from);
                  }}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)]"
                >
                  <ArrowUpDown className="size-4" />
                </button>
                <Dropdown
                  className="min-w-0 flex-1"
                  label="To"
                  value={to}
                  options={mockRooms}
                  onChange={setTo}
                />
              </div>

              <button
                type="button"
                onClick={() => setRoute(mockRoute)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[14.5px] font-medium text-primary-foreground shadow-[var(--shadow-card)] transition-opacity hover:opacity-90"
              >
                <Navigation className="size-4" />
                Find Shortest Route
              </button>
            </>
          ) : (
            <>
              <Dropdown
                label="From"
                value={start}
                options={mockStartLocations}
                onChange={setStart}
                icon={<LocateFixed className="size-5" />}
              />

              <div className="grid grid-cols-2 gap-3">
                <Dropdown label="Branch" value={branch} options={mockBranches} onChange={setBranch} />
                <Dropdown
                  label="Subject"
                  value={subject}
                  options={mockSubjects}
                  onChange={setSubject}
                />
              </div>

              <Dropdown
                label="Search Faculty (optional)"
                value={faculty}
                placeholder="Select faculty"
                muted
                options={mockFaculty}
                onChange={setFaculty}
                icon={<Search className="size-4" />}
              />

              <button
                type="button"
                onClick={() => setClassroomFound(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[14.5px] font-medium text-primary-foreground shadow-[var(--shadow-card)] transition-opacity hover:opacity-90"
              >
                <ArrowRight className="size-4" />
                Find Classroom
              </button>

              {classroomFound ? (
                <div className="flex items-center gap-3 rounded-[13px] border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-success">Detected Classroom</p>
                    <p className="mt-0.5 text-[19px] leading-tight font-semibold text-foreground">
                      {mockClassroom.room}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      {mockClassroom.floor} • {mockClassroom.type}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRoute(mockClassRoute);
                      setFloor("Floor 1");
                    }}
                    className="flex shrink-0 items-center gap-2 rounded-[11px] border border-border bg-card px-3.5 py-2.5 text-[13.5px] font-medium text-foreground shadow-[var(--shadow-card)]"
                  >
                    <Navigation className="size-4" />
                    Navigate
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>

        {/* Map */}
        <div className="px-4 pt-4">
          <FloorMap
            floor={floor}
            floors={mockFloors}
            onFloorChange={setFloor}
            route={route}
            {...(mode === "class" && route ? { highlightLabel: "109" } : {})}
          />
        </div>

        {/* Route info */}
        {route ? (
          <div className="px-4 pt-4">
            <RouteCard route={route} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
