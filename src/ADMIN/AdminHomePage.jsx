import { useState } from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminHeader from "./AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminHomePage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar show={showSidebar} setShow={setShowSidebar} />

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <AdminHeader onOpenSidebar={() => setShowSidebar(true)} />
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminHomePage;
