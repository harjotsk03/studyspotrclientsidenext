import React, { useState, useEffect } from "react";
import { FaDoorClosed, FaDoorOpen } from "react-icons/fa";

export default function TimeInput({
  label,
  defaultTime,
  isOpen = true,
  onTimeChange,
}){
  const [time, setTime] = useState(defaultTime || "09:00");
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);

  useEffect(() => {
    onTimeChange(time);
  }, [time, onTimeChange]);

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  const formatTimeDisplay = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const hourNum = parseInt(hour);
    const displayHour = hourNum % 12 || 12;
    const period = hourNum >= 12 ? "PM" : "AM";
    return `${displayHour}:${minute} ${period}`;
  };

  return (
    <div className="relative">
      <div
        className={`
          flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
          transition-all duration-300
          bg-white dark:bg-purple-400/10
        `}
        onClick={() => setTimePickerOpen(!isTimePickerOpen)}
      >
        <div
          className={`
          p-3 rounded-lg flex  items-center justify-center
          ${
            isOpen
              ? "bg-backgroundLight dark:bg-backgroundCardsDark2 text-purple-600 dark:text-purple-500"
              : "bg-backgroundLight dark:bg-backgroundCardsDark2 text-purple-600 dark:text-purple-500"
          }
        `}
        >
          {isOpen ? <FaDoorOpen size={12} /> : <FaDoorClosed size={12} />}
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex  flex-col gap-0">
            <p className="text-xs text-black dark:text-white/60 poppins-regular">
              {label}
            </p>
            <p className="text-sm lg:text-base poppins-medium text-black dark:text-white">
              {formatTimeDisplay(time)}
            </p>
          </div>

          {/* Dropdown Arrow */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`w-5 h-5 transition-transform duration-300 ${
              isTimePickerOpen ? "rotate-180" : ""
            } ${isOpen ? "text-purple-500" : "text-purple-500"}`}
          >
            <path
              d="M6 9l6 6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Time Picker Dropdown */}
      {isTimePickerOpen && (
        <div className="absolute z-20 mt-2 poppins-regular text-textDark2 w-full bg-white dark:bg-purple-400/10 scrollbar-hide rounded-xl max-h-60 min-h-60 overflow-y-auto">
          <div className="p-2">
            {timeOptions.map((timeOption) => (
              <button
                key={timeOption}
                className={`w-full px-4 py-2 text-left rounded-lg transition-colors ${
                  time === timeOption
                    ? "bg-lightBG dark:bg-darkBG text-black dark:text-white"
                    : "hover:bg-lightBG/70 dark:hover:bg-darkBG/50 bg-transparent dark:text-white/50 text-black/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setTime(timeOption);
                  setTimePickerOpen(false);
                }}
              >
                {formatTimeDisplay(timeOption)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
