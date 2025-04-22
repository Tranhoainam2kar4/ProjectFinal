import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const ResponsiveMenu = ({ open, setOpen }) => {
  const location = useLocation();
  const categories = ['Hot', 'Rice', 'Noodle', 'Bread', 'Beverage'];

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 w-full h-screen z-20 bg-orange-600 text-white"
        >
          {/* Nút đóng */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl"
            aria-label="Đóng menu"
          >
            <AiOutlineClose />
          </button>

          <div className="text-xl font-semibold py-10 m-6">
            <ul className="flex flex-col justify-center items-center gap-10 h-full text-2xl uppercase tracking-wide">
              {categories.map((cat) => {
                const isActive = location.pathname === `/category/${cat}`;
                return (
                  <li
                    key={cat}
                    className={`transition duration-200 ${
                      isActive
                        ? "text-orange-900 font-bold underline"
                        : "hover:text-orange-900"
                    }`}
                  >
                    <Link
                      to={`/category/${cat}`}
                      onClick={() => setOpen(false)}
                    >
                      {cat}
                    </Link>
                  </li>
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
