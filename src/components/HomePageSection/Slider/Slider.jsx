import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const sliderData = [
  {
    imgSrc: "/food1.jpg",
    title: "Margherita Pizza",
    description:
      "Classic Italian pizza topped with fresh tomatoes, mozzarella cheese, and basil leaves.",
    categories: ["Pizza", "Vegetarian"],
  },
  {
    imgSrc: "/food2.jpg",
    title: "Sushi Platter",
    description:
      "Assorted sushi rolls including salmon, tuna, and vegetarian options served with soy sauce and wasabi.",
    categories: ["Japanese", "Seafood"],
  },
  {
    imgSrc: "/food3.jpg",
    title: "BBQ Pork Ribs",
    description:
      "Juicy pork ribs slow-cooked and glazed with smoky barbecue sauce, served with fries.",
    categories: ["BBQ", "Main Dish"],
  },
  {
    imgSrc: "/food4.jpg",
    title: "Vegan Burger",
    description:
      "Plant-based patty with lettuce, tomato, avocado, and vegan mayo in a toasted bun.",
    categories: ["Burger", "Vegan"],
  },
  {
    imgSrc: "/food5.jpg",
    title: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
    categories: ["Dessert", "Popular"],
  },
  {
    imgSrc: "/food6.jpg",
    title: "Vietnamese Beef Pho",
    description:
      "Traditional Vietnamese noodle soup with rich beef broth, rice noodles, and fresh herbs.",
    categories: ["Vietnamese", "Soup"],
  },
  {
    imgSrc: "/food7.jpg",
    title: "Caesar Salad",
    description:
      "Crisp romaine lettuce tossed with Caesar dressing, parmesan cheese, and crunchy croutons.",
    categories: ["Salad", "Healthy"],
  },
  {
    imgSrc: "/food8.jpg",
    title: "Fruit Yogurt Parfait",
    description:
      "Layered dessert with Greek yogurt, honey, granola, and seasonal fruits.",
    categories: ["Dessert", "Healthy"],
  },
];

const Slider = () => {
  const swiperWrappedRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  function adjustMargin() {
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
  }

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
          {sliderData.map((slide, index) => (
            <SwiperSlide key={index}>
              <img src={slide.imgSrc} alt={slide.title} />
              <div className="title">
                <h1>{slide.title}</h1>
              </div>
              <div className="content">
                <div className="text-box">
                  <p>{slide.description}</p>
                </div>
                <div className="footer">
                  <div className="category">
                    {slide.categories.map((category, idx) => (
                      <span key={idx} style={{ "--i": idx + 1 }}>
                        {category}
                      </span>
                    ))}
                  </div>
                  <button className="my_btn">
                    <span className="label">More...</span>
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
          <FaChevronLeft/>
        </button>
        <button
          className="nav-button nav-button-right"
          onClick={() => swiperInstanceRef.current?.slideNext()}
        >
          <FaChevronRight/>
        </button>
      </div>
    </div>
  );
};

export default Slider;
