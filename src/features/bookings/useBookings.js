import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"

const useBookings = () => {
    const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useQuery({
        queryKey: ['bookings'],
        queryFn: getBookings
    })

    return { bookings, bookingsLoading, bookingsError }

}

export default useBookings