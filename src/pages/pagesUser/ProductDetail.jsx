import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("deskripsi");

  const product = {
    id,
    name: "Miss Glam Compact Powder",
    price: 100000,
    image: "/images/product1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
  };

  return (
    <div className="p-6">
      {/* Detail Produk */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Gambar */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded"
          />
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-16 h-16 bg-pink-200 rounded cursor-pointer"
              ></div>
            ))}
          </div>
        </div>

        {/* Info Produk */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-gray-500">1m+ reviews</span>
          </div>

          <p className="text-gray-700">{product.description}</p>
          <p className="text-pink-500 text-xl font-semibold">
            Rp{product.price.toLocaleString()}
          </p>

          {/* Quantity dan Cart */}
          <div className="flex items-center gap-4">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>

            <button className="bg-pink-400 text-white px-4 py-2 rounded flex items-center gap-2">
              🛒 Add to Cart
            </button>
          </div>

          <button className="bg-pink-200 px-4 py-2 rounded">Wishlist ❤️</button>
        </div>
      </div>

      {/* TAB Navigasi */}
      <div className="mt-10 border-b flex gap-8 justify-center text-center">
        <button
          onClick={() => setActiveTab("deskripsi")}
          className={`pb-2 ${
            activeTab === "deskripsi" ? "border-b-2 border-pink-500 text-pink-500 font-semibold" : "text-gray-500"
          }`}
        >
          📝 Deskripsi
        </button>
        <button
          onClick={() => setActiveTab("rating")}
          className={`pb-2 ${
            activeTab === "rating" ? "border-b-2 border-pink-500 text-pink-500 font-semibold" : "text-gray-500"
          }`}
        >
          ⭐ Review & Rating
        </button>
      </div>

      {/* Konten TAB */}
      <div className="mt-6">
        {activeTab === "deskripsi" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Ingredients</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        )}

        {activeTab === "rating" && (
          <div className="space-y-6">
            {[1, 2].map((n) => (
              <div key={n} className="flex flex-col md:flex-row gap-4">
                <iframe
                  className="w-full md:w-1/2 h-64 rounded"
                  src="https://www.youtube.com/embed/qh6pyoN3K9s"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="md:w-1/2">
                  <h3 className="font-bold text-lg">Tutorial Makeup</h3>
                  <p className="text-gray-700 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
