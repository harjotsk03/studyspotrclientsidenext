"use client";
import { useState } from "react";

export default function ToggleSwitch({ onToggle }) {
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
    onToggle?.(!checked);
  };

  return (
    <div className="relative ml-24 lg:ml-auto w-32 lg:w-44 h-10 mx-auto rounded-full bg-lightBG transition-colors duration-500">
      <input
        type="checkbox"
        className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
        checked={checked}
        onChange={toggle}
      />
      {/* Sliding knob */}
      <div
        className={`absolute top-1 h-8 w-14 lg:w-20 flex items-center justify-center poppins-medium text-xs lg:text-sm rounded-full transition-all duration-300 ${
          checked
            ? "left-14 lg:left-20 ml-3 bg-purpleThree text-white"
            : "left-1 bg-white text-black"
        }`}
      >
        {checked ? "Map" : "List"}
      </div>
    </div>
  );
}
