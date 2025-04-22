import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { BiSearch } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AdminHeader = ({ onOpenSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  // const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  // const notificationCount = 3;

  // Toggle user menu dropdown
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    // if (!showUserMenu) setShowNotificationMenu(false);
  };

  // Toggle notification menu dropdown
  // const toggleNotificationMenu = () => {
  //   setShowNotificationMenu(!showNotificationMenu);
  //   if (!showNotificationMenu) setShowUserMenu(false);
  // };

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

        {/* User Icon */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="text-2xl text-gray-600 hover:text-orange-500 transition"
          >
            <FaUserCircle className="cursor-pointer" />
          </button>
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                {...dropdownAnimation}
                className="absolute right-0 mt-3 w-48 bg-white border rounded shadow-md z-50"
              >
                <ul className="text-sm divide-y divide-gray-200">
                  <li className="p-3 hover:bg-gray-100 cursor-pointer">
                     <Link to='/'>Trang Chủ</Link>
                  </li>
                  <li className="p-3 hover:bg-gray-100 cursor-pointer">
                     Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
        // {/* Search */}
        // <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        //   <input
        //     type="text"
        //     placeholder="Search..."
        //     className="w-full ml-2 md:ml-0 pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
        //   />
        //   <BiSearch className="absolute right-3 top-2.5 text-gray-500 text-xl cursor-pointer" />
        // </div>

        // {/* Notification Icon */}
        // <div className="relative mt-1.5">
        //   <button
        //     onClick={toggleNotificationMenu}
        //     className="text-2xl text-gray-600 hover:text-orange-500 transition"
        //   >
        //     <IoIosNotificationsOutline className="cursor-pointer" />
        //   </button>
        //   {notificationCount > 0 && (
        //     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
        //       {notificationCount}
        //     </span>
        //   )}
        //   <AnimatePresence>
        //     {showNotificationMenu && (
        //       <motion.div
        //         {...dropdownAnimation}
        //         className="absolute right-0 mt-2.5 w-64 bg-white border rounded shadow-md z-50"
        //       >
        //         <ul className="divide-y divide-gray-200 text-sm">
        //           <li className="p-3 hover:bg-gray-100 cursor-pointer">
        //             🔔 New order placed
        //           </li>
        //           <li className="p-3 hover:bg-gray-100 cursor-pointer">
        //             💬 You got a message
        //           </li>
        //           <li className="p-3 hover:bg-gray-100 cursor-pointer">
        //             ⚠️ Low stock alert
        //           </li>
        //         </ul>
        //       </motion.div>
        //     )}
        //   </AnimatePresence>
        // </div>
