import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok.");
      return;
    }

    // Ambil data pelanggan dari localStorage
    const existingCustomers = JSON.parse(localStorage.getItem("pelanggan")) || [];

    // Cek jika email sudah terdaftar
    const isEmailExist = existingCustomers.some((cust) => cust.email === email);
    if (isEmailExist) {
      alert("Email sudah terdaftar.");
      return;
    }

    const newCustomer = {
      id: existingCustomers.length + 1,
      name,
      email,
      phone,
      password,
    };

    // Simpan ke localStorage
    localStorage.setItem("pelanggan", JSON.stringify([...existingCustomers, newCustomer]));

    alert("Pendaftaran berhasil! Silakan login.");
    window.location.href = "/masuk"; // redirect ke halaman login
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-pink-700">Daftar Pelanggan Baru</h2>
      <form onSubmit={handleRegister}>
        {["name", "email", "phone", "password", "confirmPassword"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-1 font-medium capitalize text-pink-700">
              {field === "phone"
                ? "No HP"
                : field === "confirmPassword"
                ? "Konfirmasi Password"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field.toLowerCase().includes("password") ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={`Masukkan ${
                field === "confirmPassword" ? "konfirmasi password" : field
              }`}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition"
        >
          Daftar
        </button>
      </form>
    </div>
  );
}
