"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/lib/url";

export default function PremiumDelicacies() {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/menu/category`)
      .then((response) => {
        setFood(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);


  const Test = () => {
    console.log(1);
  }

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("mobile"); // <640px
      else if (width < 1024) setScreenSize("tablet"); // 640–1023px
      else setScreenSize("desktop"); // ≥1024px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Limit item count based on screen size
  const getVisibleItems = (items) => {
    if (screenSize === "mobile") return items.slice(0, 2);
    return items.slice(0, 4);
  };

  return (
    <div className="py-2 w-full h-full">
      {loading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        food.map((category, index) => (
          <React.Fragment key={index}>
            {/* Category Header */}
            <motion.div className="w-full flex justify-center mt-4 lg:mt-6 md:mt-5">
              <motion.div
                className="lg:w-3/5 w-full py-3 bg-[#ffaf00]"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl xs:text-lg font-bold text-[#b80802] text-center">
                  {category.name}
                </h2>
              </motion.div>
            </motion.div>

            {/* Items Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pt-12 gap-6">
              {getVisibleItems(category.items).map((item, index) => (
                <motion.div
                  className="w-full h-[380px] relative rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover absolute top-0 left-0 rounded-2xl"
                      onError={(e) => {
                        e.target.src = "/assets/Img1.jpg";
                      }}
                    />
                  )}
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50 rounded-2xl" />
                  <div className="relative w-full h-full">
                    <div className="w-full flex px-3 justify-center flex-col h-full">
                      <h2 className="text-xl font-bold text-white text-center">
                        {item.name}
                      </h2>
                    </div>
                    <div className="absolute bottom-0 right-0 w-full h-full">
                      {item.status === "available" ? (
                        <div className="w-full h-full flex items-end justify-between px-4 pb-8">
                          <div className="w-1/3">
                            <div className="w-full mb-1 p-[2px] bg-[#ffaf00]" />
                            <p className="text-white text-4xl">£{item.price}</p>
                          </div>
                          <button
                          onClick={Test()}
                            style={{ cursor: "pointer" }}
                            className="text-white bg-[#ffaf00] capitalize py-1 px-3 text-base rounded-full font-medium flex items-center hover:scale-105 transition-transform"
                          >
                            <span>order now</span>
                            <PlusIcon />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-end justify-between px-6 pb-8">
                          <div className="w-1/3">
                            <div className="w-full mb-1 p-[2px] bg-[#ffaf00]" />
                            <p className="text-white text-4xl">£{item.price}</p>
                          </div>
                          <div></div>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-0 right-0 w-full h-full">
                      <div className="w-full flex justify-end pr-6 pt-5">
                        <span className="text-white text-sm bg-[#b80802] capitalize py-1 px-4 rounded-full font-medium flex items-center">
                          {item.status === "available"
                            ? "available"
                            : "unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            {category.items.length > getVisibleItems(category.items).length && (
              <motion.div
                className="w-full flex justify-center py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button className="text-white bg-[#ffaf00] capitalize py-2 px-8 rounded-full font-medium flex items-center cursor-pointer disabled:cursor-not-allowed hover:scale-105 transition-transform">
                  View more
                </button>
              </motion.div>
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
}
