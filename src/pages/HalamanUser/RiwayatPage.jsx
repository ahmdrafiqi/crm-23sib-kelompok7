import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

const RiwayatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Simulasi data pesanan
  const sampleOrders = [
    {
      id: 'ORDER-1703001',
      userId: 1,
      items: [
        { productId: 1, productName: 'SKINTIFIC Aqua Light Sunscreen', quantity: 1, price: 74100 },
        { productId: 2, productName: 'Maybelline Liquid Lipstick', quantity: 2, price: 89000 }
      ],
      totalAmount: 252100,
      status: 'delivered',
      orderDate: '2024-01-15T10:30:00.000Z',
      deliveryDate: '2024-01-18T14:20:00.000Z'
    },
    {
      id: 'ORDER-1703002',
      userId: 1,
      items: [
        { productId: 3, productName: 'The Body Shop Body Lotion', quantity: 1, price: 159000 }
      ],
      totalAmount: 159000,
      status: 'shipping',
      orderDate: '2024-01-20T09:15:00.000Z',
      deliveryDate: null
    },
    {
      id: 'ORDER-1703003',
      userId: 1,
      items: [
        { productId: 4, productName: 'COSRX Snail Essence', quantity: 1, price: 185000 },
        { productId: 5, productName: 'Urban Decay Eyeshadow', quantity: 1, price: 650000 }
      ],
      totalAmount: 835000,
      status: 'processing',
      orderDate: '2024-01-22T16:45:00.000Z',
      deliveryDate: null
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'Semua Status', count: sampleOrders.length },
    { value: 'processing', label: 'Diproses', count: sampleOrders.filter(o => o.status === 'processing').length },
    { value: 'shipping', label: 'Dikirim', count: sampleOrders.filter(o => o.status === 'shipping').length },
    { value: 'delivered', label: 'Selesai', count: sampleOrders.filter(o => o.status === 'delivered').length },
    { value: 'cancelled', label: 'Dibatalkan', count: sampleOrders.filter(o => o.status === 'cancelled').length }
  ];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      // Filter orders berdasarkan user ID
      const userOrders = sampleOrders.filter(order => order.userId === userData.id);
      setOrders(userOrders);
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipping':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Sedang Diproses';
      case 'shipping':
        return 'Sedang Dikirim';
      case 'delivered':
        return 'Selesai';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipping':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  if (!currentUser) {
    return (
      <>
     
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Silakan Login</h3>
          <p className="text-gray-600 mb-6">Anda perlu login untuk melihat riwayat pesanan</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Kembali ke Home
          </button>
        </div>
      
      </>
    );
  }

  return (
    <>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Pesanan</h1>
          <p className="text-gray-600">Lihat semua pesanan Anda di sini</p>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Filter Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  selectedStatus === status.value
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-pink-300 text-gray-700'
               }`}
             >
               {status.label}
               <span className="block text-xs text-gray-500 mt-1">({status.count})</span>
             </button>
           ))}
         </div>
       </div>

       {/* Orders List */}
       <div className="space-y-6">
         {filteredOrders.length > 0 ? (
           filteredOrders.map((order) => (
             <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               {/* Order Header */}
               <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                 <div className="flex flex-col md:flex-row md:items-center justify-between">
                   <div className="flex items-center space-x-4 mb-2 md:mb-0">
                     <div>
                       <h3 className="font-semibold text-gray-900">{order.id}</h3>
                       <p className="text-sm text-gray-600">
                         Dipesan pada {formatDate(order.orderDate)}
                       </p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                       {getStatusIcon(order.status)}
                       <span>{getStatusText(order.status)}</span>
                     </div>
                     <div className="text-right">
                       <p className="font-semibold text-gray-900">
                         Total: Rp{formatPrice(order.totalAmount)}
                       </p>
                       {order.deliveryDate && (
                         <p className="text-sm text-gray-600">
                           Diterima: {formatDate(order.deliveryDate)}
                         </p>
                       )}
                     </div>
                   </div>
                 </div>
               </div>

               {/* Order Items */}
               <div className="p-6">
                 <div className="space-y-4">
                   {order.items.map((item, index) => (
                     <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                       <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                         <span className="text-2xl">💄</span>
                       </div>
                       <div className="flex-1">
                         <h4 className="font-medium text-gray-900">{item.productName}</h4>
                         <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                       </div>
                       <div className="text-right">
                         <p className="font-semibold text-gray-900">
                           Rp{formatPrice(item.price * item.quantity)}
                         </p>
                         <p className="text-sm text-gray-600">
                           @Rp{formatPrice(item.price)}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>

                 {/* Order Actions */}
                 <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                   <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                     <Eye className="w-4 h-4" />
                     <span>Detail Pesanan</span>
                   </button>
                   
                   {order.status === 'delivered' && (
                     <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                       <Package className="w-4 h-4" />
                       <span>Beli Lagi</span>
                     </button>
                   )}
                   
                   {order.status === 'processing' && (
                     <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                       <XCircle className="w-4 h-4" />
                       <span>Batalkan</span>
                     </button>
                   )}
                 </div>
               </div>
             </div>
           ))
         ) : (
           <div className="text-center py-16">
             <div className="text-gray-400 text-6xl mb-4">📦</div>
             <h3 className="text-xl font-semibold text-gray-900 mb-2">
               {selectedStatus === 'all' ? 'Belum ada pesanan' : `Tidak ada pesanan dengan status "${statusOptions.find(s => s.value === selectedStatus)?.label}"`}
             </h3>
             <p className="text-gray-600 mb-6">
               {selectedStatus === 'all' 
                 ? 'Mulai berbelanja untuk melihat riwayat pesanan Anda'
                 : 'Coba ganti filter status untuk melihat pesanan lainnya'
               }
             </p>
             <button 
               onClick={() => window.location.href = '/produk'}
               className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
             >
               {selectedStatus === 'all' ? 'Mulai Belanja' : 'Lihat Produk'}
             </button>
           </div>
         )}
       </div>

       {/* Statistics */}
       {orders.length > 0 && (
         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <div className="text-2xl font-bold text-pink-500 mb-2">{orders.length}</div>
             <div className="text-sm text-gray-600">Total Pesanan</div>
           </div>
           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <div className="text-2xl font-bold text-green-500 mb-2">
               {orders.filter(o => o.status === 'delivered').length}
             </div>
             <div className="text-sm text-gray-600">Pesanan Selesai</div>
           </div>
           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <div className="text-2xl font-bold text-blue-500 mb-2">
               {orders.filter(o => o.status === 'shipping').length}
             </div>
             <div className="text-sm text-gray-600">Sedang Dikirim</div>
           </div>
           <div className="bg-white rounded-xl p-6 text-center shadow-sm">
             <div className="text-2xl font-bold text-yellow-500 mb-2">
               {orders.filter(o => o.status === 'processing').length}
             </div>
             <div className="text-sm text-gray-600">Diproses</div>
           </div>
         </div>
       )}
 
   </>
 );
};

export default RiwayatPage;