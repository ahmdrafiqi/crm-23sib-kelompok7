import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  Download,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  MoreVertical,
  Trash2,
  Edit
} from "lucide-react";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("transaksi").select(`
          id_transaksi,
          total_harga,
          status,
          tanggal_transaksi,
          payment,
          pelanggan (
            id_pelanggan,
            users (
              username,
              email
            )
          )
        `);

      if (error) {
        console.error("Gagal mengambil data transaksi:", error);
      } else {
        const formatted = data.map((t) => ({
          id: t.id_transaksi,
          customerName: t.pelanggan?.users?.username || "Unknown",
          customerEmail: t.pelanggan?.users?.email || "-",
          orderDate: t.tanggal_transaksi,
          status: t.status,
          items: 1, // dummy
          total: t.total_harga,
          payment: t.payment,
          shipping: "-", // dummy
        }));
        setOrders(formatted);
      }
    };

    fetchOrders();
  }, []);

  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
      label: "Pending",
    },
    processing: {
      color: "bg-blue-100 text-blue-700",
      icon: Package,
      label: "Processing",
    },
    shipped: {
      color: "bg-purple-100 text-purple-700",
      icon: Truck,
      label: "Shipped",
    },
    delivered: {
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
      label: "Delivered",
    },
    cancelled: {
      color: "bg-red-100 text-red-700",
      icon: XCircle,
      label: "Cancelled",
    },
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
  };
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus transaksi ini?");
    if (confirmDelete) {
      const { error } = await supabase
        .from("transaksi")
        .delete()
        .eq("id_transaksi", id);

      if (error) {
        console.error("Gagal menghapus transaksi:", error.message);
        alert("Terjadi kesalahan saat menghapus transaksi.");
      } else {
        alert("Transaksi berhasil dihapus.");
        setOrders((prev) => prev.filter((o) => o.id !== id));
      }
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600">Track and manage all customer orders</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-pink-500">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">Today</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Pending Orders</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-xs text-gray-500 mt-1">Need attention</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Processing</p>
          <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
          <p className="text-xs text-gray-500 mt-1">In progress</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Today's Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            Rp {(stats.revenue / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-gray-500 mt-1">+15% from yesterday</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Orders
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{order.orderDate}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                          statusConfig[order.status].color
                        }`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {order.items} items
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">
                        Rp {order.total.toLocaleString("id-ID")}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{order.payment}</p>
                      <p className="text-xs text-gray-500">{order.shipping}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/orders/${order.id}/detail`)
                          }
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                         <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">5</span> of{" "}
            <span className="font-medium">3,567</span> results
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Previous
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
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderManagement;
