import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Project, Task, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { taskStatusTranslation } from "@/locales/es";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TasksListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};

export default function TasksList({ tasks, canEdit }: TasksListProps) {
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message, { toastId: "error" });
    },
    onSuccess: (data) => {
      toast.success(data, { toastId: "success" });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (event: DragEndEvent) => {
    const data = {
      projectId,
      taskId: event.active.id.toString(),
      status: event.over?.id as TaskStatus,
    };
    if (data.status !== undefined) {
      mutate(data);

      queryClient.setQueryData(["project", projectId], (oldData: Project) => {
        const updatedTasks = oldData.tasks.map((task) => {
          if (task._id === event.active.id) {
            return { ...task, status: event.over?.id };
          }
          return task;
        });
        return { ...oldData, tasks: updatedTasks };
      });
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
              >
                {taskStatusTranslation[status]}
              </h3>
              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
