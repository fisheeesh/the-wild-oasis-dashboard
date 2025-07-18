/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  background-color: var(--color-grey-0);
`;

const StyledTable = styled.div`
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  min-width: 800px; /* Minimum width to prevent cramping */
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  white-space: nowrap;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  
  /* Ensure text doesn't wrap in cells */
  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  /* Allow some flexibility for guest names and dates */
  & > div:nth-child(2),
  & > div:nth-child(3) {
    white-space: normal;
    min-width: 0;
    word-break: break-word;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

export default function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <TableWrapper>
        <StyledTable role="table">
          {children}
        </StyledTable>
      </TableWrapper>
    </TableContext.Provider>
  );
}

const Header = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader $columns={columns} role="row" as={"header"}>
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow $columns={columns} role="row">
      {children}
    </StyledRow>
  );
};

const Body = ({ data, render }) => {
  if (!data.length) return <Empty>No data to show at the moment.</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;