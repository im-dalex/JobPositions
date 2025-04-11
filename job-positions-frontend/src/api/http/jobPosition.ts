import axios from "axios";
import type { JobPosition, JobPositionDto } from "@/types/jobPosition";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

export const fetchJobPositions = (
  positionTitle?: string,
  statusId?: number,
  departmentId?: number
): Promise<JobPositionDto[]> =>
  api
    .get<JobPositionDto[]>("/Position", {
      params: { positionTitle, statusId, departmentId },
    })
    .then(({ data }) => data);

export const fetchJobPositionById = (
  positionId: number
): Promise<JobPosition> =>
  api.get<JobPosition>(`/Position/${positionId}`).then(({ data }) => data);

export const deleteJobPosition = (id: number): Promise<void> =>
  api.delete(`/Position/${id}`);
