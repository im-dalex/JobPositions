export interface JobPositionDto {
  id: number;
  title: string;
  number: string;
  budget: number;
  department: string;
  recruiterName: string;
  status: string;
}

export interface JobPositionCreateDto {
  title: string;
  number: string;
  budget: number;
  departmentId: number;
  recruiterId: number;
  statusId: number;
}
