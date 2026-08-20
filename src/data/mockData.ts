/**
 * CampusNav — FRONTEND MOCK DATA ONLY.
 *
 * Nothing here is real. Replace each export with data coming from the real
 * backend / graph / Dijkstra implementation later. The UI only depends on the
 * shapes declared below, so swapping the source requires no redesign.
 */

export type RoomCategory =
  | "classroom"
  | "comp-lab"
  | "restroom"
  | "staff"
  | "physics-lab"
  | "chem-lab"
  | "plain";

export type MapRoom = {
  id: string;
  label: string;
  sub?: string;
  category: RoomCategory;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type RouteStep = {
  title: string;
  detail?: string;
  distance?: string;
  icon: "exit" | "straight" | "turn-right" | "stairs" | "destination";
};

export type MockRoute = {
  distance: string;
  time: string;
  floorsCrossed: string;
  steps: RouteStep[];
  /** ids of map rooms highlighted as start / destination */
  from: string;
  to: string;
  /** SVG polyline points for the orange path */
  path: string;
};

export const mockRooms: string[] = Array.from({ length: 28 }, (_, i) => `Room ${101 + i}`);

export const mockStartLocations: string[] = [
  "Current Location",
  "Room 101",
  "Room 102",
  "Room 103",
];

export const mockBranches = ["CSE", "IT", "ECE", "EE", "ME", "CIVIL" , "DS" , "AI"];

export const mockSubjects = [
  "DSA",
  "CA",
  "Database Management",
  "DSA Practical",
  "DMGT",
];

export const mockFaculty = [
  "Dr. Rahul Sharma",
  "Dr. Priya Nair",
  "Prof. Arun Kumar",
  "Dr. Neha Patel",
];

export const mockFloors = ["Floor 1", "Floor 2", "Floor 3", "Floor 4"];

/**
 * Mock classroom lookup result. Teammates: replace with the real
 * (branch + subject + faculty) -> classroom resolution.
 */
export const mockClassroom = {
  room: "Room 109",
  floor: "First Floor",
  type: "Classroom",
};

/** Mock route for ROOM mode (Room 101 -> Room 108). */
export const mockRoute: MockRoute = {
  distance: "46 m",
  time: "1 min 20 sec",
  floorsCrossed: "None",
  from: "101",
  to: "108",
  path: "40,72 40,82 396,82 396,145",
  steps: [
    { icon: "exit", title: "Exit Room 101", detail: "Operating Systems Lab", distance: "0 m" },
    { icon: "straight", title: "Take right from exit", distance: "0 m" },
     { icon: "straight", title: "Walk straight", distance: "15 m" },
    { icon: "turn-right", title: "Turn right", detail: "At the end of the corridor" },
    {
      icon: "destination",
      title: "Destination is on your left",
      detail: "Room 108 • Staff Room",
      distance: "46 m",
    },
  ],
};

/** Mock route for CLASS mode (Current Location -> Room 214). */
export const mockClassRoute: MockRoute = {
  distance: "62 m",
  time: "1 min 45 sec",
  floorsCrossed: "None",
  from: "118",
  to: "109",
  path: "298,522 298,502 352,502 352,213 396,213",
  steps: [
    { icon: "exit", title: "Exit Current Location", detail: "First Floor", distance: "0 m" },
    { icon: "turn-right", title: "Turn right", detail: "At the end of the corridor", distance: "20 m" },
    {
      icon: "destination",
      title: "Destination is ahead",
      detail: "Room 109 • Classroom",
      distance: "62 m",
    },
  ],
};

/** Mock floor plan geometry (SVG units, viewBox 0 0 440 600). */
type RoomSeed = Pick<MapRoom, "id" | "label" | "category"> & { sub?: string };

const topRow: MapRoom[] = ([
  { id: "101", label: "101", category: "plain" },
  { id: "102", label: "102", category: "plain" },
  { id: "103", label: "103", category: "plain" },
  { id: "104", label: "104", category: "plain" },
  { id: "105", label: "105", sub: "Comp Lab", category: "comp-lab" },
  { id: "106", label: "106", category: "plain" },
  { id: "107", label: "107", sub: "Comp Lab", category: "comp-lab" },
] as RoomSeed[]).map((r, i) => ({ ...r, x: 12 + i * 59.4, y: 12, w: 57.4, h: 58 }));

const leftCol: MapRoom[] = ([
  { id: "128", label: "128", sub: "Classroom", category: "classroom" },
  { id: "127", label: "127", sub: "Classroom", category: "classroom" },
  { id: "126", label: "126", sub: "Restroom", category: "restroom" },
  { id: "125", label: "125", sub: "Classroom", category: "classroom" },
  { id: "124", label: "124", sub: "Classroom", category: "classroom" },
] as RoomSeed[]).map((r, i) => ({ ...r, x: 12, y: 92 + i * 82, w: 62, h: 78 }));

const rightCol: MapRoom[] = ([
  { id: "108", label: "108", sub: "Staff Room", category: "staff" },
  { id: "109", label: "109", sub: "Classroom", category: "classroom" },
  { id: "110", label: "110", sub: "Comp Lab", category: "comp-lab" },
  { id: "111", label: "111", sub: "Restroom", category: "restroom" },
  { id: "112", label: "112", sub: "Physics Lab", category: "physics-lab" },
] as RoomSeed[]).map((r, i) => ({ ...r, x: 366, y: 92 + i * 82, w: 62, h: 78 }));

const bottomRow: MapRoom[] = ([
  { id: "123", label: "123", sub: "Comp Lab", category: "comp-lab" },
  { id: "122", label: "122", sub: "Restroom", category: "restroom" },
  { id: "121", label: "121", category: "plain" },
  { id: "120", label: "120", sub: "Comp Lab", category: "comp-lab" },
  { id: "119", label: "119", category: "plain" },
  { id: "118", label: "118", sub: "Staff Room", category: "staff" },
  { id: "117", label: "117", category: "plain" },
  { id: "116", label: "116", sub: "Chem Lab", category: "chem-lab" },
] as RoomSeed[]).map((r, i) => ({ ...r, x: 12 + i * 52.2, y: 522, w: 50.2, h: 58 }));

export const mockFloorPlan = {
  rooms: [...topRow, ...leftCol, ...rightCol, ...bottomRow],
  hollows: [
    { label: "HOLLOW SPACE 1", x: 108, y: 96, w: 224, h: 148 },
    { label: "HOLLOW SPACE 2", x: 108, y: 320, w: 224, h: 158 },
  ],
  bridge: { label: "BRIDGE / CONNECTOR", x: 158, y: 268, w: 124, h: 30 },
  staircases: [
    { label: "Staircase A", x: 82, y: 108, w: 22, h: 86 },
    { label: "Staircase A", x: 336, y: 108, w: 22, h: 86 },
    { label: "Staircase B", x: 82, y: 340, w: 22, h: 86 },
    { label: "Staircase B", x: 336, y: 340, w: 22, h: 86 },
  ],
};
