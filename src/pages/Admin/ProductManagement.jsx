import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

// ICONS
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertCircle,
  TrendingUp,
  Star,
  ImagePlus,
  BarChart3,
} from "lucide-react";

const ProductManagement = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]); // ⬅️ letakkan DI DALAM fungsi komponen

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("produk").select("*");

      if (error) {
        console.error("Gagal ambil data:", error);
      } else {
        // Tambahkan properti tambahan untuk UI
        const processed = data.map((p) => ({
          ...p,
          sku: p.sku,
          stockStatus: p.stok === 0 ? "out" : p.stok < 30 ? "low" : "normal",
          sales: p.sales,
          // rating: p.rating,
          reviews: p.reviews,
          cost: p.harga * 0.7,
          subcategory: p.kategori,
          name: p.nama_produk,
          price: p.harga,
          stock: p.stok,
          category: p.kategori,
        }));

        setProducts(processed);
      }
    };

    fetchProducts();
  }, []); // ⬅️ useEffect hanya dipanggil sekali saat halaman dimuat

  const categories = ["All", "Makeup", "Skincare", "Bodycare"];
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stockStatus === "low").length;
  const [stockFilter, setStockFilter] = useState("all");
  const outOfStockCount = products.filter(
    (p) => p.stockStatus === "out"
  ).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const bestSellers = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);

  const stockStatusConfig = {
    normal: { color: "bg-green-100 text-green-700", label: "In Stock" },
    low: { color: "bg-yellow-100 text-yellow-700", label: "Low Stock" },
    out: { color: "bg-red-100 text-red-700", label: "Out of Stock" },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

const handleDelete = async (id) => {
  const confirmDelete = confirm("Yakin ingin menghapus pelanggan ini?");
  if (confirmDelete) {
    const { error } = await supabase
      .from("pelanggan")
      .delete()
      .eq("id_pelanggan", id);

    if (error) {
      console.error("Gagal hapus pelanggan:", error.message);
      alert("Terjadi kesalahan saat menghapus pelanggan.");
    } else {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      alert("Pelanggan berhasil dihapus.");
    }
  }
};

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter;

    const matchesStock =
      stockFilter === "all" || product.stockStatus === stockFilter;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <p className="text-gray-600">
          Manage your product catalog and inventory
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">
                {products.length > 0 ? totalProducts : "Loading..."}
              </p>
            </div>
            <Package className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Alert</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.length > 0 ? lowStockCount : "Loading..."}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {products.length > 0 ? outOfStockCount : "Loading..."}
              </p>
            </div>
            <Package className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-green-600">
                Rp {(totalValue / 1000000).toFixed(1)}M
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Best Sellers Mini Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-2" />
          Top Selling Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestSellers.map((product, index) => (
            <div
              key={product.id_produk}
              className="flex items-center bg-white rounded-lg p-3 shadow-sm"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-lg font-bold text-pink-600">
                  #{index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">
                  {product.sales.toLocaleString()} sold
                </p>
              </div>
            </div>
          ))}
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Stock</option>
              <option value="normal">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Export
            </button>

            <button
              onClick={() => navigate("add")} // ⬅️ ini arah URL-nya
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const profit = product.price - product.cost;
                const profitMargin = ((profit / product.price) * 100).toFixed(
                  1
                );

                return (
                  <tr
                    key={product.id_produk}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <ImagePlus className="w-6 h-6 text-pink-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.subcategory}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{product.sku}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Rp {product.price.toLocaleString("id-ID")}
                        </p>
                        <p className="text-xs text-gray-500">
                          Margin: {profitMargin}%
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.stock} units
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            stockStatusConfig[product.stockStatus].color
                          }`}
                        >
                          {stockStatusConfig[product.stockStatus].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {product.sales.toLocaleString("id-ID")}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-900">
                          {product.rating}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                          title="Edit Product"
                          onClick={() => handleEdit(product.id_produk)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete Product"
                          onClick={() => handleDelete(product.id_produk)}
                        >
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{filteredProducts.length}</span> of{" "}
            <span className="font-medium">{totalProducts}</span> results
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-pink-500 text-white rounded-md text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductManagement;
