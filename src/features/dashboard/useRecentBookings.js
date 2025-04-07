import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings"

const useRecentBookings = () => {
    const [searchParams] = useSearchParams()

    const numbDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))

    //? D nae ka ny p dok lon khae tae numDays hti
    const queryDate = subDays(new Date(), numbDays).toISOString()

    const { data: bookings, isLoading } = useQuery({
        queryKey: ['bookings', `last-${numbDays}`],
        queryFn: () => getBookingsAfterDate(queryDate)
    })

    return { bookings, isLoading }
}

export default useRecentBookings