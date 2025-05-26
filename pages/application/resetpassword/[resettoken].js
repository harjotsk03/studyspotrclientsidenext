"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layouts/Layout";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { AlertContext } from "../../../context/alertContext";

export default function ResetPassword() {
  const router = useRouter();
  const { resettoken } = router.query;
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const emailSentPasswordReset = localStorage.getItem("emailSentPasswordReset");
    setEmailSent(emailSentPasswordReset);
  },[])

  useEffect(() => {
    const verifiedJWT = localStorage.getItem("verifiedJWT");
    console.log(verifiedJWT);

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
        console.log(data);

        if (response.ok) {
          // Redirect only if token is valid
          router.replace(`/application/resetpassword/${token}`);
        } else {
          localStorage.removeItem("verifiedJWT");
          console.warn("Token invalid or expired.");
          localStorage.removeItem("verifiedJWT");
          localStorage.removeItem("emailSentPasswordResetEmail");
          localStorage.setItem("emailSentPasswordReset", false);
          router.replace(`/application/resetpassword`);
        }
      } catch (err) {
        localStorage.removeItem("verifiedJWT");
        localStorage.removeItem("emailSentPasswordResetEmail");
        localStorage.setItem("emailSentPasswordReset", false);
        router.replace(`/application/resetpassword`);
        console.error("Token validation failed:", err);
      }
    };

    isTokenStillValid(verifiedJWT);
  })

  const reenterEmail = () => {
    localStorage.setItem("emailSentPasswordReset", false);
    setEmailSent(false);
  }

  const handleVerifyCode = async () => {
    if (!email || !verificationCode) {
      showAlert("Please enter both email and code.");
      return;
    }

    console.log(email, verificationCode);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verifycode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: verificationCode }),
        }
      );

      console.log(response)

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || data.message || "Verification failed";
        throw new Error(errorMessage);
      }

      console.log("Verified JWT:", data.jwt);

      localStorage.setItem("verifiedJWT", data.jwt);
      showAlert("Verification successful!");
      // redirect or next step
    } catch (err) {
        console.error(err)
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

          <div className="flex flex-col gap-4 mt-2 lg:mt-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Password
              </label>
              <input
                type="password"
                // value={verificationCode}
                // onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Confirm Password
              </label>
              <input
                type="password"
                // value={verificationCode}
                // onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <PrimaryButton text={"Submit Code"} onClick={handleVerifyCode} />
        </div>
      </div>
    </Layout>
  );
}
