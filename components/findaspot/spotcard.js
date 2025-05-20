import { FaStar } from "react-icons/fa";
import SpotTag from "./SpotTag";

export default function SpotCard({studyspot}) {

    const tags = [
      studyspot.wifi && { label: "Wifi" },
      studyspot.whiteboards && { label: "Whiteboards" },
      studyspot.outlets && { label: "Outlets" },
      studyspot.idRequired && { label: "ID Required" },
      studyspot.foodDrinkAllowed && { label: "Food & Drink Allowed" },
      studyspot.goodForGroupWork && { label: "Good for Group Work" },
    ].filter(Boolean);

  return (
    <button
      onClick={() => selectLocation(studyspot)}
      className="w-full flex flex-row gap-4 justify-between bg-lightBG hover:bg-purple-50 dark:bg-darkBG dark:hover:bg-purple-950/10 transition-all duration-300 ease-in-out border-b border-darkBG/20 dark:border-purple-300/10 h-max py-5 px-5"
    >
      <div className="w-full flex text-left flex-col gap-1">
        <h1 className="poppins-medium text-base lg:text-lg text-black dark:text-white">
          {studyspot.name}
        </h1>

        <div className="poppins-regular text-xs lg:text-sm text-black/40 dark:text-white/30 flex flex-row items-center gap-2">
          <p className="poppins-medium flex flex-row gap-0.5 items-center">
            {studyspot.rating}
            <FaStar
              size={11}
              className="text-purple-500 dark:text-purple-700 -mt-0.5"
            />
          </p>
          <div className="w-1 h-1 bg-backgroundLight3 dark:bg-backgroundDark3 rounded-full"></div>
          {/* {distance !== null ? (
            <div className="poppins-regular text-xs">
              {formatDistance(distance)} away
            </div>
          ) : (
            <h1 className="poppins-regular text-xs text-textLight2 dark:text-textDark2">
              Loading Distance...
            </h1>
          )} */}
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-2 mt-1">
          {tags.map((tag, index) => (
            <SpotTag
              key={tag.label}
              label={tag.label}
              isLast={index === tags.length - 1}
            />
          ))}
          {/* {isSaved && userLoggedIn && (
            <div className="flex flex-row items-center gap-2">
              <div className="w-1 h-1 bg-backgroundLight3 dark:bg-backgroundDark3 rounded-full"></div>
              <p className="poppins-regular text-xs text-mainColorLightOrange dark:text-mainColorDarkOrange2">
                Saved
              </p>
            </div>
          )} */}
        </div>
      </div>
    </button>
  );
}
