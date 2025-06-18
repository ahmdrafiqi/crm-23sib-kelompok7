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
import HomePage from "./pages/HalamanUser/Homepage";
import Member from "./pages/HalamanUser/Member";
import ProdukPage from './pages/HalamanUser/ProdukPage'
import RiwayatPage from './pages/HalamanUser/RiwayatPage';
import CartPage from "./pages/HalamanUser/CartPage";
import CheckoutPage from "./pages/HalamanUser/CheckoutPage";
import ProductDetail from "./pages/HalamanUser/DetailProduct";
import UserLayout from "./components/HalamanUser/UserLayout";

function App() {
  return (
    <Routes>
      {/* Admin Pages */}
      <Route path="/admin" element={<MainLayout />}>
        <Route index element={<Dashboard />} /> {/* /admin */}
        <Route path="pelanggan" element={<Pelanggan />} />
        <Route path="penjualan" element={<Penjualan />} />
        <Route path="promo" element={<Promo />} />
        <Route path="produk" element={<Produk />} />
        <Route path="pesanan" element={<CekPesanan />} />
        <Route path="faq" element={<FAQ />} />
      </Route>

      {/* Auth Pages */}
      <Route path="/masuk" element={<Masuk />} />
      <Route path="/daftar" element={<Daftar />} />

      {/* User Pages */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} /> {/* / */}
        <Route path="home" element={<HomePage />} />
        <Route path="member" element={<Member />} />
        <Route path="product" element={<ProdukPage />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="riwayat" element={<RiwayatPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profil" element={<ProfileUser />} />
      </Route>
    </Routes>
  );
}

export default App;