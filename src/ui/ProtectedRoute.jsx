/* eslint-disable react/prop-types */
import styled from 'styled-components'
import useUser from '../features/authentication/useUser'
import Spinner from '../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
    
`

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate()

    //? 1. We need to load authenticated user
    const { userLoading, isAuthenticated } = useUser()

    //? 2. If NO authenticated user, redirect to login
    useEffect(() => {
        /**
         * ! In here, !isAuthenticated is not even enough.
         * ! In the beginning, while we are still loading, the user is also not authenticated yet.
         * $ That does not mean we want to redirect them to login page.
         * @TODO: Only when there is no longer loading and the user is not authenticated, we want to redirect to login
         */
        if (!isAuthenticated && !userLoading) navigate('/login')
    }, [isAuthenticated, userLoading, navigate])

    //? 3. While loading, show spinner
    if (userLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    )

    //? 4. If there IS, render the app

    if (isAuthenticated) return children
}
