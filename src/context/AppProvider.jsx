// src/context/AppProvider.jsx
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
  
    // Nếu có user thì dùng, nếu không thì tạo user giả
    if (storedUser) return JSON.parse(storedUser);
  
    const fakeUser = {
      name: "Nguyen Van A",
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "test@example.com",
    };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    return fakeUser;
  });
  

  const isLoggedIn = !!user;

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Đăng nhập thành công!");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Đã đăng xuất!");
  };

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hay chưa
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.category === product.category
    );

    // Cập nhật giỏ hàng
    setCartItems((prev) => {
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.category === product.category
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
            price: Number(product.price) || 0,
          },
        ];
      }
    });

    // Toast chỉ gọi **một lần** sau khi setCartItems được kích hoạt
    if (existingItem) {
      toast.success(`Đã tăng số lượng "${product.name}" trong giỏ hàng!`);
    } else {
      toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.error("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
