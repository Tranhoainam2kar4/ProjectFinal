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
    {
      id: "hot-3",
      name: "Bún đậu mắm tôm",
      price: 60000,
      image: "/food9.jpg",
      description: "Bún lá, đậu hũ chiên, chả cốm và mắm tôm đặc trưng.",
    },
    {
      id: "hot-4",
      name: "Lẩu gà lá é",
      price: 180000,
      image: "/food10.jpg",
      description: "Lẩu gà thơm nồng vị lá é, ấm bụng ngày lạnh.",
    },
    {
      id: "hot-5",
      name: "Mì xào bò",
      price: 55000,
      image: "/food11.jpg",
      description: "Sợi mì dai mềm xào cùng thịt bò và rau củ.",
    },
    {
      id: "hot-6",
      name: "Phở cuốn",
      price: 40000,
      image: "/food12.jpg",
      description: "Phở cuốn thanh mát với thịt bò, rau thơm và nước chấm chua ngọt.",
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
    {
      id: "rice-3",
      name: "Cơm chiên hải sản",
      price: 70000,
      image: "/food13.jpg",
      description: "Cơm chiên tơi hạt với tôm, mực và các loại hải sản.",
    },
    {
      id: "rice-4",
      name: "Cơm bò lúc lắc",
      price: 80000,
      image: "/food14.jpg",
      description: "Thịt bò lúc lắc mềm ngọt ăn kèm cơm nóng.",
    },
    {
      id: "rice-5",
      name: "Cơm rau thập cẩm",
      price: 40000,
      image: "/food15.jpg",
      description: "Món cơm chay thanh đạm với nhiều loại rau củ.",
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
    {
      id: "noodle-3",
      name: "Hủ tiếu gõ",
      price: 35000,
      image: "/food16.jpg",
      description: "Hủ tiếu dai ngon với nước lèo ngọt thanh.",
    },
    {
      id: "noodle-4",
      name: "Mì quảng",
      price: 50000,
      image: "/food17.jpg",
      description: "Mì quảng đậm đà hương vị miền Trung.",
    },
    {
      id: "noodle-5",
      name: "Bánh canh cua",
      price: 65000,
      image: "/food18.jpg",
      description: "Bánh canh chả cua thơm ngon, bổ dưỡng.",
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
    {
      id: "bread-3",
      name: "Bánh mì chả lụa",
      price: 22000,
      image: "/food19.jpg",
      description: "Bánh mì kẹp chả lụa thơm ngon.",
    },
    {
      id: "bread-4",
      name: "Bánh mì xíu mại",
      price: 30000,
      image: "/food20.jpg",
      description: "Bánh mì nóng giòn ăn kèm xíu mại đậm đà.",
    },
    {
      id: "bread-5",
      name: "Bánh mì pate",
      price: 28000,
      image: "/food21.jpg",
      description: "Bánh mì pate béo ngậy, thơm lừng.",
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
    {
      id: "beverage-3",
      name: "Nước ép cam",
      price: 30000,
      image: "/food22.jpg",
      description: "Nước ép cam tươi mát, giàu vitamin C.",
    },
    {
      id: "beverage-4",
      name: "Sinh tố bơ",
      price: 40000,
      image: "/food23.jpg",
      description: "Sinh tố bơ sánh mịn, béo ngậy.",
    },
    {
      id: "beverage-5",
      name: "Coca-Cola",
      price: 15000,
      image: "/food24.jpg",
      description: "Nước ngọt có gas quen thuộc.",
    },
    {
      id: "beverage-6",
      name: "Trà chanh",
      price: 25000,
      image: "/food25.jpg",
      description: "Trà chanh chua ngọt, giải khát tuyệt vời.",
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