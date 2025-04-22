import React from "react";
import { FaEye, FaShoppingCart } from "react-icons/fa";


const bestSellers = [
  {
    name: "Cơm Tấm Sườn Bì Chả",
    price: "75,000 ₫",
    image: "food1.jpg",
    detailImage: "food2.jpg",
  },
  {
    name: "Spicy Ramen",
    price: "85,000 ₫",
    image: "food2.jpg",
    detailImage: "food3.jpg",
  },
  {
    name: "Trà Sữa Trân Châu",
    price: "45,000 ₫",
    image: "food3.jpg",
    detailImage: "food4.jpg",
  },
  {
    name: "Bún Đậu Mắm Tôm",
    price: "60,000 ₫",
    image: "food4.jpg",
    detailImage: "food5.jpg",
  },
  {
    name: "Gà Rán Cay",
    price: "55,000 ₫",
    image: "food5.jpg",
    detailImage: "food6.jpg",
  },
  {
    name: "Bánh Mì Pate",
    price: "25,000 ₫",
    image: "food6.jpg",
    detailImage: "food7.jpg",
  },
  {
    name: "Phở Bò Truyền Thống",
    price: "70,000 ₫",
    image: "food7.jpg",
    detailImage: "food8.jpg",
  },
];

export default function BestSellersSection() {
  return (
    <section className="px-6 py-12 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-amber-600 tracking-wide">
        Món Bán Chạy
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {bestSellers.map((item, index) => (
          <div
            key={index}
            className="relative group rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all"
          >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden cursor-pointer">
              {/* Main Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain p-6 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0 absolute top-0 left-0 z-10"
              />

              {/* Detail Image on Hover */}
              <img
                src={item.detailImage}
                alt={`${item.name} detail`}
                className="w-full h-full object-contain p-6 transition-all duration-700 ease-in-out group-hover:scale-105 opacity-0 group-hover:opacity-100 absolute top-0 left-0 z-20"
              />

              {/* Detail Button Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-amber-500/90 text-white text-sm font-medium py-2 text-center translate-y-full group-hover:translate-y-0 transition duration-300 z-30 rounded-t-md">
                <div className="flex items-center justify-center gap-2">
                  <FaEye className="text-white text-sm" />
                  <span>Xem chi tiết</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 border-t text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {item.name}
              </h3>

              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-amber-600">{item.price}</p>
                <button className="flex items-center gap-2 bg-amber-500 text-white px-3 py-2 rounded-full hover:bg-amber-600 transition text-sm cursor-pointer">
                  <FaShoppingCart />
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
