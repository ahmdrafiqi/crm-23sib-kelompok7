import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function Produk() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Lipstik Matte Merah",
            category: "makeup",
            price: 75000,
            stock: 10,
            photo: "https://via.placeholder.com/80?text=Lipstik",
        },
        {
            id: 2,
            name: "Foundation Cair Natural",
            category: "makeup",
            price: 120000,
            stock: 5,
            photo: "https://via.placeholder.com/80?text=Foundation",
        },
    ]);

    const [nextId, setNextId] = useState(3);
    const [form, setForm] = useState({
        id: null,
        name: "",
        category: "",
        price: "",
        stock: "",
        photo: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setProducts(
                products.map((prod) =>
                    prod.id === form.id
                        ? {
                              ...form,
                              price: parseInt(form.price),
                              stock: parseInt(form.stock),
                          }
                        : prod
                )
            );
            setIsEditing(false);
        } else {
            const newProduct = {
                ...form,
                id: nextId,
                price: parseInt(form.price),
                stock: parseInt(form.stock),
            };
            setProducts([...products, newProduct]);
            setNextId(nextId + 1);
        }

        setForm({
            id: null,
            name: "",
            category: "",
            price: "",
            stock: "",
            photo: "",
        });
    };

    const handleEdit = (product) => {
        setForm({
            ...product,
            price: product.price.toString(),
            stock: product.stock.toString(),
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <div className="p-6 bg-white max-h-screen">
            <h1 className="text-3xl font-bold text-pink-700 mb-6">Manajemen Produk Makeup</h1>

            {/* Form Container */}
            <div className="bg-white-50 border border-pink-200 rounded-xl p-6 shadow mb-10">
                <h2 className="text-xl font-semibold text-pink-700 mb-4">
                    {isEditing ? "Edit Produk" : "Tambah Produk"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nama Produk"
                        value={form.name}
                        onChange={handleChange}
                        className="border border-pink-300 px-3 py-2 rounded focus:outline-pink-400"
                        required
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stok"
                        value={form.stock}
                        onChange={handleChange}
                        className="border border-pink-300 px-3 py-2 rounded focus:outline-pink-400"
                        required
                        min={0}
                    />
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="border border-pink-300 px-3 py-2 rounded focus:outline-pink-400"
                        required
                    >
                        <option value="" disabled hidden>
                            Kategori
                        </option>
                        <option value="makeup">Makeup</option>
                        <option value="skincare">Skincare</option>
                    </select>
                    <input
                        type="number"
                        name="price"
                        placeholder="Harga"
                        value={form.price}
                        onChange={handleChange}
                        className="border border-pink-300 px-3 py-2 rounded focus:outline-pink-400"
                        required
                        min={0}
                    />
                    <input
                        type="text"
                        name="photo"
                        placeholder="URL Foto"
                        value={form.photo}
                        onChange={handleChange}
                        className="border border-pink-300 px-3 py-2 rounded focus:outline-pink-400 md:col-span-2"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition md:col-span-2"
                    >
                        {isEditing ? "Update Produk" : "Tambah Produk"}
                    </button>
                </form>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left border border-pink-200 shadow">
                    <thead className="bg-pink-100 text-sm text-gray-700">
                        <tr>
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Nama</th>
                            <th className="py-2 px-4 border">Stok</th>
                            <th className="py-2 px-4 border">Kategori</th>
                            <th className="py-2 px-4 border">Harga</th>
                            <th className="py-2 px-4 border">Foto</th>
                            <th className="py-2 px-4 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod.id} className="hover:bg-pink-50 transition">
                                <td className="py-2 px-4 border">{prod.id}</td>
                                <td className="py-2 px-4 border">{prod.name}</td>
                                <td className="py-2 px-4 border">{prod.stock}</td>
                                <td className="py-2 px-4 border">{prod.category}</td>
                                <td className="py-2 px-4 border">Rp {prod.price.toLocaleString()}</td>
                                <td className="py-2 px-4 border">
                                    <img
                                        src={prod.photo}
                                        alt={prod.name}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="py-2 px-4 border">
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleEdit(prod)}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(prod.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
