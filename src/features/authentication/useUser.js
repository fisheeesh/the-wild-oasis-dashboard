import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"

const useUser = () => {
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    })

    return { user, userLoading, isAuthenticated: user?.role === 'authenticated' }
}

export default useUser