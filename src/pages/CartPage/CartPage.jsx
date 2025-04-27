import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useAppContext } from "../../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    user,
    placeOrder,
    checkUserInfoComplete,
  } = useAppContext();
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User data in CartPage:", user);
  }, [user]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  };

  const showMissingInfoToast = () => {
    const missingFields = [];
    
    if (!user?.name) missingFields.push("Tên hiển thị");
    if (!user?.phone) missingFields.push("Số điện thoại");
    if (!user?.district) missingFields.push("Quận/Huyện");
    if (!user?.ward) missingFields.push("Phường/Xã");
    if (!user?.streetAddress) missingFields.push("Địa chỉ chi tiết");

    toast.warning(
      <div>
        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Vui lòng cập nhật đầy đủ thông tin:
        </div>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px", margin: "5px 0" }}>
          {missingFields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
        <button
          onClick={() => {
            toast.dismiss();
            navigate("/edit-profile");
          }}
          style={{
            marginTop: "10px",
            color: "#1890ff",
            textDecoration: "underline",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "5px 0",
            fontSize: "14px",
          }}
        >
          Đến trang cập nhật thông tin
        </button>
      </div>,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
        closeButton: true,
      }
    );
  };

  const handleCheckout = () => {
    if (!checkUserInfoComplete()) {
      showMissingInfoToast();
      return;
    }
    placeOrder();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-30 md:mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2">
              <FaShoppingCart /> Giỏ hàng của bạn
            </h1>
            <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              {cartItems.length} món
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">Giỏ hàng trống</p>
              <p>Hãy thêm món ăn ngon vào giỏ hàng nhé!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={`${item.id}-${item.category}`} 
                className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-1/4 h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className={`px-3 py-1 ${
                          item.quantity <= 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <span className="text-orange-600 font-bold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-orange-600">
                {calculateTotal().toLocaleString("vi-VN")}đ
              </span>
            </div>

            <button
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              onClick={handleCheckout}
            >
              Đặt hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;