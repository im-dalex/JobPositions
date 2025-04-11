import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { JobPositionDto } from "@/types/jobPosition";

type JobsListProps = {
  positions: JobPositionDto[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const JobsList: React.FC<JobsListProps> = ({
  positions,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Number</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Recruiter</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map((position) => (
          <TableRow key={position.id}>
            <TableCell className="font-medium">{position.number}</TableCell>
            <TableCell>{position.title}</TableCell>
            <TableCell>{position.status}</TableCell>
            <TableCell>{position.department}</TableCell>
            <TableCell>{position.recruiterName}</TableCell>
            <TableCell>${position.budget.toFixed(2)}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => onEdit(position.id)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(position.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
