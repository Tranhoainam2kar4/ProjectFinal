import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TestimonialsSection = () => {
  const testimonialData = [
    {
      id: 1,
      desc: "Món ăn cực kỳ ngon, giao hàng nhanh và đóng gói rất cẩn thận!",
      img: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Nguyễn Thảo",
    },
    {
      id: 2,
      desc: "Mình đã thử nhiều nơi, nhưng ở đây là ngon nhất, chuẩn vị mẹ nấu!",
      img: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Trần Văn Hùng",
    },
    {
      id: 3,
      desc: "Dịch vụ tận tâm, món ăn đa dạng và rất hợp khẩu vị gia đình mình.",
      img: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Lê Minh Châu",
    },
    {
      id: 4,
      desc: "Thật sự ấn tượng với món bún bò và gỏi cuốn, rất tươi và ngon.",
      img: "https://randomuser.me/api/portraits/men/4.jpg",
      name: "Hoàng Tuấn",
    },
    {
      id: 5,
      desc: "Mình đặt thử hôm sinh nhật, ai cũng khen ngon, sẽ đặt lại!",
      img: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "Phạm Diễm My",
    },
    {
      id: 6,
      desc: "Ngon, sạch, giá hợp lý. Bé nhà mình ăn rất thích luôn!",
      img: "https://randomuser.me/api/portraits/men/6.jpg",
      name: "Ngô Đức",
    },
  ];

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const breakpointsResponsive = {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  const handleSwiperEvents = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Khách hàng nói gì?</h2>

        <div className="flex items-center gap-4">
          <button
            className={`custom-prev p-2 rounded-full text-white bg-orange-500 hover:bg-orange-600 transition cursor-pointer ${
              isBeginning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isBeginning}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`custom-next p-2 rounded-full text-white bg-orange-500 hover:bg-orange-600 transition cursor-pointer ${
              isEnd ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isEnd}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={breakpointsResponsive}
        onSlideChange={(swiper) => handleSwiperEvents(swiper)}
        onInit={(swiper) => handleSwiperEvents(swiper)}
        modules={[Navigation]}
        className="w-full"
      >
        {testimonialData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="h-[160px] px-5 py-3 bg-orange-50 rounded-2xl border border-orange-200 shadow-sm flex flex-col justify-around cursor-grab">
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-orange-300">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-base font-semibold text-orange-800">{item.name}</p>
              </div>

              {/* Feedback */}
              <p className="text-sm text-orange-900 leading-tight line-clamp-3 italic">
                “{item.desc}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsSection;
