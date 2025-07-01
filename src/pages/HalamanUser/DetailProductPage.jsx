import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProducts, dummyReviews } from "../../data/produk";
import ReviewCard from "../../components/HalamanUser/ReviewCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find((item) => item.id == id); // pakai == biar aman

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Produk tidak ditemukan
        </h2>
        <p className="text-gray-600">Coba kembali ke halaman sebelumnya.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gambar */}
        <div className="w-full flex justify-center">
          <div className="max-w-sm w-full border rounded-xl overflow-hidden shadow-sm">
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="w-full h-72 object-contain p-6 bg-white"
            />
          </div>
        </div>

        {/* Detail */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mb-1">{product.brand} · 30gr</p>

          <p className="text-xl font-semibold text-pink-600 mb-3">
            Rp {new Intl.NumberFormat("id-ID").format(product.price)}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {product.description ||
              "Produk ini adalah pilihan sempurna bagi kamu yang mencari kualitas dan kenyamanan. Diformulasikan khusus untuk hasil terbaik, cocok untuk penggunaan harian maupun acara spesial."}
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Checkout Sekarang
          </button>
        </div>
      </div>

      {/* Review */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Ulasan Produk
        </h2>
        <div className="grid gap-4">
          {dummyReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
