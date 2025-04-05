import BookingDetail from "../features/bookings/BookingDetail"

//! Pages should not fetch data from the server
//? Makes the pages folder a lot cleaner and then leaves much of the development work in the features folder.
export default function Booking() {
    return <BookingDetail />
}
