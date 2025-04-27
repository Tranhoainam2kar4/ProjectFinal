import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Element } from "react-scroll";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Element name="root-content">
        <Outlet />
      </Element>
      <Footer />
    </div>
  );
};

export default RootLayout;