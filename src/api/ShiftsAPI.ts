import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ShiftFormData } from "../types";

export async function createShiftExchange(formData: ShiftFormData) {
    try {
        const { data } = await api.post("/shift-exchanges", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
    
}