import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import { Route } from 'lucide-react'
// import './App.css'
import { Routes, Route } from "react-router-dom";

import ProfileUser from './pages/HalamanUser/ProfileUser'
import HomePage from "./pages/HalamanUser/HomePage";
import Member from "./pages/HalamanUser/Member";
import ProdukPage from './pages/HalamanUser/ProdukPage'
import RiwayatPage from './pages/HalamanUser/RiwayatPage';
import CartPage from "./pages/HalamanUser/CartPage";
import CheckoutPage from "./pages/HalamanUser/CheckoutPage";
import ProfilePage from "./pages/HalamanUser/ProfilePage";
import DashboardPage from "./pages/HalamanAdmin/DashboardPage";
import ProdukAdmin from "./pages/HalamanAdmin/ProdukAdmin";

function App() {
  return (
    <Routes>
      {/* admin */}
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/admin/produk" element={<ProdukAdmin />} />

      {/* user */}
      <Route path='/' element={ <HomePage/>} />
      <Route path='/member' element={ <Member/>} />
      <Route path="/product" element={<ProdukPage />} />
      <Route path="/riwayat" element={<RiwayatPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/profil" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
