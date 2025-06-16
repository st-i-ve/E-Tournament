
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <main className="flex-grow pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
