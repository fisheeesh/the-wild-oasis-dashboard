import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    flex-direction: row;
  }
  
  @media (max-width: 1023px) {
    gap: 1.2rem;
    width: 100%;
  }
`;

export default TableOperations;