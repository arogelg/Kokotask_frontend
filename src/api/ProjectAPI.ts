import api from "@/lib/axios";
import { confirmDeleteProjectForm, DashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}

export async function getProjects() {

    try {
        const { data } = await api.get("/projects")
        const response = DashboardProjectSchema.safeParse(data)
       if(response.success){
              return response.data
       }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        } 
    }
} 

export async function getProjectById(id: Project["_id"]) {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = editProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        } 
    }
} 

export async function getFullProject(id: Project["_id"]) {
    try {
        const { data } = await api.get(`/projects/${id}`);
        console.log("Data fetched:", data); // Log the fetched data
        
        const response = projectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            console.error("Schema parsing failed:", response.error); // Log the full error
            
            // Log the issues array, which contains specific validation errors
            console.error("Detailed Zod Error Issues:", response.error.issues);
            throw new Error("Schema parsing failed");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("Axios error:", error.response.data.error);
            throw new Error(error.response.data.error);
        } else {
            console.error("Unknown error:", error);
            throw new Error("Unknown error occurred");
        }
    }
}

type projectAPIType = {
    formData: ProjectFormData,
    projectId: Project["_id"]
}

export async function updateProject({formData, projectId} : projectAPIType) {
    try {
        const { data } = await api.put<string >(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        } 
    }
} 

export async function deletProject(id: Project["_id"]) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        } 
    }
} 

export async function confirmDeleteProject(formData : confirmDeleteProjectForm, id: Project["_id"]) {
    try {
        const url = `/projects/${id}/confirm-delete`
        const { data } = await api.post<string >(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        } 
    }
}