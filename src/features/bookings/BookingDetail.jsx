import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Empty from '../../ui/Empty';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useMoveBack } from "../../hooks/useMoveBack";
import { statusToTagName } from "../../utils/constants";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from './useDeleteBooking';
import usePageTitle from "../../hooks/usePageTitle";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1.2rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ResponsiveRow = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.6rem;
    align-items: flex-start;
  }
`;

const ResponsiveButtonGroup = styled(ButtonGroup)`
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1.2rem;
    
    & > * {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const BookingDataContainer = styled.div`
  margin: 2.4rem 0;
  
  @media (max-width: 768px) {
    margin: 1.6rem 0;
  }
`;

const MobileBackButton = styled(ButtonText)`
  @media (max-width: 768px) {
    margin-top: 1.2rem;
    align-self: flex-start;
  }
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, bookingLoading, bookingError } = useBooking();
  const { checkout, isCheckingout } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  usePageTitle(`Booking #${booking?.id}`);

  const moveBack = useMoveBack();

  if (bookingLoading) return <Spinner />;

  if (bookingError) return <Empty resourceName={'booking'} />;

  const { status, id: bookingId } = booking;

  return (
    <>
      <ResponsiveRow type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <MobileBackButton onClick={moveBack}>&larr; Back</MobileBackButton>
      </ResponsiveRow>

      <BookingDataContainer>
        <BookingDataBox booking={booking} />
      </BookingDataContainer>

      <Modal>
        <ResponsiveButtonGroup>
          <Modal.Open opens={'delete-booking'}>
            <Button variation='danger' disabled={isDeletingBooking}>
              Delete
            </Button>
          </Modal.Open>

          {status === 'unconfirmed' && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check In
            </Button>
          )}

          {status === 'checked-in' && (
            <Button
              disabled={isCheckingout}
              onClick={() => { checkout(bookingId) }}
            >
              Check Out
            </Button>
          )}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ResponsiveButtonGroup>

        <Modal.Window name={'delete-booking'}>
          <ConfirmDelete
            resourceName={`Booking #${bookingId}`}
            disabled={isDeletingBooking}
            onConfirm={() => {
              deleteBooking(bookingId, {
                onSuccess: () => {
                  moveBack();
                }
              });
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;