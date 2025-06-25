import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';
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
  Legend
} from 'recharts';

const CustomerSegmentation = () => {
  const [activeSegment, setActiveSegment] = useState('all');

  // Segment data
  const segments = [
    {
      id: 'vip',
      name: 'VIP Customer',
      count: 2568,
      percentage: 20,
      avgSpend: 15500000,
      avgOrders: 45,
      retention: 95,
      color: '#a855f7',
      criteria: [
        'Total spending > Rp 10M',
        'Order frequency > 10/year',
        'Member for > 1 year'
      ],
      characteristics: [
        'High lifetime value',
        'Brand advocates',
        'Early adopters of new products',
        'Low price sensitivity'
      ]
    },
    {
      id: 'loyal',
      name: 'Loyal Customer',
      count: 5136,
      percentage: 40,
      avgSpend: 5200000,
      avgOrders: 18,
      retention: 85,
      color: '#ec4899',
      criteria: [
        'Total spending Rp 3M - 10M',
        'Order frequency 5-10/year',
        'Active in last 6 months'
      ],
      characteristics: [
        'Regular purchasers',
        'Responsive to promotions',
        'Good referral source',
        'Moderate price sensitivity'
      ]
    },
    {
      id: 'new',
      name: 'New Customer',
      count: 4492,
      percentage: 35,
      avgSpend: 750000,
      avgOrders: 2,
      retention: 60,
      color: '#3b82f6',
      criteria: [
        'Joined < 3 months ago',
        'Orders < 3',
        'Still exploring products'
      ],
      characteristics: [
        'High growth potential',
        'Need nurturing',
        'Price conscious',
        'Testing brand experience'
      ]
    },
    {
      id: 'dormant',
      name: 'Dormant Customer',
      count: 641,
      percentage: 5,
      avgSpend: 2300000,
      avgOrders: 8,
      retention: 20,
      color: '#6b7280',
      criteria: [
        'No purchase > 6 months',
        'Previous regular buyer',
        'Not responding to campaigns'
      ],
      characteristics: [
        'At risk of churn',
        'Need reactivation',
        'May have switched brands',
        'Require special attention'
      ]
    }
  ];

  // Monthly trend data
  const monthlyTrend = [
    { month: 'Jan', vip: 2200, loyal: 4800, new: 3500, dormant: 500 },
    { month: 'Feb', vip: 2300, loyal: 4900, new: 3800, dormant: 520 },
    { month: 'Mar', vip: 2400, loyal: 5000, new: 4000, dormant: 540 },
    { month: 'Apr', vip: 2450, loyal: 5050, new: 4200, dormant: 580 },
    { month: 'May', vip: 2500, loyal: 5100, new: 4400, dormant: 600 },
    { month: 'Jun', vip: 2568, loyal: 5136, new: 4492, dormant: 641 }
  ];

  // Behavior patterns
  const behaviorData = [
    { behavior: 'Email Opens', vip: 85, loyal: 65, new: 45, dormant: 15 },
    { behavior: 'Promo Usage', vip: 60, loyal: 80, new: 90, dormant: 30 },
    { behavior: 'Reviews', vip: 70, loyal: 50, new: 20, dormant: 10 },
    { behavior: 'Referrals', vip: 90, loyal: 60, new: 25, dormant: 5 }
  ];

  const activeSegmentData = activeSegment === 'all' 
    ? segments 
    : segments.filter(s => s.id === activeSegment);

  const totalCustomers = segments.reduce((sum, s) => sum + s.count, 0);

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Segmentation</h1>
        <p className="text-gray-600">Analyze and manage customer segments for targeted marketing</p>
      </div>

      {/* Segment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {segments.map((segment) => (
          <div
            key={segment.id}
            onClick={() => setActiveSegment(segment.id)}
            className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md ${
              activeSegment === segment.id ? 'ring-2 ring-pink-500' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${segment.color}20` }}>
                {segment.id === 'vip' && <Star className="w-5 h-5" style={{ color: segment.color }} />}
                {segment.id === 'loyal' && <Users className="w-5 h-5" style={{ color: segment.color }} />}
                {segment.id === 'new' && <TrendingUp className="w-5 h-5" style={{ color: segment.color }} />}
                {segment.id === 'dormant' && <AlertCircle className="w-5 h-5" style={{ color: segment.color }} />}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full" 
                style={{ backgroundColor: `${segment.color}20`, color: segment.color }}>
                {segment.percentage}%
              </span>
            </div>
            <h3 className="font-semibold text-gray-800">{segment.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{segment.count.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Avg. Spend: Rp {(segment.avgSpend/1000000).toFixed(1)}M</p>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSegment('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSegment === 'all' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Segments
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Total: {totalCustomers.toLocaleString()} customers</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Segment Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Segment Distribution</h3>
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

        {/* Growth Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Segment Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="vip" stroke="#a855f7" strokeWidth={2} />
              <Line type="monotone" dataKey="loyal" stroke="#ec4899" strokeWidth={2} />
              <Line type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="dormant" stroke="#6b7280" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segment Details */}
      {activeSegment !== 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {activeSegmentData.map((segment) => (
            <React.Fragment key={segment.id}>
              {/* Criteria */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" style={{ color: segment.color }} />
                  Segment Criteria
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

              {/* Characteristics */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" style={{ color: segment.color }} />
                  Characteristics
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

              {/* Key Metrics */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Avg. Spend</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      Rp {(segment.avgSpend/1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <ShoppingBag className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Avg. Orders</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{segment.avgOrders}/year</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Retention</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{segment.retention}%</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Behavior Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Behavior by Segment</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={behaviorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="behavior" />
            <YAxis label={{ value: 'Engagement %', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="vip" fill="#a855f7" />
            <Bar dataKey="loyal" fill="#ec4899" />
            <Bar dataKey="new" fill="#3b82f6" />
            <Bar dataKey="dormant" fill="#6b7280" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recommended Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VIP Actions */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-purple-600" />
            VIP Customer Actions
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Exclusive Preview Access</h4>
              <p className="text-sm text-gray-600">Give early access to new collections and limited editions</p>
              <button className="mt-2 text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center">
                Create Campaign <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Personal Beauty Consultant</h4>
              <p className="text-sm text-gray-600">Assign dedicated beauty advisors for personalized service</p>
              <button className="mt-2 text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center">
                Set Up Program <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Dormant Actions */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-gray-600" />
            Dormant Customer Actions
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Win-Back Campaign</h4>
              <p className="text-sm text-gray-600">Send special "We Miss You" offer with 30% discount</p>
              <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                Launch Campaign <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Feedback Survey</h4>
              <p className="text-sm text-gray-600">Understand why they stopped purchasing</p>
              <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                Send Survey <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerSegmentation;