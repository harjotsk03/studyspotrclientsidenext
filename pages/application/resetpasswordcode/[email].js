"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layouts/Layout";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { AlertContext } from "../../../context/alertContext";

export default function ResetPasswordCode() {
  const router = useRouter();
  const { email } = router.query;
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const emailSentPasswordReset = localStorage.getItem("emailSentPasswordReset");
    setEmailSent(emailSentPasswordReset);
  },[])

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
      const resettoken = data.jwt;
      router.push(`/application/resetpassword/${resettoken}`);
      showAlert("Verification successful!");
      // redirect or next step
    } catch (err) {
        console.error(err)
      showAlert(err.message);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const emailSentPasswordReset = localStorage.getItem(
      "emailSentPasswordReset"
    );
    const emailSentPasswordResetEmail = localStorage.getItem(
      "emailSentPasswordResetEmail"
    );
    const verifiedJWT = localStorage.getItem("verifiedJWT");
    console.log(verifiedJWT)

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
  }, [router.isReady]);


  return (
    <Layout>
      <div className="flex flex-col w-full h-screen items-center justify-center bg-lightBG dark:bg-darkBG">
        <div className="bg-white dark:bg-purple-50/5 px-8 py-6 lg:px-20 lg:py-14 rounded-2xl flex flex-col justify-center gap-2 fade-in-up w-1/3">
          <h1 className="poppins-medium text-lg lg:text-2xl text-black dark:text-purple-200">
            Verification Code
          </h1>
          <p className="poppins-regular text-xs lg:text-sm text-black/50 dark:text-purple-200/50">
            Please enter the 6 digit code sent to {email}.
          </p>

          <button
            onClick={reenterEmail}
            className="poppins-regular text-left text-xs lg:text-xs text-black/50 dark:text-purple-200/80 underline"
          >
            If this email is incorrect click to here to go back!
          </button>

          <div className="flex flex-col gap-4 mt-2 lg:mt-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Enter Verification Code
              </label>
              <input
                type="number"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="5 4 5 6 8 8"
              />
            </div>
          </div>

          <PrimaryButton text={"Submit Code"} onClick={handleVerifyCode} />
        </div>
      </div>
    </Layout>
  );
}
