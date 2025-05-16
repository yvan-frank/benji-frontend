"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FoodPolicySection() {
  return (
    <div className="relative w-full h-screen lg:h-screen md:h-[600px]">
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src="/assets/suya.jpeg"
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="w-full md:w-full md:px-10 lg:w-4/5">
          <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Our Food Policy */}
            <motion.div
              className="p-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <h4 className="text-3xl text-center md:text-start lg:text-start md:text-4xl lg:text-5xl font-bold text-white mb-3 font-[Abril_Fatface]">
                Our Food Policy
              </h4>
              <p className="text-center md:text-start lg:text-start lg:px-2 text-white text-[15px] py-2">
                At Benji’s African Delicacies, we believe in serving only the
                best. Our food is made from fresh, high-quality ingredients
                sourced locally and responsibly. We take pride in preserving the
                authenticity of African flavors while ensuring that every dish
                meets the highest standards of hygiene and taste. We are
                committed to delivering meals that not only satisfy your
                cravings but also nourish your body and soul.
              </p>
            </motion.div>

            {/* Our Core Values */}
            <motion.div
              className="p-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <h4 className="text-3xl text-center md:text-start lg:text-start md:text-4xl lg:text-5xl font-bold text-white mb-3 font-[Abril_Fatface]">
                Our Core Values
              </h4>
              <p className="lg:px-2 text-center md:text-start lg:text-start text-white text-[15px] py-2">
                Our core values reflect our commitment to quality, culture, and
                community. At Benji’s, we value:
              </p>

              <ul className="list-decimal pl-4">
                {[
                  {
                    label: "Authenticity",
                    text: "We stay true to African culinary traditions in every dish we prepare",
                  },
                  {
                    label: "Quality",
                    text: "We believe in using only the best ingredients to create flavorful and wholesome meals.",
                  },
                  {
                    label: "Customer Satisfaction",
                    text: "Your happiness is our priority, and we strive to provide a dining experience that exceeds your expectations.",
                  },
                  {
                    label: "Community",
                    text: "We are proud to be a part of the local community, and we love sharing the rich flavors of Africa with everyone.",
                  },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="lg:px-2 text-white text-[15px] py-2"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <span className="font-semibold">{item.label}: </span>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
