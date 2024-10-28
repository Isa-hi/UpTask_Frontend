import { addTeamMember } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
  user: TeamMember;
  resetData: () => void;
};
export default function SearchResult({ user, resetData }: SearchResultProps) {
  const params = useParams();
  const projectId = params.projectId!;

  const QueryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addTeamMember,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      resetData();
      QueryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
    },
  });

  const handleAddTeamMember = () => {
    const data = { projectId, id: user._id };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p> {user.name} </p>
        <button
          className="text-purple-600 hover:bg-purple-200 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddTeamMember}
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  );
}
