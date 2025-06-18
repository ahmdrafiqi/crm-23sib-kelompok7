import React from 'react';
import AdminHeader from '../../components/HalamanAdmin/AdminHeader';
import AdminSidebar from '../../components/HalamanAdmin/AdminSidebar';
import AdminDashboard from '../../components/HalamanAdmin/AdminDashboard';


const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader/>
      <div className="flex">
        <AdminSidebar/>
        <AdminDashboard/>
      </div>
    </div>
  );
};

export default DashboardPage;