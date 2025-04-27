import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AdminHeader = ({ onOpenSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAppContext();

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dropdownAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  };

  return (
    <header className="relative w-full h-16 bg-white shadow px-2 md:px-6 flex items-center justify-between z-10">
      {/* Menu icon - chỉ hiện ở mobile */}
      <button
        onClick={onOpenSidebar}
        className="md:hidden text-2xl text-gray-700 hover:text-orange-500"
      >
        <HiMenuAlt3 />
      </button>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Hiển thị avatar và tên người dùng */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={toggleUserMenu}
        >
          <Avatar 
            icon={<UserOutlined />} 
            className="bg-orange-500 cursor-pointer"
          />
          <span className="text-gray-700 font-semibold">{user?.name}</span>
        </div>

        {/* User Menu Dropdown */}
        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              {...dropdownAnimation}
              className="absolute right-2 mt-38 w-48 bg-white border rounded shadow-md"
            >
              <ul className="text-sm divide-y divide-gray-200">
                <li className="p-3 hover:bg-gray-100 cursor-pointer">
                  <Link to="/">Trang Chủ</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  Đăng xuất
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default AdminHeader;