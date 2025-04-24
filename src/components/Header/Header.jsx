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

const mockProducts = [
  {
    id: 1,
    name: "Cơm gà xối mỡ",
    category: "Cơm",
    img: "/food1.jpg",
    price: 45000,
  },
  { id: 2, name: "Phở bò", category: "Phở", img: "/food2.jpg", price: 50000 },
  {
    id: 3,
    name: "Bánh mì thịt",
    category: "Bánh mì",
    img: "/food3.jpg",
    price: 25000,
  },
  {
    id: 4,
    name: "Bún bò Huế",
    category: "Bún",
    img: "/food4.jpg",
    price: 48000,
  },
  {
    id: 5,
    name: "Hủ tiếu Nam Vang",
    category: "Hủ tiếu",
    img: "/food5.jpg",
    price: 52000,
  },
  { id: 6, name: "Mì Quảng", category: "Mì", img: "/food6.jpg", price: 47000 },
  {
    id: 7,
    name: "Bánh xèo",
    category: "Bánh",
    img: "/food7.jpg",
    price: 40000,
  },
  {
    id: 8,
    name: "Gỏi cuốn",
    category: "Khai vị",
    img: "/food8.jpg",
    price: 30000,
  },
  {
    id: 9,
    name: "Chả giò",
    category: "Khai vị",
    img: "/food10.jpg",
    price: 35000,
  },
  {
    id: 10,
    name: "Cơm tấm sườn",
    category: "Cơm",
    img: "/food1.jpg",
    price: 50000,
  },
  {
    id: 11,
    name: "Cơm chiên dương châu",
    category: "Cơm",
    img: "/food2.jpg",
    price: 48000,
  },
  { id: 12, name: "Phở gà", category: "Phở", img: "/food3.jpg", price: 45000 },
  {
    id: 13,
    name: "Bánh mì xíu mại",
    category: "Bánh mì",
    img: "/food4.jpg",
    price: 27000,
  },
  {
    id: 14,
    name: "Bún riêu",
    category: "Bún",
    img: "/food5.jpg",
    price: 47000,
  },
  {
    id: 15,
    name: "Hủ tiếu xào",
    category: "Hủ tiếu",
    img: "/food6.jpg",
    price: 49000,
  },
  {
    id: 16,
    name: "Mì xào giòn",
    category: "Mì",
    img: "/food7.jpg",
    price: 45000,
  },
  {
    id: 17,
    name: "Bánh bèo",
    category: "Bánh",
    img: "/food8.jpg",
    price: 32000,
  },
  {
    id: 18,
    name: "Nem nướng",
    category: "Khai vị",
    img: "/food10.jpg",
    price: 37000,
  },
  {
    id: 19,
    name: "Cơm gà Hải Nam",
    category: "Cơm",
    img: "/food5.jpg",
    price: 52000,
  },
  {
    id: 20,
    name: "Phở cuốn",
    category: "Phở",
    img: "/food1.jpg",
    price: 38000,
  },
  {
    id: 21,
    name: "Bánh mì chảo",
    category: "Bánh mì",
    img: "/food2.jpg",
    price: 29000,
  },
  { id: 22, name: "Bún mắm", category: "Bún", img: "/food3.jpg", price: 49000 },
  {
    id: 23,
    name: "Hủ tiếu mực",
    category: "Hủ tiếu",
    img: "/food4.jpg",
    price: 53000,
  },
  {
    id: 24,
    name: "Mì vịt tiềm",
    category: "Mì",
    img: "/food5.jpg",
    price: 60000,
  },
  {
    id: 25,
    name: "Bánh ướt",
    category: "Bánh",
    img: "/food6.jpg",
    price: 35000,
  },
  {
    id: 26,
    name: "Chạo tôm",
    category: "Khai vị",
    img: "/food7.jpg",
    price: 37000,
  },
  {
    id: 27,
    name: "Cơm chiên cá mặn",
    category: "Cơm",
    img: "/food8.jpg",
    price: 52000,
  },
  {
    id: 28,
    name: "Phở xào",
    category: "Phở",
    img: "/food10.jpg",
    price: 47000,
  },
  {
    id: 29,
    name: "Bánh mì pate",
    category: "Bánh mì",
    img: "/food5.jpg",
    price: 27000,
  },
  {
    id: 30,
    name: "Bún đậu mắm tôm",
    category: "Bún",
    img: "/food1.jpg",
    price: 45000,
  },
  {
    id: 31,
    name: "Hủ tiếu hải sản",
    category: "Hủ tiếu",
    img: "/food2.jpg",
    price: 55000,
  },
  {
    id: 32,
    name: "Mì hoành thánh",
    category: "Mì",
    img: "/food3.jpg",
    price: 50000,
  },
  {
    id: 33,
    name: "Bánh cuốn",
    category: "Bánh",
    img: "/food4.jpg",
    price: 36000,
  },
  {
    id: 34,
    name: "Gỏi đu đủ khô bò",
    category: "Khai vị",
    img: "/food5.jpg",
    price: 38000,
  },
  {
    id: 35,
    name: "Cơm gà curry",
    category: "Cơm",
    img: "/food6.jpg",
    price: 54000,
  },
  {
    id: 36,
    name: "Phở chay",
    category: "Phở",
    img: "/food7.jpg",
    price: 42000,
  },
  {
    id: 37,
    name: "Bánh mì xá xíu",
    category: "Bánh mì",
    img: "/food8.jpg",
    price: 28000,
  },
  {
    id: 38,
    name: "Bún chả Hà Nội",
    category: "Bún",
    img: "/food10.jpg",
    price: 49000,
  },
  {
    id: 39,
    name: "Hủ tiếu khô",
    category: "Hủ tiếu",
    img: "/food5.jpg",
    price: 50000,
  },
  { id: 40, name: "Mì Ý", category: "Mì", img: "/food1.jpg", price: 58000 },
  {
    id: 41,
    name: "Bánh căn",
    category: "Bánh",
    img: "/food2.jpg",
    price: 37000,
  },
  {
    id: 42,
    name: "Gỏi ngó sen",
    category: "Khai vị",
    img: "/food3.jpg",
    price: 39000,
  },
  {
    id: 43,
    name: "Cơm chiên trứng",
    category: "Cơm",
    img: "/food4.jpg",
    price: 44000,
  },
  {
    id: 44,
    name: "Phở bò viên",
    category: "Phở",
    img: "/food5.jpg",
    price: 47000,
  },
  {
    id: 45,
    name: "Bánh mì chà bông",
    category: "Bánh mì",
    img: "/food6.jpg",
    price: 27000,
  },
  { id: 46, name: "Bún mọc", category: "Bún", img: "/food7.jpg", price: 46000 },
  {
    id: 47,
    name: "Hủ tiếu gà",
    category: "Hủ tiếu",
    img: "/food8.jpg",
    price: 49000,
  },
  { id: 48, name: "Mì gà", category: "Mì", img: "/food10.jpg", price: 52000 },
  {
    id: 49,
    name: "Bánh hỏi",
    category: "Bánh",
    img: "/food5.jpg",
    price: 38000,
  },
  {
    id: 50,
    name: "Gỏi bưởi",
    category: "Khai vị",
    img: "/food1.jpg",
    price: 40000,
  },
];

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
  const categories = ["Hot", "Rice", "Noodle", "Bread", "Beverage"];
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
                  <Link to={`/category/${item}`} className="hover:text-orange-600 transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center md:justify-end gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
            {/* Search Icon */}
            <div onClick={() => { setSearchOpen(!searchOpen); setSearchTerm(""); }} className="text-xl text-gray-600 px-3 py-2 cursor-pointer hover:text-orange-600 transition-colors hidden md:block">
              <CiSearch />
            </div>

            {/* Cart */}
            <button onClick={handleCartClick} className="text-2xl hover:bg-orange-600 hover:text-white rounded-full p-2 duration-200 cursor-pointer text-orange-600">
              <PiShoppingCartThin />
            </button>

            {/* User Avatar or Login */}
            {user ? (
              <div className="relative flex items-center gap-2" ref={dropdownRef}>
                <img
                  src={user.avatar}
                  alt="avatar"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{  
                    width: "35px",
                    height: "35px",
                    borderRadius: "9999px",
                    objectFit: "cover",
                    border: "2px solid #fb923c",
                    cursor: "pointer"
                  }} 
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                {showDropdown && (
                  <div className="absolute mt-36 w-48 bg-white rounded-md shadow-md z-10">
                    <Link
                      to="/editprofile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Chỉnh sửa thông tin
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                        navigate('/login')
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="hover:bg-orange-600 text-orange-600 font-semibold hover:text-white rounded-md border-2 border-orange-600 px-6 py-2 duration-200 hidden md:block cursor-pointer">
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
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-base">{item.name}</span>
                        <span className="text-base font-bold text-orange-600">{item.price.toLocaleString()}₫</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          id: selectedProduct?.id,
          name: selectedProduct?.name,
          price: selectedProduct?.price,
          image: selectedProduct?.img,
          description: "Mô tả sản phẩm đang được cập nhật...",
          category: selectedProduct?.category,
        }}
        customPositionClass="top-22 left-1/2 -translate-x-1/2"
      />

      {/* Responsive menu */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
