import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProvider } from "./context/AppProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


// Layouts
import RootLayout from "./pages/RootLayout";
import WrapForm from "./components/Form/WrapForm";


import HomePage from "./pages/HomePage/HomePage";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";


import AdminHomePage from "./ADMIN/AdminHomePage";
import Dashboard from "./ADMIN/AdminContent/Dashboard";
import Product from "./ADMIN/AdminContent/Product";
import Order from "./ADMIN/AdminContent/Order";
import User from "./ADMIN/AdminContent/User";
import Message from "./ADMIN/AdminContent/Message";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";
import ForgotPassword from "./components/Form/ForgotPassword";
import OTPVerify from "./components/Form/OTPVerify";
import ResetPassword from "./components/Form/ResetPassword";
import EditProfile from "./pages/EditProfilePage/EditProfile";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/category/:categoryName", element: <CategoryPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/editprofile", element: <EditProfile/>}
    ],
  },
  {
    element: <WrapForm />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: '/forgotpassword', element: <ForgotPassword/>},
      { path: '/otp-verify', element: <OTPVerify/>},
      { path: '/resetpassword', element: <ResetPassword/>},
    ],
  },
  {
    path: "/ADMIN",
    element: <AdminHomePage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "order", element: <Order /> },
      { path: "user", element: <User /> },
      { path: "message", element: <Message /> },
    ],
  },
]);
const GOOGLE_CLIENT_ID = '480717841182-n26ok1b38akckpmb5lguq87p9am39dqj.apps.googleusercontent.com'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          limit={1}
          theme="colored"
          toastClassName="toast-message"
        />
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
