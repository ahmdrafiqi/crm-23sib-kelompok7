import React from 'react';
import UserLayout from '../../components/HalamanUser/UserLayout';
import { Heart, Lock, Star, ChevronRight } from 'lucide-react';
import { FaBirthdayCake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../../components/HalamanUser/Header';

const progressWidth = {
  transaksi: '60%',
  nominal: '55%',
};

const vouchers = [
  {
    id: 1,
    title: 'Diskon 100% s/d 10RB',
    min: 'Minimal Belanja Rp0',
    expiry: 'Berlaku Hingga 25.07.2025',
  },
  {
    id: 2,
    title: 'Diskon 100% s/d 10RB',
    min: 'Minimal Belanja Rp0',
    expiry: 'Berlaku Hingga 25.07.2025',
  },
  {
    id: 3,
    title: 'Diskon 100% s/d 10RB',
    min: 'Minimal Belanja Rp0',
    expiry: 'Berlaku Hingga 25.07.2025',
  },
];

const benefits = [
  {
    id: 1,
    icon: <Lock className="w-5 h-5 text-[#EE628B]" />,
    title: 'Diskon Member',
    desc: 'Diskon 5% All item',
  },
  {
    id: 2,
    icon: <FaBirthdayCake className="w-5 h-5 text-[#EE628B]" />,
    title: 'Voucher Ulang Tahun',
    desc: 'Nikmati voucher ulang tahun sebesar Rp 10.000',
  },
];

const Member = () => {
  return (
    <>
    
      {/* Wrapper agar konten memenuhi layar */}
      <div className="w-full min-h-screen p-4 md:p-6 lg:p-8 space-y-8">
        {/* Tier Card */}
        <div className="bg-[#FFF7F1] rounded-lg p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <Heart className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                Glam Babe <span className="font-normal">(Bronze)</span>
              </h1>
              <p className="text-sm text-gray-700 leading-tight">Nabila Syarani</p>
              <p className="text-xs text-gray-500">10 Pesanan atau Rp 500.000</p>
            </div>
          </div>
          <Link
            to="/detail-member"
            className="flex items-center gap-1 text-sm md:text-base text-gray-600 hover:text-[#EE628B] transition"
          >
            Lihat semua member <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Progress Box */}
        <div className="border border-dashed border-[#E9EBEC] rounded-lg p-4 space-y-4">
          {/* Transaksi progress */}
          <p className="text-sm font-medium text-gray-700">5 Transaksi lagi</p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 h-3 bg-[#E9EBEC] rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-[#EE628B] rounded-full"
                style={{ width: progressWidth.transaksi }}
              />
            </div>
            <div className="flex items-center gap-1 min-w-max">
              <Star className="w-4 h-4 text-[#EE628B] fill-[#EE628B]" />
              <span className="text-xs font-medium text-[#EE628B]">Glam Star</span>
            </div>
          </div>

          {/* Separator */}
          <p className="text-center text-xs text-gray-400">atau</p>

          {/* Nominal progress */}
          <p className="text-sm font-medium text-gray-700">Rp 250.000 transaksi lagi</p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 h-3 bg-[#E9EBEC] rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-[#EE628B] rounded-full"
                style={{ width: progressWidth.nominal }}
              />
            </div>
            <div className="flex items-center gap-1 min-w-max">
              <Star className="w-4 h-4 text-[#EE628B] fill-[#EE628B]" />
              <span className="text-xs font-medium text-[#EE628B]">Glam Star</span>
            </div>
          </div>
        </div>

        {/* Voucher Section */}
        <div className="space-y-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">Voucher Kamu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vouchers.map((v) => (
              <div
                key={v.id}
                className="bg-pink-50 rounded-lg p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#EE628B]" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900 leading-none">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-500">{v.min}</p>
                  <p className="text-xs text-gray-500">{v.expiry}</p>
                </div>
                <button className="bg-[#EE628B] hover:bg-pink-600 text-white text-xs font-semibold px-4 py-1 rounded-md">
                  Klaim
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Benefits */}
        <div className="space-y-4 pb-8">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">Membership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.id}
                className="border border-dashed border-[#E9EBEC] rounded-lg p-4 flex gap-3 items-start"
              >
                <div className="bg-pink-50 p-2 rounded-md">{b.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {b.title}
                  </h4>
                  <p className="text-xs text-gray-600">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;
