import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { confirmDeleteProjectForm, Project } from '@/types/index';
import { confirmDeleteProject, deletProject } from '@/api/ProjectAPI';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function DeleteProjectModal() {
    const initialValues: confirmDeleteProjectForm = {
        confirm_delete: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const checkDeleteProjectMutation = useMutation({
        mutationFn: ({ formData, projectId }: { formData: confirmDeleteProjectForm, projectId: Project['_id'] }) => 
            confirmDeleteProject(formData, projectId),
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const queryClient = useQueryClient();

    const deleteProjectMutation = useMutation({
        mutationFn: deletProject,
        onError: (error) => {
          toast.error(error.message);
          console.log(error)
        },
        onSuccess: (data) => {
          toast.success(data);
          queryClient.invalidateQueries({ queryKey: ['projects'] });
          navigate(location.pathname, { replace: true });
        },
      });
    
    
      const handleForm = async (formData: confirmDeleteProjectForm) => {
            // First, check the project name
            await checkDeleteProjectMutation.mutateAsync({ formData, projectId: deleteProjectId });
            console.log('Project good to be deleted')
            
            // If the above passes, then delete the project
            await deleteProjectMutation.mutateAsync(deleteProjectId);
    };


    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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
                                >Delete Project </Dialog.Title>

                                <p className="text-xl font-bold">Confirm you want to eliminate all this projetc {''}
                                    <span className="text-fuchsia-600">by typing the project name</span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >

                                    <div className="flex flex-col gap-3">
                                        <label
                                            className="font-normal text-2xl"
                                            htmlFor="projectName"
                                        >Project Name</label>
                                        <input
                                            type='text'
                                            id='confirm_delete'
                                            placeholder='Project Name'
                                            className='w-full p-3 border-gray-300 border'
                                            {...register("confirm_delete", {
                                                required: 'Project Name is required'
                                            })}
                                        />
                                        {errors.confirm_delete && (
                                            <ErrorMessage>{errors.confirm_delete.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Eliminar Proyecto'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}