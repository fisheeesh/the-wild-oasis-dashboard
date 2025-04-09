import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
    const queryClient = useQueryClient()

    const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
        mutationFn: (bookingId) => deleteBookingApi(bookingId),
        onSuccess: () => {
            toast.success("Booking successfully deleted.");
            queryClient.invalidateQueries({ active: true })
        },
        onError: (err) => {
            toast.error(err.message);
        },
    })

    return { deleteBooking, isDeletingBooking }
}

export default useDeleteBooking;