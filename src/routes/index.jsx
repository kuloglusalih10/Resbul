import { createBrowserRouter  } from "react-router-dom";
import Layout from "../layouts"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import NotFound from "../pages/NotFound"

const routes = createBrowserRouter([
    {
        path: '/',
        element :  <Layout/>,

        children :  [
            {
                index: true,
                element: <Home/>
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
                path: '*',
                element: <NotFound/>
            }
        ]
    }
])

export default routes;