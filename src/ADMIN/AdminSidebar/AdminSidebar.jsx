import { FaRegUser } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineMessage,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ show, setShow }) => {
  return (
    <div>
      {/* Sidebar trên desktop */}
      <div className="hidden md:block fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-20">
        <SidebarContent />
      </div>

      {/* Sidebar mobile - trượt ra */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black/50 z-40 transition-transform duration-300 md:hidden ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 bg-gray-900 h-full p-4 shadow-md relative">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setShow(false)}
          >
            <IoClose className="mt-1" />
          </button>
          <SidebarContent setShow={setShow} />
        </div>
      </div>
    </div>
  );
};


const SidebarContent = ({ setShow }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: <MdOutlineDashboard />, label: "Dashboard", name: "dashboard" },
    { icon: <TbBrandProducthunt />, label: "Product", name: "product" },
    { icon: <MdOutlineShoppingCart />, label: "Order", name: "order" },
    { icon: <FaRegUser />, label: "User", name: "user" },
    { icon: <MdOutlineMessage />, label: "Message", name: "message" },
  ];

  return (
    <div>
      <a
        href="#"
        className="text-2xl flex items-center gap-2 font-bold uppercase text-orange-600 pb-4 border-b border-gray-600"
      >
        <IoFastFoodSharp />
        <span className="text-orange-900">Tasty</span>
        <span className="text-orange-600">Hub</span>
      </a>
      <ul className="mt-4">
        {menuItems.map((item, index) => {
          const isActive = currentPath.includes(`/ADMIN/${item.name}`);
          return (
            <li key={index} className="mb-1">
              <Link
                to={item.name}
                onClick={() => {
                  if (setShow) setShow(false);
                }}
                className={`flex gap-2 items-center py-2 px-4 rounded-md transition ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;
