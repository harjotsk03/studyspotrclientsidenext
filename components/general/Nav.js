"use client";
import Image from "next/image";
import { useState } from "react";
import studySpotrLogo from "../../assets/logos/studyspotrlogoblack.png";
import studySpotrLogoWhite from "../../assets/logos/studyspotrlogowhite.png";
import { MdFilterList } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { LuMapPin, LuMapPinPlus } from "react-icons/lu";
import NavBarButton from "../buttons/NavBarButton";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/router";
import { useViewContext } from "../../context/viewContext";
import { useProfile } from "../../hooks/useProfile";
import { FiChevronDown } from "react-icons/fi";
import ProfileDropdown from "./ProfileDropdown";
import { AnimatePresence } from "framer-motion";

export default function Nav() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const { toggleMap, toggleList, view } = useViewContext();
    const currentPath = router.pathname;
    const {profile, loading} = useProfile();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleDrawer = () => setMenuOpen(!menuOpen);

  const handleToggleList = () => {
    toggleList();
    toggleDrawer();
    router.push("/application/findaspot")
  };

  const handleToggleMap = () => {
    toggleMap();
    toggleDrawer();
    router.push("/application/findaspot");
  };

  const handleNavigateToAddSpot = () => {
    toggleDrawer();
    router.push("/application/addaspot");
  };

  const toggleShowProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showProfileDropdown && (
          <ProfileDropdown
            key="profile-dropdown"
            toggleShowProfileDropdown={toggleShowProfileDropdown}
          />
        )}
      </AnimatePresence>

      <div className="w-full h-16 lg:h-20 fixed top-0 left-0 flex flex-row justify-between items-center px-6 lg:px-10 bg-white dark:bg-darkBG z-50 border-b border-darkBG/20 dark:border-purple-300/10">
        <div className="flex flex-row gap-4 items-center">
          <button
            className="lg:hidden text-purple-950 dark:text-purple-100"
            onClick={toggleDrawer}
            aria-label="Open Menu"
          >
            <FaBars size={15} />
          </button>

          <button onClick={() => router.push("/")}>
            <Image
              src={studySpotrLogo}
              className="w-7 h-auto dark:hidden"
              alt="Study Spotr Logo"
              width={studySpotrLogo.width}
              height={studySpotrLogo.height}
            />
          </button>
          <button onClick={() => router.push("/")}>
            <Image
              src={studySpotrLogoWhite}
              className="w-7 h-auto hidden dark:flex"
              alt="Study Spotr Logo"
              width={studySpotrLogo.width}
              height={studySpotrLogo.height}
            />
          </button>

          <div className="hidden lg:flex flex-row gap-2 items-center ml-6">
            <NavBarButton
              onClick={handleToggleMap}
              icon={<LuMapPin size={12} />}
              text={"Map View"}
              isActive={
                currentPath === "/application/findaspot" && view === "map"
              }
            />
            <NavBarButton
              icon={<MdFilterList size={12} />}
              text={"List View"}
              onClick={handleToggleList}
              isActive={
                currentPath === "/application/findaspot" && view === "list"
              }
            />
            <NavBarButton
              onClick={() => router.push("/application/addaspot")}
              icon={<LuMapPinPlus size={12} />}
              text={"Add Spot"}
              isActive={currentPath === "/application/addaspot"}
            />
          </div>
        </div>

        {/* Right side */}
        <div
          className={`flex flex-row items-center ${
            profile ? "gap-4" : "gap-2"
          }`}
        >
          <ThemeToggle />
          {loading ? (
            <div
              onClick={toggleShowProfileDropdown}
              className="flex flex-row items-center gap-1"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden relative bg-darkBG"></div>
              <div className="p-2">
                <FiChevronDown
                  size={16}
                  className={`text-purple-500 ${
                    showProfileDropdown && "rotate-180"
                  } transition-all ease-in-out duration-500`}
                />
              </div>
            </div>
          ) : profile ? (
            <button
              onClick={toggleShowProfileDropdown}
              className="flex flex-row items-center gap-1"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden relative">
                <Image
                  src={profile?.profilePhoto}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <FiChevronDown
                  size={16}
                  className={`text-purple-500 ${
                    showProfileDropdown && "rotate-180"
                  } transition-all ease-in-out duration-500`}
                />
              </div>
            </button>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <SecondaryButton
                text={"Sign Up"}
                onClick={() => router.push("/application/register")}
              />
              <PrimaryButton
                text={"Log In"}
                onClick={() =>
                  router.push(
                    `/application/login?redirect=${encodeURIComponent(
                      router.asPath
                    )}`
                  )
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Slide-out drawer */}
      <div
        className={`fixed lg:hidden top-0 left-0 h-full w-64 bg-lightBG dark:bg-darkBG z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-24 lg:pt-28 px-7 flex flex-col gap-4">
          <button
            onClick={handleToggleMap}
            className="bg-purple-200/40 dark:bg-purple-900/15 rounded-xl text-purple-950 dark:text-purple-50 px-5 py-4 text-sm poppins-regular flex items-center gap-2"
          >
            <LuMapPin size={13} /> Map View
          </button>

          <button
            onClick={handleToggleList}
            className="bg-purple-200/40 dark:bg-purple-900/15 rounded-xl text-purple-950 dark:text-purple-50 px-5 py-4 text-sm poppins-regular flex items-center gap-2"
          >
            <MdFilterList size={16} /> List View
          </button>

          <button
            onClick={handleNavigateToAddSpot}
            className="bg-purple-200/40 dark:bg-purple-900/15 rounded-xl text-purple-950 dark:text-purple-50 px-5 py-4 text-sm poppins-regular flex items-center gap-2"
          >
            <LuMapPinPlus size={16} /> Add Spot
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed lg:hidden inset-0 bg-black bg-opacity-60 z-30"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
}
