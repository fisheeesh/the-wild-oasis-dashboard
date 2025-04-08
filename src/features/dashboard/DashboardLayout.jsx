/* eslint-disable no-unused-vars */
import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from '../cabins/useCabins'
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: bookingsLoading } = useRecentBookings()
  const { stays, confirmedStays, isLoading: staysLoading, numDays } = useRecentStays()
  const { cabins, isLoading: cabinsLoading } = useCabins()

  if (bookingsLoading || staysLoading || cabinsLoading) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} numCabins={cabins.length} />
      <div>Todays Activity</div>
    </StyledDashboardLayout>
  )
}
