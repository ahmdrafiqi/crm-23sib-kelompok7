import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  ShoppingBag,
  Star,
  AlertCircle,
  Filter,
  Download,
  Settings,
  ChevronRight,
  DollarSign,
  Calendar,
  Target,
  Mail,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomerSegmentation = () => {
  const [activeSegment, setActiveSegment] = useState("all");

  const segments = [
    {
      id: "gold",
      name: "Pelanggan Gold",
      count: 2568,
      percentage: 20,
      avgSpend: 15500000,
      avgOrders: 45,
      retention: 95,
      color: "#facc15",
      criteria: [
        "Total pengeluaran > Rp 10 Jt",
        "Frekuensi pesanan > 10/tahun",
        "Anggota selama > 1 tahun",
      ],
      characteristics: [
        "Nilai seumur hidup tinggi",
        "Pendukung merek",
        "Adopter awal produk baru",
        "Sensitivitas harga rendah",
      ],
    },
    {
      id: "silver",
      name: "Pelanggan Silver",
      count: 5136,
      percentage: 40,
      avgSpend: 5200000,
      avgOrders: 18,
      retention: 85,
      color: "#9ca3af",
      criteria: [
        "Total pengeluaran Rp 3 Jt - 10 Jt",
        "Frekuensi pesanan 5–10/tahun",
        "Aktif dalam 6 bulan terakhir",
      ],
      characteristics: [
        "Pembeli rutin",
        "Responsif terhadap promosi",
        "Sumber referensi yang baik",
        "Sensitivitas harga sedang",
      ],
    },
    {
      id: "bronze",
      name: "Pelanggan Bronze",
      count: 4492,
      percentage: 35,
      avgSpend: 750000,
      avgOrders: 2,
      retention: 60,
      color: "#b45309",
      criteria: [
        "Total pengeluaran < Rp 3 Jt",
        "Pesanan < 5/tahun",
        "Baru mulai berinteraksi",
      ],
      characteristics: [
        "Potensi pertumbuhan tinggi",
        "Perlu dibina",
        "Sadar harga",
        "Mencoba pengalaman merek",
      ],
    },
    {
      id: "inactive",
      name: "Pelanggan Tidak Aktif",
      count: 641,
      percentage: 5,
      avgSpend: 2300000,
      avgOrders: 8,
      retention: 20,
      color: "#6b7280",
      criteria: [
        "Tidak ada pembelian > 6 bulan",
        "Pembeli reguler sebelumnya",
        "Tidak merespons kampanye",
      ],
      characteristics: [
        "Berisiko churn",
        "Perlu reaktivasi",
        "Mungkin sudah beralih merek",
        "Membutuhkan perhatian khusus",
      ],
    },
  ];

  // Monthly trend data
  const monthlyTrend = [
    { month: "Jan", gold: 2200, silver: 4800, bronze: 3500, inactive: 500 },
    { month: "Feb", gold: 2300, silver: 4900, bronze: 3800, inactive: 520 },
    { month: "Mar", gold: 2400, silver: 5000, bronze: 4000, inactive: 540 },
    { month: "Apr", gold: 2450, silver: 5050, bronze: 4200, inactive: 580 },
    { month: "May", gold: 2500, silver: 5100, bronze: 4400, inactive: 600 },
    { month: "Jun", gold: 2568, silver: 5136, bronze: 4492, inactive: 641 },
  ];

  // Behavior patterns
  const behaviorData = [
    { behavior: "Buka Email", gold: 85, silver: 65, bronze: 45, inactive: 15 },
    {
      behavior: "Penggunaan Promo",
      gold: 60,
      silver: 80,
      bronze: 90,
      inactive: 30,
    },
    { behavior: "Ulasan", gold: 70, silver: 50, bronze: 20, inactive: 10 },
    { behavior: "Referral", gold: 90, silver: 60, bronze: 25, inactive: 5 },
  ];

  const activeSegmentData =
    activeSegment === "all"
      ? segments
      : segments.filter((s) => s.id === activeSegment);

  const totalCustomers = segments.reduce((sum, s) => sum + s.count, 0);

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Segmentasi Pelanggan
        </h1>
        <p className="text-gray-600">
          Analisis dan kelola segmen pelanggan untuk pemasaran yang bertarget
        </p>
      </div>

      {/* Segment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {segments.map((segment) => (
          <div
            key={segment.id}
            onClick={() => setActiveSegment(segment.id)}
            className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md ${
              activeSegment === segment.id ? "ring-2 ring-pink-500" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${segment.color}20` }}
              >
                {segment.id === "vip" && (
                  <Star className="w-5 h-5" style={{ color: segment.color }} />
                )}
                {segment.id === "loyal" && (
                  <Users className="w-5 h-5" style={{ color: segment.color }} />
                )}
                {segment.id === "new" && (
                  <TrendingUp
                    className="w-5 h-5"
                    style={{ color: segment.color }}
                  />
                )}
                {segment.id === "dormant" && (
                  <AlertCircle
                    className="w-5 h-5"
                    style={{ color: segment.color }}
                  />
                )}
              </div>
              <span
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${segment.color}20`,
                  color: segment.color,
                }}
              >
                {segment.percentage}%
              </span>
            </div>
            <h3 className="font-semibold text-gray-800">{segment.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {segment.count.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Rata-rata Pengeluaran: Rp{" "}
              {(segment.avgSpend / 1000000).toFixed(1)} Jt
            </p>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSegment("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSegment === "all"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Semua Segmen
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Total: {totalCustomers.toLocaleString()} pelanggan</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Konfigurasi
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Ekspor
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Segment Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribusi Segmen
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="count"
                nameKey="name"
              >
                {segments.map((segment, index) => (
                  <Cell key={`cell-${index}`} fill={segment.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tren Pertumbuhan Segmen */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tren Pertumbuhan Segmen
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="gold"
                stroke="#facc15"
                strokeWidth={2}
                name="Pelanggan Gold"
              />
              <Line
                type="monotone"
                dataKey="silver"
                stroke="#9ca3af"
                strokeWidth={2}
                name="Pelanggan Silver"
              />
              <Line
                type="monotone"
                dataKey="bronze"
                stroke="#b45309"
                strokeWidth={2}
                name="Pelanggan Bronze"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detail Segmentasi */}
      {activeSegment !== "all" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {activeSegmentData.map((segment) => (
            <React.Fragment key={segment.id}>
              {/* Kriteria */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Target
                    className="w-5 h-5 mr-2"
                    style={{ color: segment.color }}
                  />
                  Kriteria Segmen
                </h3>
                <ul className="space-y-2">
                  {segment.criteria.map((criterion, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-700">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Karakteristik */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users
                    className="w-5 h-5 mr-2"
                    style={{ color: segment.color }}
                  />
                  Karakteristik
                </h3>
                <ul className="space-y-2">
                  {segment.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrik Utama */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Metrik Utama
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Rata-rata Pengeluaran
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      Rp {(segment.avgSpend / 1000000).toFixed(1)} Jt
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <ShoppingBag className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Rata-rata Pesanan
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {segment.avgOrders}/tahun
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Retensi</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {segment.retention}%
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Analisis Perilaku */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Perilaku Pelanggan Berdasarkan Segmen
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={behaviorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="behavior" />
            <YAxis
              label={{
                value: "Persentase Keterlibatan",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="gold" fill="#facc15" name="Pelanggan Gold" />
            <Bar dataKey="silver" fill="#9ca3af" name="Pelanggan Silver" />
            <Bar dataKey="bronze" fill="#b45309" name="Pelanggan Bronze" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recommended Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VIP Actions */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-purple-600" />
            Tindakan untuk Pelanggan VIP
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">
                Akses Pratinjau Eksklusif
              </h4>
              <p className="text-sm text-gray-600">
                Berikan akses awal ke koleksi baru dan edisi terbatas
              </p>
              <button className="mt-2 text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center">
                Buat Kampanye <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">
                Konsultan Kecantikan Pribadi
              </h4>
              <p className="text-sm text-gray-600">
                Tetapkan penasihat kecantikan khusus untuk layanan personal
              </p>
              <button className="mt-2 text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center">
                Atur Program <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Dormant Actions */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-gray-600" />
            Tindakan untuk Pelanggan Tidak Aktif
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">
                Kampanye Penarikan Kembali
              </h4>
              <p className="text-sm text-gray-600">
                Kirim penawaran khusus "Kami Merindukan Anda" dengan diskon 30%
              </p>
              <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                Luncurkan Kampanye <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">
                Survei Umpan Balik
              </h4>
              <p className="text-sm text-gray-600">
                Pahami mengapa mereka berhenti membeli
              </p>
              <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                Kirim Survei <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerSegmentation;
