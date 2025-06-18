import React from 'react';
import { Bell, Heart, ShoppingCart } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
         
          {/* Logo */}
              <div className="flex items-center mr-8">
                <img 
                  src="/src/assets/gambarUser/logo-missglam.png" 
                  alt="Miss Glam Logo" 
                  className="h-13 w-auto cursor-pointer"
                  onClick={() => window.location.href = '/'}
                />
              </div>
        </div>

        <div className="flex items-center space-x-4">

          
            {/* Avatar Placeholder */}
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full" />
            <div>
              <div className="text-sm font-medium">Selvina</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;