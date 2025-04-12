import { keyValueDto } from "@/types/keyValue";
import { api } from ".";

export const fetchRecruiters = (): Promise<keyValueDto[]> =>
  api.get("Miscellaneous/Recruiters").then(({ data }) => data);

export const fetchDepartments = (): Promise<keyValueDto[]> =>
  api.get("Miscellaneous/Departments").then(({ data }) => data);

export const fetchPositionStatuses = (): Promise<keyValueDto[]> =>
  api.get("Miscellaneous/PositionStatuses").then(({ data }) => data);
