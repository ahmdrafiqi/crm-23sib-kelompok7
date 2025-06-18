import React from "react";
import Header from "../../components/HalamanUser/Header";
import Footer from "../../components/HalamanUser/Footer";
import { useParams } from "react-router-dom";


const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="font-sans bg-white text-gray-800">
      <Header />

      {/* Main Detail */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gambar Produk */}
        <div>
          <img
            src="https://via.placeholder.com/500x500"
            alt="Produk"
            className="rounded-lg w-full object-cover"
          />
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-pink-300 w-12 h-12 rounded-md" />
            ))}
          </div>
        </div>

        {/* Info Produk */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Name of Miss Glam Product #{id}
          </h2>
          <div className="flex items-center text-yellow-500 mb-2">
            ★★★★★{" "}
            <span className="ml-2 text-sm text-gray-500">(5 reviews)</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, pariatur!
          </p>
          <p className="text-2xl text-pink-600 font-bold mb-4">Rp. 100.000</p>

          {/* Quantity + Button */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button className="px-3 py-1">-</button>
              <span className="px-4">1</span>
              <button className="px-3 py-1">+</button>
            </div>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded">
              Tambahkan ke Keranjang
            </button>
          </div>
        </div>
      </main>

      {/* Tabs */}
      <div className="border-t">
        <div className="max-w-6xl mx-auto flex gap-6 px-4 py-3 text-sm font-medium">
          <button className="border-b-2 border-black pb-1">Deskripsi</button>
          <button className="text-gray-500">Review & Rating</button>
        </div>
      </div>

      {/* Deskripsi */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h3 className="text-2xl font-bold mb-4">Produk Kami</h3>

        {/* Ingredients */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-pink-600 mb-2">Ingredients</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae fuga dolore amet
            rem voluptates, sunt velit.
          </p>
        </div>

        {/* Video Section */}
        {[1, 2].map((v) => (
          <div
            key={v}
            className="mb-10 flex flex-col md:flex-row gap-6 border border-dashed p-4 rounded-lg"
          >
            <iframe
              className="w-full md:w-1/2 aspect-video rounded"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title={`Tutorial Makeup ${v}`}
              allowFullScreen
            ></iframe>
            <div className="md:w-1/2">
              <h5 className="text-lg font-semibold mb-2">Tutorial Makeup</h5>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem ad tempora.
              </p>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
