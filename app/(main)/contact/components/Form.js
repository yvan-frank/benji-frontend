"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject ] = useState("")
 const [ message, setMessage] = useState("")
 


 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData()
 formData.append("names", names)
 formData.append("email", email)
 formData.append("subject", subject)
 formData.append("message",message)
 console.log(formData);
 }

  return (
    <div className="w-full h-full flex items-center justify-center px-6 lg:px-24 md:px-12 mb-6">
      <motion.div
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-18 px-6 md:px-12 lg:px-16 bg-white shadow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Left Side - Opening Hours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl lg:text-3xl font-bold text-center text-gray-800 my-4 capitalize font-[Abril_Fatface]">
            Opening Hours of the week
          </h3>
          <div className="w-full flex flex-col items-center">
            {[
              "Monday: closed",
              "Tuesday : 2:00pm - 9:00pm",
              "Wenesday: 2:00pm - 9:00pm",
              "Thursday : 2:00pm - 9:00pm",
              "Friday : 2:00pm - 12:00am",
              "Saturday : 2:00pm - 12:00am",
              "Sunday : 1:00pm - 9:00pm",
            ].map((item, index) => (
              <motion.p
                key={index}
                className="text-gray-600 mt-4 text-center md:text-start lg:text-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {item}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          action=""
          className="w-full flex flex-col gap-y-4 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
        >
          <h4 className="text-2xl lg:text-4xl py-3 md:py-0 lg:py-0 font-bold text-gray-800 text-center">
            Contact Us
          </h4>
          
            <input
              type="text"
              placeholder="Your Name"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              className="w-full outline-none py-2 px-2 mb-1 border-[1px] border-gray-400 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none py-2 px-2  lg:mt-0 md:mt-0 border-[1px] border-gray-400 rounded"
            />
         
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full outline-none py-2 px-2 border-[1px] border-gray-400 rounded"
          />
          <textarea
            cols={30}
            rows={5}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full outline-none px-4 py-4 border-[1px] border-gray-400 rounded"
          ></textarea>
         <div className="flex justify-end w-full">
         <button  className="px-4 py-1 bg-[#ffaf00] cursor-pointer text-white font-bold rounded">
            Send Message
          </button>
         </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
