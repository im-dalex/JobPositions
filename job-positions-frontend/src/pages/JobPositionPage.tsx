// import { JobPositionCreateDto } from "@/types/jobPosition";
// import { useState } from "react";
import { useParams } from "react-router-dom";

export const JobPositionPage = () => {
  const { id } = useParams();

  //   const [model, setModel] = useState<JobPositionCreateDto>({
  //     title: ''
  //     budget: 0,

  //   });

  return <>{id}</>;
};
