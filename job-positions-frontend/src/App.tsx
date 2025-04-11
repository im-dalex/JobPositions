import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css";

function App() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-7">Job Positions</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
