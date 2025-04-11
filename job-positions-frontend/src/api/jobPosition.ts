import axios from "axios";
import type { JobPositionDto } from "@/types/jobPosition";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

export const fetchJobPositions = (): Promise<JobPositionDto[]> =>
  api.get<JobPositionDto[]>("/Position").then(({ data }) => data);

export const deleteJobPosition = (id: number): Promise<void> =>
  api.delete(`/Position/${id}`);
