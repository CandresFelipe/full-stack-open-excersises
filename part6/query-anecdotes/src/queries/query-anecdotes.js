import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)
const formatAnecdote = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
  }

const getAnecdotes = async () => {
    return (await axios.get(baseUrl)).data;
}

const createAnecdote = async (anecdote) => {
    return await axios.post(baseUrl, anecdote)
}


const updateVote = async (id, newObject) => {
    const response = await axios.patch(`${baseUrl}/${id}`,newObject)
    return response
}


export const useGetAnecdotesQuery = () => {
    return useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false,
        retry: false,
    })
}

export const useCreateAnecdoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn: async (data) => {
            const newAnecdote = formatAnecdote(data)
            return await createAnecdote(newAnecdote)
       },
       onSuccess: (response) => {
            const notes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], notes.concat(response.data))
       }
    })
}

export const useUpdateVoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const { id, votes } = data
            const respose = await updateVote(id, { votes })
            return respose.data;
        },
        onSuccess: (response) => {
            const notes = queryClient.getQueryData(['anecdotes'])
            const updatedNotes = notes.map(note => note.id === response.id ? response : note)
            queryClient.setQueryData(['anecdotes'], updatedNotes)
        }
    })
}