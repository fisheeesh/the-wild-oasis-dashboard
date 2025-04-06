/* eslint-disable react/prop-types */
import { MdErrorOutline } from "react-icons/md";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error><MdErrorOutline /> {error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
