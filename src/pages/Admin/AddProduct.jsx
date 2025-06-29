import React, { useState } from "react";
import { ArrowLeft, User, Calendar, Tag, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_produk: "",
    kategori: "",
    harga: "",
    stok: "",
    deskripsi: "",
    gambar_produk: "",
    sku: "",
    sales: 0,
    tags: [],
  });

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama_produk.trim())
      newErrors.nama_produk = "Nama produk wajib diisi";
    if (!formData.kategori.trim()) newErrors.kategori = "Kategori wajib diisi";
    if (!formData.harga.trim() || isNaN(formData.harga))
      newErrors.harga = "Harga tidak valid";
    if (!formData.stok.trim() || isNaN(formData.stok))
      newErrors.stok = "Stok tidak valid";
    if (!formData.deskripsi.trim())
      newErrors.deskripsi = "Deskripsi wajib diisi";
    if (!formData.gambar_produk.trim())
      newErrors.gambar_produk = "Gambar wajib diisi";
    if (!formData.sku.trim()) newErrors.sku = "SKU wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { data, error } = await supabase.from("produk").insert([
          {
            nama_produk: formData.nama_produk,
            kategori: formData.kategori,
            harga: parseFloat(formData.harga),
            stok: parseInt(formData.stok),
            deskripsi: formData.deskripsi,
            gambar_produk: formData.gambar_produk,
            sku: formData.sku,
            sales: 0, // default untuk produk baru
          },
        ]);

        if (error) {
          console.error("Gagal tambah produk:", error);
          alert("Gagal menyimpan data produk");
        } else {
          console.log("Produk berhasil ditambahkan:", data);
          alert("Produk berhasil ditambahkan!");
          navigate("/admin/products");
        }
      } catch (err) {
        console.error("Error saat submit:", err);
      }
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to products
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add New products</h1>
        <p className="text-gray-600">Create a new products profile</p>
      </div>

      {/* Form */}
      
      <form onSubmit={handleSubmit} className="max-w-4xl">
  {/* Produk Info */}
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <User className="w-5 h-5 mr-2 text-pink-500" />
      Product Information
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nama Produk */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama_produk"
          value={formData.nama_produk}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            errors.nama_produk ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter product name"
        />
        {errors.nama_produk && (
          <p className="text-red-500 text-xs mt-1">{errors.nama_produk}</p>
        )}
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="kategori"
          value={formData.kategori}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            errors.kategori ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter category"
        />
        {errors.kategori && (
          <p className="text-red-500 text-xs mt-1">{errors.kategori}</p>
        )}
      </div>

      {/* Harga */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price (Rp) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="harga"
          value={formData.harga}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            errors.harga ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter price"
        />
        {errors.harga && (
          <p className="text-red-500 text-xs mt-1">{errors.harga}</p>
        )}
      </div>

      {/* Stok */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="stok"
          value={formData.stok}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            errors.stok ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter stock"
        />
        {errors.stok && (
          <p className="text-red-500 text-xs mt-1">{errors.stok}</p>
        )}
      </div>
    </div>

    {/* Deskripsi */}
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <textarea
        name="deskripsi"
        value={formData.deskripsi}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="Enter product description"
        rows={4}
      ></textarea>
    </div>
  </div>

  {/* Tambahan SKU dan Gambar */}
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <Tag className="w-5 h-5 mr-2 text-pink-500" />
      Metadata
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* SKU */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SKU
        </label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Enter SKU"
        />
      </div>

      {/* Gambar Produk */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Image URL
        </label>
        <input
          type="text"
          name="gambar_produk"
          value={formData.gambar_produk}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="https://..."
        />
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-end">
    <button
      type="submit"
      className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
    >
      Save Product
    </button>
  </div>
</form>

    </main>
  );
};

export default AddProduct;
