import React, { useEffect } from 'react';
import { LOGIN } from "../../lib/routes";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Navbar from './NavBar';
import SideBar from './SideBar';

function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading]);

  if (isLoading) return "Loading auth user...";


  return (
    <>
        <Navbar />
        This is the child: <Outlet />
    </>
  );
}

export default Layout
