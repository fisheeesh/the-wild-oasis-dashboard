import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import Bookings from '../pages/Bookings'
import Cabins from '../pages/Cabins'
import Users from '../pages/Users'
import Settings from '../pages/Settings'
import Account from '../pages/Account'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
import AppLayout from "../ui/AppLayout"
import Booking from "../pages/Booking"
import Checkin from "../pages/Checkin"

// cEenoLcqRXmdhxaA

export default function Router() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to={'dashboard'} replace />
                },
                {
                    path: 'dashboard',
                    element: <Dashboard />,
                },
                {
                    path: 'bookings',
                    element: <Bookings />,
                },
                {
                    path: 'bookings/:bookingId',
                    element: <Booking />,
                },
                {
                    path: 'checkin/:bookingId',
                    element: <Checkin />,
                },
                {
                    path: 'cabins',
                    element: <Cabins />,
                },
                {
                    path: 'users',
                    element: <Users />,
                },
                {
                    path: 'settings',
                    element: <Settings />,
                },
                {
                    path: 'account',
                    element: <Account />
                },
            ]
        },
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: '*',
            element: <PageNotFound />,
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}
