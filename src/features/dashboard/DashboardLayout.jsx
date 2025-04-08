import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from '../cabins/useCabins'
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from '../check-in-out/TodayActivity'
import usePageTitle from "../../hooks/usePageTitle";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: bookingsLoading } = useRecentBookings()
  const { confirmedStays, isLoading: staysLoading, numDays } = useRecentStays()
  const { cabins, isLoading: cabinsLoading } = useCabins()

  usePageTitle('Dashboard')

  if (bookingsLoading || staysLoading || cabinsLoading) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} numCabins={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
