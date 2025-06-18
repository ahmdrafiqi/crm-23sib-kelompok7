import React from "react";
import UserLayout from "../../components/HalamanUser/UserLayout";
import { Heart, Crown, Lock, Gift, Send, PiggyBank, Star, DollarSign, DollarSignIcon } from "lucide-react";

const tiers = [
  {
    id: "bronze",
    name: "Glam Babe",
    tier: "Bronze",
    icon: <Heart className="w-5 h-5 text-yellow-700" />,
    orders: "10 Pesanan atau Rp 500.000",
    bg: "bg-[#FFF7F1]",
    benefits: [
      {
        id: "diskon",
        title: "Diskon Member",
        desc: "Diskon 5% All item",
        icon: <Lock className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "bday",
        title: "Voucher Ulang Tahun",
        desc: "Nikmati voucher ulang tahun sebesar Rp 10.000",
        icon: <Gift className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "promo",
        title: "Akses Promo",
        desc: "Dapat mengikuti event promo mingguan",
        icon: <Send className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "support",
        title: "Customer Support",
        desc: "Reguler : Layanan bantuan pelanggan standar dengan respon maksimal 1 hari kerja.",
        icon: <Heart className="w-5 h-5 text-[#EE628B]" />,
      },
    ],
  },
  {
    id: "silver",
    name: "Glam Star",
    tier: "Silver",
    icon: <Star className="w-5 h-5 text-pink-700" />,
    orders: "15 Pesanan atau Rp 1.200.000",
    bg: "bg-[#ECEEFA]",
    benefits: [
      {
        id: "diskon",
        title: "Diskon Member",
        desc: "Diskon 5% All item",
        icon: <Lock className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "bday",
        title: "Voucher Ulang Tahun",
        desc: "Nikmati voucher ulang tahun sebesar Rp 10.000",
        icon: <Gift className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "promo",
        title: "Akses Promo",
        desc: "Dapat mengikuti event promo mingguan",
        icon: <Send className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "cashback",
        title: "Cashback",
        desc: "Rp 20.000 / setiap Rp 500.000",
        icon: <DollarSign className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "event",
        title: "Event Eksklusif",
        desc: "Undangan Beauty Class, grand opening",
        icon: <Gift className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "support",
        title: "Customer Support",
        desc: "Layanan prioritas dengan waktu tanggapan lebih cepat dibanding reguler",
        icon: <Heart className="w-5 h-5 text-[#EE628B]" />,
      },
    ],
  },
  {
    id: "gold",
    name: "Glam Queen",
    tier: "Gold",
    icon: <Crown className="w-5 h-5 text-yellow-600" />,
    orders: "25 Pesanan atau Rp 4.500.000",
    bg: "bg-[#F9E5E9]",
    benefits: [
      {
        id: "diskon",
        title: "Diskon Member",
        desc: "Diskon 15% untuk semua kategori produk",
        icon: <Lock className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "bday",
        title: "Voucher Ulang Tahun",
        desc: "Rp 50.000 + Mini Hampers dengan menunjukkan KTP",
        icon: <Gift className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "promo",
        title: "Akses Promo",
        desc: "Promo spesial dan produk edisi terbatas",
        icon: <Send className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "cashback",
        title: "Cashback",
        desc: "Rp 50.000 / setiap Rp 1.000.000",
        icon: <DollarSign className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "event",
        title: "Event & Eksklusif",
        desc: "Akses VIP ke event dan sesi bareng expert",
        icon: <Star className="w-5 h-5 text-[#EE628B]" />,
      },
      {
        id: "support",
        title: "Customer Support",
        desc: "Fast-track & prioritas tertinggi untuk bantuan pelanggan",
        icon: <Heart className="w-5 h-5 text-[#EE628B]" />,
      },
    ],
  },
];

const DetailMember = () => {
  return (
    <UserLayout>
      {/* Full‑screen wrapper */}
      <div className="w-full min-h-screen p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`${t.bg} rounded-lg shadow-sm flex flex-col`}
            >
              {/* Header */}
              <div className="p-6 flex flex-col gap-1">
                <div className="flex items-center gap-2 justify-center">
                  {t.icon}
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t.name} <span className="font-normal">({t.tier})</span>
                  </h2>
                </div>
                <p className="text-sm text-gray-600 text-center">{t.orders}</p>
              </div>

              {/* Benefits */}
              <div className="flex-1 flex flex-col">
                <h3 className="bg-[#EE628B] text-white text-sm font-semibold px-4 py-2 rounded-t-lg">
                  Benefits Membership
                </h3>
                <div className="flex-1 space-y-3 p-4 border border-dashed border-gray-300 rounded-b-lg bg-white/50">
                  {t.benefits.map((b) => (
                    <div
                      key={b.id}
                      className="flex gap-3 items-start p-3 border border-dashed border-gray-300 rounded-md bg-white"
                    >
                      <div className="p-2 bg-pink-50 rounded-md">{b.icon}</div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">
                          {b.title}
                        </h4>
                        <p className="text-xs text-gray-600">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                  {/* Placeholder box agar tinggi konsisten (opsional) */}
                  <div className="h-10 border border-dashed border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default DetailMember;
