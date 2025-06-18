import { CgGirl } from "react-icons/cg"; 
import { MdGirl } from "react-icons/md"; 
import { MdDiscount } from "react-icons/md"; 
import { CiDiscount1 } from "react-icons/ci"; 
// src/components/HalamanAdmin/AdminSidebar.jsx
import React from 'react';
import { TrendingUp, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-6">
        {/* Label Section */}
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          GENERAL
        </div>

        {/* Dashboard */}
        <Link to="/admin">
          <div className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
        </Link>

        {/* Produk */}
        <Link to="/admin/produk">
          <div className={`mt-2 px-3 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/produk' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Package className="w-4 h-4" />
            <span className="text-sm font-medium">Produk</span>
          </div>
        </Link>

        {/* Voucer */}
        <Link to="/admin/produk">
          <div className={`mt-2 px-3 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/produk' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <MdDiscount className="w- h-4"/>
            <span className="text-sm font-medium">Voucer</span> 
          </div>
        </Link>

        {/* Pelanggan */}
        <Link to="/admin/produk">
          <div className={`mt-2 px-3 py-2 rounded-lg flex items-center space-x-2 ${location.pathname === '/admin/produk' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
            <CgGirl className="w-4 h-4" />
            <span className="text-sm font-medium">Pelanggan</span>
          </div>
        </Link>

      </div>
    </aside>
  );
};

export default AdminSidebar;
