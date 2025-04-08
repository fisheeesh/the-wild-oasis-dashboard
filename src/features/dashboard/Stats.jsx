import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

/* eslint-disable react/prop-types */
export default function Stats({ bookings, confirmedStays, numDays, numCabins }) {
    //? Num of bookings
    const numBookings = bookings.length

    //? Total Sales
    const totalSales = bookings.reduce((total, booking) => total + booking.totalPrice, 0)

    //? Total Confirmed Stays
    const totalCheckins = confirmedStays.length

    //? Occupancy Rates (not 100% accurate)
    //? num of checked-in nights / all available nights (num of days * num of cabins)
    const occupation = confirmedStays.reduce((total, stay) => total + stay.numNights, 0) / (numDays * numCabins)

    return (
        <>
            <Stat title={'Bookings'} color={'blue'} icon={<HiOutlineBriefcase />} value={numBookings} />
            <Stat title={'Sales'} color={'green'} icon={<HiOutlineBanknotes />} value={formatCurrency(totalSales)} />
            <Stat title={'Check-ins'} color={'indigo'} icon={<HiOutlineCalendarDays />} value={totalCheckins} />
            <Stat title={'Occupancy rates'} color={'yellow'} icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + '%'} />
        </>
    )
}
