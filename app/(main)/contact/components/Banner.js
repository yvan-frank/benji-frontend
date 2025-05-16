"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <div className="relative w-full h-[80vh]">
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src="/assets/contact-us-banner.jpg"
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="text-center flex flex-col items-center w-11/12 md:w-3/5 lg:w-2/5 px-4">
          <motion.img
            className="w-56 h-10"
            src="/assets/divider.png"
            alt=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />

          <motion.h1
            className="text-4xl lg:pb-5 md:text-5xl lg:text-8xl font-bold text-white mb-4 font-[Abril_Fatface]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            className="text-white text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We’re here to help! Whether you’re looking to reserve a table,
            inquire about our catering services, or just have a question about
            our menu, feel free to get in touch with us. Our team at Benji’s
            African Delicacies is always ready to assist you.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
