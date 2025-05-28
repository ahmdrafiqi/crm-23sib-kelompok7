import React, { useState } from "react";

export default function Masuk() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      alert("Email dan Password wajib diisi.");
      return;
    }

    const customers = JSON.parse(localStorage.getItem("pelanggan")) || [];

    const user = customers.find(
      (cust) => cust.email === email && cust.password === password
    );

    if (user) {
      alert("Login berhasil!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "/"; // Redirect ke dashboard atau halaman utama
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-pink-700">Masuk</h2>
      <form onSubmit={handleLogin}>
        {["email", "password"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-1 font-medium capitalize text-pink-700">
              {field === "password"
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
          type="submit"
          className="w-full py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
