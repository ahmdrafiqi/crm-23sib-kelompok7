import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { Route } from 'lucide-react'
// import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Produk from './pages/Produk'
import CekPesanan from './pages/Pesanan'
import FAQ from './pages/FAQ'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={ <Dashboard />} />
        <Route path='/produk' element={ <Produk/>} />
        <Route path='/pesanan' element={ <CekPesanan/>} />
        <Route path='/faq' element={ <FAQ/>} />
      </Route>
    </Routes>
  )
}

export default App
