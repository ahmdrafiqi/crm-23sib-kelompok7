import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import { Route } from 'lucide-react'
// import './App.css'
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Penjualan from "./pages/Penjualan";
import Pelanggan from "./pages/Pelanggan";
import Promo from "./pages/SystemPromo"




function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/penjualan" element={<Penjualan />} />
        <Route path="/promo" element={<Promo />} />
      </Route>
    </Routes>
  );
}

export default App;
