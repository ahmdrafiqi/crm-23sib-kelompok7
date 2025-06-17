// src/components/HalamanUser/NewsletterPopup.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewsletterPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan ke localStorage
    localStorage.setItem('newsletter_subscribed', 'true');
    localStorage.setItem('subscriber_email', email);
    alert('Thank you for subscribing!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full relative overflow-hidden shadow-2xl mx-4 border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-gray-100/80 rounded-full p-1.5 hover:bg-gray-200/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Left Content */}
          <div className="flex-1 p-6 md:p-8">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                GET 10% SALE OFF
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Subscribe & Get<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-3xl md:text-4xl">
                50% Special
              </span><br />
              Discount On Email
            </h2>
            
            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              Join our newsletter to receive the latest updates and exclusive promotions
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white/90"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">
                *No spam, unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Right Image */}
          <div className="md:flex-1 bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-blue-100/80 flex justify-center items-center p-6 md:p-8 relative min-h-[200px] md:min-h-[300px]">
            {/* Decorative sparkles */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-6 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60"></div>
            
            {/* Makeup illustration - more compact */}
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Eyeshadow palette */}
              <div className="absolute top-0 right-2 w-16 h-12 bg-gray-800 rounded-lg shadow-lg transform rotate-12 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-pink-300 rounded"></div>
                  <div className="w-2 h-2 bg-purple-300 rounded"></div>
                  <div className="w-2 h-2 bg-orange-300 rounded"></div>
                  <div className="w-2 h-2 bg-blue-300 rounded"></div>
                </div>
              </div>
              
              {/* Lipstick */}
              <div className="absolute top-6 left-4 w-4 h-16 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full shadow-lg transform -rotate-12"></div>
              
              {/* Foundation bottle */}
              <div className="absolute bottom-8 right-4 w-8 h-16 bg-gradient-to-b from-orange-200 to-orange-400 rounded-lg shadow-lg transform rotate-6"></div>
              
              {/* Brushes */}
              <div className="absolute bottom-2 left-2 w-3 h-18 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-lg transform -rotate-45"></div>
              <div className="absolute bottom-4 left-6 w-2 h-14 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full shadow-lg transform -rotate-12"></div>
              
              {/* Mascara */}
              <div className="absolute top-12 right-8 w-3 h-12 bg-gradient-to-b from-black to-gray-800 rounded-full shadow-lg transform rotate-45"></div>
              
              {/* Central sparkle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 text-yellow-400 animate-pulse">✨</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;