import React, { useState } from "react";

export default function CekPesanan() {
    const [pesanan, setPesanan] = useState([
        {
            id: "ORD-001",
            produk: "Tas Rotan Bali",
            pelanggan: "Ayu Lestari",
            noHp: "081234567890",
            status: "Belum",
        },
        {
            id: "ORD-002",
            produk: "Topi Anyaman",
            pelanggan: "Dedi Pratama",
            noHp: "082345678901",
            status: "Proses",
        },
        {
            id: "ORD-003",
            produk: "Keranjang Buah",
            pelanggan: "Siska Amelia",
            noHp: "083456789012",
            status: "Selesai",
        },
    ]);

    const [editIndex, setEditIndex] = useState(null);
    const [editStatus, setEditStatus] = useState("");

    const statusColor = (status) => {
        switch (status) {
            case "Belum":
                return "bg-red-100 text-red-600";
            case "Proses":
                return "bg-yellow-100 text-yellow-700";
            case "Selesai":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const handleSave = (index) => {
        const updated = [...pesanan];
        updated[index].status = editStatus;
        setPesanan(updated);
        setEditIndex(null);
        setEditStatus("");
    };

    const handleDelete = (index) => {
        const updated = [...pesanan];
        updated.splice(index, 1);
        setPesanan(updated);
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-pink-700">Cek Status Pesanan</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md text-sm">
                    <thead>
                        <tr className="text-left bg-pink-100 text-pink-700">
                            <th className="px-4 py-3">ID Pesanan</th>
                            <th className="px-4 py-3">Nama Produk</th>
                            <th className="px-4 py-3">Pelanggan</th>
                            <th className="px-4 py-3">No HP</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesanan.map((p, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-3">{p.id}</td>
                                <td className="px-4 py-3">{p.produk}</td>
                                <td className="px-4 py-3">{p.pelanggan}</td>
                                <td className="px-4 py-3">{p.noHp}</td>
                                <td className="px-4 py-3">
                                    {editIndex === index ? (
                                        <select
                                            className="border border-gray-300 rounded px-2 py-1"
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                        >
                                            <option value="Belum">Belum</option>
                                            <option value="Proses">Proses</option>
                                            <option value="Selesai">Selesai</option>
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(p.status)}`}>
                                            {p.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 space-x-2">
                                    {editIndex === index ? (
                                        <>
                                            <button
                                                onClick={() => handleSave(index)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                onClick={() => setEditIndex(null)}
                                                className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                            >
                                                Batal
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setEditIndex(index);
                                                    setEditStatus(p.status);
                                                }}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Hapus
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
