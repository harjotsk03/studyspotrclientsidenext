import React, { useState } from "react";

export const Slider = ({ options, setSelected, selected }) => {
  return (
    <div className="relative w-full px-2 py-1 rounded-2xl overflow-hidden transition-all duration-300 bg-white dark:bg-purple-400/10">
      <div className="relative">
        <div
          className={`absolute h-10 bg-purple-200 dark:bg-purple-900 text-mainColorDark dark:text-white rounded-xl transition-all duration-200 ease-in-out`}
          style={{
            width: `${100 / options.length}%`,
            left: `${(selected * 100) / options.length}%`,
            top: "4px",
          }}
        />

        <div className="relative flex items-center h-12">
          {options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelected(index)}
              className={`
                flex-1 h-full flex gap-1.5 items-center justify-center
                text-xs poppins-regular z-10 transition-colors duration-200
                ${selected === index ? "text-purple-900 dark:text-purple-100" : "text-textDark2 dark:text-purple-400"}
              `}
            >
              <span className="hidden lg:flex">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
