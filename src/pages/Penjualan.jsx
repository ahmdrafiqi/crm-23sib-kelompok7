import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { FaEdit, FaTrash } from "react-icons/fa";

const dummyCustomers = [
  { id: 1, name: "Budi Santoso" },
  { id: 2, name: "Siti Aminah" },
  { id: 3, name: "Andi Wijaya" },
  { id: 4, name: "Rina Melati" },
  { id: 5, name: "Dedi Pratama" },
];

const initialSales = [
  {
    id: 1,
    invoice: "INV-001",
    customerId: 1,
    date: "2025-05-01",
    total: 1500000,
    status: "Lunas",
  },
  {
    id: 2,
    invoice: "INV-002",
    customerId: 2,
    date: "2025-05-02",
    total: 250000,
    status: "Belum Lunas",
  },
  {
    id: 3,
    invoice: "INV-003",
    customerId: 3,
    date: "2025-04-25",
    total: 530000,
    status: "Lunas",
  },
  {
    id: 4,
    invoice: "INV-004",
    customerId: 4,
    date: "2025-03-15",
    total: 800000,
    status: "Batal",
  },
  {
    id: 5,
    invoice: "INV-005",
    customerId: 5,
    date: "2025-04-10",
    total: 1200000,
    status: "Lunas",
  },
  {
    id: 6,
    invoice: "INV-006",
    customerId: 1,
    date: "2025-02-10",
    total: 600000,
    status: "Belum Lunas",
  },
];

