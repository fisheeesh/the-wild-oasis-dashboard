import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings"

const useRecentStays = () => {
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))

    const queryDate = subDays(new Date(), numDays).toISOString()

    const { data: stays, isPending } = useQuery({
        queryKey: ['stays', `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate)
    })

    // $ We need to calculate only the confirmed stays the one that are not unconfirmed.
    //? We need to know about this cuz the guest might never show-up and then that booking stays unconfirmed forever.
    //? To display data in our dashboard, we are interested only in the confirmed stays.
    const confirmedStays = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out')

    return { stays, isPending, confirmedStays, numDays }
}

export default useRecentStays