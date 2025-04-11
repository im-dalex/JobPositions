import { JobPositionPage } from "@/pages/JobPositionFormPage";
import { JobsPage } from "@/pages/JobsPage";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <JobsPage />,
  },
  {
    path: "/job-position/:id?",
    element: <JobPositionPage />,
  },
];

export const router = createBrowserRouter(routes);
