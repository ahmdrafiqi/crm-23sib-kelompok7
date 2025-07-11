// src/data/produk.js
const allProducts = [
  {
    id: 1,
    name: "SKINTIFIC Aqua Light Daily Sunscreen SPF 35",
    brand: "SKINTIFIC",
    category: "skincare",
    price: 74100,
    originalPrice: 98800,
    discount: 25,
    rating: 4.8,
    reviews: 1200,
    image: "assets/gambarUser/SKINTIFIC_Aqua_Light_Daily_Sunscreen_SPF_35.jpeg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Maybelline SuperStay Matte Ink Liquid Lipstick",
    brand: "MAYBELLINE",
    category: "makeup",
    price: 89000,
    originalPrice: 120000,
    discount: 26,
    rating: 4.6,
    reviews: 2500,
    image:
      "assets/gambarUser/Maybelline_SuperStay_Matte_Ink_Liquid_Lipstick.png",
    isNew: false,
    isBestseller: true,
  },

  {
    id: 3,
    name: "Fenty Beauty Gloss Bomb Universal Lip Luminizer",
    brand: "FENTY BEAUTY",
    category: "makeup",
    price: 285000,
    originalPrice: 320000,
    discount: 11,
    rating: 4.7,
    reviews: 1950,
    image:
      "assets/gambarUser/Fenty_Beauty_Gloss_Bomb_Universal_Lip_Luminizer.jpeg",
    isNew: false,
    isBestseller: true,
  },

  {
    id: 4,
    name: "COSRX Advanced Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "skincare",
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    rating: 4.9,
    reviews: 3200,
    image:
      "assets/gambarUser/COSRX_Advanced_Snail_96_Mucin_Power_Essence.jpeg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 5,
    name: "Urban Decay Naked Heat Eyeshadow Palette",
    brand: "URBAN DECAY",
    category: "makeup",
    price: 650000,
    originalPrice: 780000,
    discount: 17,
    rating: 4.8,
    reviews: 1100,
    image:
      "assets/gambarUser/Urban_Decay_Naked_Heat_Eyeshadow_Palette.jpeg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 6,
    name: "Cetaphil Gentle Skin Cleanser",
    brand: "CETAPHIL",
    category: "skincare",
    price: 125000,
    originalPrice: 150000,
    discount: 17,
    rating: 4.5,
    reviews: 1800,
    image: "assets/gambarUser/Cetaphil_Gentle_Skin_Cleanser.jpeg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 7,
    name: "Bath & Body Works Japanese Cherry Blossom",
    brand: "BATH & BODY WORKS",
    category: "bodycare",
    price: 299000,
    originalPrice: 350000,
    discount: 15,
    rating: 4.6,
    reviews: 750,
    image:
      "assets/gambarUser/Bath_&_Body_Works_Japanese_Cherry_Blossom.jpeg",
    isNew: false,
    isBestseller: false,
  },

  // 20 produk tambahan juga disesuaikan format dan category, image pathnya sesuai kamu punya
  {
    id: 9,
    name: "Emina Bright Stuff Face Wash",
    brand: "EMINA",
    category: "skincare",
    price: 18500,
    originalPrice: 23000,
    discount: 20,
    rating: 4.5,
    reviews: 820,
    image: "assets/gambarUser/Emina_Bright_Stuff_Face_Wash.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 10,
    name: "Make Over Powerstay Foundation",
    brand: "MAKE OVER",
    category: "makeup",
    price: 149000,
    originalPrice: 179000,
    discount: 17,
    rating: 4.6,
    reviews: 1900,
    image: "assets/gambarUser/MakeOverPowerstayFoundation.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 11,
    name: "Wardah Lightening Night Cream",
    brand: "WARDAH",
    category: "skincare",
    price: 37000,
    originalPrice: 46000,
    discount: 20,
    rating: 4.4,
    reviews: 680,
    image: "assets/gambarUser/WardahLighteningNightCream.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 12,
    name: "Somethinc Niacinamide + Moisture Beet Serum",
    brand: "SOMETHINC",
    category: "skincare",
    price: 95000,
    originalPrice: 119000,
    discount: 20,
    rating: 4.9,
    reviews: 5200,
    image:
      "assets/gambarUser/Somethinc_Niacinamide_+_Moisture_BeetSerum.jpeg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 13,
    name: "Azarine Hydrasoothe Sunscreen Gel SPF 45",
    brand: "AZARINE",
    category: "skincare",
    price: 62000,
    originalPrice: 75000,
    discount: 17,
    rating: 4.8,
    reviews: 4100,
    image: "assets/gambarUser/Azarine_Hydrasoothe_SunscreenGel_SPF_45.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 14,
    name: "Luxcrime Blur & Cover Two Way Cake",
    brand: "LUXCRIME",
    category: "makeup",
    price: 99000,
    originalPrice: 129000,
    discount: 23,
    rating: 4.7,
    reviews: 1200,
    image: "assets/gambarUser/Luxcrime_Blur_&_Cover_Two_Way_Cake.jpeg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 15,
    name: "YOU Simplicity Lip Cream",
    brand: "YOU",
    category: "makeup",
    price: 59000,
    originalPrice: 79000,
    discount: 25,
    rating: 4.5,
    reviews: 980,
    image: "assets/gambarUser/YOUSimplicityLipCream.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 16,
    name: "Implora Cheek & Lip Tint",
    brand: "IMPLORA",
    category: "makeup",
    price: 22000,
    originalPrice: 30000,
    discount: 27,
    rating: 4.4,
    reviews: 1500,
    image: "assets/gambarUser/Implora_Cheek_&_Lip_Tint.jpeg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 17,
    name: "Emina Sun Protection SPF 30",
    brand: "EMINA",
    category: "skincare",
    price: 26000,
    originalPrice: 32000,
    discount: 18,
    rating: 4.6,
    reviews: 1100,
    image: "assets/gambarUser/Emina_Sun_Protection_SPF_30.jpeg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 18,
    name: "Make Over Intense Matte Lip Cream",
    brand: "MAKE OVER",
    category: "makeup",
    price: 98000,
    originalPrice: 115000,
    discount: 15,
    rating: 4.8,
    reviews: 1650,
    image: "assets/gambarUser/MakeOverIntenseMatteLipCream.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 19,
    name: "Wardah C-Defense Serum",
    brand: "WARDAH",
    category: "skincare",
    price: 72000,
    originalPrice: 95000,
    discount: 24,
    rating: 4.7,
    reviews: 2100,
    image: "assets/gambarUser/Wardah_C-Defense_Serum.jpeg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 20,
    name: "Somethinc Ceramic Skin Saviour Moisturizer",
    brand: "SOMETHINC",
    category: "skincare",
    price: 119000,
    originalPrice: 135000,
    discount: 12,
    rating: 4.8,
    reviews: 3200,
    image:
      "assets/gambarUser/Somethinc_Ceramic_Skin_Saviour_Moisturizer.jpeg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 21,
    name: "Azarine Tone Up Mineral Sunscreen Serum",
    brand: "AZARINE",
    category: "skincare",
    price: 72000,
    originalPrice: 87000,
    discount: 17,
    rating: 4.6,
    reviews: 2700,
    image: "assets/gambarUser/Azarine_ToneUp_Mineral_Sunscreen_Serum.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 22,
    name: "YOU Golden Age Refining Serum",
    brand: "YOU",
    category: "skincare",
    price: 132000,
    originalPrice: 165000,
    discount: 20,
    rating: 4.7,
    reviews: 1430,
    image: "assets/gambarUser/YOUGoldenAgeRefiningSerum.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 23,
    name: "Implora Luminous Brightening Serum",
    brand: "IMPLORA",
    category: "skincare",
    price: 31000,
    originalPrice: 40000,
    discount: 22,
    rating: 4.5,
    reviews: 1300,
    image: "assets/gambarUser/Implora_Luminous_Brightening_Serum.jpeg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 24,
    name: "Emina Poppin' Matte Lip Cream",
    brand: "EMINA",
    category: "makeup",
    price: 39000,
    originalPrice: 48000,
    discount: 18,
    rating: 4.6,
    reviews: 1600,
    image: "assets/gambarUser/Emina_Poppin'_Matte_Lip_Cream.jpeg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 25,
    name: "Make Over Hydrastay Glow Flawless Powder",
    brand: "MAKE OVER",
    category: "makeup",
    price: 135000,
    originalPrice: 159000,
    discount: 15,
    rating: 4.8,
    reviews: 900,
    image: "assets/gambarUser/MakeOverHydrastayGlowFlawlessPowder.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 26,
    name: "Wardah Nature Daily Aloe Vera Gel",
    brand: "WARDAH",
    category: "skincare",
    price: 29000,
    originalPrice: 35000,
    discount: 17,
    rating: 4.5,
    reviews: 1400,
    image: "assets/gambarUser/WardahNatureDailyAloeVeraGel.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 27,
    name: "Somethinc Game Changer Tripeptide Eye Concentrate Gel",
    brand: "SOMETHINC",
    category: "skincare",
    price: 119000,
    originalPrice: 149000,
    discount: 20,
    rating: 4.9,
    reviews: 2200,
    image:"assets/gambarUser/Somethinc_Game_Changer_Tripeptide_Eye_Concentrate_Gel.jpeg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 28,
    name: "Azarine Acne Spot Gel",
    brand: "AZARINE",
    category: "skincare",
    price: 35000,
    originalPrice: 45000,
    discount: 22,
    rating: 4.7,
    reviews: 1800,
    image: "assets/gambarUser/Azarine_Acne_Spot_Gel.jpg",
    isNew: false,
    isBestseller: false,
  },
];

const categories = [
  { value: "all", label: "Semua Produk", count: allProducts.length },
  ...Array.from(new Set(allProducts.map((p) => p.category))).map((cat) => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: allProducts.filter((p) => p.category === cat).length,
  })),
];

export { allProducts, categories };

// data/produk.js
export const dummyReviews = [
  {
    name: "Dewi Lestari",
    rating: 5,
    comment:
      "Produknya bagus banget, sesuai ekspektasi! Pengiriman juga cepat.",
  },
  {
    name: "Adit Wicaksono",
    rating: 4,
    comment:
      "Lumayan oke, tapi kemasannya sedikit penyok. Kualitas tetap bagus.",
  },
  {
    name: "Rina Ayu",
    rating: 5,
    comment: "Top! Udah langganan dari dulu. Rekomended banget.",
  },
];
