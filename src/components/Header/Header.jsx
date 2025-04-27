import { CiSearch } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdMenu } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import ProductModal from "../ProductModal/ProductModal";
import { useAppContext } from "../../context/AppProvider";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAppContext();
  const categories = ["Home", "New", "Hot", "About Us"];
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để xem giỏ hàng!");
      return;
    }
    navigate("/cart");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY <= 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = mockProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 5));
  }, [searchTerm]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setSearchOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <nav className="border-b">
        <div className="px-5 md:px-10 xl:px-32 flex justify-between items-center flex-wrap md:flex-nowrap py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl flex items-center gap-2 font-bold uppercase w-full md:w-auto justify-center md:justify-start mb-2 md:mb-0">
            <IoFastFoodSharp className="text-orange-600" />
            <p className="text-orange-900">Tasty</p>
            <p className="text-orange-600">Hub</p>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:block flex-1">
            <ul className="flex items-center justify-center gap-6 text-gray-700 font-medium">
              {categories.map((item) => (
                <li key={item}>
                  <ScrollLink
                    to={item.toLowerCase().replace(/\s+/g, '-')}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="hover:text-orange-600 transition cursor-pointer"
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center md:justify-end gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
            {/* Search Icon - Hiển thị trên cả mobile và desktop */}
            <div onClick={() => { setSearchOpen(!searchOpen); setSearchTerm(""); }} className="text-xl text-gray-600 px-3 py-2 cursor-pointer hover:text-orange-600 transition-colors">
              <CiSearch />
            </div>

            {/* Cart */}
            <button onClick={handleCartClick} className="text-2xl hover:bg-orange-600 hover:text-white rounded-full p-2 duration-200 cursor-pointer text-orange-600">
              <PiShoppingCartThin />
            </button>

            {/* User Avatar or Login - Hiển thị trên cả mobile và desktop */}
            {user ? (
              <div className="relative flex items-center gap-2" ref={dropdownRef}>
                <Avatar
                  icon={<UserOutlined />}
                  className="bg-orange-500 cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700">{user.name}</span>
                {showDropdown && (
                  <div className="absolute mt-36 w-48 bg-white rounded-md shadow-md z-10">
                    <Link
                      to="/editprofile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Chỉnh sửa thông tin
                    </Link>
                    <Link
                      to="/userorder"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đơn hàng của tôi
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                        navigate('/login');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="hover:bg-orange-600 text-orange-600 font-semibold hover:text-white rounded-md border-2 border-orange-600 px-4 md:px-6 py-2 duration-200 cursor-pointer">
                <Link to="/login">Đăng nhập</Link>
              </button>
            )}

            {/* Mobile Menu Icon */}
            <div className="md:hidden" onClick={() => setOpen(!open)}>
              <MdMenu className="text-4xl cursor-pointer text-gray-700" />
            </div>
          </div>
        </div>
      </nav>

      {/* Search input & result */}
      {searchOpen && (
        <div className="bg-white w-full py-4 border-t border-b shadow-sm relative">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm hoặc loại..."
                  className="w-full px-5 py-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-orange-600 text-gray-700 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <AiOutlineClose />
                  </button>
                )}
                <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-orange-600" />
              </div>

              <button onClick={() => { setSearchOpen(false); setSearchTerm(""); }} className="flex items-center gap-2 text-orange-600 hover:text-white hover:bg-orange-600 font-semibold px-4 py-2 rounded-full border border-orange-600 transition duration-200 cursor-pointer">
                <AiOutlineClose className="text-xl" />
                Đóng
              </button>
            </div>

            {searchTerm && searchResults.length > 0 && (
              <div className="absolute w-[620px] mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 cursor-pointer" onClick={() => openProductModal(item)}>
                    <div className="flex-shrink-0 w-10 h-10">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}

      {/* Mobile Menu */}
      <ResponsiveMenu isOpen={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
