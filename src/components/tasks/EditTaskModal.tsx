import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task, TaskFormData } from '@/types/index';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { editTaskById } from '@/api/TaskAPI';

type EditTaskModalProps = {
    task: Task;
    taskId: Task['_id'];
}

export default function EditTaskModal({ task, taskId }: EditTaskModalProps) {
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  /** Get project id */
  const params = useParams();
  const projectId = params.projectId!;

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
        name: task.name,
        description: task.description,
        }
  });

  const { mutate } = useMutation({
    mutationFn: editTaskById,
    onError: (error) => {
        toast.error(error.message, {
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        },
    onSuccess: (data) => {
        queryclient.invalidateQueries({queryKey: ['project', projectId]});
        queryclient.invalidateQueries({queryKey: ['task', taskId]});
        queryclient.invalidateQueries({queryKey: ['getTask', taskId]});
        toast.success(data, {
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
        reset();
        navigate(location.pathname, {replace: true});
    }
  })

  const handleEditTask = (formData: TaskFormData) => {
    const data = {formData, projectId, taskId}
    mutate(data);   
    console.log(formData);
   
  }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {navigate(location.pathname, {replace: true})} }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >

                                    <TaskForm register={register} errors={errors} />
                    

                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
