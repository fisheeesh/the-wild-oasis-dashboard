import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0.9rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 1.2rem;
    font-size: 1.6rem; /* Larger font size for mobile to prevent zoom */
  }
`;

export default Input;
