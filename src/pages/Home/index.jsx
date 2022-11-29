import React from "react";
import AdvertiseSection from "./AdvertiseSection";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import Newsletter from "./Newsletter";

function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <AdvertiseSection />
      <Newsletter />
    </>
  );
}

export default Home;
