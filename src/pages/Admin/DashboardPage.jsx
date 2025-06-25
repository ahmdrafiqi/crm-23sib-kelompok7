import React from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminDashboard from '../../components/Admin/AdminDashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    
      <div className="flex">

        <AdminDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;