import React, { useState, useEffect } from "react";

export default function Pelanggan() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pelanggan");
    if (stored) {
      setCustomers(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
    });
    setIsEditing(false);
  };

  const generateId = () => {
    if (customers.length === 0) return 1;
    return Math.max(...customers.map((c) => c.id)) + 1;
  };

  const handleAddOrUpdateCustomer = () => {
    const { id, name, address, email, phone, password } = formData;

    if (!name || !address || !email || !phone || !password) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (isEditing) {
      const updatedCustomers = customers.map((cust) =>
        cust.id === id ? { ...formData } : cust
      );
      setCustomers(updatedCustomers);
      localStorage.setItem("pelanggan", JSON.stringify(updatedCustomers));
      alert("Data pelanggan berhasil diperbarui.");
    } else {
      const isEmailExist = customers.some((cust) => cust.email === email);
      if (isEmailExist) {
        alert("Email sudah terdaftar.");
        return;
      }

      const newCustomer = {
        id: generateId(),
        name,
        address,
        email,
        phone,
        password,
      };
      const updatedCustomers = [...customers, newCustomer];
      setCustomers(updatedCustomers);
      localStorage.setItem("pelanggan", JSON.stringify(updatedCustomers));
      alert("Pelanggan berhasil ditambahkan.");
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (cust) => {
    setFormData(cust);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      const updatedCustomers = customers.filter((cust) => cust.id !== id);
      setCustomers(updatedCustomers);
      localStorage.setItem("pelanggan", JSON.stringify(updatedCustomers));
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4 text-pink-700">
        Manajemen Pelanggan
      </h1>

      <button
        onClick={() => {
          resetForm();
          setShowForm((prev) => !prev);
        }}
        className="mb-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
      >
        {showForm ? "Batal" : "Tambah Pelanggan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-pink-300 rounded shadow-sm bg-pink-100">
          {["name", "address", "email", "phone", "password"].map((field) => (
            <div className="mb-2" key={field}>
              <label className="block font-medium mb-1 capitalize text-pink-800">
                {field === "phone"
                  ? "No HP"
                  : field === "password"
                  ? "Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={`Masukkan ${field}`}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          ))}

          <button
            onClick={handleAddOrUpdateCustomer}
            className={`mt-2 px-4 py-2 text-white rounded transition ${
              isEditing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {isEditing ? "Perbarui" : "Simpan"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow w-full">
        <table className="min-w-full divide-y divide-pink-200">
          <thead className="bg-pink-50">
            <tr>
              {["ID", "Nama", "Alamat", "Email", "No HP", "Password", "Aksi"].map(
                (title) => (
                  <th
                    key={title}
                    className="px-4 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider"
                  >
                    {title}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-100">
            {customers.length > 0 ? (
              customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-pink-50">
                  <td className="px-4 py-2">{cust.id}</td>
                  <td className="px-4 py-2">{cust.name}</td>
                  <td className="px-4 py-2">{cust.address}</td>
                  <td className="px-4 py-2">{cust.email}</td>
                  <td className="px-4 py-2">{cust.phone}</td>
                  <td className="px-4 py-2">{cust.password}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(cust)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cust.id)}
                      className="px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-pink-300">
                  Tidak ada data pelanggan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
