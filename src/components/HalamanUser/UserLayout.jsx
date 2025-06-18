// src/components/HalamanUser/UserLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const UserLayout = ({ activeTab = 'home' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header tetap global */}
      <Header activeTab={activeTab} />

      {/* Main Content fleksibel, tanpa batasan max-width */}
      <main className="w-full max-w-[2000px] mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer tetap global */}
      <Footer />
    </div>
  );
};

export default UserLayout;
