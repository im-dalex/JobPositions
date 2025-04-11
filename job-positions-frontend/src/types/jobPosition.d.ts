export interface JobPositionDto {
  id: number;
  title: string;
  number: string;
  budget: number;
  department: string;
  recruiterName: string;
  status: string;
}

export interface JobPosition {
  id: number;
  title: string;
  number: number;
  budget: number;
  departmentId: number;
  recruiterId: number;
  statusId: number;
}

export type JobPositionCreateDto = Omit<JobPosition, "id">;
// {
//   title: string;
//   number: string;
//   budget: number;
//   departmentId: number;
//   recruiterId: number;
//   statusId: number;
// }
