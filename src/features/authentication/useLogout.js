import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"

const useLogout = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: logout, isLoading: logoutLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            //? After success logout, we need to remove the current user data from react query cache even though that is removed from the local storage by server.
            //? In here, we remove all of the queries from the cache.
            queryClient.removeQueries()
            navigate('/login', { replace: true })
        }
    })

    return { logout, logoutLoading }
}

export default useLogout