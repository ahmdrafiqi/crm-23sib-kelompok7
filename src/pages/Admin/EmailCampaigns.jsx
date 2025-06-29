import React, { useState } from 'react';
import { 
  Search, 
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Mail,
  Eye,
  Edit,
  Copy,
  Trash2,
  BarChart3,
  Calendar
} from 'lucide-react';

const EmailCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy campaign data
  const campaigns = [
    {
      id: 1,
      name: 'Diskon Musim Panas 2024',
      subject: '☀️ Diskon Musim Panas Heboh - Diskon Hingga 50%!',
      status: 'sent',
      sentDate: '2024-06-20 10:00',
      recipients: 5280,
      opened: 2112,
      clicked: 634,
      converted: 127,
      revenue: 4575000
    },
    {
      id: 2,
      name: 'Peluncuran Produk Baru - Glow Serum',
      subject: '✨ Memperkenalkan Serum Vitamin C Glow Terbaru Kami',
      status: 'scheduled',
      sentDate: '2024-06-25 09:00',
      recipients: 3500,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0
    },
    {
      id: 3,
      name: 'Eksklusif Anggota VIP',
      subject: '👑 Penawaran Eksklusif untuk Anggota VIP Kami',
      status: 'draft',
      sentDate: null,
      recipients: 1200,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0
    },
    {
      id: 4,
      name: 'Kampanye Ulang Tahun - Juni',
      subject: '🎂 Selamat Ulang Tahun! Ini Hadiah Spesialmu',
      status: 'sent',
      sentDate: '2024-06-01 08:00',
      recipients: 456,
      opened: 380,
      clicked: 245,
      converted: 98,
      revenue: 2450000
    },
    {
      id: 5,
      name: 'Pengingat Keranjang Terbengkalai',
      subject: '🛒 Anda meninggalkan sesuatu di keranjang Anda',
      status: 'active',
      sentDate: 'Otomatis',
      recipients: 892,
      opened: 445,
      clicked: 178,
      converted: 67,
      revenue: 1340000
    }
  ];

  const statusConfig = {
    draft: { color: 'bg-gray-100 text-gray-700', icon: Clock },
    scheduled: { color: 'bg-blue-100 text-blue-700', icon: Calendar },
    active: { color: 'bg-green-100 text-green-700', icon: Send },
    sent: { color: 'bg-purple-100 text-purple-700', icon: CheckCircle },
    cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'scheduled').length;
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipients, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kampanye Email</h1>
        <p className="text-gray-600">Buat dan kelola kampanye pemasaran email Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Kampanye</p>
              <p className="text-2xl font-bold text-gray-800">{totalCampaigns}</p>
              <p className="text-xs text-gray-500 mt-1">Sepanjang waktu</p>
            </div>
            <Mail className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kampanye Aktif</p>
              <p className="text-2xl font-bold text-green-600">{activeCampaigns}</p>
              <p className="text-xs text-gray-500 mt-1">Sedang berjalan</p>
            </div>
            <Send className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Penerima</p>
              <p className="text-2xl font-bold text-blue-600">{(totalRecipients / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendapatan Dihasilkan</p>
              <p className="text-2xl font-bold text-purple-600">Rp {(totalRevenue / 1000000).toFixed(1)}Jt</p>
              <p className="text-xs text-gray-500 mt-1">Dari kampanye</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
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
                placeholder="Cari kampanye..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">Semua Status</option>
              <option value="draft">Draf</option>
              <option value="scheduled">Terjadwal</option>
              <option value="active">Aktif</option>
              <option value="sent">Terkirim</option>
            </select>
          </div>

          {/* Create Campaign Button */}
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Buat Kampanye
          </button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kampanye
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Penerima
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performa
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pendapatan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => {
                const StatusIcon = statusConfig[campaign.status].icon;
                const openRate = campaign.recipients > 0 ? (campaign.opened / campaign.recipients * 100).toFixed(1) : 0;
                const clickRate = campaign.opened > 0 ? (campaign.clicked / campaign.opened * 100).toFixed(1) : 0;
                
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-xs text-gray-500">{campaign.subject}</p>
                        {campaign.sentDate && (
                          <p className="text-xs text-gray-400 mt-1">{campaign.sentDate}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${statusConfig[campaign.status].color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {
                          campaign.status === 'draft' ? 'Draf' :
                          campaign.status === 'scheduled' ? 'Terjadwal' :
                          campaign.status === 'active' ? 'Aktif' :
                          campaign.status === 'sent' ? 'Terkirim' :
                          'Dibatalkan' // default for 'cancelled' or any other unexpected status
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{campaign.recipients.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {campaign.status === 'sent' || campaign.status === 'active' ? (
                        <div className="space-y-1">
                          <div className="flex items-center text-xs">
                            <span className="text-gray-500 w-16">Dibuka:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2 mr-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${openRate}%` }}></div>
                            </div>
                            <span className="text-gray-700 font-medium">{openRate}%</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <span className="text-gray-500 w-16">Klik:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2 mr-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${clickRate}%` }}></div>
                            </div>
                            <span className="text-gray-700 font-medium">{clickRate}%</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {campaign.revenue > 0 ? (
                        <p className="text-sm font-medium text-green-600">
                          Rp {(campaign.revenue / 1000000).toFixed(1)}Jt
                        </p>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Lihat">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-800 transition-colors" title="Duplikat">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 transition-colors" title="Hapus">
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
      </div>
    </main>
  );
};

export default EmailCampaigns;