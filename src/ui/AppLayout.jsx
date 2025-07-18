import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";

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

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  
  /* Tablet layout - sidebar becomes narrower */
  ${media.tablet} {
    grid-template-columns: 20rem 1fr;
  }
  
  /* Mobile layout - sidebar overlay */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    position: relative;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  
  /* Tablet responsive padding */
  ${media.tablet} {
    padding: 3rem 3.2rem 4.8rem;
  }
  
  /* Mobile responsive padding */
  ${media.mobile} {
    padding: 2rem 1.6rem 3.2rem;
  }
  
  /* Mobile layout adjustments */
  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    margin-left: ${props => props.sidebarOpen ? '0' : '0'};
    transition: margin-left 0.3s ease;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  
  /* Tablet responsive */
  ${media.tablet} {
    max-width: 100%;
    gap: 2.4rem;
  }
  
  /* Mobile responsive */
  ${media.mobile} {
    gap: 1.6rem;
  }
`;

// Responsive Sidebar wrapper
const SidebarWrapper = styled.div`
  /* Desktop and tablet - normal sidebar */
  @media (min-width: 769px) {
    grid-column: 1;
    grid-row: 1 / -1;
    height: 100vh;
  }
  
  /* Mobile - overlay sidebar */
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 26rem;
    z-index: 1000;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    box-shadow: ${props => props.isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'};
  }
`;

// Responsive Header wrapper
const HeaderWrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 1;
  
  /* Mobile - full width header */
  @media (max-width: 768px) {
    position: relative;
    z-index: 999;
  }
`;

// Overlay for mobile sidebar
const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

// Mobile menu toggle button (you can style this to match your design)
const MobileMenuToggle = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 1.5rem;
    left: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    padding: 0.5rem;
    color: var(--color-grey-700);
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <StyledAppLayout>
            <MobileMenuToggle onClick={toggleSidebar}>
                <CgMenuLeftAlt style={{ fontSize: '2.4rem' }} />
            </MobileMenuToggle>

            <HeaderWrapper>
                <Header />
            </HeaderWrapper>

            <SidebarWrapper isOpen={sidebarOpen}>
                <Sidebar onClose={closeSidebar} />
            </SidebarWrapper>

            <Overlay isOpen={sidebarOpen} onClick={closeSidebar} />

            <Main sidebarOpen={sidebarOpen}>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}