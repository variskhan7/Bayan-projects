import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackToTop } from '../common/BackToTop';
import { useScrollTop } from '../../hooks/useScrollTop';

export const MainLayout: React.FC = () => {
  useScrollTop();

  return (
    <div className="flex flex-col min-h-screen bg-light-bg text-dark-text">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default MainLayout;

