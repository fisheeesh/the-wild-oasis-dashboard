import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"
import { useParams } from "react-router-dom"

const useBooking = () => {
    const { bookingId } = useParams()

    const { data: booking, isLoading: bookingLoading, error: bookingError } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        //? By default, react-query tries to fetch 3 times in case it fails in the beginning. (it does not make sense in every case)
        retry: false
    })

    return { booking, bookingLoading, bookingError }
}

export default useBooking