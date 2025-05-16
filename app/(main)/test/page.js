"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { getDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");

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
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  };

  const timeRange = getTimeRangeForDay(selectedDate);
  const timeSlots = timeRange ? generateTimeSlots(timeRange.open, timeRange.close, selectedDate) : [];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#DB9423]">Make a Reservation</h2>

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
          className="w-full p-3 border border-[#DB9423] rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ED7A00]"
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
    </div>
  );
}
