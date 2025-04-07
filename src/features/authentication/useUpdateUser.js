import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCurrentUser } from "../../services/apiAuth"
import toast from "react-hot-toast"

const useUpdateUser = () => {
    const queryClient = useQueryClient()

    const { mutate: updateUser, isLoading: userUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success('User account successfully updated.')
            queryClient.setQueryData(['user'], user)
            // queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (err) => [
            toast.error(err.message)
        ]
    })

    return { updateUser, userUpdating }
}

export default useUpdateUser