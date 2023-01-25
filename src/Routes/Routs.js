import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Layout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import Cart from "../Pages/Cart/Cart";
import ProductDetails from "../Pages/Home/Products/ProductDetails";
import Checkout from "../Pages/Home/Products/Checkout";
import AllProducts from "../Pages/Dashboard/AllProducts";
import DashboardLayout from "../Layout/DashboardLayout";
import AllCustomers from "../Pages/Dashboard/AllCustomers";
import AddACustomer from "../Pages/Dashboard/AddACustomer";
import AddAProduct from "../Pages/Dashboard/AddAProduct";
import AdminRoute from "./AdminRoute";

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
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element:<AdminRoute><AllCustomers></AllCustomers></AdminRoute>
            },
            {
                path: '/dashboard/allProducts',
                element: <AdminRoute><AllProducts></AllProducts></AdminRoute>
            },
            {
                path:"/dashboard/allCustomers",
                element:<AdminRoute><AllCustomers></AllCustomers></AdminRoute>
            },
            {
                path:"/dashboard/addACustomer",
                element:<AdminRoute><AddACustomer></AddACustomer></AdminRoute>
            },
            {
                path:"/dashboard/addAProduct",
                element:<AdminRoute><AddAProduct></AddAProduct></AdminRoute>
            }
        ]
    }
    
])

export default router;