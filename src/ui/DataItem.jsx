/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 0.8rem 0;

  /* Default to column for smaller screens */
  flex-direction: column;

  /* Row layout for md and up */
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
