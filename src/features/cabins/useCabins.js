import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../../services/apiCabins"

const useCabins = () => {
    const { isPending, data: cabins, error } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    })

    return { cabins, isPending, error }
}

export default useCabins