import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { JobsList } from "@/components/JobsList";
import type { JobPositionDto } from "@/types/jobPosition";
import {
  fetchJobPositions,
  deleteJobPosition as _deleteJobPosition,
} from "@/api/http/jobPosition";
import { useSignalR } from "@/hooks/useSignalR";
import { HUBS } from "@/api/signalr/connection";

const POSITION_HUB = HUBS.POSITION;

export const JobsPage = () => {
  const [positions, setPositions] = useState<JobPositionDto[]>([]);
  const positionHubConn = useSignalR(POSITION_HUB.NAME);
  const navigate = useNavigate();

  const getJobPositions = async () => {
    const positions = await fetchJobPositions();
    setPositions([...positions]);
  };

  useEffect(() => {
    getJobPositions();
  }, []);
  useEffect(() => {
    positionHubConn.on(POSITION_HUB.MESSAGE.REFRESH_DATA, getJobPositions);
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
