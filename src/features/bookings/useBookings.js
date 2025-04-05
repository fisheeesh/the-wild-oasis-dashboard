import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

const useBookings = () => {
    const [searchParams] = useSearchParams()

    //? filter
    const filterValue = searchParams.get('status')

    const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }
    // const filter = !filterValue || filterValue === 'all' ? null : { field: 'totalPrice', value: 5000, method: 'gte' }

    //? sort
    const sortByRaw = searchParams.get('sortBy') || 'startDate-asc'
    const [field, direction] = sortByRaw.split('-')
    const sortBy = { field, direction }

    const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useQuery({
        //? Like dependency array in useEffect
        //? It will refetch the query when the filter changes
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy })
    })

    return { bookings, bookingsLoading, bookingsError }

}

export default useBookings