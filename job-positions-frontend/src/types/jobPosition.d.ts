interface BaseJobPosition {
  id: number;
  title: string;
  number: number;
  budget: number;
}
export interface JobPositionDto extends BaseJobPosition {
  department: string;
  recruiterName: string;
  status: string;
}

export interface JobPosition extends BaseJobPosition {
  departmentId: number;
  recruiterId: number;
  statusId: number;
}

export type JobPositionCreateDto = Omit<JobPosition, "id">;
