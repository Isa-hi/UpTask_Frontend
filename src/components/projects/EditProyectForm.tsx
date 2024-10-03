import { updateProject } from "@/api/ProjectAPI";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData;
    projectId: Project['_id'];
}

export default function EditProyectForm({ data, projectId }: EditProjectFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {
    projectName: data.projectName,
    projectDescription: data.projectDescription,
    clientName: data.clientName,
  }});

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message, {
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['projects']});
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]});
      navigate("/");
      toast.success(data, {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  })

  const handleForm = async (data : ProjectFormData) => {
    const formData : EditProjectFormProps= {
      data,
      projectId
    }
    mutate(formData);

  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para editar el proyecto seleccionado
        </p>

        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 text-white text-xl font-semibold py-3 px-10 cursor-pointer transition-colors"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit(handleForm)}
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar cambios"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
