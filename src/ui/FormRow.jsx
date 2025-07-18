/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
    border-bottom: none;
    padding-top: 2rem;
    
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }

  /* Tablet styles */
  @media (min-width: 768px) {
    display: grid;
    align-items: center;
    grid-template-columns: 20rem 1fr;
    gap: 2rem;
    
    &:has(button) {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 1.2rem;
    }
  }

  /* Desktop styles */
  @media (min-width: 1150px) {
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;
  }
  
  /* Mobile adjustments */
  @media (max-width: 480px) {
    padding: 1rem 0;
    gap: 0.6rem;
    
    &:has(button) {
      padding-top: 1.6rem;
      gap: 1rem;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export default function FormRow({ label, errorMessage, children }) {
    return (
        <StyledFormRow>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {errorMessage && <Error>{errorMessage}</Error>}
        </StyledFormRow>
    );
}