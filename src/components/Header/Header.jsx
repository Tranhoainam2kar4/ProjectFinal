import { CiSearch } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link, Links } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Navigation */}
      <nav className="border-b">
        <div className="px-5 md:px-10 xl:px-32 flex justify-between items-center flex-wrap md:flex-nowrap py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl flex items-center gap-2 font-bold uppercase w-full md:w-auto justify-center md:justify-start mb-2 md:mb-0"
          >
            <IoFastFoodSharp className="text-orange-600" />
            <p className="text-orange-900">Tasty</p>
            <p className="text-orange-600">Hub</p>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:block flex-1">
            <ul className="flex items-center justify-center gap-6 text-gray-700 font-medium">
              {["Hot", "Rice", "Noodle", "Bread", "Beverage"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/category/${item}`}
                    className="hover:text-orange-600 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center md:justify-end gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
            {/* Search Icon */}
            <div
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-xl text-gray-600 px-3 py-2 cursor-pointer hover:text-orange-600 transition-colors hidden md:block"
            >
              <CiSearch />
            </div>

            {/* Mobile Search Input */}
            <div className="relative block md:hidden flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm món ăn..."
                className="w-full pr-10 pl-3 py-2 text-sm border border-gray-300 rounded-full outline-none bg-white text-gray-700"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xl text-gray-600 px-3 py-2">
                <CiSearch />
              </div>
            </div>

            {/* Cart */}
            <button className="text-2xl hover:bg-orange-600 hover:text-white rounded-full p-2 duration-200 cursor-pointer text-orange-600">
              <Link to="/cart">
                <PiShoppingCartThin />
              </Link>
            </button>

            {/* Login */}
            <button className="hover:bg-orange-600 text-orange-600 font-semibold hover:text-white rounded-md border-2 border-orange-600 px-6 py-2 duration-200 hidden md:block cursor-pointer">
              <Link to="/Login">Đăng nhập</Link>
            </button>

            {/* Mobile Menu Icon */}
            <div className="md:hidden" onClick={() => setOpen(!open)}>
              <MdMenu className="text-4xl cursor-pointer text-gray-700" />
            </div>
          </div>
        </div>
      </nav>

      {/* Search Input - Desktop, gắn liền với header */}
      {searchOpen && (
        <div className="bg-white w-full py-6 border-t border-b shadow-sm flex justify-center items-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-3xl px-4">
            <input
              type="text"
              placeholder="Nhập món bạn muốn tìm..."
              className="w-full px-5 py-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-orange-600 text-gray-700 shadow-sm"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="flex items-center gap-2 text-orange-600 hover:text-white hover:bg-orange-600 font-semibold px-4 py-2 rounded-full border border-orange-600 transition duration-200 cursor-pointer"
            >
              <AiOutlineClose className="text-xl" />
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Responsive Menu Component */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
