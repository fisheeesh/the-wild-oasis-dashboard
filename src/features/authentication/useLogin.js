import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useLogin = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: login, isLoading: loginLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            console.log(user)
            //? We dun want to call the getCurrentUser after we login which is quite not necessary here.
            //? Instead, we can set the user data (which is currently logged in user) in React Query cache.
            //? This allows us to manually set some data in React Query cache.
            queryClient.setQueryData(['user'], user.user)
            navigate('/dashboard', { replace: true })
        },
        onError: () => {
            toast.error('Incorrect Credentials.')
        }
    })

    return { login, loginLoading }
}

export default useLogin