/* eslint-disable react/prop-types */
import styled from "styled-components";
import Logo from './Logo.jsx';
import MainNav from './MainNav';
import Uploader from '../data/Uploader.jsx';
import useUser from '../features/authentication/useUser.js';
import { PRIVILEDGE_IDS } from "../utils/constants.js";
import { IoMdCloseCircleOutline } from "react-icons/io";

// Breakpoints
const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px'
};

// Media query helpers
const media = {
    mobile: `@media (max-width: ${breakpoints.mobile})`,
    tablet: `@media (max-width: ${breakpoints.tablet})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    wide: `@media (min-width: ${breakpoints.wide})`
};

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
  
  /* Tablet responsive padding */
  ${media.tablet} {
    padding: 2.4rem 1.6rem;
    gap: 2.4rem;
  }
  
  /* Mobile responsive styling */
  ${media.mobile} {
    padding: 2rem 1.6rem;
    gap: 2rem;
  }
  
  /* Mobile overlay styling */
  @media (max-width: 768px) {
    height: 100vh;
    overflow-y: auto;
    
    /* Scrollbar styling for mobile */
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--color-grey-100);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--color-grey-300);
      border-radius: 3px;
    }
  }
`;

// Close button for mobile
const MobileCloseButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-grey-500);
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--color-grey-100);
      color: var(--color-grey-700);
    }
  }
`;

// Logo container with responsive sizing
const LogoContainer = styled.div`
  /* Tablet - slightly smaller logo */
  ${media.tablet} {
    transform: scale(0.9);
    transform-origin: left center;
  }
  
  /* Mobile - smaller logo */
  ${media.mobile} {
    transform: scale(0.8);
    transform-origin: left center;
  }
`;

// Navigation container
const NavContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  
  /* Custom scrollbar for better mobile experience */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 2px;
  }
`;

// Uploader container
const UploaderContainer = styled.div`
  margin-top: auto;
  
  /* Mobile - make uploader more compact */
  ${media.mobile} {
    margin-top: 1rem;
  }
`;

export default function Sidebar({ onClose }) {
    const { user } = useUser();

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <StyledSidebar>
            <MobileCloseButton onClick={handleClose}>
                <IoMdCloseCircleOutline style={{ fontSize: '2.4rem' }} />
            </MobileCloseButton>

            <LogoContainer>
                <Logo />
            </LogoContainer>

            <NavContainer>
                <MainNav onItemClick={handleClose} />
            </NavContainer>

            {PRIVILEDGE_IDS.includes(user?.id) && (
                <UploaderContainer>
                    <Uploader />
                </UploaderContainer>
            )}
        </StyledSidebar>
    );
}