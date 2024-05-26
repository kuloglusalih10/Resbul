import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts"
import Home from "../pages/Home"
import Login from "../pages/Login"

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
            }
        ]
    }
])

export default routes;