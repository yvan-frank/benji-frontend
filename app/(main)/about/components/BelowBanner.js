"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BelowBanner() {
  return (
    <div className="w-full h-full flex items-center justify-center py-14">
      <div className="w-full md:w-4/5 lg:w-3/5 flex flex-col items-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 font-[Abril_Fatface]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Our Resto.
        </motion.h2>

        <motion.p
          className="text-center text-gray-800 text-[15px] px-10 md:px-20 lg:px-40 py-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Bringing the Best of African Cuisine to Bedminster
        </motion.p>

        <motion.p
          className="text-center text-gray-800 text-[15px] px-10 md:px-20 lg:px-40 pt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Located in the heart of Bedminster, we have grown into a local
          favorite, known for our vibrant dishes and outstanding service.
          Whether you’re enjoying a casual meal or hosting a special event, our
          mission is to create memorable dining experiences that celebrate the
          taste of Africa.
        </motion.p>

        <motion.img
          src="/assets/divider.png"
          alt="divider"
          className="my-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        />

        <motion.p
          className="text-center text-gray-800 text-[15px] px-10 md:px-14 lg:px-20 pt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Since our opening, Benji’s African Delicacies has been the go-to
          destination for authentic African cuisine in the heart of Bedminster.
          We take pride in offering a wide range of traditional dishes that
          represent the rich cultural heritage of Africa. From flavorful stews
          to perfectly grilled meats, every dish is crafted with love and care,
          using only the finest ingredients.
        </motion.p>

        <motion.p
          className="text-center text-gray-800 text-[15px] px-10 md:px-14 lg:px-20 pt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          At Benji’s, we believe that food is more than just a meal—it’s an
          experience. Whether you’re dining in with us or catering for a special
          event, we aim to transport your taste buds to Africa, making every
          bite unforgettable.
        </motion.p>
      </div>
    </div>
  );
}
