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
// import Comments component
import Comments from "../components/comments";

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
// users route
export const USERS = "/protected/users";
// profile route
export const PROFILE = "/protected/profile/:id"
// comments route
export const COMMENTS = "/protected/comments/:id";

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
            },
            {
                path: USERS,
                element: "Users"
            },
            {
                path: PROFILE,
                element: "Profile"
            },{
                path: COMMENTS,
                element: <Comments />
            },
        ],
    },
]);