import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editTaskId = searchParams.get("editTaskId")!;
  

  const { data, isError } = useQuery({
    queryKey: ["getTask", editTaskId],
    queryFn: () => getTaskById({ projectId, taskId: editTaskId}),
    enabled: !!editTaskId,
  });

  if (isError) return <Navigate to={'/404'} />
  
  if(data) return <EditTaskModal task={data} taskId={editTaskId} />
}
