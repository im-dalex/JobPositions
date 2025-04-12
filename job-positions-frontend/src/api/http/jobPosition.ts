import { api } from "@/api/http";
import type {
  JobPosition,
  JobPositionCreateDto,
  JobPositionDto,
} from "@/types/jobPosition";

export const fetchJobPositions = (
  positionTitle?: string,
  departmentId?: number,
  statusId?: number
): Promise<JobPositionDto[]> =>
  api
    .get<JobPositionDto[]>("Position", {
      params: { positionTitle, statusId, departmentId },
    })
    .then(({ data }) => data);

export const fetchJobPositionById = (
  positionId: number
): Promise<JobPosition> =>
  api.get<JobPosition>(`Position/${positionId}`).then(({ data }) => data);

export const createJobPosition = (
  jobPosition: JobPositionCreateDto
): Promise<void> => api.post("Position", jobPosition).then(({ data }) => data);

export const editJobPosition = (
  positionId: number,
  jobPosition: JobPositionCreateDto
): Promise<void> =>
  api.put(`Position/${positionId}`, jobPosition).then(({ data }) => data);

export const deleteJobPosition = (id: number): Promise<void> =>
  api.delete(`Position/${id}`);
