import { createBrowserRouter  } from "react-router-dom";
import Layout from "../layouts"
import Banner from "../pages/Banner"
import Login from "../pages/Login"
import Register from "../pages/Register"
import NotFound from "../pages/NotFound"
import CustomerLayout from "../layouts/Customer"
import CustomerHome from "../pages/Customer/Home"
import AdminLayout from "../layouts/Admin"
import AdminHome from "../pages/Admin/Home"
import PrivateRoute from "../companents/PrivateRoute"
import AdminProfile from "../pages/Admin/Profile"

const routes = createBrowserRouter([
    {
        path: '/',
        element :  <Layout/>,

        children :  [
            {
                index: true,
                element: <Banner/>
            },
            {
                element: <Login/>,
                path: '/login'
            },
            {
                element: <Register/>,
                path : '/register'
            },
            {
                
                path: '/customer',
                element: (
                    <PrivateRoute>
                        <CustomerLayout/>
                    </PrivateRoute>
                ),
                children: [
                    {
                        index: true,
                        element : <CustomerHome/>
                    }
                ]
            },
            {
                path: '/admin',
                element:(
                    <PrivateRoute>
                        <AdminLayout/>
                    </PrivateRoute>
                ),
                children: [
                    {
                        index: true,
                        element : <AdminHome/>,
                    },
                    {
                        path: '/admin/profile',
                        element: <AdminProfile/>
                    }
                ]
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    }
])

export default routes;