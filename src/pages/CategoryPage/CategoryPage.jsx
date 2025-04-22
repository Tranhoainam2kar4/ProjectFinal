import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductModal from "../../components/ProductModal/ProductModal";

const fakeData = {
  Hot: [
    {
      id: "hot-1",
      name: "Cơm gà",
      price: 45000,
      image: "/food1.jpg",
      description: "Cơm gà thơm ngon với nước mắm đặc biệt.",
    },
    {
      id: "hot-2",
      name: "Cơm sườn",
      price: 50000,
      image: "/food2.jpg",
      description: "Cơm sườn mềm, đậm đà, ăn là ghiền!",
    },
  ],
  Rice: [
    {
      id: "rice-1",
      name: "Cơm gà",
      price: 45000,
      image: "/food1.jpg",
      description: "Món cơm gà quen thuộc, đầy đủ dinh dưỡng.",
    },
    {
      id: "rice-2",
      name: "Cơm sườn",
      price: 50000,
      image: "/food2.jpg",
      description: "Sườn nướng thơm lừng ăn cùng cơm trắng.",
    },
  ],
  Noodle: [
    {
      id: "noodle-1",
      name: "Phở bò",
      price: 40000,
      image: "/food3.jpg",
      description: "Phở bò truyền thống với nước dùng đậm đà.",
    },
    {
      id: "noodle-2",
      name: "Bún chả",
      price: 45000,
      image: "/food4.jpg",
      description: "Bún chả Hà Nội thơm ngon đúng vị.",
    },
  ],
  Bread: [
    {
      id: "bread-1",
      name: "Bánh mì thịt",
      price: 25000,
      image: "/food5.jpg",
      description: "Bánh mì kẹp thịt ngon, nóng giòn.",
    },
    {
      id: "bread-2",
      name: "Bánh mì trứng",
      price: 20000,
      image: "/food6.jpg",
      description: "Bánh mì kẹp trứng đơn giản, dễ ăn.",
    },
  ],
  Beverage: [
    {
      id: "beverage-1",
      name: "Trà sữa",
      price: 35000,
      image: "/food7.jpg",
      description: "Trà sữa ngọt ngào, mát lạnh giải nhiệt.",
    },
    {
      id: "beverage-2",
      name: "Cà phê sữa",
      price: 30000,
      image: "/food8.jpg",
      description: "Cà phê sữa đậm đà, thơm nức mũi.",
    },
  ],
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const data = fakeData[categoryName] || [];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct({
      ...product,
      category: categoryName
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="mt-30 md:mt-24 px-4 md:px-10 xl:px-32">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        Danh mục: {categoryName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((item) => (
            <ProductCard
              key={`${categoryName}-${item.id}`}
              product={{
                ...item,
                category: categoryName
              }}
              onClick={() => handleOpenModal(item)}
            />
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default CategoryPage;