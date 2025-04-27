import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

const BASE_URL = "http://localhost:8080/api/v1";

// Hàm authFetch để thêm Authorization token vào header của request
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");  // Lấy token từ localStorage
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,  // Thêm token vào header
      "Content-Type": "application/json", // Thiết lập kiểu nội dung là JSON
    },
  });
};

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);        // Lưu giỏ hàng của người dùng
  const [userOrders, setUserOrders] = useState([]);       // Lưu đơn hàng của người dùng
  const [user, setUser] = useState(null);                 // Lưu thông tin người dùng
  const isLoggedIn = !!user;                             // Kiểm tra người dùng có đăng nhập hay không

  // Hàm sử dụng useEffect để fetch dữ liệu ban đầu (user, cart, orders) khi trang được load
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("token");  // Lấy token từ localStorage
      if (!token) return;  // Nếu không có token, người dùng chưa đăng nhập

      try {
        // Fetch thông tin người dùng, giỏ hàng và đơn hàng đồng thời
        const [userRes, cartRes, ordersRes] = await Promise.all([
          authFetch("/api/user/me"),
          authFetch("/api/cart"),
          authFetch("/api/orders"),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);  // Lưu thông tin người dùng
        } else {
          logout();  // Nếu token hết hạn hoặc không hợp lệ, thực hiện đăng xuất
        }

        if (cartRes.ok) {
          const cartData = await cartRes.json();
          setCartItems(cartData);  // Lưu thông tin giỏ hàng
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setUserOrders(ordersData);  // Lưu đơn hàng của người dùng
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    fetchInitialData();  // Gọi hàm fetch dữ liệu ban đầu
  }, []);  // Chỉ chạy lần đầu khi component được mount

  // Hàm kiểm tra thông tin người dùng đã đầy đủ chưa
  const checkUserInfoComplete = () => {
    if (!user) return false;
    const requiredFields = ['name', 'phone', 'district', 'ward', 'streetAddress'];
    return requiredFields.every(field => user[field] && user[field].trim() !== '');
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token");  // Xóa token khỏi localStorage
    setUser(null);  // Đặt lại thông tin người dùng
    setCartItems([]);  // Xóa giỏ hàng
    setUserOrders([]);  // Xóa đơn hàng
    toast.success("Đăng xuất thành công!");
  };

  // Hàm cập nhật thông tin người dùng
  const updateUser = async (updatedUser) => {
    try {
      const res = await authFetch("/api/user/update", {
        method: "PUT",
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);  // Cập nhật thông tin người dùng sau khi cập nhật thành công
        toast.success("Cập nhật thông tin thành công!");
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Cập nhật thất bại!");
    }
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }

    try {
      const res = await authFetch("/api/cart/add", {
        method: "POST",
        body: JSON.stringify({ productId: product.id }),
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart);  // Cập nhật lại giỏ hàng
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
      } else {
        toast.error("Không thể thêm sản phẩm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng!");
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (productId) => {
    try {
      const res = await authFetch(`/api/cart/remove/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart);  // Cập nhật lại giỏ hàng
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
      } else {
        toast.error("Không thể xóa sản phẩm!");
      }
    } catch (error) {
      console.error("Remove cart error:", error);
      toast.error("Lỗi khi xóa sản phẩm!");
    }
  };

  // Hàm tăng số lượng sản phẩm trong giỏ hàng
  const increaseQuantity = async (productId) => {
    try {
      const res = await authFetch(`/api/cart/increase/${productId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart);  // Cập nhật lại giỏ hàng
      }
    } catch (error) {
      console.error("Increase quantity error:", error);
    }
  };

  // Hàm giảm số lượng sản phẩm trong giỏ hàng
  const decreaseQuantity = async (productId) => {
    try {
      const res = await authFetch(`/api/cart/decrease/${productId}`, {
        method: "PATCH",
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCartItems(updatedCart);  // Cập nhật lại giỏ hàng
      }
    } catch (error) {
      console.error("Decrease quantity error:", error);
    }
  };

  // Hàm làm sạch giỏ hàng
  const clearCart = async () => {
    try {
      const res = await authFetch("/api/cart/clear", {
        method: "DELETE",
      });

      if (res.ok) {
        setCartItems([]);  // Làm sạch giỏ hàng
        toast.success("Giỏ hàng đã được làm sạch!");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Không thể làm sạch giỏ hàng!");
    }
  };

  // Hàm đặt hàng
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng đang trống!");
      return;
    }

    if (!checkUserInfoComplete()) {
      toast.error("Vui lòng cập nhật đầy đủ thông tin cá nhân trước khi đặt hàng!");
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      address: `${user.streetAddress}, ${user.ward}, ${user.district}`,
    };

    try {
      const res = await authFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const newOrder = await res.json();
        setUserOrders(prev => [...prev, newOrder]);  // Cập nhật đơn hàng của người dùng
        setCartItems([]);  // Xóa giỏ hàng sau khi đặt hàng
        toast.success("Đặt hàng thành công!");
      } else {
        toast.error("Đặt hàng thất bại!");
      }
    } catch (error) {
      console.error("Place order error:", error);
      toast.error("Đặt hàng thất bại!");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        logout,
        updateUser,
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        userOrders,
        placeOrder,
        clearCart,
        checkUserInfoComplete,
        BASE_URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
