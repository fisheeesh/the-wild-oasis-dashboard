import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: bookingsLoading } = useRecentBookings()
  const { stays, confirmedStays, isLoading: staysLoading } = useRecentStays()

  if (bookingsLoading || staysLoading) return <Spinner />

  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Todays Activity</div>
    </StyledDashboardLayout>
  )
}
