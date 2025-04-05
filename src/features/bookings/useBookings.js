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

    //? pagination
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const { data: { data: bookings, count } = {}, isLoading: bookingsLoading, error: bookingsError } = useQuery({
        //? Like dependency array in useEffect
        //? It will refetch the query when the filter changes
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page })
    })

    return { bookings, bookingsLoading, bookingsError, count }

}

export default useBookings