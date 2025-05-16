"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useOrderStore } from "@/hooks/useOrderStore";

const data = [
  {
    id: 1,
    name: "Boiled yams, Plantains with vegetable and beef or meat",
    image: "/assets/Img1.jpg",
    status: "available",
    price: "20",
  },
  {
    id: 2,
    name: "Chocolate Lava",
    image: "/assets/Img2.jpg",
    status: "",
    price: "30",
  },
  {
    id: 3,
    name: "Chocolate Lava",
    image: "/assets/Img3.jpg",
    status: "available",
    price: "30",
  },
  {
    id: 4,
    name: "Chocolate Lava",
    image: "/assets/Img3.jpg",
    status: "available",
    price: "30",
  },
  {
    id: 5,
    name: "Another Item",
    image: "/assets/Img4.jpg",
    status: "available",
    price: "25",
  },
];

// Custom hook to determine how many items to show based on screen size
function useResponsiveLimit() {
  const [limit, setLimit] = useState(2); // Default for mobile

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setLimit(4); // Desktop
      } else if (width >= 768) {
        setLimit(4); // Tablet
      } else {
        setLimit(2); // Mobile
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  return limit;
}

export default function PremiumDelicacies() {
  const { isLoading } = useOrderStore();
  const limit = useResponsiveLimit();
  const visibleItems = data.slice(0, limit);

  return (
    <div className="py-2 w-full h-full">
      <motion.div
        className="lg:w-3/5 w-full py-3 bg-[#ffaf00]"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl xs:text-lg font-bold text-[#b80802] text-center">
          Benji’s African Delicacies Premium
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-12 gap-6">
        {visibleItems.map((item, index) => (
          <motion.div
            className="w-full h-[380px] relative rounded-2xl hover:scale-[1.02] transition-transform duration-300"
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img
              className="w-full h-full object-cover absolute top-0 left-0 rounded-2xl"
              src={item.image}
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50 rounded-2xl"></div>
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
                      <div className="w-full mb-1 p-[2px] bg-[#ffaf00]"></div>
                      <p className="text-white text-4xl">£{item.price}</p>
                    </div>
                    <button
                      disabled={isLoading}
                      className="text-white bg-[#ffaf00] capitalize py-2 px-4 rounded-full font-medium flex items-center cursor-pointer disabled:cursor-not-allowed hover:scale-105 transition-transform"
                    >
                      order now
                      <PlusIcon />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-end justify-between px-6 pb-8">
                    <div className="w-1/3">
                      <div className="w-full mb-1 p-[2px] bg-[#ffaf00]"></div>
                      <p className="text-white text-4xl">£{item.price}</p>
                    </div>
                    <div></div>
                  </div>
                )}
              </div>
              <div className="absolute top-0 right-0 w-full h-full">
                <div className="w-full flex justify-end pr-6 pt-5">
                  <span className="text-white text-sm bg-[#b80802] capitalize py-1 px-4 rounded-full font-medium flex items-center">
                    {item.status === "available" ? "available" : "unavailable"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
    </div>
  );
}
