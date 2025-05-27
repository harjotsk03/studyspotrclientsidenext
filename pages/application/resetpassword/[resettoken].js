"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layouts/Layout";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { AlertContext } from "../../../context/alertContext";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) errors.push("at least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
    errors.push("a special character");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default function ResetPassword() {
  const router = useRouter();
  const { resettoken } = router.query;
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const lastSentStr = localStorage.getItem("passwordResetEmail");
    setEmail(lastSentStr);
  }, []);

  useEffect(() => {
    if (confirmNewPassword != "" && newPassword != confirmNewPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }, [newPassword, confirmNewPassword]);

  useEffect(() => {
    const verifiedJWT = localStorage.getItem("verifiedJWT");

    const isTokenStillValid = async (token) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          // Redirect only if token is valid
          router.replace(`/application/resetpassword/${token}`);
        } else {
          localStorage.removeItem("verifiedJWT");
          router.replace(`/application/resetpassword`);
        }
      } catch (err) {
        localStorage.removeItem("verifiedJWT");
        router.replace(`/application/resetpassword`);
        console.error("Token validation failed:", err);
      }
    };

    isTokenStillValid(verifiedJWT);
  }, []);

  const isValidPassword = (password) => {
    const isLongEnough = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return isLongEnough && hasUpperCase && hasLowerCase && hasSpecialChar;
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    if (confirmNewPassword != "" && newPassword != confirmNewPassword) {
      showAlert("Passwords do not match.");
      return;
    }

    if (newPassword == "" || newPassword == " ") {
      showAlert("New Password can not be blank.");
      return;
    }

    if (confirmNewPassword == "" || confirmNewPassword == " ") {
      showAlert("Confirm New Password can not be blank.");
      return;
    }

    const { isValid, errors } = validatePassword(newPassword);

    if (!isValid) {
      const message = `Password must contain ${errors.join(", ")}.`;
      showAlert(message);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || data.message || "Verification failed";
        throw new Error(errorMessage);
      }

      console.log("Verified JWT:", data.jwt);
      localStorage.setItem("token", data.jwt);
      localStorage.removeItem("verifiedJWT");
      localStorage.removeItem("passwordResetEmail");
      localStorage.setItem("lastPasswordResetEmail", null);
      router.push("/application/findaspot");
    } catch (err) {
      console.error(err);
      showAlert(err.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full h-screen items-center justify-center bg-lightBG dark:bg-darkBG">
        <div className="bg-white dark:bg-purple-50/5 px-8 py-6 lg:px-20 lg:py-14 rounded-2xl flex flex-col justify-center gap-2 fade-in-up w-1/3">
          <h1 className="poppins-medium text-lg lg:text-2xl text-black dark:text-purple-200">
            Reset Your Password
          </h1>
          <p className="poppins-regular text-xs lg:text-sm text-black/50 dark:text-purple-200/50">
            Enter your new password.
          </p>
          <p className="poppins-regular text-xs text-black/30 dark:text-purple-200/30">
            Must contain one uppercase, one lower case, and one special
            character (#,?,$,@,%,&,*).
          </p>

          <div className="flex flex-col gap-4 mt-2 lg:mt-4 mb-2">
            <div className="flex flex-col gap-2">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Confirm New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-4">
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-sm poppins-regular text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              {showPassword ? (
                <div className="flex w-40 flex-row gap-1 items-center">
                  <MdOutlineCheckBox size={15} />
                  <p>Hide Password</p>
                </div>
              ) : (
                <div className="flex w-40 flex-row gap-1 items-center">
                  <MdOutlineCheckBoxOutlineBlank size={15} />
                  <p>Show Password</p>
                </div>
              )}
            </button>
            {error && (
              <p className="text-sm poppins-regular text-red-500">{error}</p>
            )}
          </div>

          <PrimaryButton onClick={submitNewPassword} text={"Reset Password"} />
        </div>
      </div>
    </Layout>
  );
}
