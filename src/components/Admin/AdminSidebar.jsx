import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingBag,
  BarChart3,
  Mail,
  Gift,
  HeadphonesIcon,
  PieChart,
  Settings,
  ChevronDown,
  ChevronRight,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  // Mengatur menu yang diperluas secara default saat dimuat
  const [expandedMenus, setExpandedMenus] = useState(['customer', 'sales', 'marketing']);

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => 
      prev.includes(menuKey) 
        ? prev.filter(key => key !== menuKey) // Tutup jika sudah diperluas
        : [...prev, menuKey] // Perluas jika belum diperluas
    );
  };

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: TrendingUp,
      path: '/admin/dashboard',
      hasSubmenu: false
    },
    {
      key: 'user',
      label: 'Pengguna',
      icon: User,
      path: '/admin/user',
      hasSubmenu: false
    },
    {
      key: 'customer',
      label: 'Manajemen Pelanggan',
      icon: Users,
      hasSubmenu: true,
      submenu: [
        { label: 'Semua Pelanggan', path: '/admin/customers' },
        { label: 'Segmentasi Pelanggan', path: '/admin/customers/segmentation' }
      ]
    },
    {
      key: 'sales',
      label: 'Penjualan',
      icon: ShoppingBag,
      hasSubmenu: true,
      submenu: [
        { label: 'Manajemen Pesanan', path: '/admin/orders' },
        { label: 'Manajemen Produk', path: '/admin/products' },
        { label: 'Laporan Penjualan', path: '/admin/sales-reports' }
      ]
    },
    {
      key: 'marketing',
      label: 'Pemasaran',
      icon: Mail,
      hasSubmenu: true,
      submenu: [
        { label: 'Kampanye Email', path: '/admin/campaigns' },
        { label: 'Program Loyalitas', path: '/admin/loyalty' },
        { label: 'Komunikasi', path: '/admin/communications' }
      ]
    },
    {
      key: 'service',
      label: 'Layanan Pelanggan',
      icon: HeadphonesIcon,
      hasSubmenu: true,
      submenu: [
        { label: 'Tiket Dukungan', path: '/admin/tickets' },
        { label: 'Basis Pengetahuan', path: '/admin/knowledge' }
      ]
    },
    {
      key: 'analytics',
      label: 'Analitik & Laporan',
      icon: PieChart,
      hasSubmenu: true,
      submenu: [
        { label: 'Analitik Pelanggan', path: '/admin/analytics/customers' },
        { label: 'Analitik Penjualan', path: '/admin/analytics/sales' },
        { label: 'Analitik Kampanye', path: '/admin/analytics/campaigns' }
      ]
    },
    {
      key: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      path: '/admin/settings',
      hasSubmenu: false
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-6">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          MENU CRM
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedMenus.includes(item.key);
            const isActive = item.path ? location.pathname === item.path : 
              item.submenu?.some(sub => location.pathname === sub.path);

            return (
              <div key={item.key}>
                {!item.hasSubmenu ? (
                  <Link to={item.path}>
                    <div className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      isActive
                        ? 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <div
                      onClick={() => toggleMenu(item.key)}
                      className={`px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {isExpanded ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </div>
                    
                    {isExpanded && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link key={subItem.path} to={subItem.path}>
                            <div className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                              location.pathname === subItem.path
                                ? 'bg-pink-100 text-pink-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}>
                              {subItem.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;