import {
  fetchJobPositions,
  deleteJobPosition as _deleteJobPosition,
} from "@/api/jobPosition";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const JobsPage = () => {
  const [positions, setPositions] = useState<JobPositionDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobPositions().then((data) => setPositions([...data]));
  }, []);

  const deleteJobPosition = async (id: number) => {
    await _deleteJobPosition(id);
  };

  const openPositionForm = (id?: number) => {
    let route = "job-position";
    if (id) route += `/${id}`;
    navigate(route);
  };

  return (
    <>
      <div className="flex">
        <Button onClick={() => openPositionForm()}>Create</Button>
      </div>
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
                  onClick={() => openPositionForm(position.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteJobPosition(position.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
