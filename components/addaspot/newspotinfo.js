"use client";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GeneralInput from "../inputs/GeneralInput";
import TimeInput from "./TimeInput";
import DragAndDrop from "./DragAndDrop";
import { FeatureSelector } from "./FeatureSelector";
import {
  FaChalkboard,
  FaLayerGroup,
  FaLeaf,
  FaLightbulb,
  FaPlug,
  FaRegIdCard,
  FaRegLightbulb,
  FaUser,
  FaUsers,
  FaVolumeDown,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeUp,
  FaWifi,
} from "react-icons/fa";
import Slider from "./Slider";
import { FileVolume2 } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";

export default function NewSpotInfo({ selectedSpot, setSelectedSpot }) {
  const [spotName, setSpotName] = useState("");
  const [newLocationRating, setNewLocationRating] = useState(0);
  const [newLocationIDRequired, setNewLocationIDRequired] = useState(false);
  const [newLocationSilentArea, setNewLocationSilentArea] = useState(false);
  const [newLocationWifi, setNewLocationWifi] = useState(false);
  const [newLocationOutlets, setNewLocationOutlets] = useState(false);
  const [newLocationWhiteboards, setNewLocationWhiteboards] = useState(false);
  const [newLocationGroupWork, setNewLocationGroupWork] = useState(false);
  const [newLocationFoodDrink, setNewLocationFoodDrink] = useState(false);
  const [newLocationNoise, setNewLocationNoise] = useState(0);
  const [newLocationTables, setNewLocationTables] = useState(0);
  const [newLocationLighting, setNewLocationLighting] = useState(0);
  const [newLocationComment, setNewLocationComment] = useState("");
  const [fromTime, setFromTime] = useState("09:00");
  const [toTime, setToTime] = useState("21:00");
  const [file, setFile] = useState();
    const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 },
  };

  const handleID = (value) => {
    setNewLocationIDRequired(value);
  };

  const handleSilentArea = (value) => {
    setNewLocationSilentArea(value);
  };

  const handleWifi = (value) => {
    setNewLocationWifi(value);
  };

  const handleOutlets = (value) => {
    setNewLocationOutlets(value);
  };

  const handleWhiteboards = (value) => {
    setNewLocationWhiteboards(value);
  };

  const handleGroupWork = (value) => {
    setNewLocationGroupWork(value);
  };

  const handleFoodDrink = (value) => {
    setNewLocationFoodDrink(value);
  };

  const options = [
    { id: 1, label: "Silent", icon: <FaVolumeMute /> },
    { id: 2, label: "Quiet", icon: <FaVolumeOff /> },
    { id: 3, label: "Moderate", icon: <FaVolumeDown /> },
    { id: 4, label: "Lively", icon: <FaVolumeUp /> },
  ];

  const optionsTables = [
    { id: 1, label: "Individual", icon: <FaUser size={10} /> },
    { id: 2, label: "Shared", icon: <FaUsers /> },
    { id: 3, label: "Mixed", icon: <FaLayerGroup size={11} /> },
  ];

  const optionsLighting = [
    { id: 1, label: "Bright", icon: <FaLightbulb /> },
    { id: 2, label: "Natural", icon: <FaLeaf /> },
    { id: 3, label: "Dim", icon: <FaRegLightbulb /> },
  ];

  return (
    <div
      className={`${
        selectedSpot
          ? "w-full overflow-y-scroll"
          : "w-0 lg:w-full overflow-hidden"
      } h-screen flex flex-col bg-lightBG dark:bg-darkBG border-r border-darkBG/20 dark:border-purple-300/10 pt-16 lg:pt-20 transition-all ease-in-out duration-700`}
    >
      <AnimatePresence mode="wait">
        {selectedSpot ? (
          <motion.div
            key="selected"
            {...fadeInDown}
            className="w-full h-full px-4 py-3"
          >
            <div className="flex flex-row items-start justify-between">
              <h1 className="text-black dark:text-white poppins-medium text-lg">
                New Spot Details
              </h1>
              <button
                onClick={() => setSelectedSpot(false)}
                className="text-center justify-center flex lg:hidden items-center gap-2 bg-purple-600 dark:bg-purple-900/60 text-white hover:bg-purple-900 dark:hover:bg-purple-900 duration-500 transition-all px-3 py-1.5 rounded-lg text-xs poppins-regular"
              >
                Back to Map
              </button>
            </div>
            <div className="flex flex-col mt-2 gap-4 pb-40">
              <GeneralInput
                labelText={"Spot Name"}
                placeholder={"eg. SFU Surrey Big Glass Window Area"}
                required={true}
                value={spotName}
                onChange={(e) => setSpotName(e.target.value)}
              />
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Rating <span className="text-purple-500">*</span>
                </label>
                <div className="space-y-1 lg:space-y-4">
                  <div className="flex gap-2 lg:gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewLocationRating(star)}
                        className={`flex-1 aspect-square rounded-2xl transition-all ${
                          star <= newLocationRating
                            ? "bg-gradient-to-br from-purple-500 dark:from-purple-800 to-purple-700 dark:to-purple-950 text-white"
                            : "bg-white dark:bg-purple-400/10 dark:bg-backgroundCardsDark text-black/20 dark:text-white/20 hover:bg-purple-200 hover:text-purple-500 hover:dark:bg-purple-900 transition-all duration-500 ease-in-out"
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="text-base lg:text-xl">★</span>
                          <span className="text-xs lg:mt-1">{star}/5</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Hours of Operation <span className="text-purple-500">*</span>
                </label>
                <div className="grid xl:grid-cols-2 gap-2 lg:gap-6 h-max">
                  <TimeInput
                    label="Opens at"
                    defaultTime="09:00"
                    isOpen={true}
                    onTimeChange={setFromTime}
                  />
                  <TimeInput
                    label="Closes at"
                    defaultTime="21:00"
                    isOpen={false}
                    onTimeChange={setToTime}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Spot Photo <span className="text-purple-500">*</span>
                </label>
                <DragAndDrop file={file} setFile={setFile} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Features at this spot (select all that apply){" "}
                  <span className="text-purple-500">*</span>
                </label>
                <div className="grid xl:grid-cols-2 gap-2 lg:gap-4">
                  <FeatureSelector
                    icon={<FaRegIdCard size={12} />}
                    label={"ID Required"}
                    isSelected={newLocationIDRequired}
                    onToggle={handleID}
                  />
                  <FeatureSelector
                    icon={<FaWifi size={12} />}
                    label={"Wifi"}
                    isSelected={newLocationWifi}
                    onToggle={handleWifi}
                  />
                  <FeatureSelector
                    icon={<FaPlug size={12} />}
                    label={"Outlets"}
                    isSelected={newLocationOutlets}
                    onToggle={handleOutlets}
                  />
                  <FeatureSelector
                    icon={<FaChalkboard size={12} />}
                    label={"Whiteboards"}
                    isSelected={newLocationWhiteboards}
                    onToggle={handleWhiteboards}
                  />
                  <FeatureSelector
                    icon={<FaUsers size={12} />}
                    label={"Good for Group Work"}
                    isSelected={newLocationGroupWork}
                    onToggle={handleGroupWork}
                  />
                  <FeatureSelector
                    icon={<FaUsers size={12} />}
                    label={"Food/Drinks Allowed"}
                    isSelected={newLocationFoodDrink}
                    onToggle={handleFoodDrink}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Noise Level <span className="text-purple-500">*</span>
                </label>
                <Slider
                  options={options}
                  setSelected={setNewLocationNoise}
                  selected={newLocationNoise}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Table/Desk Space <span className="text-purple-500">*</span>
                </label>
                <Slider
                  options={optionsTables}
                  setSelected={setNewLocationTables}
                  selected={newLocationTables}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Lighting <span className="text-purple-500">*</span>
                </label>
                <Slider
                  options={optionsLighting}
                  setSelected={setNewLocationLighting}
                  selected={newLocationLighting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Comment
                </label>
                <textarea
                  type="text"
                  value={newLocationComment}
                  onChange={(e) => setNewLocationComment(e.target.value)}
                  placeholder="e.g. Great spot to study with a group and has great drinks."
                  className={`px-3.5 scrollbar-hide py-2.5 poppins-regular text-sm w-full border border-darkBG/20 dark:border-purple-300/10 bg-white dark:bg-purple-400/10 rounded-xl text-black dark:text-white focus:outline-none`}
                />
              </div>
              <div className="w-full lg:w-1/3 fixed bottom-0 left-0 h-20 bg-white dark:bg-darkBG border-t border-darkBG/20 dark:border-purple-300/10 z-50 flex items-center justify-end px-5">
                <PrimaryButton text={"Create Study Spot"} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="info"
            {...fadeInDown}
            className="w-5/6 hidden m-auto bg-purple-200/50 dark:bg-purple-400/5 rounded-3xl h-[90%] lg:flex flex-col items-center justify-center"
          >
            <p className="poppins-medium text-black dark:text-white text-xl">
              Add Study Spot
            </p>
            <div className="flex items-center justify-center p-6 bg-purple-500 dark:bg-purple-900 rounded-full mt-4">
              <MdOutlineAddToPhotos
                size={20}
                className="text-purple-200 dark:text-purple-400"
              />
            </div>
            <p className="poppins-regular text-black/60 dark:text-purple-100/70 text-base mt-4">
              1. Click on the map to select the location
            </p>
            <p className="poppins-regular text-black/60 dark:text-purple-100/70 text-base mt-2">
              2. Fill out the information about the study spot
            </p>
            <p className="poppins-regular text-black/60 dark:text-purple-100/70 text-base mt-2">
              3. Your spot will be available to all users
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
