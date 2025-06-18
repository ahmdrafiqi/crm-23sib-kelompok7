// src/pages/HalamanAdmin/ProdukAdmin.jsx
import React from 'react';
import AdminSidebar from '../../components/HalamanAdmin/AdminSidebar';
import AdminHeader from '../../components/HalamanAdmin/AdminHeader';

const ProdukAdmin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header di atas */}
      <AdminHeader />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar di bawah header */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Manajemen Produk</h1>

          {/* Filter */}
          <div className="mb-4">
            <label className="mr-2 font-medium">Filter Kategori:</label>
            <select className="border border-gray-300 rounded p-1">
              <option value="">Semua</option>
              <option value="makeup">Makeup</option>
              <option value="skincare">Skincare</option>
              <option value="bodycare">Bodycare</option>
            </select>
          </div>

          {/* Daftar Produk (sementara dummy) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded shadow-sm">
              <h2 className="font-semibold">Lipstick</h2>
              <p className="text-sm text-gray-600">Kategori: Makeup</p>
            </div>
            <div className="p-4 border rounded shadow-sm">
              <h2 className="font-semibold">Facial Wash</h2>
              <p className="text-sm text-gray-600">Kategori: Skincare</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProdukAdmin;
