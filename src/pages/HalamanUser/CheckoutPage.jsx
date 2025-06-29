import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../../data/produk";

const PromoCard = ({ discount, name, price, originalPrice, image }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="relative">
      <div className="bg-white-100 h-40 flex items-center justify-center">
        <img src={image} alt={name} className="h-full object-cover" />
      </div>
      <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
        {discount}%
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-900 text-sm mb-2">{name}</h3>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-pink-600 font-bold text-sm">Rp{price}</span>
        <span className="text-gray-400 text-xs line-through">Rp{originalPrice}</span>
      </div>
      <button className="w-full bg-pink-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-pink-600 transition-colors">
        + Keranjang
      </button>
    </div>
  </div>
);

const CheckoutPage = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const dummyProduct = {
    name: "Scarlett Extrait De Parfum Garden Of Whisper 30ml",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    price: 64500,
    originalPrice: 75000,
    volume: "250ml",
    brand: "Scarlett",
  };

  const formatPrice = (price) => new Intl.NumberFormat("id-ID").format(price);
  const promoProducts = allProducts.filter((p) => p.discount > 0);

  const subtotal = dummyProduct.price * quantity;
  const discount = 0;
  const shippingCost = 0;
  const total = subtotal - discount + shippingCost;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Proses ke Pembayaran!");
    console.log("Navigasi ke /riwayat");
    navigate("/riwayat");
  };
  

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-20 py-8">
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Alamat Pengiriman</h2>
              <button className="ml-auto text-pink-600 text-sm font-medium bg-pink-50 hover:bg-pink-100 px-3 py-1 rounded-full transition-colors">
                + Tambah Alamat Baru
              </button>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <h3 className="font-semibold text-gray-900 mb-2">Alamat Utama</h3>
              <p className="text-gray-700 text-sm font-medium mb-1">Selvina</p>
              <p className="text-gray-600 text-sm mb-1">
                Jl. Umban Sari No.1, Umban Sari, Kec. Rumbai, Kota Pekanbaru, Riau 28265
              </p>
              <p className="text-gray-600 text-sm">No. HP: 0812-3456-7890</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilih Pengiriman</h2>
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>Pilih layanan pengiriman</option>
              <option>JNE</option>
              <option>JNT</option>
              <option>SiCepat</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Produk</h2>
            <div className="flex gap-4">
              <img src={dummyProduct.image} alt={dummyProduct.name} className="w-20 h-20 rounded object-cover" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{dummyProduct.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{dummyProduct.volume}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-pink-600 font-bold text-sm">Rp {formatPrice(dummyProduct.price)}</span>
                    <span className="ml-2 line-through text-xs text-gray-400">Rp {formatPrice(dummyProduct.originalPrice)}</span>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-200 rounded">
                    <button onClick={() => handleQuantityChange(-1)} className="px-2">−</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} className="px-2">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Total Pembayaran</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Diskon</span>
                <span>Rp {formatPrice(discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkir</span>
                <span>Rp {formatPrice(shippingCost)}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-bold text-pink-600">
                <span>Total</span>
                <span>Rp {formatPrice(total)}</span>
              </div>
            </div>
            <button onClick={handleSubmit} className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg">
              Proses ke Pembayaran
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Lagi Promo Nih!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promoProducts.slice(0, 4).map((item) => (
          <PromoCard
            key={item.id}
            discount={item.discount}
            name={item.name}
            price={formatPrice(item.price)}
            originalPrice={formatPrice(item.originalPrice)}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;