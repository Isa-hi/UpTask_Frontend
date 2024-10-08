import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index={true} />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
