"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/Layout";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { AlertContext } from "../../context/alertContext";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmPasswordResetCode from "../../components/modals/ConfirmPasswordResetCode";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { showAlert } = useContext(AlertContext);

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
          localStorage.removeItem("passwordResetEmail");
          localStorage.setItem("lastPasswordResetEmail", null);
          router.replace(`/application/resetpassword`);
        }
      } catch (err) {
        localStorage.removeItem("verifiedJWT");
        localStorage.removeItem("passwordResetEmail");
        localStorage.setItem("lastPasswordResetEmail", null);
        router.replace(`/application/resetpassword`);
        console.error("Token validation failed:", err);
      }
    };

    isTokenStillValid(verifiedJWT);
  }, []);

  useEffect(() => {
    const checkIfRecent = () => {
      const now = new Date();
      const lastSentTimeStr = localStorage.getItem("lastPasswordResetEmail");
      const passwordResetEmail = localStorage.getItem("passwordResetEmail");

      if (passwordResetEmail) {
        setEmail(passwordResetEmail);
      }

      if (!lastSentTimeStr) return;

      const lastSentTime = new Date(lastSentTimeStr);
      const diffInMs = now - lastSentTime;

      if (diffInMs < 3 * 60 * 100000000) {
        setEmailSent(true);
      } else {
        setEmailSent(false);
      }

      console.log("Difference in ms:", diffInMs);
    };

    checkIfRecent();
  }, []);

  const sendEmail = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sendemailcode?email=${email}`,
        {
          method: "GET",
        }
      );

      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || data.message || "Verification failed";
        throw new Error(errorMessage);
      }
      if (response.status == 200) {
        setEmailSent(true);
        localStorage.setItem("lastPasswordResetEmail", new Date());
        localStorage.setItem("passwordResetEmail", email);
      }
    } catch (err) {
      console.error(err);
      showAlert(err.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full h-screen items-center justify-center bg-lightBG dark:bg-darkBG">
        <div className="bg-white dark:bg-purple-50/5 px-8 py-6 lg:px-20 lg:py-14 rounded-2xl flex flex-col justify-center gap-2 fade-in-up w-10/12 lg:w-1/3">
          <h1 className="poppins-medium text-lg lg:text-2xl text-black dark:text-purple-200">
            Password Reset
          </h1>
          <p className="poppins-regular text-xs lg:text-sm text-black/50 dark:text-purple-200/50">
            Please enter your email address in order to get a password reset
            link.
          </p>

          <div className="flex flex-col gap-4 mt-2 lg:mt-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="johndoe@example.com or johndoe"
              />
            </div>
          </div>

          <PrimaryButton text={"Reset Password"} onClick={sendEmail} />
        </div>
      </div>
      <AnimatePresence>
        {emailSent && (
          <ConfirmPasswordResetCode
            setEmailSent={setEmailSent}
            email={email}
            sendEmail={sendEmail}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
