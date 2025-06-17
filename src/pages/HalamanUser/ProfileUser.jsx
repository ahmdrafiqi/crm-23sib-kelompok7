import React, { useState } from 'react';
import { Pencil, User, Heart, ShoppingBag, LogOut } from 'lucide-react';
import CoverImage from '../../assets/assetsUser/Gambar.png';
import ProfilePic from '../../assets/assetsUser/Profil.jpg';
import UserLayout from '../../components/HalamanUser/UserLayout';


const ProfileUser = () => {
  const [activeTab, setActiveTab] = useState('account');

  const menuItems = [
    { id: 'account', label: 'Account Info', icon: <User size={16} /> },
    { id: 'wishlist', label: 'Wish list', icon: <Heart size={16} /> },
    { id: 'order', label: 'Order', icon: <ShoppingBag size={16} /> },
    { id: 'logout', label: 'Logout', icon: <LogOut size={16} /> },
  ];

  return (
    <UserLayout>
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">miss glam</h1>
      </header>

      {/* Cover */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${CoverImage})` }}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold">Selvina</h2>
              <p className="text-sm text-gray-500">@Pekanbaru, Riau</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Menu */}
            <div className="space-y-2 border p-4 rounded-md border-[#E9EBEC]">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                    ${activeTab === item.id
                      ? 'bg-[#EE628B] text-white'
                      : 'text-gray-800 hover:bg-[#EE628B]/10 hover:text-[#EE628B]'}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="md:col-span-3">
              <div className="border rounded-lg p-6 space-y-6 bg-white shadow-sm border-[#E9EBEC]">
                {/* Personal Info */}
                <section>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Personal Info</h3>
                    <button className="flex items-center gap-1 bg-[#EE628B] text-white px-3 py-1 rounded-md text-sm">
                      <Pencil size={16} /> Edit
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <p><strong>Customer Name:</strong> Selvina</p>
                    <p><strong>Phone:</strong> +62 812 3456 7890</p>
                    <p><strong>Email:</strong> selvina2345h@sainesia.pcr.ac.id</p>
                    <p><strong>Location:</strong> Pekanbaru, Riau</p>
                    <p><strong>Since Member:</strong> Aug, 2022</p>
                  </div>
                </section>

                {/* Billing & Shipping */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Home Address */}
                  <div className="border p-4 rounded-md border-[#E9EBEC]">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-700">Home Address</h4>
                      <button className="flex items-center gap-1 bg-[#EE628B] text-white px-3 py-1 rounded-md text-sm">
                        <Pencil size={16} /> Edit
                      </button>
                    </div>
                    <p className="mt-2 text-sm">
                      Selvina<br />
                      Jalan Patimura, Pekanbaru, Riau<br />
                      Hp. +62 81234 5678
                    </p>
                  </div>

                  {/* Shipping Address */}
                  <div className="border p-4 rounded-md border-[#E9EBEC]">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-700">Shipping Address</h4>
                      <button className="flex items-center gap-1 bg-[#EE628B] text-white px-3 py-1 rounded-md text-sm">
                        <Pencil size={16} /> Edit
                      </button>
                    </div>
                    <p className="mt-2 text-sm">
                      James Honda<br />
                      1248 Vigil Street Pensacola, FL 32501<br />
                      Mo. +1(931) 07324 5678
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-[#EE628B]/20 py-8 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">
            Stay Home & Get Your Daily Needs From Our Shop
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Start Your Daily Shopping with Missglam
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md border border-gray-300"
            />
            <button className="bg-[#EE628B] text-white px-4 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
    </UserLayout>
  );
};

export default ProfileUser;
