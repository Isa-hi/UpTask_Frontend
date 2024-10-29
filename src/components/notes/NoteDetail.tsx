import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};
export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();

  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  })

  const handleDeleteNote = (noteId : Note['_id']) => {
    mutate({ projectId, taskId, noteId});
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (data)
    return (
      <>
        <div className="p-4 shadow rounded-lg mt-4">
          <div className="flex justify-between items-center">
            <p className="text-lg">
              {note.content}
              <span className="font-semibold text-base">
                {" "}
                - {note.createdBy.name}
              </span>
            </p>
            {data._id === note.createdBy._id && (
              <button
                type="button"
                className="mr-5 bg-red-400 hover:bg-red-500 cursor-pointer text-white text-sm p-2 rounded-md transition-colors"
                onClick={() => handleDeleteNote(note._id)}
              >
                Eliminar
              </button>
            )}
          </div>
          <p className="text-gray-500 text-sm">{formatDate(note.createdAt)}</p>
        </div>
      </>
    );
}
