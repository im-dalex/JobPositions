import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { JobsList } from "@/components/JobsList";
import type { JobPositionDto } from "@/types/jobPosition";
import {
  fetchJobPositions,
  deleteJobPosition as _deleteJobPosition,
} from "@/api/jobPosition";

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
      <JobsList
        positions={positions}
        onEdit={openPositionForm}
        onDelete={deleteJobPosition}
      />
    </>
  );
};
