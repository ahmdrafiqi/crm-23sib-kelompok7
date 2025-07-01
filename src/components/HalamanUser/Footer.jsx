import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-full mx-auto px-4 lg:px-6 py-8">
        {/* Newsletter Section */}
        <div className="mb-8 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-6 lg:mb-0">
              <div className="mb-4">
                <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  25% UP TO OFF ALL PRODUCTS
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                Stay Home & Get Your Daily Needs From Our Shop
              </h3>
              <p className="text-gray-600 mb-4 text-sm lg:text-base">
                Start Your Daily Shopping with Missglam
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                />
                <button className="px-4 lg:px-6 py-2 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="lg:ml-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-pink-200 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl lg:text-4xl">👩</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">miss glam</h4>
            <p className="text-gray-600 text-sm mb-4">
              We offer high-quality foods and the best delivery service, and the food market you
              can blindly trust
            </p>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-600 cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer" />
            </div>
          </div>

          {/* About Us */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">About Us</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="https://www.instagram.com/missglam_id?igsh=M2p4cmZkN2c1YXJy" className="hover:text-pink-500" target="_blank" rel="noopener noreferrer">About us</a></li>
              <li><a href="https://linktr.ee/missglam.id?fbclid=PAQ0xDSwLQHY1leHRuA2FlbQIxMQABp03r-3OxgpmFE_6Ame-lvKyWgd8K3R-Sn8pwdjRq0OgUmNhNZ1POON2-3J2S_aem_BSgqkvcldcLucJa-8P7R3g" className="hover:text-pink-500" target="_blank" rel="noopener noreferrer">Contact us</a></li>
              <li><a href="#" className="hover:text-pink-500">About team</a></li>
              <li><a href="#" className="hover:text-pink-500">Customer Support</a></li>
            </ul>
          </div>

          {/* Our Information */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Our Information</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-500">Privacy policy update</a></li>
              <li><a href="#" className="hover:text-pink-500">Terms & conditions</a></li>
              <li><a href="#" className="hover:text-pink-500">Return Policy</a></li>
              <li><a href="#" className="hover:text-pink-500">Site Map</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Community</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-pink-500">Announcements</a></li>
              <li><a href="#" className="hover:text-pink-500">Answer center</a></li>
              <li><a href="#" className="hover:text-pink-500">Discussion boards</a></li>
              <li><a href="#" className="hover:text-pink-500">Giving works</a></li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
          <div className="flex space-x-2">
            <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
            <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
            <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">PP</div>
            <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G2</div>
            <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">SB</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
