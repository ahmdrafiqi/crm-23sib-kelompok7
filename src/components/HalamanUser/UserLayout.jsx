// src/components/HalamanUser/UserLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const UserLayout = ({ children, activeTab = 'home' }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} />
      
      {/* Main Content dengan margin yang konsisten */}
      <main className="max-w-x7l mx-auto px-4 lg:px-6 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;