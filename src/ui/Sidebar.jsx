import styled from "styled-components"
import Logo from './Logo.jsx'
import MainNav from './MainNav'
import Uploader from '../data/Uploader.jsx'
import useUser from '../features/authentication/useUser.js'
import { PRIVILEDGE_IDS } from "../utils/constants.js"

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);

    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`

export default function Sidebar() {
    const { user } = useUser()

    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
            {PRIVILEDGE_IDS.includes(user?.id) && < Uploader />}
        </StyledSidebar>
    )
}
