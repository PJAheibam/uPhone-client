import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import AdvertiseSection from "./AdvertiseSection";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import Newsletter from "./Newsletter";
import SupportSection from "./SupportSection";

function Home() {
  useScrollToTop();
  return (
    <>
      <HeroSection />
      <CategorySection />
      <AdvertiseSection />
      <SupportSection />
      <Newsletter />
    </>
  );
}

export default Home;
