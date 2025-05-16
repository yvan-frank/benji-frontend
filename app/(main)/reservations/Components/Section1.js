import React from "react";

export default function Section1() {
  return (
    <div className="w-full h-auto px-7 md:px-12 lg:px-36 py-24">
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-3/5">
          <h1 className="text-3xl text-center md:text-4xl lg:text-4xl font-bold text-gray-800 mb-4 font-[Abril_Fatface]">
            Experience Unique Moments
          </h1>
          <p className="text-gray-800 pt-4 text-center">
            At Benji's African Delicacies, we offer you the opportunity to
            organise unforgettable private events in a truly unique setting.
            Whether you're planning a birthday, a hen or stag party, a
            graduation celebration, or a marriage proposal, office function or
            any other special event, we have the perfect venue.
          </p>
        </div>
        <div className=" py-10 w-full flex items-center flex-col ">
          <h3 className="text-3xl font-bold mb-4 text-gray-800 font-[Abril_Fatface]">
            For Reservations Contact
          </h3>
          <div className="w-full flex flex-col md:flex-row lg:flex-row  items-center justify-center">
            <div className="lg:border-r-[1px] lg:border-amber-500 md:border-r-[1px] md:border-amber-500 px-7">
              <p className="text-center text-2xl text-gray-800 font-[Abril_Fatface]">
                +44 7450 140274
              </p>
            </div>
            <div className=" px-7">
              <p className="text-center text-2xl text-gray-800 font-[Abril_Fatface]">
                +44 7450 140274
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
