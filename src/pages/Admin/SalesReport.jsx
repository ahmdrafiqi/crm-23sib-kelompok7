import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Filter,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  PieChart as PieChartIcon,
  FileText,
  Printer
} from 'lucide-react';
import {
  LineChart,
  Line,
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
  Legend
} from 'recharts';

const SalesReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Sales overview data
  const salesData = [
    { date: '1 Jun', revenue: 4500000, orders: 45, avgOrder: 100000 },
    { date: '5 Jun', revenue: 5200000, orders: 52, avgOrder: 100000 },
    { date: '10 Jun', revenue: 4800000, orders: 48, avgOrder: 100000 },
    { date: '15 Jun', revenue: 6100000, orders: 58, avgOrder: 105000 },
    { date: '20 Jun', revenue: 5800000, orders: 55, avgOrder: 105000 },
    { date: '25 Jun', revenue: 6700000, orders: 62, avgOrder: 108000 },
    { date: '30 Jun', revenue: 7200000, orders: 68, avgOrder: 106000 }
  ];

  // Category performance
  const categoryData = [
    { name: 'Makeup', revenue: 28500000, percentage: 45, growth: 12 },
    { name: 'Skincare', revenue: 22000000, percentage: 35, growth: 18 },
    { name: 'Bodycare', revenue: 12500000, percentage: 20, growth: -5 }
  ];

  // Top products
  const topProducts = [
    { name: 'Glam Matte Lipstick', units: 1234, revenue: 24680000, growth: 15 },
    { name: 'Dewy Foundation', units: 987, revenue: 29610000, growth: 8 },
    { name: 'Eye Shadow Palette', units: 856, revenue: 42800000, growth: 22 },
    { name: 'Vitamin C Serum', units: 743, revenue: 37150000, growth: -3 },
    { name: 'Hydrating Face Mask', units: 2341, revenue: 10534500, growth: 45 }
  ];

  // Payment methods
  const paymentMethods = [
    { method: 'Credit Card', count: 1523, amount: 45690000, color: '#ec4899' },
    { method: 'Bank Transfer', count: 892, amount: 32180000, color: '#a855f7' },
    { method: 'E-Wallet', count: 756, amount: 18900000, color: '#3b82f6' },
    { method: 'COD', count: 396, amount: 7920000, color: '#f59e0b' }
  ];

  // Calculate totals
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const growthRate = 15.3; // Dummy growth rate

  const reports = [
    { id: 'overview', name: 'Sales Overview', icon: BarChart3 },
    { id: 'products', name: 'Product Performance', icon: Package },
    { id: 'categories', name: 'Category Analysis', icon: PieChartIcon },
    { id: 'customers', name: 'Customer Analysis', icon: Users },
    { id: 'payments', name: 'Payment Methods', icon: DollarSign }
  ];

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Reports</h1>
        <p className="text-gray-600">Comprehensive sales analytics and performance metrics</p>
      </div>

      {/* Period Selector & Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Period Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['week', 'month', 'quarter', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-white text-pink-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>June 1 - June 30, 2024</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            Rp {(totalRevenue / 1000000).toFixed(1)}M
          </p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500">+{growthRate}%</span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Orders</p>
            <ShoppingBag className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500">+12%</span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Order Value</p>
            <BarChart3 className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            Rp {Math.round(avgOrderValue / 1000)}K
          </p>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-500">-2.1%</span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Conversion Rate</p>
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">3.8%</p>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500">+0.5%</span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`px-6 py-3 flex items-center gap-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    selectedReport === report.id
                      ? 'text-pink-600 border-pink-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {report.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6">
          {selectedReport === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `${value/1000000}M`} />
                  <Tooltip formatter={(value) => `Rp ${(value/1000000).toFixed(1)}M`} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#ec4899" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedReport === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="revenue"
                      nameKey="name"
                    >
                      <Cell fill="#ec4899" />
                      <Cell fill="#a855f7" />
                      <Cell fill="#3b82f6" />
                    </Pie>
                    <Tooltip formatter={(value) => `Rp ${(value/1000000).toFixed(1)}M`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Performance</h3>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">{category.name}</h4>
                        <span className={`text-sm font-medium flex items-center ${
                          category.growth > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {category.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {Math.abs(category.growth)}%
                        </span>
                      </div>
                      <p className="text-xl font-semibold text-gray-900">
                        Rp {(category.revenue / 1000000).toFixed(1)}M
                      </p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{category.percentage}% of total revenue</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'products' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units Sold</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topProducts.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{product.units.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          Rp {(product.revenue / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium flex items-center ${
                            product.growth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {Math.abs(product.growth)}%
                          </span>
                        </td>
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

export default SalesReports;