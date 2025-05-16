"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <div className="relative w-full h-[85vh]">
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src="/assets/cooked-dish.jpg"
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center flex flex-col items-center w-11/12 md:w-3/5 lg:w-2/5 px-4">
          <motion.img
            className=""
            src="/assets/divider.png"
            alt=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />

          <motion.p
            className="text-[#ffaf00] py-3 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Know More
          </motion.p>

          <motion.h1
            className="text-4xl lg:pb-5 md:text-5xl lg:text-8xl font-bold text-white mb-4 font-[Abril_Fatface]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Us.
          </motion.h1>

          <motion.p
            className="text-white text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At Benji’s African Delicacies, our passion is to bring the rich and
            diverse flavors of African cuisine to your table. Our journey
            started with a love for authentic African food and a desire to share
            it with the world. From spicy stews to perfectly seasoned meats,
            every dish we prepare reflects our commitment to quality, flavor,
            and tradition.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
