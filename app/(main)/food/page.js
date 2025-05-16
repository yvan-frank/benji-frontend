import React from "react";
import { SpoonKnife } from "./Icons/Spoons";
import PremiumDelicacies from "./compoment/PremiumDelicacies";

export default function () {
  return (
    <div className="py-10 md:py-16 px-8 md:px-16 h-auto lg:py-20 lg:px-18">
      <div className="flex pb-8 items-center justify-center w-full font-bold text-gray-800">
        <span className="mr-3 text-2xl lg:text-4xl md:text-3xl">< SpoonKnife /></span>
        <h1 className="text-xl lg:text-4xl md:text-5xl text-center font-bold text-gray-800  font-[Abril_Fatface]">
          Benji's African Delicacies Food Menu
        </h1>
        <span className="ml-2 text-2xl lg:text-4xl md:text-3xl font-bold text-gray-800"><SpoonKnife /></span>
      </div>
      <PremiumDelicacies />
    </div>
  );
}
