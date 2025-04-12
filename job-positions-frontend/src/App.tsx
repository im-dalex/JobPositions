import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-7">Job Positions</h1>
      <Toaster expand visibleToasts={3} position="top-right" richColors />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
