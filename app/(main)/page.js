"use client";
import { useCategory } from "@/hooks/api/useCategory";
import { motion } from "framer-motion";
import { useState } from "react";
import { CrossFilled } from "../_components/Icons/Close";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from "date-fns";
import { Phone } from "lucide-react";

export default function Home() {
  const { data, isFetching } = useCategory();
  console.log("data", data);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");

  const [numberOfPerson, setNumberOfPerson] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const openingHours = {
    0: { open: "13:00", close: "21:00" }, // Sunday
    1: null, // Monday (closed)
    2: { open: "14:00", close: "21:00" }, // Tuesday
    3: { open: "14:00", close: "21:00" }, // Wednesday
    4: { open: "14:00", close: "21:00" }, // Thursday
    5: { open: "14:00", close: "23:59" }, // Friday
    6: { open: "14:00", close: "23:59" }, // Saturday
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    return date >= new Date(today.setHours(0, 0, 0, 0)) && getDay(date) !== 1;
  };

  const getTimeRangeForDay = (date) => {
    if (!date) return null;
    const day = date.getDay();
    return openingHours[day];
  };

  const generateTimeSlots = (start, end, date) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const slots = [];
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    let current = new Date(date);
    current.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(endHour, endMinute, 0, 0);

    while (current <= endTime) {
      if (!isToday || current > now) {
        const hours = String(current.getHours()).padStart(2, "0");
        const minutes = String(current.getMinutes()).padStart(2, "0");
        slots.push(`${hours}:${minutes}`);
      }
      current.setMinutes(current.getMinutes() + 60);
    }

    return slots;
  };

  const timeRange = getTimeRangeForDay(selectedDate);
  const timeSlots = timeRange ? generateTimeSlots(timeRange.open, timeRange.close, selectedDate) : [];

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(phone);
    console.log(email);
    console.log(numberOfPerson);
    console.log(selectedDate);
    console.log(time);
  }
  return (
    <>
      <div className="relative w-full min-h-screen font-sans">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/assets/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-gray-900"
        ></motion.div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center flex flex-col items-center w-11/12 md:w-3/5 lg:w-3/5 px-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-[Abril_Fatface]"
            >
              Taste the Essence of Africa with Our Delicious African Delicacies,
              Catering, and Event Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-2xl text-white"
            >
              Discover the best African restaurants in UK
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-full flex gap-x-3 pt-10 items-center justify-center"
            >
              <button className="px-8 py-2 bg-[#DB9423] cursor-pointer text-white rounded-full hover:bg-[#ED7A00] transition-all duration-300">
                Place Order
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-2 bg-transparent border border-[#ED7A00] cursor-pointer text-white rounded-full hover:bg-[#DB9423] hover:border-none transition-all duration-300"
              >
                Book a Table
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* create modal for boook a table */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full px-3 lg:px-0 h-full flex items-center justify-center bg-gray-900/50 overflow-hidden  z-50">
            <div className="bg-white w-full lg:w-2/5 md:w-4/5 px-8 py-10 rounded-lg shadow-lg">
              <div className="flex justify-end">
                <span>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-3xl bg-[#DB9423] cursor-pointer rounded-full hover:bg-[#ED7A00] p-1 font-bold text-white  transition-all duration-300"
                  >
                    <CrossFilled />
                  </button>
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Book a Table</h2>
              <form>
                {/* number of persons */}
                <div className="mb-4">
                  <label htmlFor="persons" className="block text-gray-600">
                    Number of Persons
                  </label>
                  <input
                    type="number"
                    id="persons"
                    value={numberOfPerson}
                    onChange={(e) => setNumberOfPerson(e.target.value)}
                    className="w-full p-2 border outline-none border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border outline-none border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-600">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border outline-none border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
        <label className="block mb-1 font-medium">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setTime(""); // reset time
          }}
          filterDate={isDateSelectable}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="w-full p-2 border border-gray-300 rounded outline-none"
          calendarClassName="custom-calendar"
          required
        />
      </div>

      {selectedDate && timeRange ? (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Time</label>
          {timeSlots.length > 0 ? (
            <>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded outline-none"
                required
              >
                <option value="" disabled>
                  Choose a time
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Open from {timeRange.open} to {timeRange.close}
              </p>
            </>
          ) : (
            <p className="text-red-600">No more time slots available today.</p>
          )}
        </div>
      ) : selectedDate ? (
        <p className="text-red-600">Sorry, we're closed on Mondays.</p>
      ) : null}
                <div className="flex justify-end">
                  <button
                   onClick={handleSubmit}
                    className="px-6 py-1 bg-[#ffaf00] cursor-pointer text-white rounded hover:bg-[#ED7A00] transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* ous restaurants */}
      <div className="bg-white py-16 px-10 md:px-16 lg:px-18 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  ">
        <div className="flex flex-col ">
          <div className="w-full flex flex-col  justify-center py-4">
            <h2 className="text-4xl lg:text-5xl md:text-5xl font-bold text-gray-800 mb-4 font-[Abril_Fatface]">
              The Heart of African Cuisine
            </h2>
            <div className="w-full flex  justify-center py-4">
              <img
                src="/assets/divider.png"
                alt="divider"
                className="w-1/2 h-8"
              />
            </div>
            <h3 className="text-xl text-gray-800 text-center md:text-start lg:text-start">
              Our Delicious Story
            </h3>
            <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
              At Benji’s African Delicacies, we believe that food is more than
              just sustenance—it’s a celebration of culture, tradition, and
              community. Our story began with a love for authentic African
              flavors and a mission to bring the vibrant taste of Africa to the
              heart of Bedminster. From humble beginnings, we’ve grown into a
              beloved spot where people gather to enjoy mouthwatering meals and
              create unforgettable memories.
            </p>
            <p className="text-gray-600 mt-6 text-center md:text-start lg:text-start  ">
              Every dish we prepare is made with care, combining fresh
              ingredients with time-honored recipes passed down through
              generations. Whether it’s a special event or a casual meal, we aim
              to deliver an authentic African dining experience that warms your
              soul and brings people together.
            </p>
          </div>
          <div className="flex justify-center md:justify-start lg:justify-start pt-10">
            <button className="px-8 py-2 bg-[#DB9423] cursor-pointer  text-white rounded-full hover:bg-[#ED7A00]">
              Place Order
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center py-4 lg:py-20 px-2 lg:px-16 justify-center">
          <img
            src="/assets/restaurant banner.jpeg"
            alt="food"
            className="w-full h-4/5 rounded-2xl"
          />
        </div>
      </div>

      {/* live dj setup */}

      <div className="relative w-full lg:h-screen h-80 md:h-80 ">
        <img
          src="/assets/livedj.jpeg"
          alt="food"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col lg:pl-36 items-center justify-center">
          <h1 className="text-4xl flex flex-col md:text-5xl lg:text-9xl font-bold text-[#c8eef5] mb-4 font-[poppins]">
            Live Dj Setup
          </h1>
          <p className="text-2xl text-white">Every Weekend</p>
          <div className="w-full flex items-center justify-center gap-x-3 pt-10">
            <button className="px-10 font-medium py-2 bg-[#DB9423] cursor-pointer  text-white rounded-full hover:bg-[#ED7A00]">
              Find Out More
            </button>
            <button className="px-8 py-2 bg-transparent border border-[#ED7A00] cursor-pointer  text-white rounded-full hover:bg-[#DB9423] hover:border-[#DB9423]">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* contact us and book a table */}
      <div className="w-full flex flex-col bg-white  py-18 px-10 md:px-16 lg:px-18">
        <div className="hidden lg:block md:hidden">
          <h2 className=" lg:text-5xl font-bold text-gray-800 mb-6 font-[Abril_Fatface] flex lg:flex-col leading-14">
            <span> Discover the Rich Flavors</span>{" "}
            <span> of West African Cuisine</span>
          </h2>
        </div>
        <div className="block md:block lg:hidden">
          <h2 className="text-2xl lg:text-5xl md:text-5xl font-bold text-gray-800 mb-6 font-[Abril_Fatface]">
            Discover the Rich Flavors of West African Cuisine
          </h2>
        </div>
        <div className=" font[poppins] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/assets/menu.jpeg"
              alt="food"
              className="w-full h-[370px] rounded"
            />
            <h3 className="text-xl font-bold text-gray-800 my-4 capitalize font-[Abril_Fatface]">
              Our Menu
            </h3>
            <button className="px-12 py-2 text-lg capitalize  bg-[#FFB71E] cursor-pointer  text-white  hover:bg-[#ED7A00]">
              view menu
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/assets/drinks.jpg"
              alt="food"
              className="w-full h-[370px] rounded"
            />
            <h3 className="text-xl font-bold  text-gray-800 my-4 capitalize font-[Abril_Fatface]">
              whiskey/ beer/ wine/ soft drinks
            </h3>
            <button className="px-12 py-2 text-lg capitalize  bg-[#ED7A00] cursor-pointer  text-white hover:bg-[#FFB71E]">
              View price list
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/assets/reservation.jpg"
              alt="food"
              className="w-full h-[370px] rounded"
            />
            <h3 className="text-xl font-bold text-gray-800 my-4 capitalize font-[Abril_Fatface] ">
              Contact & Reservations
            </h3>
            <button className="px-12 py-2 text-lg capitalize  bg-[#FFB71E] cursor-pointer  text-white  hover:bg-[#ED7A00]">
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* opening and closing time and a site map */}

      <div className="w-full flex flex-col  py-9  lg:py-18 md:py-14 px-5 md:px-16 lg:px-18">
        <div className="font[poppins] bg-white p-5 lg:p-11 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center ">
            <h3 className="text-xl lg:text-3xl font-bold  text-gray-800 my-4 capitalize font-[Abril_Fatface]">
              Opening Hours of the week
            </h3>
            <div>
              <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
                Monday: closed
              </p>
              <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
                Tuesday : 2:00pm - 9:00pm
              </p>
              <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
                Wenesday: 2:00pm - 9:00pm
              </p>
              <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
                Thursday : 2:00pm - 9:00pm
              </p>
              <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
                Friday : 2:00pm - 12:00am
              </p>
              <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
                Saturday : 2:00pm - 12:00am
              </p>
              <p className="text-gray-600 mt-4 text-center md:text-start lg:text-start">
                Sunday : 1:00pm - 9:00pm
              </p>
            </div>
          </div>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.8830232953055!2d-2.6002052241939535!3d51.441942115484224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718c2afe05c971%3A0x79c9750eb3a36e0e!2s80%20East%20St%2C%20Bedminster%2C%20Bristol%20BS3%204EY%2C%20UK!5e0!3m2!1sen!2scm!4v1746679676700!5m2!1sen!2scm"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
