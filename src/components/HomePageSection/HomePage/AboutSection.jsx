import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-orange-50 py-16 px-6 sm:px-10 md:px-20">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-orange-800">Về TastyHub</h2>
        <p className="text-lg text-orange-900 leading-relaxed">
          TastyHub không chỉ là một cửa hàng bán đồ ăn – chúng tôi là nơi mang hương vị **nhà** đến với bạn. 
          Từ những món ăn truyền thống Việt Nam đến các món ăn nhanh tiện lợi, 
          tất cả đều được chế biến từ **nguyên liệu tươi ngon**, đảm bảo vệ sinh và giữ trọn vị ngon tự nhiên.
        </p>
        <p className="text-base text-orange-700">
          Dù bạn là sinh viên vội vã giữa giờ học, nhân viên bận rộn giữa giờ nghỉ trưa, hay chỉ đơn giản là muốn tìm một bữa ăn ngon lành – 
          TastyHub luôn sẵn sàng phục vụ bạn với sự tận tâm và chất lượng hàng đầu.
        </p>
        <p className="text-sm text-orange-600 italic">
          "Ăn là phải ngon – nhanh – sạch. Đó là cam kết của TastyHub!"
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
