import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShoppingCart } from "react-icons/fa";
import { useAppContext } from "../../context/AppProvider";

const ProductModal = ({ isOpen, onClose, product, customPositionClass = "" }) => {
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    if (!product) return;
  
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
      return;
    }
  
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category
    });
  
    onClose();
  };
  

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className={`fixed z-50 w-[90vw] md:w-[80vw] lg:w-[70vw] max-w-4xl h-[75vh] min-h-[500px] max-h-[750px] transform bg-white rounded-lg shadow-xl overflow-hidden flex flex-col
            ${customPositionClass || "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex flex-col lg:flex-row h-full">
              <div className="lg:w-2/3 h-48 sm:h-56 md:h-64 lg:h-full bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:w-1/3 p-6 flex flex-col h-full overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 rounded-full text-white focus:outline-none shadow-md"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>

                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Giá:</span>
                    <span className="text-green-600 text-lg font-bold">
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full transition"
                  >
                    <FaShoppingCart />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
