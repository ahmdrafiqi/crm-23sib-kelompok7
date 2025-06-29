import React, { useEffect, useState } from "react";
import { Search, Mail, Phone, User, Shield, Eye, Edit, Trash2 } from "lucide-react";
import { supabase } from "../../supabase"; // Pastikan file ini sesuai

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  // Ambil data dari Supabase
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Gagal fetch users:", error);
    } else {
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (users) =>
      users.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
        <p className="text-gray-600">Manage application users</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((users) => (
                <tr key={users.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {users.name?.charAt(0) || "U"}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{users.username}</p>
                        <p className="text-xs text-gray-500">ID: {users.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail className="w-4 h-4 text-gray-400" /> {users.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      <Shield className="w-4 h-4" /> {users.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-500 hover:text-yellow-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="px-6 py-4 border-t text-sm text-gray-600">
          Showing {filteredUsers.length} users
        </div>
      </div>
    </main>
  );
};

export default UserManagement;
