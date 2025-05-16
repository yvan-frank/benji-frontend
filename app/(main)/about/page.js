import React from "react";
import Banner from "./components/Banner";
import BelowBanner from "./components/BelowBanner";
import Carousel from "./components/ImageCarouncel";
import AboutUs from "./components/AboutUs";
import FoodPolicy from "./components/FoodPolicy";

export default function page() {
  return (
    <>
      <Banner />
      <BelowBanner />
      <Carousel />
      <AboutUs />
      <FoodPolicy />
    </>
  );
}
