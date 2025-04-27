import { useAppContext } from "../../context/AppProvider";
import { FaBoxOpen } from "react-icons/fa";

const Orders = () => {
  const { userOrders } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-30 md:mt-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2">
              <FaBoxOpen /> Đơn hàng của bạn
            </h1>
            <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              {userOrders.length} đơn
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {userOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">Bạn chưa có đơn hàng nào</p>
              <p>Hãy đặt món ngon ngay nào!</p>
            </div>
          ) : (
            userOrders.map((order, index) => (
              <div key={index} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/4 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={order.image}
                    alt="Order Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">Mã đơn: {order.id}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mt-1">Ngày đặt: {order.date}</p>
                  <p className="text-gray-500 text-sm mt-1">Trạng thái: <span className="font-medium text-orange-600">{order.status}</span></p>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {order.items.length} món
                    </div>
                    <span className="text-orange-600 font-bold">
                      {order.total.toLocaleString('vi-VN')}đ
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700">Sản phẩm:</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between text-sm text-gray-600">
                          <span>{item.name}</span>
                          <span>{item.quantity} x {item.price.toLocaleString('vi-VN')}đ</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;