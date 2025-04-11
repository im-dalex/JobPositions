import type { JobPositionDto } from "@/types/jobPosition";

export const mockPositions: JobPositionDto[] = [
  {
    id: 1,
    number: 202,
    title: "Frontend Developer",
    status: "Open",
    department: "Engineering",
    recruiterName: "Alice Smith",
    budget: 75000,
  },
  {
    id: 2,
    number: 200,
    title: "Backend Developer",
    status: "Closed",
    department: "Engineering",
    recruiterName: "Bob Jones",
    budget: 85000,
  },
];
