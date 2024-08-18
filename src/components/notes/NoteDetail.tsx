import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note}: NoteDetailProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    const params = useParams();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);

    const projectId = params.projectId!;
    const taskId = queryParam.get("viewTask")!;

    const queryClient = useQueryClient();


    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["task", taskId]});
        }, onError: (error) => {
            toast.error(error.message)
        }
    })

    if(isLoading) return 'Loading...'
  return (
    <div className="flex justify-between items-center p-3">
        <p >
            {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">
            {formatDate(note.createdAt)}
        </p>
        {canDelete && 
        <button
        type="button"
        className="bg-red-400 hover:bg-red-500 text-white p-2 text-xs font-bold rounded cursor-pointer transition-colors"
        onClick={() => mutate({projectId, taskId, noteId: note._id})}
        >Delete </button>}
    </div>
  )
}
