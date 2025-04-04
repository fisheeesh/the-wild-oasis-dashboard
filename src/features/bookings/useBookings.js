import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

const useBookings = () => {
    const [searchParams] = useSearchParams()

    const filterValue = searchParams.get('status')

    const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }
    // const filter = !filterValue || filterValue === 'all' ? null : { field: 'totalPrice', value: 5000, method: 'gte' }

    const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useQuery({
        queryKey: ['bookings', filter],
        queryFn: () => getBookings({ filter })
    })

    return { bookings, bookingsLoading, bookingsError }

}

export default useBookings