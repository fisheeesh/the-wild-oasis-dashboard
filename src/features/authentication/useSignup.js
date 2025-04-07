import { useMutation } from "@tanstack/react-query"
import { signup as signupApi } from "../../services/apiAuth"
import toast from "react-hot-toast"

const useSignup = () => {
    const { mutate: signup, isLoading: isSigningup } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success('Account Successfully created. Please verify the new account from the user\'s email address.')
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { signup, isSigningup }
}

export default useSignup