import React from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-100 pt-16 pb-7 px-6 md:px-20 xl:px-40 text-base text-orange-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo & mô tả */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-4xl font-bold flex items-center gap-2 text-orange-900 mb-4">
            <IoFastFoodSharp className="text-orange-600 text-5xl" />
            <span>Tasty</span>
            <span className="text-orange-600">Hub</span>
          </div>
          <p className="text-lg text-orange-700 text-center md:text-left leading-relaxed">
            Mang đến những món ăn ngon, nhanh và an toàn cho mọi bữa ăn mỗi ngày.
          </p>
        </div>

        {/* Thông tin liên hệ */}
        <div>
          <h3 className="font-semibold text-orange-900 uppercase text-xl mb-4">Thông tin liên hệ</h3>
          <div className="h-[2px] w-10 bg-orange-400 mb-4"></div>
          <p className="mb-2 text-lg">📍 Km9 đường Nguyễn Trãi, Văn Quán, Nam Từ Liêm, Hà Nội</p>
          <p className="mb-2 text-lg">✉️ contact@nhanh.vn</p>
          <p className="text-lg">📞 0123456789</p>
        </div>

        {/* Chính sách - giữ nguyên như bạn yêu cầu */}
        <div>
          <h3 className="font-bold mb-2 uppercase text-orange-900 text-xl">Chính sách</h3>
          <div className="h-[2px] w-10 bg-orange-400 mb-4"></div>
          <ul className="space-y-3 text-lg">
            <li>Hotline hỗ trợ đơn hàng: 0123456789</li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="font-semibold text-orange-900 uppercase text-xl mb-4">Mạng xã hội</h3>
          <div className="h-[2px] w-10 bg-orange-400 mb-4"></div>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-3">
              <FaFacebookF className="text-blue-600 text-xl" />
              <a href="#" className="hover:text-orange-500 font-medium">Facebook</a>
            </li>
            <li className="flex items-center gap-3">
              <FaInstagram className="text-pink-500 text-xl" />
              <a href="#" className="hover:text-orange-500 font-medium">Instagram</a>
            </li>
            <li className="flex items-center gap-3">
              <FaYoutube className="text-red-600 text-xl" />
              <a href="#" className="hover:text-orange-500 font-medium">YouTube</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 border-t pt-6 text-center text-sm text-orange-600">
        © 2025 TastyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
