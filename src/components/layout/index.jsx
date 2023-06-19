import React, { useEffect } from 'react';
import { LOGIN } from "../../lib/routes";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

function Layout() {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {user, isLoading} = useAuth();


  useEffect(() => {
    if (pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user]);

 if (isLoading) return "Loading...";


  return (
    <>
        This is the child: <Outlet />
    </>
  )
}

export default Layout
