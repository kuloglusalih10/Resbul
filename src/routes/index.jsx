import { createBrowserRouter  } from "react-router-dom";
import Layout from "../layouts"
import Banner from "../pages/Banner"
import Login from "../pages/Login"
import Register from "../pages/Register"
import NotFound from "../pages/NotFound"
import CustomerLayout from "../layouts/Customer"
import CustomerHome from "../pages/Customer/Home"
import AdminLayout from "../layouts/Admin"
import PrivateRoute from "../companents/PrivateRoute"
import AdminProfile from "../pages/Admin/Profile"
import Add from "../pages/Admin/Add";
import AdminList from "../pages/Admin/List"
import AdminControl from "../companents/AdminControl"
import CustomerControl from "../companents/CustomerControl"
import Detail from "../pages/Admin/Detail"

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
                        <CustomerControl>
                            <CustomerLayout/>
                        </CustomerControl>
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
                        <AdminControl>
                            <AdminLayout/>
                        </AdminControl>
                    </PrivateRoute>
                ),
                children: [
                    {
                        index: true,
                        element : <AdminList/>,
                    },
                    {
                        path: '/admin/profile',
                        element: <AdminProfile/>
                                   
                    },
                    {
                        path: '/admin/add',
                        element: <Add/>
                    },
                    {
                        path: '/admin/:id',
                        element: <Detail/>
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