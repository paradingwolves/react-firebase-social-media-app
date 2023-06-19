import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
        This is the child: <Outlet />
    </>
  )
}

export default Layout
