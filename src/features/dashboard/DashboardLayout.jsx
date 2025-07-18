import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import useCabins from '../cabins/useCabins';
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from '../check-in-out/TodayActivity';
import usePageTitle from "../../hooks/usePageTitle";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StatsContainer = styled.div`
  width: 100%;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  
  /* XL screens: side by side */
  @media (min-width: 1280px) {
    flex-direction: row;
  }
`;

const TodayContainer = styled.div`
  flex: 1;
  display: flex;
  
  /* Ensure equal height by making child fill container */
  > * {
    flex: 1;
  }
`;

const DurationContainer = styled.div`
  flex: 1;
  display: flex;
  
  /* Ensure equal height by making child fill container */
  > * {
    flex: 1;
  }
`;

const SalesContainer = styled.div`
  width: 100%;
`;

export default function DashboardLayout() {
  const { bookings, isPending: bookingsLoading } = useRecentBookings();
  const { confirmedStays, isPending: staysLoading, numDays } = useRecentStays();
  const { cabins, isPending: cabinsLoading } = useCabins();

  usePageTitle('Dashboard');

  if (bookingsLoading || staysLoading || cabinsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <StatsContainer>
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          numCabins={cabins.length}
        />
      </StatsContainer>

      <MiddleSection>
        <TodayContainer>
          <TodayActivity />
        </TodayContainer>
        <DurationContainer>
          <DurationChart confirmedStays={confirmedStays} />
        </DurationContainer>
      </MiddleSection>

      <SalesContainer>
        <SalesChart bookings={bookings} numDays={numDays} />
      </SalesContainer>
    </StyledDashboardLayout>
  );
}
