import React, { useState, useEffect } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Heart,
  Star,
  ShoppingBag,
} from "lucide-react";

const RiwayatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Simulasi data produk favorit
  const sampleFavorites = [
    {
      id: 1,
      name: "SKINTIFIC Aqua Light Sunscreen SPF 50",
      price: 74100,
      originalPrice: 89000,
      discount: 18,
      rating: 4.8,
      reviews: 1250,
      image: "/assets/gambarUser/skintific.png",
      category: "Skincare",
      brand: "SKINTIFIC",
    },
    {
      id: 2,
      name: "Maybelline SuperStay Matte Ink Liquid Lipstick",
      price: 89000,
      originalPrice: 120000,
      discount: 26,
      rating: 4.6,
      reviews: 890,
      image:
        "/assets/gambarUser/Maybelline_SuperStay_Matte_Ink_Liquid_Lipstick.png",
      category: "Makeup",
      brand: "Maybelline",
    },
    {
      id: 3,
      name: "COSRX Advanced Snail 96 Mucin Power Essence",
      price: 185000,
      originalPrice: 210000,
      discount: 12,
      rating: 4.9,
      reviews: 2100,
      image:
        "/assets/gambarUser/COSRX_Advanced_Snail_96_Mucin_Power_Essence.jpeg",
      category: "Skincare",
      brand: "COSRX",
    },
    {
      id: 4,
      name: "Urban Decay Naked Heat Eyeshadow Palette",
      price: 650000,
      originalPrice: 750000,
      discount: 13,
      rating: 4.7,
      reviews: 456,
      image: "/assets/gambarUser/Urban_Decay_Naked_Heat_Eyeshadow_Palette.jpeg",
      category: "Makeup",
      brand: "Urban Decay",
    },
  ];

  const sampleOrders = [
    {
      id: "ORDER-1703001",
      userId: 1,
      items: [
        {
          productId: 1,
          productName: "SKINTIFIC Aqua Light Sunscreen SPF 50",
          quantity: 1,
          price: 74100,
          image:
            "/assets/gambarUser/SKINTIFIC_Aqua_Light_Daily_Sunscreen_SPF_35.jpeg",
        },
        {
          productId: 2,
          productName: "Maybelline SuperStay Matte Ink Liquid Lipstick",
          quantity: 2,
          price: 89000,
          image:
            "/assets/gambarUser/Maybelline_SuperStay_Matte_Ink_Liquid_Lipstick.png",
        },
      ],
      totalAmount: 252100,
      status: "delivered",
      orderDate: "2024-01-15T10:30:00.000Z",
      deliveryDate: "2024-01-18T14:20:00.000Z",
      shippingMethod: "Regular",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORDER-1703002",
      userId: 1,
      items: [
        {
          productId: 3,
          productName: "The Body Shop British Rose Body Lotion",
          quantity: 1,
          price: 159000,
          image:
            "/assets/gambarUser/The_Body_Shop_British_Rose_Body_Lotion.jpeg",
        },
        {
          productId: 4,
          productName: "Cetaphil Gentle Skin Cleanser",
          quantity: 1,
          price: 125000,
          image: "/assets/gambarUser/Cetaphil_Gentle_Skin_Cleanser.jpeg",
        },
      ],
      totalAmount: 284000,
      status: "shipping",
      orderDate: "2024-01-20T09:15:00.000Z",
      deliveryDate: null,
      shippingMethod: "Express",
      paymentMethod: "Bank Transfer",
      trackingNumber: "JNE12345678",
    },
    {
      id: "ORDER-1703003",
      userId: 1,
      items: [
        {
          productId: 5,
          productName: "COSRX Advanced Snail 96 Mucin Power Essence",
          quantity: 1,
          price: 185000,
          image:
            "/assets/gambarUser/COSRX_Advanced_Snail_96_Mucin_Power_Essence.jpeg",
        },
        {
          productId: 6,
          productName: "Urban Decay Naked Heat Eyeshadow Palette",
          quantity: 1,
          price: 650000,
          image:
            "/assets/gambarUser/Urban_Decay_Naked_Heat_Eyeshadow_Palette.jpeg",
        },
      ],
      totalAmount: 835000,
      status: "processing",
      orderDate: "2024-01-22T16:45:00.000Z",
      deliveryDate: null,
      shippingMethod: "Regular",
      paymentMethod: "E-Wallet",
    },
    {
      id: "ORDER-1703004",
      userId: 1,
      items: [
        {
          productId: 7,
          productName: "Wardah Perfect Bright Moisturizer",
          quantity: 2,
          price: 45000,
          image: "/assets/gambarUser/WardahLighteningNightCream.jpg",
        },
        {
          productId: 8,
          productName: "Pixy UV Whitening Two Way Cake",
          quantity: 1,
          price: 35000,
          image: "/assets/gambarUser/Luxcrime_Blur_&_Cover_Two_Way_Cake.jpeg",
        },
      ],
      totalAmount: 125000,
      status: "cancelled",
      orderDate: "2024-01-10T14:20:00.000Z",
      deliveryDate: null,
      shippingMethod: "Regular",
      paymentMethod: "Cash on Delivery",
      cancelReason: "Berubah pikiran",
    },
    {
      id: "ORDER-1703005",
      userId: 1,
      items: [
        {
          productId: 9,
          productName: "Innisfree Green Tea Seed Serum",
          quantity: 1,
          price: 235000,
          image:
            "/assets/gambarUser/Somethinc_Niacinamide_+_Moisture_BeetSerum.jpeg", // Pake produk yang mirip karena 'Innisfree' gak ada
        },
      ],
      totalAmount: 235000,
      status: "delivered",
      orderDate: "2024-01-05T11:30:00.000Z",
      deliveryDate: "2024-01-08T15:45:00.000Z",
      shippingMethod: "Express",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORDER-1703006",
      userId: 1,
      items: [
        {
          productId: 10,
          productName: "Laneige Water Sleeping Mask",
          quantity: 1,
          price: 320000,
          image: "/assets/gambarUser/WardahLighteningNightCream.jpg", // Alternatif karena Laneige tidak ditemukan
        },
        {
          productId: 11,
          productName: "Benefit Brow Precisely Eyebrow Pencil",
          quantity: 1,
          price: 450000,
          image: "/assets/gambarUser/MakeOverIntenseMatteLipCream.jpg", // Alternatif karena Benefit tidak ditemukan
        },
      ],
      totalAmount: 770000,
      status: "shipping",
      orderDate: "2024-01-25T08:20:00.000Z",
      deliveryDate: null,
      shippingMethod: "Same Day",
      paymentMethod: "Bank Transfer",
      trackingNumber: "GOSEND987654",
    },
  ];

  const statusOptions = [
    {
      value: "all",
      label: "Semua Status",
      count: sampleOrders.length,
      icon: ShoppingBag,
      color: "text-gray-600",
    },
    {
      value: "favorites",
      label: "Suka",
      count: sampleFavorites.length,
      icon: Heart,
      color: "text-pink-500",
    },
    {
      value: "processing",
      label: "Diproses",
      count: sampleOrders.filter((o) => o.status === "processing").length,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      value: "shipping",
      label: "Dikirim",
      count: sampleOrders.filter((o) => o.status === "shipping").length,
      icon: Package,
      color: "text-blue-500",
    },
    {
      value: "delivered",
      label: "Selesai",
      count: sampleOrders.filter((o) => o.status === "delivered").length,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      value: "cancelled",
      label: "Dibatalkan",
      count: sampleOrders.filter((o) => o.status === "cancelled").length,
      icon: XCircle,
      color: "text-red-500",
    },
  ];

  useEffect(() => {
    // Simulasi user login
    const userData = { id: 1, name: "User Demo" };
    setCurrentUser(userData);

    // Filter orders berdasarkan user ID
    const userOrders = sampleOrders.filter(
      (order) => order.userId === userData.id
    );
    setOrders(userOrders);
    setFavorites(sampleFavorites);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "shipping":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "processing":
        return "Sedang Diproses";
      case "shipping":
        return "Sedang Dikirim";
      case "delivered":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shipping":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const removeFavorite = (productId) => {
    setFavorites(favorites.filter((fav) => fav.id !== productId));
  };

  const renderFavorites = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Product Image */}
          <div className="relative">
            <div className="w-full h-48 bg-white flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain max-h-full"
              />
            </div>

            {product.discount > 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{product.discount}%
              </div>
            )}

            <button
              onClick={() => removeFavorite(product.id)}
              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-4 h-4 text-pink-500 fill-current" />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <span className="text-xs text-gray-500 font-medium">
                {product.brand}
              </span>
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg font-bold text-pink-600">
                Rp{formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  Rp{formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium">
                Beli Sekarang
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ShoppingBag className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
        >
          <div className="mb-2 text-sm text-gray-600 font-medium">
            Order ID: {order.id} • Status:{" "}
            <span className="capitalize">{order.status}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 border p-3 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {item.productName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Jumlah: {item.quantity} • Harga: Rp{formatPrice(item.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right font-semibold text-pink-600">
            Total: Rp{formatPrice(order.totalAmount)}
          </div>
        </div>
      ))}
    </div>
  );

  if (!currentUser) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🔒</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Silakan Login
        </h3>
        <p className="text-gray-600 mb-6">
          Anda perlu login untuk melihat riwayat pesanan
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedStatus === "favorites"
            ? "Produk Favorit"
            : "Riwayat Pesanan"}
        </h1>
        <p className="text-gray-600">
          {selectedStatus === "favorites"
            ? "Koleksi produk yang Anda sukai"
            : "Lihat semua pesanan Anda di sini"}
        </p>
      </div>

      {/* Status Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Filter Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statusOptions.map((status) => {
            const IconComponent = status.icon;
            return (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`p-4 rounded-lg border-2 transition-all text-sm font-medium ${
                  selectedStatus === status.value
                    ? "border-pink-500 bg-pink-50 text-pink-700"
                    : "border-gray-200 hover:border-pink-300 text-gray-700"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent
                    className={`w-5 h-5 ${
                      selectedStatus === status.value
                        ? "text-pink-500"
                        : status.color
                    }`}
                  />
                  <span>{status.label}</span>
                  <span className="text-xs text-gray-500">
                    ({status.count})
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {selectedStatus === "favorites" ? (
        <div>
          {favorites.length > 0 ? (
            renderFavorites()
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Belum ada produk favorit
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai eksplorasi dan tambahkan produk ke favorit Anda
              </p>
              <button
                onClick={() => (window.location.href = "/produk")}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Jelajahi Produk
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-2 md:mb-0">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Dipesan pada {formatDate(order.orderDate)}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            {order.shippingMethod} • {order.paymentMethod}
                          </span>
                          {order.trackingNumber && (
                            <span className="text-xs text-blue-600 font-medium">
                              Resi: {order.trackingNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-2 ${getStatusColor(
                          order.status
                        )}`}
                      >
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
                        {order.status === "cancelled" && order.cancelReason && (
                          <p className="text-sm text-red-600">
                            Alasan: {order.cancelReason}
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
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <span className="text-2xl">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                          {order.status === "delivered" && (
                            <div className="flex items-center space-x-2 mt-2">
                              <button className="text-xs text-pink-600 hover:text-pink-700 font-medium">
                                ⭐ Beri Rating
                              </button>
                              <span className="text-xs text-gray-300">•</span>
                              <button className="text-xs text-pink-600 hover:text-pink-700 font-medium">
                                💝 Tambah ke Favorit
                              </button>
                            </div>
                          )}
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

                    {order.status === "delivered" && (
                      <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                        <Package className="w-4 h-4" />
                        <span>Beli Lagi</span>
                      </button>
                    )}

                    {order.status === "processing" && (
                      <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        <XCircle className="w-4 h-4" />
                        <span>Batalkan</span>
                      </button>
                    )}

                    {order.status === "shipping" && (
                      <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <Package className="w-4 h-4" />
                        <span>Lacak Pesanan</span>
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
                {selectedStatus === "all"
                  ? "Belum ada pesanan"
                  : `Tidak ada pesanan dengan status "${
                      statusOptions.find((s) => s.value === selectedStatus)
                        ?.label
                    }"`}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedStatus === "all"
                  ? "Mulai berbelanja untuk melihat riwayat pesanan Anda"
                  : "Coba ganti filter status untuk melihat pesanan lainnya"}
              </p>
              <button
                onClick={() => (window.location.href = "/produk")}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
              >
                {selectedStatus === "all" ? "Mulai Belanja" : "Lihat Produk"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Statistics */}
      {orders.length > 0 && selectedStatus !== "favorites" && (
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-pink-500 mb-2">
              {orders.length}
            </div>
            <div className="text-sm text-gray-600">Total Pesanan</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-500 mb-2">
              {orders.filter((o) => o.status === "delivered").length}
            </div>
            <div className="text-sm text-gray-600">Pesanan Selesai</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-500 mb-2">
              {orders.filter((o) => o.status === "shipping").length}
            </div>
            <div className="text-sm text-gray-600">Sedang Dikirim</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-500 mb-2">
              {orders.filter((o) => o.status === "processing").length}
            </div>
            <div className="text-sm text-gray-600">Diproses</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatPage;
