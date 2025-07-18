import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      
      @media (max-width: 1024px) {
        padding: 2rem 3rem;
      }
      
      @media (max-width: 768px) {
        padding: 1.6rem 2rem;
      }
      
      @media (max-width: 480px) {
        padding: 1.2rem 1.6rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      padding: 0;
      margin: 0;
      background: transparent;
      border: none;
      
      /* Let the modal handle all spacing and sizing */
      @media (max-width: 1024px) {
        padding: 0;
      }
      
      @media (max-width: 768px) {
        padding: 0;
      }
      
      @media (max-width: 640px) {
        padding: 0;
      }
      
      @media (max-width: 480px) {
        padding: 0;
      }
    `}

  overflow: hidden;
  font-size: 1.4rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;