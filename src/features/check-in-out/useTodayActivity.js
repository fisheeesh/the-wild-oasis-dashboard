import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../services/apiBookings"

const useTodayActivity = () => {
    const { data: activities, isPending } = useQuery({
        queryKey: ['today-activity'],
        queryFn: getStaysTodayActivity
    })

    return { activities, isPending }
}

export default useTodayActivity