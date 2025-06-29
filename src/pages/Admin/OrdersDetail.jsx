import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import {
  Search,
  ChevronLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const { id_transaksi } = useParams(); // Ambil id dari URL
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from("detail_transaksi")
        .select(`
          id_detail,
          id_transaksi,
          id_produk,
          kuantitas,
          harga_satuan,
          subtotal,
          produk ( nama_produk )
        `)
        .eq("id_transaksi", id_transaksi); // Filter: hanya transaksi ini

      if (error) {
        console.error("Gagal ambil detail:", error);
      } else {
        setDetails(data);
      }
    };

    fetchDetails();
  }, [id_transaksi]);

  const filteredDetails = details.filter((d) =>
    d.id_produk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalQty = details.reduce((sum, d) => sum + d.kuantitas, 0);
  const totalAmount = details.reduce((sum, d) => sum + d.subtotal, 0);

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Detail Transaksi #{id_transaksi}
          </h1>
          <p className="text-gray-600">Rincian produk dalam transaksi ini</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
          <p className="text-sm text-gray-600">Jumlah Item</p>
          <p className="text-2xl font-bold text-gray-800">{totalQty}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500 shadow-sm">
          <p className="text-sm text-gray-600">Total Harga</p>
          <p className="text-2xl font-bold text-pink-600">
            Rp {totalAmount.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
          <p className="text-sm text-gray-600">Total Produk</p>
          <p className="text-2xl font-bold text-green-600">{details.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari ID Produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">ID Detail</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Nama Produk</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Harga Satuan</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDetails.map((item) => (
                <tr key={item.id_detail} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id_detail}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.produk?.nama_produk || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.kuantitas}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Rp {item.harga_satuan.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-pink-600">Rp {item.subtotal.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default OrderDetail;
