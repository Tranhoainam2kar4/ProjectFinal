import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "../../ProductModal/ProductModal";

const NewDishesSection = () => {
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleTryNowClick = (dish) => {
    setSelectedDish({
      ...dish,
      id: dish.id || Date.now() // Đảm bảo luôn có ID
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="px-6 md:px-20 py-20 bg-white relative">
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedDish}
      />

      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 relative inline-block">
          <span className="relative z-10">🍽️ Món Mới Nổi Bật</span>
          <span className="block h-1 w-20 bg-red-400 rounded-full mt-3 mx-auto" />
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Khám phá những món ăn mới nhất và hot nhất trong thực đơn hôm nay!
        </p>
      </div>

      <div className="flex flex-col gap-24">
        {newDishes.map((dish, index) => {
          const isImageLeft = index % 2 === 0;
          const hasSale = !!dish.salePrice;

          return (
            <div
              key={dish.id} // Sử dụng dish.id thay vì index
              className={`flex flex-col md:flex-row ${
                !isImageLeft ? "md:flex-row-reverse" : ""
              } items-center gap-10`}
            >
              <div className="flex-1">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full max-w-md mx-auto drop-shadow-xl"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between gap-4 text-center md:text-left">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    {dish.description}
                  </p>
                </div>

                <div
                  className={`mt-4 flex flex-col sm:flex-row items-center gap-4 ${
                    isImageLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {hasSale ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-500 line-through text-lg">
                        {formatCurrency(dish.price)}
                      </span>
                      <span className="text-red-500 font-bold text-xl">
                        {formatCurrency(dish.salePrice)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-orange-600 text-xl font-semibold">
                      {formatCurrency(dish.price)}
                    </span>
                  )}

                  <button
                    onClick={() => handleTryNowClick(dish)}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 hover:brightness-110 transition cursor-pointer"
                  >
                    Thử ngay
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const newDishes = [
  {
    id: 1, // ID duy nhất
    name: "Pizza Phô Mai Bùng Nổ",
    description: "Hòa quyện giữa lớp phô mai tan chảy và đế bánh giòn rụm...",
    image: "png5.png",
    price: 120000,
    salePrice: 95000,
  },
  {
    id: 2, // ID duy nhất
    name: "Trà Sữa Matcha Kem Cheese",
    description: "Thức uống mát lạnh kết hợp vị đắng nhẹ của matcha...",
    image: "png6.png",
    price: 55000,
  },
  // ... (thêm các sản phẩm khác với ID duy nhất)
];

export default NewDishesSection;