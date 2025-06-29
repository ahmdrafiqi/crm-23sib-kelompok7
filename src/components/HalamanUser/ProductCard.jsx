// src/components/HalamanUser/ProductCard.jsx
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <span className="text-4xl">💄</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${className} object-contain p-4 bg-white`} 
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
};

const ProductCard = ({ product, formatPrice }) => {
  return (
    <Link to={`/produk/${product.id}`}>
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
    <div className="relative">
      <div className="aspect-square">
        <ProductImage 
          src={product.image}
          alt={product.name}
          className="w-full h-full"
        />
      </div>

      {/* Badge */}
      {product.badge && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
          {product.badge}
        </div>
      )}

      {/* Like Button */}
      <button className="absolute top-2 right-2 bg-white bg-opacity-80 p-1 rounded-full shadow">
        <Heart className="w-4 h-4 text-gray-600" />
      </button>

      {/* Award / Exclusive */}
      {product.award && (
        <div className="absolute top-12 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          🏆
        </div>
      )}
      {product.exclusive && (
        <div className="absolute top-12 left-2 bg-pink-100 text-pink-600 px-2 py-1 rounded text-xs font-medium">
          ONLINE ONLY
        </div>
      )}

      {/* Stock Info */}
      {product.stock && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className={`text-center text-xs font-medium px-2 py-1 rounded ${
            product.stock.includes('habis') ? 'bg-red-100 text-red-600' : 
            product.stock.includes('28') || product.stock.includes('42') ? 'bg-pink-100 text-pink-600' :
            'bg-green-100 text-green-600'
          }`}>
            {product.stock}
          </div>
        </div>
      )}
    </div>

    {/* Body */}
    <div className="p-3 flex flex-col justify-between flex-grow">
      <div className="space-y-1">
        {product.options && (
          <div className="text-xs text-gray-500">{product.options}</div>
        )}
        {product.size && (
          <div className="text-xs text-gray-500">{product.size}</div>
        )}
        <div className="text-xs text-gray-500">30gr</div>
        <div className="text-xs font-medium text-gray-900">{product.brand}</div>
        <h3 className="text-sm text-gray-900 line-clamp-2 leading-tight min-h-[40px]">{product.name}</h3>
      </div>

      <div className="space-y-1 my-2">
        <div className="text-red-500 font-bold text-sm">
          Rp{formatPrice(product.price)} {product.discount >= 20 && '⚡'}
        </div>
        <div className="text-xs text-gray-400 line-through">
          Rp{formatPrice(product.originalPrice)}
        </div>
      </div>

      <div className="flex items-center space-x-1 mt-auto">
        <Star className="w-3 h-3 text-yellow-400 fill-current" />
        <span className="text-xs text-gray-600">
          {product.rating} ({product.reviews > 1000 ? `${Math.floor(product.reviews/1000)}k` : product.reviews})
        </span>
      </div>
    </div>
  </div>
</Link>

  );
};

export default ProductCard;
