// import `createBrowserRouter` component
import { createBrowserRouter } from "react-router-dom";
// import `Register` component
import Register from '../components/auth/Register';
// import `Login` component
import Login from '../components/auth/Login';
// import `layout` component
import Layout from '../components/layout/index.jsx';
// import Dashboard component
import Dashboard from "../components/dashboard";

// home route 
export const ROOT = "/";
// login route 
export const LOGIN = "/login";
// register route 
export const REGISTER = "/register";
// Protected route
export const PROTECTED = "/protected";
// Dashboard route 
export const DASHBOARD = "/protected/dashboard";

// create routes
export const router = createBrowserRouter ([
    { path: ROOT, element: "Public Root"},
    { path: LOGIN, element: <Login />},
    { path: REGISTER, element: <Register />},
    { 
        path: PROTECTED,
        element: <Layout />, 
        children: [
            {
                path: DASHBOARD,
                element: <Dashboard />
            }
        ],
    },
]);