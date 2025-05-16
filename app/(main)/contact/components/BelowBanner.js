"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HungrySection() {
  return (
    <div className="w-full h-full flex items-center justify-center py-14">
      <motion.div
        className="w-full md:w-4/5 lg:w-2/5 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-[Abril_Fatface]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Are You Hungry?
        </motion.h2>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Come, Dine With Us!
        </motion.span>

        <motion.p
          className="text-center text-gray-800 text-[15px] px-6 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          At Benji’s African Delicacies, we’re ready to serve you the finest
          African dishes in a warm and welcoming environment. Whether you’re
          dining in with family and friends or planning a private event, we’ve
          got you covered with the best flavors from Africa.
        </motion.p>

        <motion.div
          className="w-full flex flex-col md:flex-row lg:flex-row  items-center justify-center py-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="lg:border-r-[1px] lg:border-amber-500 md:border-r-[1px] md:border-amber-500 px-7">
            <h3 className="text-3xl font-bold mb-4 text-gray-800 font-[Abril_Fatface]">
              For Restaurant
            </h3>
            <p className="text-center text-2xl text-gray-800 font-[Abril_Fatface]">
              +44 7450 140274
            </p>
          </div>
          <div className=" px-7">
            <h3 className="text-3xl font-bold mb-4 text-gray-800 font-[Abril_Fatface]">
              Private Dinning
            </h3>
            <p className="text-center text-2xl text-gray-800 font-[Abril_Fatface]">
              +44 7450 140274
            </p>
          </div>
        </motion.div>

        <motion.img
          src="/assets/divider.png"
          alt="divider"
          className="my-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        />

        <motion.h3
          className="text-3xl font-bold mt-4 text-gray-800 font-[Abril_Fatface]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Have Feedback?
        </motion.h3>

        <motion.p
          className="text-center text-gray-800 text-[15px] px-6 py-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
        >
          We value your feedback! Let us know how we did and how we can make
          your next dining experience even better. Reach out to us with any
          comments or suggestions.
        </motion.p>
      </motion.div>
    </div>
  );
}
