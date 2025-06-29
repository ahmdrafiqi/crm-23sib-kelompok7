// Versi Bahasa Indonesia + warna segmentasi disesuaikan + tampilkan nama user di Most Orders dan Most Spent

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Star,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSegment, setFilterSegment] = useState("all");

  const segmentColors = {
    Bronze: "bg-yellow-100 text-yellow-700",
    Silver: "bg-gray-200 text-gray-700",
    Gold: "bg-amber-200 text-amber-800",
    VIP: "bg-purple-100 text-purple-700",
    Loyal: "bg-blue-100 text-blue-700",
    New: "bg-green-100 text-green-700",
    Dormant: "bg-red-100 text-red-700",
  };

  const [stats, setStats] = useState({
    totalCustomers: 0,
    mostOrders: 0,
    mostOrdersName: "",
    mostSpent: 0,
    mostSpentName: "",
    newThisMonth: 0,
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("pelanggan").select(`
        id_pelanggan,
        level_member,
        total_belanja,
        jumlah_order,
        transaksi_terakhir,
        users (
          username,
          email,
          no_hp
        )
      `);

      if (error) {
        console.error("Gagal mengambil data pelanggan:", error);
      } else {
        const formatted = data.map((item) => ({
          id: item.id_pelanggan,
          name: item.users?.username || "-",
          email: item.users?.email || "-",
          phone: item.users?.no_hp || "-",
          segment: item.level_member,
          totalSpent: item.total_belanja,
          totalOrders: item.jumlah_order,
          lastPurchase: item.transaksi_terakhir
            ? new Date(item.transaksi_terakhir).toLocaleDateString()
            : "-",
        }));

        setCustomers(formatted);

        const totalCustomers = formatted.length;
        let mostOrders = 0,
          mostSpent = 0,
          mostOrdersName = "",
          mostSpentName = "";

        formatted.forEach((c) => {
          if (c.totalOrders > mostOrders) {
            mostOrders = c.totalOrders;
            mostOrdersName = c.name;
          }
          if (c.totalSpent > mostSpent) {
            mostSpent = c.totalSpent;
            mostSpentName = c.name;
          }
        });

        const now = new Date();
        const newThisMonth = formatted.filter((c) => {
          const date = new Date(c.lastPurchase);
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        }).length;

        setStats({
          totalCustomers,
          mostOrders,
          mostOrdersName,
          mostSpent,
          mostSpentName,
          newThisMonth,
        });
      }
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterSegment === "all" || customer.segment === filterSegment;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus pelanggan ini?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("pelanggan")
      .delete()
      .eq("id_pelanggan", id);
    if (error) {
      alert("Terjadi kesalahan: " + error.message);
    } else {
      alert("Pelanggan berhasil dihapus.");
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manajemen Pelanggan
        </h1>
        <p className="text-gray-600">Kelola dan pantau data pelanggan Anda</p>
      </div>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Total Pelanggan</p>
          <p className="text-2xl font-bold text-gray-800">
            {stats.totalCustomers}
          </p>
          <p className="text-xs text-green-600 mt-1">Data terkini</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Order Terbanyak</p>
          <p className="text-2xl font-bold text-purple-600">
            {stats.mostOrders}{" "}
            <span className="text-sm text-gray-500">
              ({stats.mostOrdersName})
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Jumlah order tertinggi</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Belanja Tertinggi</p>
          <p className="text-2xl font-bold text-gray-600">
            Rp {(stats.mostSpent / 1000000).toFixed(1)}Jt{" "}
            <span className="text-sm text-gray-500">
              ({stats.mostSpentName})
            </span>
          </p>
          <p className="text-xs text-blue-600 mt-1">Pelanggan paling royal</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Pelanggan Baru Bulan Ini</p>
          <p className="text-2xl font-bold text-blue-600">
            {stats.newThisMonth}
          </p>
          <p className="text-xs text-red-500 mt-1">Target: 500</p>
        </div>
      </div>
      {/* Actions Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari Pelanggan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterSegment}
                onChange={(e) => setFilterSegment(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">Semua</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>
          </div>

          {/* Add Customer Button */}
          <button
            onClick={() => navigate("/admin/customers/add")}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Pelanggan
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Belanja
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pembelian Terakhir
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((pelanggan) => (
                <tr
                  key={pelanggan.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {pelanggan.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {pelanggan.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: #C{pelanggan.id.toString().padStart(5, "0")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {pelanggan.email}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {pelanggan.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        segmentColors[pelanggan.segment]
                      }`}
                    >
                      {pelanggan.segment === "VIP" && (
                        <Star className="w-3 h-3 mr-1" />
                      )}
                      {pelanggan.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">
                      Rp {(pelanggan.totalSpent / 1000000).toFixed(1)}M
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {pelanggan.totalOrders}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {pelanggan.lastPurchase}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(pelanggan.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">1</span> -{" "}
            <span className="font-medium">5</span> dari{" "}
            <span className="font-medium">12,845</span> data
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Sebelumnya
            </button>
            <button className="px-3 py-1 bg-pink-500 text-white rounded-md text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              ...
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerManagement;
