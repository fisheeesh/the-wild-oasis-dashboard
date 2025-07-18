/* eslint-disable react/prop-types */
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const StatsGrid = styled.div`
  display: grid;
  gap: 2.4rem;
  
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
  
  /* Tablet: 2 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Desktop: 4 columns */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default function Stats({ bookings, confirmedStays, numDays, numCabins }) {
    const numBookings = bookings.length;
    const totalSales = bookings.reduce((total, booking) => total + booking.totalPrice, 0);
    const totalCheckins = confirmedStays.length;
    const occupation = confirmedStays.reduce((total, stay) => total + stay.numNights, 0) / (numDays * numCabins);

    return (
        <StatsGrid>
            <Stat
                title={'Bookings'}
                color={'blue'}
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title={'Sales'}
                color={'green'}
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(totalSales)}
            />
            <Stat
                title={'Check-ins'}
                color={'indigo'}
                icon={<HiOutlineCalendarDays />}
                value={totalCheckins}
            />
            <Stat
                title={'Occupancy rates'}
                color={'yellow'}
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + '%'}
            />
        </StatsGrid>
    );
}