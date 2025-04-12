import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignalR } from "@/hooks/useSignalR";
import { HUBS } from "@/api/signalr/connection";
import { Button } from "@/components/ui/button";
import { JobsList } from "@/components/JobsList";
import JobsFilter, { type JobsFilterHandle } from "@/components/JobsFilter";
import type { JobPositionDto } from "@/types/jobPosition";
import {
  fetchJobPositions,
  deleteJobPosition as _deleteJobPosition,
} from "@/api/http/jobPosition";

const POSITION_HUB = HUBS.POSITION;

const JobsPage = () => {
  const [positions, setPositions] = useState<JobPositionDto[]>([]);
  const filtersRef = useRef<JobsFilterHandle>(null);
  const positionHubConn = useSignalR(POSITION_HUB.NAME);
  const navigate = useNavigate();

  const getJobPositions = async (
    title?: string,
    departmentId?: number,
    statusId?: number
  ) => {
    const toastId = toast.loading("Fetching positions...");
    const positions = await fetchJobPositions(title, departmentId, statusId);
    setPositions([...positions]);
    toast.dismiss(toastId);
  };

  useEffect(() => {
    getJobPositions();
  }, []);
  useEffect(() => {
    positionHubConn.on(POSITION_HUB.MESSAGE.REFRESH_DATA, () => {
      filtersRef.current?.resetFilters();
      getJobPositions();
    });
    return () => {
      positionHubConn.off(POSITION_HUB.MESSAGE.REFRESH_DATA);
    };
  }, [positionHubConn]);

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
      <div className="flex justify-between mb-4">
        <JobsFilter onSearch={getJobPositions} />
        <Button onClick={() => openPositionForm()}>Create Job Position</Button>
      </div>
      <JobsList
        positions={positions}
        onEdit={openPositionForm}
        onDelete={deleteJobPosition}
      />
    </>
  );
};

export default JobsPage;
