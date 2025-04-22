
import AboutSection from "../../components/HomePageSection/HomePage/AboutSection";
import BestSellersSection from "../../components/HomePageSection/HomePage/BestSellersSection";
import CategoriesSection from "../../components/HomePageSection/HomePage/CategoriesSection";
import FeatureIcons from "../../components/HomePageSection/HomePage/FeatureIcon";
import TestimonialsSection from "../../components/HomePageSection/HomePage/TestomonialsSection";
import Slider from "../../components/HomePageSection/Slider/Slider";


function HomePage() {
  return (
    <div>
      <Slider />
      <FeatureIcons />
      <CategoriesSection />
      <BestSellersSection />
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;
