import React, { useState } from "react";

const initialPromos = [
  {
    id: 1,
    code: "SAVE20",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    usedCount: 12,
  },
  {
    id: 2,
    code: "FREESHIP",
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    usedCount: 5,
  },
];

export default function MemberSystemPromo() {
  const [promos, setPromos] = useState(initialPromos);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPromo = () => {
    const { code, startDate, endDate } = formData;

    if (!code.trim() || !startDate || !endDate) {
      alert("Semua field harus diisi!");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("Tanggal akhir harus lebih besar dari tanggal mulai!");
      return;
    }

    if (promos.some((promo) => promo.code.toUpperCase() === code.toUpperCase())) {
      alert("Kode promo sudah ada, gunakan kode lain.");
      return;
    }

    const newPromo = {
      id: promos.length + 1,
      code: code.toUpperCase(),
      startDate,
      endDate,
      usedCount: 0,
    };

    setPromos((prev) => [...prev, newPromo]);
    setFormData({ code: "", startDate: "", endDate: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus promo ini?")) {
      setPromos(promos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Manajemen Promo</h1>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        {showForm ? "Batal Tambah Promo" : "Tambah Promo"}
      </button>

      <div className="p-6 bg-white rounded-xl shadow-md">
        {showForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Promo</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Misal: SAVE10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Berakhir</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <button
              onClick={handleAddPromo}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Simpan Promo
            </button>
          </div>
        )}

        <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Kode Promo</th>
                <th className="px-6 py-3 text-left font-semibold">Periode</th>
                <th className="px-6 py-3 text-center font-semibold">Digunakan</th>
                <th className="px-6 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {promos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Belum ada data promo
                  </td>
                </tr>
              ) : (
                promos.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-blue-600">{promo.code}</td>
                    <td className="px-6 py-3">
                      {promo.startDate} &rarr; {promo.endDate}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {promo.usedCount} kali
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
