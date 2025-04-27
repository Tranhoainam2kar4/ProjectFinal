import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [userOrders, setUserOrders] = useState(() => {
    const savedOrders = localStorage.getItem("userOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isLoggedIn = !!user;
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } else {
      hasMounted.current = true;
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("userOrders", JSON.stringify(userOrders));
  }, [userOrders]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const checkUserInfoComplete = () => {
    if (!user) return false;
    const requiredFields = ['name', 'phone', 'district', 'ward', 'streetAddress'];
    return requiredFields.every(field => user[field] && user[field].trim() !== '');
  };

  const login = (userData) => {
    setUser(userData);
    toast.success("Đăng nhập thành công!");
  };

  const logout = () => {
    setUser(null);
    toast.success("Đăng xuất thành công!");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    toast.success("Cập nhật thông tin thành công!");
  };

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.category === product.category
    );

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

  const clearCart = () => {
    setCartItems([]);
    toast.success("Giỏ hàng đã được làm sạch!");
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng đang trống!");
      return;
    }

    if (!checkUserInfoComplete()) {
      toast.error("Vui lòng cập nhật đầy đủ thông tin cá nhân trước khi đặt hàng!");
      return;
    }

    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toLocaleString('vi-VN'),
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      status: "Đang xử lý",
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      address: `${user.streetAddress}, ${user.ward}, ${user.district}`
    };

    setUserOrders((prev) => [...prev, newOrder]);
    setCartItems([]);
    toast.success("Đặt hàng thành công!");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);