const COLORS = {
  Lunas: "#4CAF50",
  "Belum Lunas": "#FFC107",
  Batal: "#F44336",
};

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function SalesManagement() {
  const [sales, setSales] = useState(initialSales);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    invoice: "",
    customerId: "",
    date: "",
    total: "",
    status: "Belum Lunas",
  });

  // Untuk edit
  const [editSale, setEditSale] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Tambah data baru
  const handleAddSale = () => {
    const { invoice, customerId, date, total, status } = formData;
    if (!invoice || !customerId || !date || !total) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newSale = {
      id: sales.length ? Math.max(...sales.map((s) => s.id)) + 1 : 1,
      invoice,
      customerId: Number(customerId),
      date,
      total: Number(total),
      status,
    };

    setSales([...sales, newSale]);
    setFormData({
      invoice: "",
      customerId: "",
      date: "",
      total: "",
      status: "Belum Lunas",
    });
    setShowForm(false);
  };

  // Delete data
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus penjualan ini?")) {
      setSales(sales.filter((sale) => sale.id !== id));
    }
  };

  // Start edit mode
  const startEdit = (sale) => {
    setEditSale(sale);
    setFormData({
      invoice: sale.invoice,
      customerId: sale.customerId.toString(),
      date: sale.date,
      total: sale.total.toString(),
      status: sale.status,
    });
    setShowForm(true);
  };

  // Save edit
  const handleSaveEdit = () => {
    const { invoice, customerId, date, total, status } = formData;
    if (!invoice || !customerId || !date || !total) {
      alert("Semua field wajib diisi!");
      return;
    }

    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === editSale.id
          ? {
              ...sale,
              invoice,
              customerId: Number(customerId),
              date,
              total: Number(total),
              status,
            }
          : sale
      )
    );

    setEditSale(null);
    setFormData({
      invoice: "",
      customerId: "",
      date: "",
      total: "",
      status: "Belum Lunas",
    });
    setShowForm(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditSale(null);
    setFormData({
      invoice: "",
      customerId: "",
      date: "",
      total: "",
      status: "Belum Lunas",
    });
    setShowForm(false);
  };

  const getCustomerName = (id) => {
    const customer = dummyCustomers.find((c) => c.id === id);
    return customer ? customer.name : "-";
  };

  // Data pie chart status penjualan
  const pieData = ["Lunas", "Belum Lunas", "Batal"].map((status) => ({
    name: status,
    value: sales.filter((s) => s.status === status).length,
  }));

  // Data bar chart penjualan per bulan
  const barData = Object.values(
    sales.reduce((acc, curr) => {
      const date = new Date(curr.date);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      acc[monthKey] = acc[monthKey] || { month: monthKey, total: 0 };
      acc[monthKey].total += curr.total;
      return acc;
    }, {})
  );

  // Stats cards
  const todayISO = new Date().toISOString().slice(0, 10);
  const totalToday = sales
    .filter((s) => s.date === todayISO)
    .reduce((acc, cur) => acc + cur.total, 0);
  const customersToday = new Set(
    sales.filter((s) => s.date === todayISO).map((s) => s.customerId)
  ).size;
  const newClients = dummyCustomers.length;
  const totalSales = sales.reduce((acc, cur) => acc + cur.total, 0);

  const stats = [
    {
      label: "Pendapatan Hari Ini",
      value: formatCurrency(totalToday),
      percent: "+0%",
      color: "green",
    },
    {
      label: "Pengguna Hari Ini",
      value: customersToday.toString(),
      percent: "+0%",
      color: "blue",
    },
    {
      label: "Klien Baru",
      value: newClients.toString(),
      percent: "+0%",
      color: "red",
    },
    {
      label: "Total Penjualan",
      value: formatCurrency(totalSales),
      percent: "+0%",
      color: "purple",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Penjualan</h1>

      <button
        onClick={() => {
          if (editSale) {
            cancelEdit();
          } else {
            setShowForm((prev) => !prev);
          }
        }}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {showForm
          ? editSale
            ? "Batal Edit"
            : "Batal Tambah Penjualan"
          : "Tambah Penjualan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border rounded bg-white shadow max-w-md">
          <div className="mb-2">
            <label className="block font-medium mb-1">Nomor Invoice</label>
            <input
              type="text"
              name="invoice"
              value={formData.invoice}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Misal: INV-003"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Pelanggan</label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- Pilih Pelanggan --</option>
              {dummyCustomers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">
              Total Penjualan (IDR)
            </label>
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Lunas">Lunas</option>
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Batal">Batal</option>
            </select>
          </div>
          <div>
            {editSale ? (
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
              >
                Simpan Perubahan
              </button>
            ) : (
              <button
                onClick={handleAddSale}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
              >
                Tambah Penjualan
              </button>
            )}
            <button
              onClick={() => {
                setShowForm(false);
                setEditSale(null);
                setFormData({
                  invoice: "",
                  customerId: "",
                  date: "",
                  total: "",
                  status: "Belum Lunas",
                });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded shadow bg-white flex flex-col items-center"
          >
            <div className="text-sm font-semibold mb-2 text-gray-600">
              {stat.label}
            </div>
            <div className={`text-xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </div>
            <div className={`text-sm text-${stat.color}-500`}>
              {stat.percent}
            </div>
          </div>
        ))}
      </div>

      {/* Grafik */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div
          className="bg-white p-4 rounded shadow flex-1"
          style={{ minHeight: 300 }}
        >
          <h2 className="font-semibold mb-3">Status Penjualan</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          className="bg-white p-4 rounded shadow flex-1"
          style={{ minHeight: 300 }}
        >
          <h2 className="font-semibold mb-3">
            Total Penjualan per Bulan
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Total Penjualan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border border-gray-300 px-3 py-2">Invoice</th>
              <th className="border border-gray-300 px-3 py-2">Pelanggan</th>
              <th className="border border-gray-300 px-3 py-2">Tanggal</th>
              <th className="border border-gray-300 px-3 py-2">Total</th>
              <th className="border border-gray-300 px-3 py-2">Status</th>
              <th className="border border-gray-300 px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Tidak ada data penjualan.
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    {sale.invoice}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {getCustomerName(sale.customerId)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {sale.date}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {formatCurrency(sale.total)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {sale.status === "Lunas" ? (
                      <span className="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Lunas
                      </span>
                    ) : sale.status === "Belum Lunas" ? (
                      <span className="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Belum Lunas
                      </span>
                    ) : (
                      <span className="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {sale.status}
                      </span>
                    )}
                  </td>

                  <td className="border border-gray-300 px-3 py-2 text-center space-x-3">
                    <button
                      onClick={() => startEdit(sale)}
                      title="Edit"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(sale.id)}
                      title="Hapus"
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
