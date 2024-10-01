import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "types";
import { createProject } from "@/api/ProjectAPI";

export default function DashboardView() {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    projectDescription: "",
    clientName: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      console.log(error);
      toast.error(error.message, {
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
    onSuccess: (data) => {
      navigate("/");
      toast.success(data, {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const handleForm = async (data: ProjectFormData) => {
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un proyecto
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
            value="Crear proyecto"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
