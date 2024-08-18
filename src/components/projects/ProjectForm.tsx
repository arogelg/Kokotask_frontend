import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "types";

type projectFormProps = {
    register: UseFormRegister<ProjectFormData>,
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({errors, register}: projectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Project Name
                </label>
                <input
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Project Name"
                    {...register("projectName", {
                        required: "Project Name is required",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="sectionName" className="text-sm uppercase font-bold">
                    Section Name
                </label>
                <input
                    id="sectionName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Section Name"
                    {...register("sectionName", {
                        required: "Section Name is required",
                    })}
                />

                {errors.sectionName && (
                    <ErrorMessage>{errors.sectionName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="Description" className="text-sm uppercase font-bold">
                Description
                </label>
                <textarea
                    id="Description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Project Description"
                    {...register("description", {
                        required: "Description is required",
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}