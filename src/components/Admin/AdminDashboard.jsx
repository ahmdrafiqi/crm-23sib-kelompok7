import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Package,
  Mail,
  Star
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  // Data dummy untuk charts
  const revenueData = [
    { month: 'Jan', revenue: 45000000 },
    { month: 'Feb', revenue: 52000000 },
    { month: 'Mar', revenue: 48000000 },
    { month: 'Apr', revenue: 61000000 },
    { month: 'May', revenue: 58000000 },
    { month: 'Jun', revenue: 67000000 },
  ];

  const customerSegmentData = [
    { name: 'New Customer', value: 35, color: '#ec4899' },
    { name: 'Loyal Customer', value: 40, color: '#f97316' },
    { name: 'VIP Customer', value: 20, color: '#a855f7' },
    { name: 'Dormant', value: 5, color: '#6b7280' },
  ];

  const topProducts = [
    { name: 'Glam Matte Lipstick', sales: 1234, revenue: 24680000 },
    { name: 'Dewy Foundation', sales: 987, revenue: 29610000 },
    { name: 'Eye Shadow Palette', sales: 856, revenue: 42800000 },
    { name: 'Face Serum Vitamin C', sales: 743, revenue: 37150000 },
  ];

  const recentActivities = [
    { id: 1, type: 'order', message: 'New order #1234 from Sarah', time: '5 min ago', icon: ShoppingBag },
    { id: 2, type: 'customer', message: 'New VIP customer registered', time: '15 min ago', icon: Star },
    { id: 3, type: 'campaign', message: 'Email campaign sent to 500 customers', time: '1 hour ago', icon: Mail },
    { id: 4, type: 'product', message: 'Low stock alert: Glam Matte Lipstick', time: '2 hours ago', icon: Package },
  ];

  const summaryCards = [
    {
      title: 'Total Customers',
      value: '12,845',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50'
    },
    {
      title: 'Total Revenue',
      value: 'Rp 67M',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50'
    },
    {
      title: 'Total Orders',
      value: '3,567',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50'
    },
    {
      title: 'Avg Order Value',
      value: 'Rp 245K',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50'
    },
  ];

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with Miss Glam today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                  <div className="flex items-center mt-2">
                    {card.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ml-1 ${
                      card.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${card.lightColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `${value/1000000}M`} />
              <Tooltip 
                formatter={(value) => `Rp ${(value/1000000).toFixed(1)}M`}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#ec4899" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segment Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerSegmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {customerSegmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {customerSegmentData.map((segment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: segment.color }} />
                  <span className="text-sm text-gray-600">{segment.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{segment.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-pink-600">Rp {(product.revenue/1000000).toFixed(1)}M</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'order' ? 'bg-blue-50' :
                    activity.type === 'customer' ? 'bg-purple-50' :
                    activity.type === 'campaign' ? 'bg-pink-50' :
                    'bg-orange-50'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      activity.type === 'order' ? 'text-blue-600' :
                      activity.type === 'customer' ? 'text-purple-600' :
                      activity.type === 'campaign' ? 'text-pink-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;