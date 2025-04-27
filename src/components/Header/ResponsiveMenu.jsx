import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";

const ResponsiveMenu = ({ open, setOpen }) => {
  const categories = ['Home', 'New', 'Hot', 'About Us'];
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 w-full h-screen z-20 bg-orange-600 text-white"
        >
          {/* Nút đóng */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
            aria-label="Đóng menu"
          >
            <AiOutlineClose />
          </button>

          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col items-center gap-8 text-2xl uppercase">
              {categories.map((category) => {
                const categoryId = category.toLowerCase().replace(/\s+/g, '-');
                const isActive = activeCategory === categoryId;
                
                return (
                  <motion.li 
                    key={category}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ScrollLink
                      to={categoryId}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      onClick={() => handleCategoryClick(categoryId)}
                      className={`relative cursor-pointer px-4 py-2 transition-all ${
                        isActive 
                          ? "text-orange-900 font-bold" 
                          : "text-white hover:text-orange-300"
                      }`}
                    >
                      {category}
                      {isActive && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute left-0 bottom-0 w-full h-1 bg-orange-900 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </ScrollLink>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;