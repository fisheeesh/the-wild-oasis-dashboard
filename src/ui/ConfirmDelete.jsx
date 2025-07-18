/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
    line-height: 1.6;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  /* Tablet adjustments */
  @media (max-width: 1024px) {
    max-width: 36rem;
    gap: 1rem;
    
    & p {
      margin-bottom: 1rem;
    }
    
    & div {
      gap: 1rem;
    }
  }

  /* Mobile landscape */
  @media (max-width: 768px) {
    max-width: 32rem;
    gap: 1rem;
    
    & p {
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
    
    & div {
      gap: 0.8rem;
    }
  }

  /* Mobile portrait */
  @media (max-width: 640px) {
    max-width: 100%;
    gap: 1rem;
    
    & p {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }
    
    & div {
      gap: 0.8rem;
      flex-direction: column-reverse;
    }
  }

  /* Small mobile */
  @media (max-width: 480px) {
    gap: 0.8rem;
    
    & p {
      font-size: 1.2rem;
      margin-bottom: 0.8rem;
    }
    
    & div {
      gap: 0.6rem;
    }
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;