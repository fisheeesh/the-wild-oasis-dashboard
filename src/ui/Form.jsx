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
      width: 80rem;
      max-width: calc(100vw - 4rem);
      padding: 2.4rem;
      margin: 0 2rem;
      
      @media (max-width: 1024px) {
        width: 70rem;
        padding: 2rem;
        max-width: calc(100vw - 4rem);
      }
      
      @media (max-width: 768px) {
        width: 60rem;
        padding: 1.8rem;
        max-width: calc(100vw - 4rem);
      }
      
      @media (max-width: 640px) {
        width: 90vw;
        max-width: calc(100vw - 4rem);
        padding: 1.6rem;
        margin: 0 2rem;
      }
      
      @media (max-width: 480px) {
        width: calc(100vw - 4rem);
        max-width: calc(100vw - 4rem);
        padding: 1.2rem;
        margin: 0 2rem;
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