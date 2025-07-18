import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from '../features/authentication/UserAvatar'

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 2.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: end;

    /* Medium screens and up */
    @media (min-width: 768px) {
        padding: 1.2rem 3.8rem;
    }

    /* Large screens and up */
    @media (min-width: 1024px) {
        padding: 1.2rem 4.2rem;
    }
`

export default function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    )
}