import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  Bell,
  Clock,
  Users,
  Zap,
  Filter,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Star,
  MessageCircle,
  Smartphone,
  Globe, 
  Eye
} from 'lucide-react';
import {
  LineChart,
  Line,
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
  Area,
  AreaChart
} from 'recharts';

const Communications = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [showComposer, setShowComposer] = useState(false);

  // Channel stats
  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      bgColor: '#25D36620',
      sent: 15234,
      delivered: 14987,
      read: 14234,
      replied: 8234,
      active: true
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: Smartphone,
      color: '#3B82F6',
      bgColor: '#3B82F620',
      sent: 8456,
      delivered: 8234,
      read: 6234,
      replied: 1234,
      active: true
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: '#EC4899',
      bgColor: '#EC489920',
      sent: 23456,
      delivered: 22987,
      read: 15234,
      replied: 3456,
      active: true
    },
    {
      id: 'push',
      name: 'Push Notification',
      icon: Bell,
      color: '#F59E0B',
      bgColor: '#F59E0B20',
      sent: 5678,
      delivered: 5456,
      read: 4234,
      replied: 0,
      active: true
    }
  ];

  // Automation rules
  const automations = [
    {
      id: 1,
      name: 'Welcome Series',
      trigger: 'New Customer Registration',
      channel: 'WhatsApp',
      status: 'active',
      sent: 456,
      successRate: 92,
      messages: [
        { delay: '0 min', content: 'Welcome message + 10% discount' },
        { delay: '3 days', content: 'Beauty tips & product recommendations' },
        { delay: '7 days', content: 'Exclusive member benefits' }
      ]
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      trigger: 'Cart Abandoned > 2 hours',
      channel: 'SMS',
      status: 'active',
      sent: 234,
      successRate: 35,
      messages: [
        { delay: '2 hours', content: 'Cart reminder' },
        { delay: '24 hours', content: '10% discount offer' },
        { delay: '3 days', content: 'Last chance + free shipping' }
      ]
    },
    {
      id: 3,
      name: 'Birthday Celebration',
      trigger: 'Customer Birthday',
      channel: 'Email',
      status: 'active',
      sent: 128,
      successRate: 78,
      messages: [
        { delay: '0 days', content: 'Birthday wish + special voucher' }
      ]
    },
    {
      id: 4,
      name: 'Order Updates',
      trigger: 'Order Status Change',
      channel: 'WhatsApp',
      status: 'paused',
      sent: 3456,
      successRate: 95,
      messages: [
        { delay: '0 min', content: 'Order confirmation' },
        { delay: 'On shipping', content: 'Shipping notification + tracking' },
        { delay: 'On delivery', content: 'Delivery confirmation + review request' }
      ]
    }
  ];

  // Message templates
  const templates = [
    {
      id: 1,
      name: 'Flash Sale Alert',
      channel: 'WhatsApp',
      category: 'Promotion',
      content: 'Hi {name}! 🎉 Flash Sale happening NOW! Your favorite {product} is {discount}% OFF! Shop now: {link}',
      used: 1234,
      performance: 85
    },
    {
      id: 2,
      name: 'Order Confirmation',
      channel: 'SMS',
      category: 'Transactional',
      content: 'Order #{order_id} confirmed! Total: Rp {total}. Est. delivery: {date}. Track: {tracking_link}',
      used: 5678,
      performance: 98
    },
    {
      id: 3,
      name: 'VIP Exclusive',
      channel: 'Email',
      category: 'VIP',
      content: 'Exclusive for our VIP members! Get early access to our new collection...',
      used: 345,
      performance: 92
    }
  ];

  // Communication performance data
  const performanceData = [
    { time: '08:00', whatsapp: 85, sms: 72, email: 45, push: 65 },
    { time: '10:00', whatsapp: 92, sms: 78, email: 52, push: 70 },
    { time: '12:00', whatsapp: 95, sms: 82, email: 58, push: 75 },
    { time: '14:00', whatsapp: 88, sms: 75, email: 62, push: 72 },
    { time: '16:00', whatsapp: 90, sms: 80, email: 68, push: 78 },
    { time: '18:00', whatsapp: 93, sms: 85, email: 72, push: 82 },
    { time: '20:00', whatsapp: 96, sms: 88, email: 65, push: 85 }
  ];

  // Recent communications
  const recentComms = [
    { id: 1, customer: 'Sarah Putri', channel: 'WhatsApp', type: 'Flash Sale', status: 'read', time: '10 min ago', response: 'Interested' },
    { id: 2, customer: 'Maya Anggraini', channel: 'SMS', type: 'Order Update', status: 'delivered', time: '25 min ago', response: null },
    { id: 3, customer: 'Dewi Kartika', channel: 'Email', type: 'Birthday Wish', status: 'opened', time: '1 hour ago', response: 'Thanked' },
    { id: 4, customer: 'Linda Wijaya', channel: 'Push', type: 'New Arrival', status: 'sent', time: '2 hours ago', response: null }
  ];

  const totalSent = channels.reduce((sum, ch) => sum + ch.sent, 0);
  const totalDelivered = channels.reduce((sum, ch) => sum + ch.delivered, 0);
  const avgOpenRate = Math.round((channels.reduce((sum, ch) => sum + (ch.read / ch.sent * 100), 0) / channels.length));

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Communications</h1>
        <p className="text-gray-600">Manage multi-channel customer communications and automations</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Messages Sent</p>
            <Send className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{(totalSent / 1000).toFixed(1)}K</p>
          <p className="text-xs text-green-600 mt-1">+18% from last month</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Delivery Rate</p>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{Math.round(totalDelivered / totalSent * 100)}%</p>
          <p className="text-xs text-gray-500 mt-1">Industry avg: 95%</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Open Rate</p>
            <Eye className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{avgOpenRate}%</p>
          <p className="text-xs text-green-600 mt-1">+5% improvement</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Active Automations</p>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{automations.filter(a => a.status === 'active').length}</p>
          <p className="text-xs text-gray-500 mt-1">2 paused</p>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-xl shadow-sm mb-6 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Channel Performance</h3>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const openRate = Math.round(channel.read / channel.sent * 100);
            const responseRate = Math.round(channel.replied / channel.read * 100);
            
            return (
              <div key={channel.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: channel.bgColor }}>
                      <Icon className="w-5 h-5" style={{ color: channel.color }} />
                    </div>
                    <h4 className="ml-3 font-medium text-gray-800">{channel.name}</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={channel.active} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-500"></div>
                  </label>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sent</span>
                    <span className="font-medium">{channel.sent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Open Rate</span>
                    <span className="font-medium text-green-600">{openRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response</span>
                    <span className="font-medium text-blue-600">{responseRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Hourly Open Rate Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="whatsapp" stroke="#25D366" strokeWidth={2} />
              <Line type="monotone" dataKey="sms" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="email" stroke="#EC4899" strokeWidth={2} />
              <Line type="monotone" dataKey="push" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex">
            {['overview', 'automations', 'templates', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'text-pink-600 border-pink-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Communications</h3>
                <button 
                  onClick={() => setShowComposer(true)}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Message
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Response</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentComms.map((comm) => (
                      <tr key={comm.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                              {comm.customer.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-900">{comm.customer}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            comm.channel === 'WhatsApp' ? 'bg-green-100 text-green-700' :
                            comm.channel === 'SMS' ? 'bg-blue-100 text-blue-700' :
                            comm.channel === 'Email' ? 'bg-pink-100 text-pink-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {comm.channel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{comm.type}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center text-xs font-medium ${
                            comm.status === 'read' ? 'text-green-600' :
                            comm.status === 'opened' ? 'text-blue-600' :
                            comm.status === 'delivered' ? 'text-purple-600' :
                            'text-gray-600'
                          }`}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {comm.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {comm.response ? (
                            <span className="text-sm text-green-600">{comm.response}</span>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{comm.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'automations' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Automation Rules</h3>
                <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Automation
                </button>
              </div>

              <div className="space-y-4">
                {automations.map((automation) => (
                  <div key={automation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-800">{automation.name}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            automation.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {automation.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Trigger: {automation.trigger} • Channel: {automation.channel}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Messages Sent</p>
                        <p className="text-sm font-medium">{automation.sent}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Success Rate</p>
                        <p className="text-sm font-medium text-green-600">{automation.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Messages</p>
                        <p className="text-sm font-medium">{automation.messages.length} steps</p>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <p className="text-xs font-medium text-gray-700 mb-2">Message Flow:</p>
                      <div className="space-y-1">
                        {automation.messages.map((msg, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <Clock className="w-3 h-3 mr-2 text-gray-400" />
                            <span className="font-medium mr-2">{msg.delay}:</span>
                            <span>{msg.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Message Templates</h3>
                <div className="flex gap-2">
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option>All Channels</option>
                    <option>WhatsApp</option>
                    <option>SMS</option>
                    <option>Email</option>
                  </select>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Template
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{template.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{template.channel}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{template.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <p className="text-sm text-gray-700 font-mono">{template.content}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>Used: {template.used}x</span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {template.performance}% success
                        </span>
                      </div>
                      <button className="text-pink-600 text-xs font-medium hover:text-pink-700">
                        Use Template →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Compose Message</h3>
              <button onClick={() => setShowComposer(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                <div className="grid grid-cols-4 gap-2">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <button
                        key={channel.id}
                        className="p-3 border rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors flex flex-col items-center gap-2"
                      >
                        <Icon className="w-5 h-5" style={{ color: channel.color }} />
                        <span className="text-xs">{channel.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option>All Customers</option>
                  <option>VIP Customers</option>
                  <option>New Customers</option>
                  <option>Custom Segment...</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Type your message here..."
                />
                <div className="flex gap-2 mt-2">
                  <button className="text-xs text-gray-500 hover:text-gray-700">{`{name}`}</button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">{`{points}`}</button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">{`{last_product}`}</button>
                </div>
              </div>

              <div className="flex justify-between">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Save as Template
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowComposer(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Communications;