"use client";
import React from "react";
import { motion } from "framer-motion";
import { Wifi } from "./Icons/Wifi";

// Fade-up animation settings
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function AboutUs() {
  return (
    <div className="w-full h-[930px] md:h-[930px] lg:h-auto px-7 md:px-12 lg:px-36 flex justify-between items-center mb-6 py-10">
      <section className="w-full h-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT SIDE */}
        <motion.div
          className="w-full h-full flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeUp}
        >
          <motion.h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 font-[Abril_Fatface]"
            custom={0.1}
            variants={fadeUp}
          >
            A Few Words About Us
          </motion.h3>

          <motion.p
            className="text-gray-800 pt-4"
            custom={0.2}
            variants={fadeUp}
          >
            Whether you're dining in or catering for a special event, Benji’s is
            committed to delivering an unforgettable experience that celebrates
            the richness of African culture through food.
          </motion.p>

          <motion.p
            className="text-gray-800 pt-4 lg:pt-10"
            custom={0.3}
            variants={fadeUp}
          >
            At Benji’s African Delicacies, we have been dedicated to serving the
            finest and most authentic African dishes to our community. With a
            focus on quality, tradition, and flavor, we bring the vibrant
            culinary heritage of Africa straight to your table. From spicy stews
            to grilled meats, each dish is prepared with love and respect for
            African traditions.
          </motion.p>

          <motion.div custom={0.4} variants={fadeUp}>
            <button className="bg-[#ffaf00] text-white px-8 capitalize py-2 rounded-full my-10">
              view Menu
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="w-full relative -mt-44  lg:-mt-0 md:-mt-48 h-full lg:pl-12 pl-0 md:pl-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeUp}
          custom={0.5}
        >
          <div className="w-full h-full relative">
            <img
              className="w-full h-[350px] md:h-[400px] lg:h-full object-cover rounded absolute top-0 left-0"
              src="/assets/shop.jpeg"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-[350px] md:h-[400px] lg:h-full rounded bg-black opacity-50"></div>

            <div className="absolute top-0 left-0 w-full h-[350px] lg:h-full md:h-[400px] flex items-center justify-center">
              <motion.div
                className="text-center h-full flex flex-col justify-center items-center w-full md:w-4/5 lg:w-3/5 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeUp}
                custom={0.6}
              >
                <span className="text-4xl md:text-5xl font-bold text-white font-[Abril_Fatface]">
                  <Wifi />
                </span>
                <p className="text-xl text-white mt-2">Free WiFi For Everyone</p>
                <p className="text-[15px] text-white">Ask for password to any staff</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
