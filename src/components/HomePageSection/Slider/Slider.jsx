import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ProductModal from "../../ProductModal/ProductModal";

const sliderData = [
  {
    id: 1,
    imgSrc: "/food1.jpg",
    title: "Margherita Pizza",
    description: "Classic Italian pizza topped with fresh tomatoes, mozzarella cheese, and basil leaves.",
    price: 99000,
    category: "Pizza",
  },
  {
    id: 2,
    imgSrc: "/food2.jpg",
    title: "Sushi Platter",
    description: "Assorted sushi rolls including salmon, tuna, and vegetarian options served with soy sauce and wasabi.",
    price: 139000,
    category: "Japanese",
  },
  {
    id: 3,
    imgSrc: "/food3.jpg",
    title: "BBQ Pork Ribs",
    description: "Juicy pork ribs slow-cooked and glazed with smoky barbecue sauce, served with fries.",
    price: 159000,
    category: "BBQ",
  },
  {
    id: 4,
    imgSrc: "/food4.jpg",
    title: "Vegan Burger",
    description: "Plant-based patty with lettuce, tomato, avocado, and vegan mayo in a toasted bun.",
    price: 89000,
    category: "Vegan",
  },
  {
    id: 5,
    imgSrc: "/food5.jpg",
    title: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
    price: 69000,
    category: "Dessert",
  },
  {
    id: 6,
    imgSrc: "/food6.jpg",
    title: "Vietnamese Beef Pho",
    description: "Traditional Vietnamese noodle soup with rich beef broth, rice noodles, and fresh herbs.",
    price: 79000,
    category: "Vietnamese",
  },
  {
    id: 7,
    imgSrc: "/food7.jpg",
    title: "Caesar Salad",
    description: "Crisp romaine lettuce tossed with Caesar dressing, parmesan cheese, and crunchy croutons.",
    price: 69000,
    category: "Salad",
  },
  {
    id: 8,
    imgSrc: "/food8.jpg",
    title: "Fruit Yogurt Parfait",
    description: "Layered dessert with Greek yogurt, honey, granola, and seasonal fruits.",
    price: 59000,
    category: "Dessert",
  },
];

const Slider = () => {
  const swiperWrappedRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const adjustMargin = () => {
    const screenWidth = window.innerWidth;
    if (swiperWrappedRef.current) {
      swiperWrappedRef.current.style.marginLeft =
        screenWidth <= 520
          ? "0px"
          : screenWidth <= 650
          ? "-50px"
          : screenWidth <= 800
          ? "-100px"
          : "-150px";
    }
  };

  useEffect(() => {
    adjustMargin();
    window.addEventListener("resize", adjustMargin);
    return () => window.removeEventListener("resize", adjustMargin);
  }, []);

  return (
    <div className="slider1-wrapper">
      <div className="containerSlider">
        <Swiper
          modules={[Pagination]}
          grabCursor
          initialSlide={2}
          centeredSlides
          slidesPerView="auto"
          speed={800}
          slideToClickedSlide
          pagination={{ clickable: true }}
          breakpoints={{
            320: { spaceBetween: 40 },
            650: { spaceBetween: 30 },
            1000: { spaceBetween: 20 },
          }}
          onSwiper={(swiper) => {
            swiperWrappedRef.current = swiper.wrapperEl;
            swiperInstanceRef.current = swiper;
          }}
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={slide.imgSrc} alt={slide.title} />
              <div className="title">
                <h1>{slide.title}</h1>
              </div>
              <div className="content">
                <div className="text-box">
                  <p>{slide.description}</p>
                  <p className="text-lg font-semibold text-orange-500 mt-2">
                    {slide.price.toLocaleString()}đ
                  </p>
                </div>
                <div className="footer">
                  <div className="category">
                    <span style={{ "--i": 1 }}>{slide.category}</span>
                  </div>
                  <button
                    className="my_btn"
                    onClick={() =>
                      openModal({
                        ...slide,
                        name: slide.title,
                        image: slide.imgSrc,
                      })
                    }
                  >
                    <span className="label">Detail</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="nav-button nav-button-left"
          onClick={() => swiperInstanceRef.current?.slidePrev()}
        >
          <FaChevronLeft />
        </button>
        <button
          className="nav-button nav-button-right"
          onClick={() => swiperInstanceRef.current?.slideNext()}
        >
          <FaChevronRight />
        </button>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default Slider;
