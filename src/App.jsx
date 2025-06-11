import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import { Route } from 'lucide-react'
// import './App.css'
import { Routes, Route } from "react-router-dom";
import Promo from "./pages/SystemPromo"
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Penjualan from './pages/Penjualan'
import Pelanggan from './pages/Pelanggan'
import Masuk from './pages/Masuk'
import Daftar from './pages/Daftar'
import Produk from './pages/Produk'
import CekPesanan from './pages/Pesanan'
import FAQ from './pages/FAQ'
import ProfileUser from './pages/HalamanUser/ProfileUser'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/penjualan" element={<Penjualan />} />
        <Route path="/promo" element={<Promo />} />
        <Route path='/masuk' element={ <Masuk/>} />
        <Route path='/daftar' element={ <Daftar/>} />
        <Route path='/' element={ <Dashboard />} />
        <Route path='/produk' element={ <Produk/>} />
        <Route path='/pesanan' element={ <CekPesanan/>} />
        <Route path='/faq' element={ <FAQ/>} />
      </Route>

      <Route path='/profil' element={ <ProfileUser/>} />
    </Routes>
  );
}

export default App;
