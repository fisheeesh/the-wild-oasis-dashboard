/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateEditCabinForm from "./CreateEditCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin

  const { createCabin, isCreating } = useCreateCabin()

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    })
  }

  const { isDeleting, deleteCabin } = useDeleteCabin()

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fit up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
        <div>
          <button type="button" disabled={isCreating} onClick={handleDuplicate}><HiSquare2Stack /></button>
          <Modal>
            <Modal.Open opens='edit-form'>
              <button type="button"><HiPencil /></button>
            </Modal.Open>
            <Modal.Window name='edit-form'>
              <CreateEditCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens='delete'>
              <button type="button"><HiTrash /></button>
            </Modal.Open>
            <Modal.Window name='delete'>
              <ConfirmDelete resourceName={name} disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  )
}

