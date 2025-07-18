/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }

  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 1.6rem;
    padding: 1.6rem 2rem;
    text-align: center;
    
    & div:first-child {
      gap: 1.2rem;
      font-size: 1.6rem;
    }
    
    & span {
      font-size: 1.8rem;
    }
    
    svg {
      height: 2.8rem;
      width: 2.8rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
    font-size: 1.6rem;
    
    & div:first-child {
      font-size: 1.4rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    & span {
      font-size: 1.6rem;
    }
    
    svg {
      height: 2.4rem;
      width: 2.4rem;
    }
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
  
  @media (max-width: 768px) {
    padding: 2.4rem 2rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.6rem 1.6rem 1.2rem;
  }
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);
  flex-wrap: wrap;

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    
    & span {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const GuestInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    padding: 1.6rem 2rem;
    
    & p:last-child {
      order: -1;
      font-size: 1.6rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
    gap: 1rem;
    
    & p:last-child {
      font-size: 1.4rem;
    }
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
  
  @media (max-width: 768px) {
    padding: 1.6rem 2rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
    font-size: 1.1rem;
  }
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guest: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          <GuestInfo>
            {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
            <p>
              {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
            </p>
          </GuestInfo>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;