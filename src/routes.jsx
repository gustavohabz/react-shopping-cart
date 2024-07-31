import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './pages/ErrorPage'
import App from './App'
import { Shop } from './pages/Shop'
import { Home } from './pages/Home'
import { ShoppingCart } from './pages/ShoppingCart'
import { Checkout } from './pages/Checkout'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/home', element: <Home /> },
            { path: '/shop', element: <Shop /> },
            { path: '/checkout', element: <Checkout /> },
        ]
    },
])