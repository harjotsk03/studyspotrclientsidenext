"use client";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/Layout";
import { useProfile } from "../../hooks/useProfile";
import EditInput from "../../components/inputs/EditInput";
import { useEffect, useState } from "react";
import { FiCheck, FiEdit2, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const {profile, loading} = useProfile();
  const [newName, setNewName] = useState("");
  const [newNameEditing, setNewNameEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameEditing, setNewUsernameEditing] = useState(false);
  const [referalLinkEditing, setReferalLinkEditing] = useState(false);
  const [verifiedEditing, setVerifiedEditing] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  useEffect(() => {
    if (profile?.name) setNewName(profile.name);
    if (profile?.username) setNewUsername(profile.username);
  }, [profile]);

  const handleCancel = () => {
    setReferalLinkEditing(false);
  };

  const handleSave = () => {
    setReferalLinkEditing(false);
  };

  const handleCancelVerify = () => {
    setVerifiedEditing(false);
  };

  const handleSaveVerify = () => {
    setVerifiedEditing(false);
  };

  const handleCancelPhoto = () => {
    setIsEditingPhoto(false);
  };

  const handleSavePhoto = () => {
    setIsEditingPhoto(false);
  };


  return (
    <Layout>
      <div className="flex flex-col lg:pt-28 bg-lightBG dark:bg-darkBG px-40 h-max fade-in-down">
        <h1 className="text-black dark:text-white poppins-medium text-2xl mb-4">
          Profile
        </h1>
        {profile ? (
          <div className="w-full px-10 py-6 bg-white dark:bg-purple-300/5 rounded-2xl">
            <div className="flex flex-row gap-10 w-full">
              <EditInput
                labelText={"Full Name"}
                initialValue={profile?.name}
                placeholderText={"Full Name"}
                onChange={(e) => setNewName(e.target.value)}
                inputValue={newName}
                isEditing={newNameEditing}
                setIsEditing={setNewNameEditing}
                capitalize={true}
              />
              <div className="flex flex-row items-center w-full">
                <label className="text-black/50 dark:text-white/60 poppins-regular text-sm pr-4 whitespace-nowrap flex-shrink-0 w-20 mr-2">
                  Profile Pic
                </label>
                <div className="group w-full flex justify-between items-center rounded-xl transition-all duration-300 ease-in-out">
                  {isEditingPhoto ? (
                    <div className="relative flex items-center w-full">
                      <input
                        autoFocus
                        type="file"
                        className="w-full text-black dark:text-white poppins-regular px-3 py-3 text-xs bg-purple-50 dark:bg-darkBG focus:outline-none pr-14 rounded-xl"
                      />
                      <div className="absolute right-3 flex items-center gap-2">
                        <button
                          onClick={handleSavePhoto}
                          className="text-white p-1 bg-green-600 rounded-full"
                          aria-label="Save"
                        >
                          <FiCheck size={12} />
                        </button>
                        <button
                          onClick={handleCancelPhoto}
                          className="text-white p-1 bg-red-500 rounded-full"
                          aria-label="Cancel"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsEditingPhoto(true)}
                      className="group w-full flex justify-between items-center cursor-pointer hover:bg-purple-50 dark:hover:bg-white/10 px-3 py-2 rounded-xl transition-all duration-300 ease-in-out"
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden relative">
                        <Image
                          src={profile?.profilePhoto}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <FiEdit2
                        className="text-gray-400 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                        size={16}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-10 w-full mt-2">
              <EditInput
                labelText={"Username"}
                initialValue={profile?.username}
                placeholderText={"Username"}
                onChange={(e) => setNewUsername(e.target.value)}
                inputValue={newUsername}
                isEditing={newUsernameEditing}
                setIsEditing={setNewUsernameEditing}
              />
              <div className="flex flex-row items-center w-full">
                <label className="text-black/50 dark:text-white/60 poppins-regular text-sm pr-4 whitespace-nowrap flex-shrink-0 w-20 mr-2">
                  Email
                </label>
                <div className="group w-full flex justify-between items-center  px-3 py-2 rounded-xl transition-all duration-300 ease-in-out">
                  <p
                    className={`text-black dark:text-white poppins-regular text-lg`}
                  >
                    {profile?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-10 w-full mt-2">
              <div className="flex flex-row items-center w-full">
                <label className="text-black/50 dark:text-white/60 poppins-regular text-sm pr-4 whitespace-nowrap flex-shrink-0 w-20 mr-2">
                  Verified
                </label>

                {verifiedEditing ? (
                  <div className="relative flex items-center w-full">
                    <input
                      autoFocus
                      className="w-full text-black dark:text-white poppins-regular px-3 py-2 text-lg bg-purple-50 dark:bg-darkBG focus:outline-none pr-14 rounded-xl"
                      placeholder="Verified..."
                      value={
                        profile?.isEmailVerified == true ? "True" : "False"
                      }
                    />
                    <div className="absolute right-3 flex items-center gap-2">
                      {profile?.isEmailVerified != true && (
                        <button
                          onClick={handleSaveVerify}
                          className="text-white px-3 text-center text-xs py-1 bg-green-600 rounded-full poppins-regular"
                          aria-label="Save"
                        >
                          Verify Now
                        </button>
                      )}
                      <button
                        onClick={handleCancelVerify}
                        className="text-white p-1 bg-red-500 rounded-full"
                        aria-label="Cancel"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setVerifiedEditing(true)}
                    className="group w-full flex justify-between items-center cursor-pointer hover:bg-purple-50 dark:hover:bg-white/10 px-3 py-2 rounded-xl transition-all duration-300 ease-in-out"
                  >
                    <p
                      className={`text-black dark:text-white poppins-regular text-lg`}
                    >
                      {profile?.isEmailVerified == true ? "True" : "False"}
                    </p>
                    <FiEdit2
                      className="text-gray-400 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                      size={16}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-row items-center w-full">
                <label className="text-black/50 dark:text-white/60 poppins-regular text-sm pr-4 whitespace-nowrap flex-shrink-0 w-20 mr-2">
                  Referal Link
                </label>

                {referalLinkEditing ? (
                  <div className="relative flex items-center w-full">
                    <input
                      autoFocus
                      className="w-full text-black dark:text-white poppins-regular px-3 py-2 text-lg bg-purple-50 dark:bg-darkBG focus:outline-none pr-14 rounded-xl"
                      placeholder="Referal Link"
                      value={profile?.referalLink}
                    />
                    <div className="absolute right-3 flex items-center gap-2">
                      {profile?.referalLink == "None" && (
                        <button
                          onClick={handleSave}
                          className="text-white px-3 text-center text-xs py-1 bg-green-600 rounded-full poppins-regular"
                          aria-label="Save"
                        >
                          Generate Link
                        </button>
                      )}
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
                    onClick={() => setReferalLinkEditing(true)}
                    className="group w-full flex justify-between items-center cursor-pointer hover:bg-purple-50 dark:hover:bg-white/10 px-3 py-2 rounded-xl transition-all duration-300 ease-in-out"
                  >
                    <p
                      className={`text-black dark:text-white poppins-regular text-lg`}
                    >
                      {profile?.referalLink}
                    </p>
                    <FiEdit2
                      className="text-gray-400 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                      size={16}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-10 mt-2">
              <div className="flex flex-row items-center w-full">
                <label className="text-black/50 dark:text-white/60 poppins-regular text-sm pr-4 whitespace-nowrap flex-shrink-0 w-20 mr-2">
                  Active Points
                </label>
                <div className="group w-full flex justify-between items-center  px-3 py-2 rounded-xl transition-all duration-300 ease-in-out">
                  <p
                    className={`text-black dark:text-white poppins-regular text-lg`}
                  >
                    {profile?.activePoints}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center w-full">
                <label className="text-black/50 dark:text-white/60 poppins-regular text-sm pr-4 whitespace-nowrap flex-shrink-0 w-20 mr-2">
                  Total Points
                </label>
                <div className="group w-full flex justify-between items-center  px-3 py-2 rounded-xl transition-all duration-300 ease-in-out">
                  <p
                    className={`text-black dark:text-white poppins-regular text-lg`}
                  >
                    {profile?.totalPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[30vh] px-10 py-6 bg-white dark:bg-purple-300/5 rounded-2xl"></div>
        )}
      </div>
    </Layout>
  );
}
