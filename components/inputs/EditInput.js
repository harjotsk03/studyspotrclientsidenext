"use client";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";

export default function EditInput({
  labelText,
  initialValue,
  placeholderText,
  onChange,
  inputValue,
  isEditing,
  setIsEditing,
  capitalize=false,
}) {
  const handleCancel = () => {
    setIsEditing(false);
    onChange({ target: { value: initialValue } });
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can trigger save logic here if needed
  };

  return (
    <div className="flex flex-row items-center w-full">
      <label className="text-black/50 dark:text-white/60 poppins-regular text-sm pr-4 whitespace-nowrap flex-shrink-0 w-20 mr-2">
        {labelText}
      </label>

      {isEditing ? (
        <div className="relative flex items-center w-full">
          <input
            autoFocus
            className="w-full text-black dark:text-white poppins-regular px-3 py-2 text-lg bg-purple-50 dark:bg-darkBG focus:outline-none pr-14 rounded-xl"
            placeholder={placeholderText}
            onChange={onChange}
            value={inputValue}
          />
          <div className="absolute right-3 flex items-center gap-2">
            <button
              onClick={handleSave}
              className="text-white p-1 bg-green-600 rounded-full"
              aria-label="Save"
            >
              <FiCheck size={12} />
            </button>
            <button
              onClick={handleCancel}
              className="text-white p-1 bg-red-500 rounded-full"
              aria-label="Cancel"
            >
              <FiX size={12} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="group w-full flex justify-between items-center cursor-pointer hover:bg-purple-50 dark:hover:bg-white/10 px-3 py-2 rounded-xl transition-all duration-300 ease-in-out"
        >
          <p
            className={`text-black dark:text-white poppins-regular text-lg ${
              capitalize && "capitalize"
            }`}
          >
            {initialValue}
          </p>
          <FiEdit2
            className="text-gray-400 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
            size={16}
          />
        </div>
      )}
    </div>
  );
}
