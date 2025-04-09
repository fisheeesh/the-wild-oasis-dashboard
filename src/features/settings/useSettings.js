import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../../services/apiSettings"

const useSettings = () => {
    const { isPending, data: settings, error } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    })

    return { settings, isPending, error }
}

export default useSettings