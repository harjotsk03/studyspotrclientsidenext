import React, { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt, FaImage, FaTimes } from "react-icons/fa";

const DragAndDrop = ({ file, setFile, previewUrlPass = null }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(previewUrlPass || "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (previewUrlPass) {
      console.log("Fetching image to convert:", previewUrlPass);

      setFile(previewUrlPass);

      fetch(previewUrlPass)
        .then((res) => res.blob()) // Convert image URL to Blob
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result); // Convert Blob to Base64 and set preview
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => console.error("Error converting image:", error));
    }
  }, [previewUrlPass]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
      e.dataTransfer.clearData();
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Check file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full hover:cursor-pointer">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />

      <div
        className={`relative w-full h-56 hover:cursor-pointer rounded-2xl transition-all duration-300
          ${
            isDragging
              ? "bg-white dark:bg-purple-400/10"
              : "bg-white dark:bg-purple-400/10"
          }
          overflow-hidden`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {!file ? (
          // Upload State
          <div
            className={`flex flex-col items-center text-center justify-center h-full transition-transform duration-300 ${
              isDragging ? "scale-105" : "scale-100"
            }`}
          >
            <div className="lg:w-16 lg:h-16 w-12 h-12 mb-4 rounded-full bg-purple-200 dark:bg-purple-500/20 flex items-center justify-center">
              <FaCloudUploadAlt
                className={`lg:w-8 lg:h-8 w-5 h-5 transition-colors duration-300 ${
                  isDragging
                    ? "text-purple-500 dark:text-purple-500"
                    : "text-purple-500 dark:text-purple-500"
                }`}
              />
            </div>
            <p className="text-sm lg:text-base poppins-medium text-black dark:text-white">
              {isDragging ? "Drop your image here" : "Drag & drop your image"}
            </p>
            <p className="text-xs lg:text-sm text-black/50 dark:text-white/40 mt-2 poppins-medium">
              or click to browse
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-400 mt-4 poppins-regular">
              Please ensure no faces are visible in the image
            </p>
          </div>
        ) : (
          // Preview State
          <div className="relative h-full group">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors duration-300"
              >
                <FaTimes className="text-red-600" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
              <p className="text-white text-sm truncate">{file.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* Error States - Add these classes when needed */}
      {/* For error: border-red-400 bg-red-50 */}
      {/* For success: border-green-400 bg-green-50 */}

      <div className="mt-3 ml-1 flex items-center gap-2 text-xs text-black dark:text-white/40">
        <FaImage />
        <span>Accepted formats: JPEG, PNG, GIF (max 5MB)</span>
      </div>
    </div>
  );
};

export default DragAndDrop;
