import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TasksList from "@/components/tasks/TasksList";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  if (isError) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <h1 className="text-5xl font-black"> {data.projectName} </h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        {" "}
        {data.projectDescription}{" "}
      </p>

      <nav className="my-5 flex gap-3">
        <button
          type="button"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          onClick={() => navigate("?newTask=true")}
        >
          Agregar Tarea
        </button>
      </nav>

      <TasksList tasks={data.tasks} />

      <AddTaskModal />
      <EditTaskData />
    </>
  );
}
