import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useCheckin from "./useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";
import usePageTitle from "../../hooks/usePageTitle";
import CheckBox from "../../ui/CheckBox";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { checkin, isCheckingIn } = useCheckin()
  const { booking, bookingLoading } = useBooking()
  const { settings, isLoading: settingsLoading } = useSettings()

  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  const moveBack = useMoveBack();

  usePageTitle(`Check-in #${booking?.id}`)

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid])

  if (bookingLoading || settingsLoading) return <Spinner />

  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuest,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings?.breakfastPrice * numGuest * numNights

  function handleCheckin() {
    if (!confirmPaid) return
    if (addBreakfast) checkin({
      bookingId, breakfast: {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      }
    })
    else checkin({ bookingId, breakfast: {} })
  }

  return (
    <>
      <Row type="horizontal" responsive>
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <CheckBox
          id='breakfast'
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast(prev => !prev)
            setConfirmPaid(false)
          }}
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </CheckBox>
      </Box>}

      <Box>
        <CheckBox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((prev) => !prev)}
          id='confirm'
        >
          I confirm that {guest.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
