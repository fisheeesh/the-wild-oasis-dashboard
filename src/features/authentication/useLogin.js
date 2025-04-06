import { useMutation } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useLogin = () => {
    const navigate = useNavigate()

    const { mutate: login, isLoading: loginLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: () => {
            navigate('/')
        },
        onError: (err) => {
            console.log(err.message)
            toast.error('Incorrect Credentials.')
        }
    })

    return { login, loginLoading }
}

export default useLogin