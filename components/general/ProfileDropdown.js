"use client";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { FiDatabase, FiLogOut, FiUser } from "react-icons/fi";
import { RiFileAddLine } from "react-icons/ri";
import { FaCoins } from "react-icons/fa";
import { motion } from "framer-motion";

const DropdownItem = ({ icon: Icon, label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`text-sm w-full px-5 text-black dark:text-purple-50 lg:px-8 py-3.5 hover:bg-purple-600 dark:hover:bg-purple-900 hover:text-white dark:hover:bg-backgroundCardsDark transition duration-500 ease-in-out poppins-regular flex flex-row gap-2 lg:gap-5 items-center ${
      isActive ? "bg-purple-400 dark:bg-backgroundCardsDark" : ""
    }`}
  >
    <Icon />
    {label}
  </button>
);

export default function ProfileDropdown  ({
  toggleShowProfileDropdown,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      toggleShowProfileDropdown();
      router.push("/application/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    {
      icon: FiUser,
      label: "View Profile",
      action: () => {
        router.push("/application/profile");
        toggleShowProfileDropdown();
      },
      path: "/application/profile",
    },
    {
      icon: FaCoins,
      label: "Points",
      action: () => {
        router.push("/application/points");
        toggleShowProfileDropdown();
      },
      path: "/application/points",
    },
    {
      icon: RiFileAddLine,
      label: "Created Spots",
      action: () => {
        router.push("/application/created-spots");
        toggleShowProfileDropdown();
      },
      path: "/application/created-spots",
    },
    {
      icon: FiDatabase,
      label: "Data & Privacy",
      action: () => {
        router.push("/application/privacy");
        toggleShowProfileDropdown();
      },
      path: "/application/privacy",
    },
    {
      icon: FiLogOut,
      label: "Log Out",
      action: handleLogout,
    },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };
  

  return (
    <motion.div
      key="profile-dropdown"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropdownVariants}
      className="absolute right-2 lg:right-4 mt-[7px] w-44 lg:w-52 top-14 lg:top-16 bg-white dark:bg-darkBG rounded-b-xl drop-shadow-md z-40"
    >
      <div className="py-2">
        {menuItems.map((item, index) => (
          <DropdownItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.action}
            isActive={pathname === item.path}
          />
        ))}
      </div>
    </motion.div>
  );
};
