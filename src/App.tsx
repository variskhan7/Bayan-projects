import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Sectors from './pages/Sectors';
import SectorDetail from './pages/SectorDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Sustainability from './pages/Sustainability';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sectors" element={<Sectors />} />
        <Route path="sectors/:slug" element={<SectorDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="sustainability" element={<Sustainability />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<NewsDetail />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
