/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  
  /* Base width with breathing room */
  width: min(80rem, calc(100vw - 4rem));
  max-width: calc(100vw - 4rem);
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    width: min(70rem, calc(100vw - 4rem));
    padding: 2.4rem 3rem;
  }
  
  @media (max-width: 768px) {
    width: min(60rem, calc(100vw - 3rem));
    padding: 2rem 2.4rem;
    max-width: calc(100vw - 3rem);
    max-height: calc(100vh - 3rem);
  }
  
  @media (max-width: 640px) {
    width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
    padding: 1.6rem 2rem;
    max-height: calc(100vh - 2rem);
  }
  
  @media (max-width: 480px) {
    width: calc(100vw - 1.6rem);
    max-width: calc(100vw - 1.6rem);
    padding: 1.2rem 1.6rem;
    max-height: calc(100vh - 1.6rem);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  
  /* Ensure proper stacking */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  
  &:hover {
    background-color: var(--color-grey-100);
  }
  
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
  
  @media (max-width: 640px) {
    top: 1rem;
    right: 1rem;
    padding: 0.6rem;
    
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens: OpenWindowName }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(OpenWindowName) });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const modalRef = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;