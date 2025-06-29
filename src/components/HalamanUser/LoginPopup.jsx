// src/components/HalamanUser/LoginPopup.jsx
import React, { useState } from "react";
import { X, Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { supabase } from "../../supabase";

const LoginPopup = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    no_hp: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", formData.email)
        .eq("password", formData.password);

      if (error) {
        console.error(error);
        alert("Terjadi kesalahan saat login.");
        return;
      }

      if (users.length === 0) {
        alert("Email atau password salah!");
        return;
      }

      const user = users[0]; // ⬅️ AMBIL USER DARI ARRAY
      localStorage.setItem("currentUser", JSON.stringify(user)); // ⬅️ SIMPAN DENGAN BENAR

      if (user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (user.role === "pelanggan") {
        window.location.href = "/";
      } else {
        alert("Role tidak dikenali");
      }
    } else {
      // SIGN UP
      if (formData.password !== formData.confirmPassword) {
        alert("Password dan konfirmasi tidak cocok.");
        return;
      }

      // Cek apakah email sudah dipakai
      const { data: existing, error: checkError } = await supabase
        .from("users")
        .select("*")
        .eq("email", formData.email);

      if (checkError) {
        alert("Terjadi kesalahan saat memeriksa email");
        console.error(checkError);
        return;
      }

      if (existing.length > 0) {
        alert("Email sudah terdaftar");
        return;
      }

      // Insert user baru
      const { error: insertError } = await supabase.from("users").insert([
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          no_hp: formData.no_hp,
          role: "pelanggan",
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        alert("Gagal mendaftar");
        console.error(insertError);
        return;
      }

      alert("Berhasil mendaftar! Silakan login.");
      setIsLogin(true); // kembali ke mode login
      setFormData({ username: "", email: "", password: "", no_hp: "", confirmPassword: "" });
    }
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      no_hp: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl max-w-md w-full p-8 relative shadow-xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-gray-600">
            {isLogin ? "Sign in to your account" : "Join our beauty community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80"
                required
              />
            </div>
            {/* Input No Handphone */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  name="no_hp"
                  placeholder="No Handphone"
                  value={formData.no_hp}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80"
                  required
                />
              </div>
            </>
          )}

          {/* Ini untuk sign in */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          {/* Ini untuk sign up */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {!isLogin && (
            <>
              {/* Input Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80"
                  required
                />
              </div>

              
            </>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={handleSwitchMode}
              className="text-pink-500 hover:text-pink-600 font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
