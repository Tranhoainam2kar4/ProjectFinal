import { FaUtensils, FaHeadset, FaRedoAlt, FaLock } from 'react-icons/fa';

const features = [
  {
    icon: <FaUtensils className="text-red-500 text-4xl group-hover:scale-110 transition-transform duration-300" />,
    title: 'Giao hàng tận nơi',
    description: 'Thức ăn được giao nhanh chóng và luôn nóng hổi đến tận cửa nhà bạn.',
  },
  {
    icon: <FaHeadset className="text-red-500 text-4xl group-hover:scale-110 transition-transform duration-300" />,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ hỗ trợ thân thiện luôn sẵn sàng giải đáp mọi thắc mắc.',
  },
  {
    icon: <FaRedoAlt className="text-red-500 text-4xl group-hover:scale-110 transition-transform duration-300" />,
    title: 'Đổi món trong 30 phút',
    description: 'Không hài lòng? Hỗ trợ đổi món nhanh chóng trong 30 phút.',
  },
  {
    icon: <FaLock className="text-red-500 text-4xl group-hover:scale-110 transition-transform duration-300" />,
    title: 'Thanh toán an toàn',
    description: 'Bảo mật thông tin tuyệt đối khi thanh toán qua các cổng trực tuyến.',
  },
];

const FeatureIcons = () => {
  return (
    <div className="bg-[#fff7f2] py-16 px-4 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-10 border-b-4 border-red-500 inline-block">
        Vì sao nên chọn <span className="text-yellow-500">TastyHub</span>?
      </h2>
      <div className="grid md:grid-cols-2 gap-y-10 gap-x-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-5 group hover:bg-white rounded-xl p-4 transition-shadow duration-300 hover:shadow-lg"
          >
            {feature.icon}
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureIcons;
