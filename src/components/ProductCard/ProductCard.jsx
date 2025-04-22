// src/components/ProductCard/ProductCard.js
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useAppContext } from "../../context/AppProvider";

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };

  return (
    <div className="relative group rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all">
      <div
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-all duration-700 ease-in-out group-hover:scale-105 absolute top-0 left-0 z-10"
        />

        <div className="absolute bottom-0 left-0 w-full bg-amber-500/90 text-white text-sm font-medium py-2 text-center translate-y-full group-hover:translate-y-0 transition duration-300 z-30 rounded-t-md">
          <div className="flex items-center justify-center gap-2">
            <FaEye className="text-white text-sm" />
            <span>Xem chi tiết</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-amber-600">
            {product.price.toLocaleString()}đ
          </p>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-amber-500 text-white px-3 py-2 rounded-full hover:bg-amber-600 transition text-sm cursor-pointer"
          >
            <FaShoppingCart />
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;