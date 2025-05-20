import { useState } from "react";
import SpotCard from "./spotcard";
import PrimaryButton from "../buttons/PrimaryButton";
import { useViewContext } from "../../context/viewContext";

export default function ListView() {
  const { view } = useViewContext();
  const [searchOnChange, setSearchOnChange] = useState("");
  const locations = [
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    {
      name: "Library",
      location: { lat: 49.052, long: -122.784 },
      openHours: "5:00 AM - 11:30 PM",
      rating: 3.5,
      wifi: true,
      outlets: true,
      foodDrinkAllowed: false,
      goodForGroupWork: true,
      idRequired: false,
      whiteboards: false,
      ratingCount: 2,
      imageUrl:
        "https://studyspotr.s3.us-east-2.amazonaws.com/sfulibraryimage.jpg",
    },
    
  ];

  return (
    <div
      className={`${
        view === "list" ? "w-full" : "w-0 overflow-hidden"
      } h-screen flex flex-col bg-lightBG dark:bg-darkBG border-r border-darkBG/20 dark:border-purple-300/10 pt-16 lg:pt-20 transition-all ease-in-out duration-500`}
    >
      {/* Search bar */}
      <div className="w-full px-2 py-2 border-b border-darkBG/20 dark:border-purple-300/10">
        <input
          autoFocus
          className="w-full text-black dark:text-white poppins-regular px-4 py-3 text-sm bg-white dark:bg-purple-200/5 border border-darkBG/20 dark:border-purple-300/10 dark:bg-darkBG focus:outline-none pr-14 rounded-md"
          placeholder="Search a spot"
          onChange={(e) => setSearchOnChange(e.target.value)}
          value={searchOnChange}
        />
      </div>

      {/* Header + Filter */}
      <div className="w-full px-2 py-2 border-b border-darkBG/20 dark:border-purple-300/10 flex justify-between items-center">
        <p className="text-black/50 dark:text-white/50 poppins-light text-xs ml-2">
          Results ({locations.length})
        </p>
        <button className="text-center justify-center flex items-center gap-2 bg-purple-600 dark:bg-purple-900/60 text-white hover:bg-purple-900 dark:hover:bg-purple-900 duration-500 transition-all px-4 py-2 rounded-lg text-xs poppins-regular">
          Filters
        </button>
      </div>

      {/* Scrollable list area */}
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide">
        {locations.map((spot, index) => (
          <SpotCard key={index} studyspot={spot} />
        ))}
      </div>
    </div>
  );
}
