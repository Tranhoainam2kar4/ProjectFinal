import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.category === product.category
      );

      if (existingItem) {
        toast.success(`Đã tăng số lượng "${product.name}" trong giỏ hàng!`);
        return prev.map((item) =>
          item.id === product.id && item.category === product.category
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
        return [
          ...prev,
          {
            ...product,
            quantity: 1,
            price: Number(product.price) || 0
          }
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.error("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
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