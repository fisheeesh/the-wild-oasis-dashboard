import styled from "styled-components";
import EmptyChartData from "../../ui/EmptyChartData";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import useTodayActivity from "./useTodayActivity";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  height: 100%;
  min-height: 400px;
  
  /* Responsive padding */
  @media (max-width: 768px) {
    padding: 1.6rem;
  }
`;

const TodayList = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-400);
  }
  
  /* For mobile, hide scrollbar completely */
  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.isEmpty ? 'center' : 'flex-start'};
`;

function Today() {
  const { activities, isPending } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      <ContentContainer isEmpty={!isPending && (!activities || activities.length === 0)}>
        {!isPending ? (
          activities?.length > 0 ? (
            <TodayList>
              {activities.map((activity) => (
                <TodayItem key={activity.id} activity={activity} />
              ))}
            </TodayList>
          ) : (
            <EmptyChartData label={"No activity for today."} />
          )
        ) : (
          <Spinner />
        )}
      </ContentContainer>
    </StyledToday>
  );
}

export default Today;