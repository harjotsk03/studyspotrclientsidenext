import React, { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaRegIdCard,
  FaVolumeDown,
  FaWifi,
  FaPlug,
  FaChalkboard,
} from "react-icons/fa";

export const FeatureSelector = ({ icon, label, isSelected, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(!isSelected)}
      className={`
        relative w-full p-3 rounded-2xl overflow-hidden transition-all duration-300
        ${
          isSelected
            ? "bg-purple-200 dark:bg-purple-400/30"
            : "bg-white dark:bg-purple-400/10"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <div
          className={`
          p-2 rounded-full flex items-center justify-center transition-all duration-300
          ${
            isSelected
              ? "bg-purple-400 bg-opacity-20 text-purple-600 dark:bg-purple-400/20 dark:text-purple-400/70"
              : "bg-white dark:bg-purple-400/10 text-black/50 dark:text-white/50"
          }
        `}
        >
          {icon}
        </div>

        <span
          className={`
          text-xs text-left poppins-medium transition-colors duration-300 text-purple-950 dark:text-white
        `}
        >
          {label}
        </span>

        <div
          className={`
          ml-auto p-2 rounded-full flex items-center justify-center transition-all duration-300
          ${
            isSelected
              ? "bg-purple-500 text-white"
              : "dark:text-purple-600/60"
          }
        `}
        >
          {isSelected ? <FaCheck size={10} /> : <FaTimes size={10} />}
        </div>
      </div>
    </button>
  );
};
