import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../../services/apiCabins"

const useCabins = () => {
    const { isLoading, data: cabins } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    })

    return { cabins, isLoading }
}

export default useCabins