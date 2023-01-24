import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Layout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Cart from "../Pages/Cart/Cart";
import ProductDetails from "../Pages/Home/Products/ProductDetails";
import Checkout from "../Pages/Home/Products/Checkout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products/:id',
                element: <ProductDetails></ProductDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: '/checkout/:id',
                element: <Checkout></Checkout>,
                loader: ({ params }) => fetch(`http://localhost:5000/checkout/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
])

export default router;