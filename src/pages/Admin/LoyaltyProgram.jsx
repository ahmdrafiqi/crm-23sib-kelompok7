import React, { useState } from 'react';
import { 
  Gift, 
  Star, 
  TrendingUp, 
  Users,
  Award,
  Settings,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Sparkles,
  Heart,
  Crown,
  Trophy,
  Target,
  Zap,
  ShoppingBag,
  Calendar
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

const LoyaltyProgram = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTier, setSelectedTier] = useState('all');

  // Tier data
  const tiers = [
    {
      id: 'bronze',
      name: 'Bronze',
      icon: Award,
      color: '#cd7f32',
      bgColor: '#fef3c7',
      members: 8456,
      requirements: 'Belanja Rp 1Jt',
      benefits: [
        'Diskon 5% untuk semua produk',
        'Bonus ulang tahun 100 poin',
        'Gratis ongkir min. Rp 200rb',
        'Akses penjualan lebih awal'
      ],
      avgSpend: 1500000,
      retention: 65
    },
    {
      id: 'silver',
      name: 'Silver',
      icon: Star,
      color: '#6b7280',
      bgColor: '#f3f4f6',
      members: 3245,
      requirements: 'Belanja Rp 5Jt',
      benefits: [
        'Diskon 10% untuk semua produk',
        'Bonus ulang tahun 200 poin',
        'Gratis ongkir semua pesanan',
        'Acara eksklusif anggota',
        'Konsultasi kecantikan pribadi'
      ],
      avgSpend: 5800000,
      retention: 80
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: Crown,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      members: 1144,
      requirements: 'Belanja Rp 10Jt',
      benefits: [
        'Diskon 15% untuk semua produk',
        'Bonus ulang tahun 500 poin',
        'Gratis ongkir + prioritas',
        'Layanan pelanggan VIP',
        'Peluncuran produk eksklusif',
        'Sesi make over gratis'
      ],
      avgSpend: 12500000,
      retention: 95
    }
  ];

  // Points activity
  const recentActivity = [
    { id: 1, customer: 'Sarah Putri', action: 'Pembelian', points: '+250', tier: 'Gold', time: '2 jam lalu' },
    { id: 2, customer: 'Maya Anggraini', action: 'Referral', points: '+100', tier: 'Silver', time: '3 jam lalu' },
    { id: 3, customer: 'Dewi Kartika', action: 'Bonus Ulang Tahun', points: '+500', tier: 'Gold', time: '5 jam lalu' },
    { id: 4, customer: 'Linda Wijaya', action: 'Ulasan', points: '+50', tier: 'Bronze', time: '6 jam lalu' },
    { id: 5, customer: 'Rina Susanti', action: 'Ditukar', points: '-1000', tier: 'Silver', time: '8 jam lalu' }
  ];

  // Monthly growth
  const monthlyGrowth = [
    { month: 'Jan', bronze: 7800, silver: 2900, gold: 950 },
    { month: 'Feb', bronze: 8000, silver: 3000, gold: 1000 },
    { month: 'Mar', bronze: 8200, silver: 3100, gold: 1050 },
    { month: 'Apr', bronze: 8300, silver: 3150, gold: 1080 },
    { month: 'May', bronze: 8400, silver: 3200, gold: 1120 },
    { month: 'Jun', bronze: 8456, silver: 3245, gold: 1144 }
  ];

  // Points distribution
  const pointsData = [
    { range: '0-500', members: 2341 },
    { range: '501-1000', members: 3456 },
    { range: '1001-2500', members: 4123 },
    { range: '2501-5000', members: 2345 },
    { range: '5000+', members: 580 }
  ];

  // Redemption options
  const redemptions = [
    { id: 1, name: 'Voucher Rp 50rb', points: 500, redeemed: 1234, icon: Gift },
    { id: 2, name: 'Lipstik Gratis', points: 1000, redeemed: 892, icon: Heart },
    { id: 3, name: 'Perawatan Spa', points: 2500, redeemed: 456, icon: Sparkles },
    { id: 4, name: 'Set Hadiah Eksklusif', points: 5000, redeemed: 234, icon: Trophy }
  ];

  const totalMembers = tiers.reduce((sum, tier) => sum + tier.members, 0);
  const totalPointsIssued = 45670000;
  const totalPointsRedeemed = 23450000;

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Program Loyalitas</h1>
        <p className="text-gray-600">Kelola program hadiah dan manfaat anggota Miss Glam</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Anggota</p>
            <Users className="w-5 h-5 text-pink-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalMembers.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-1">+15% dari bulan lalu</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Poin Dikeluarkan</p>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{(totalPointsIssued / 1000000).toFixed(1)}Jt</p>
          <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Poin Ditukar</p>
            <Gift className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{(totalPointsRedeemed / 1000000).toFixed(1)}Jt</p>
          <p className="text-xs text-gray-500 mt-1">Tingkat penukaran 51%</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Tingkat Aktivitas</p>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">78%</p>
          <p className="text-xs text-green-600 mt-1">+5% dari bulan lalu</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <div className="flex">
            {['Ringkasan', 'Tingkatan', 'Hadiah', 'Aktivitas'].map((tabLabel, index) => {
              const tabIds = ['overview', 'tiers', 'rewards', 'activity'];
              const tab = tabIds[index];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'text-pink-600 border-pink-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Member Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Anggota berdasarkan Tingkat</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={tiers}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="members"
                        nameKey="name"
                      >
                        {tiers.map((tier, index) => (
                          <Cell key={`cell-${index}`} fill={tier.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    {tiers.map((tier) => (
                      <div key={tier.id} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tier.color }} />
                        <span className="text-sm text-gray-600">{tier.name}: {tier.members.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Tren Pertumbuhan Anggota</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="bronze" stackId="1" stroke="#cd7f32" fill="#cd7f32" />
                      <Area type="monotone" dataKey="silver" stackId="1" stroke="#6b7280" fill="#6b7280" />
                      <Area type="monotone" dataKey="gold" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Points Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Saldo Poin</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={pointsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="members" fill="#ec4899" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'tiers' && (
            <div className="space-y-6">
              {/* Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <div key={tier.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-pink-300 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg" style={{ backgroundColor: tier.bgColor }}>
                            <Icon className="w-6 h-6" style={{ color: tier.color }} />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-semibold text-gray-800">{tier.name}</h3>
                            <p className="text-sm text-gray-600">{tier.members.toLocaleString()} anggota</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Persyaratan</p>
                        <p className="text-sm text-gray-600">{tier.requirements}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Manfaat</p>
                        <ul className="space-y-1">
                          {tier.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start">
                              <ChevronRight className="w-3 h-3 text-gray-400 mr-1 mt-0.5" />
                              {benefit}
                            </li>
                          ))}
                          {tier.benefits.length > 3 && (
                            <li className="text-xs text-pink-600">+{tier.benefits.length - 3} manfaat lainnya</li>
                          )}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500">Rata-rata Pembelanjaan</p>
                          <p className="text-sm font-semibold text-gray-800">
                            Rp {(tier.avgSpend / 1000000).toFixed(1)}Jt
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Retensi</p>
                          <p className="text-sm font-semibold text-gray-800">{tier.retention}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Configure Button */}
              <div className="flex justify-center">
                <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Konfigurasi Pengaturan Tingkat
                </button>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-6">
              {/* Add Reward Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Katalog Penukaran</h3>
                <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Tambah Hadiah
                </button>
              </div>

              {/* Rewards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {redemptions.map((reward) => {
                  const Icon = reward.icon;
                  return (
                    <div key={reward.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-3 bg-pink-100 rounded-lg mr-3">
                            <Icon className="w-6 h-6 text-pink-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{reward.name}</h4>
                            <p className="text-sm text-gray-600">{reward.points} poin</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Ditukar: <span className="font-medium text-gray-700">{reward.redeemed}x</span>
                        </p>
                        <button className="text-pink-600 text-sm font-medium hover:text-pink-700">
                          Lihat Detail →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Poin Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tindakan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poin</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tingkat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentActivity.map((activity) => (
                      <tr key={activity.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                              {activity.customer.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-900">{activity.customer}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.action}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            activity.points.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {activity.points}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            activity.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                            activity.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {activity.tier}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LoyaltyProgram;