"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/Layout";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { AlertContext } from "../../context/alertContext";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const emailSentPasswordReset = localStorage.getItem(
      "emailSentPasswordReset"
    );
    const emailSentPasswordResetEmail = localStorage.getItem(
      "emailSentPasswordResetEmail"
    );

    if (emailSentPasswordReset === "true" && emailSentPasswordResetEmail) {
      // Redirect them directly to the verification page
      router.replace(
        `/application/resetpasswordcode/${emailSentPasswordResetEmail}`
      );
    }
  }, []);
  

  const sendEmail = async () => {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sendemailcode?email=${email}`,
          {
            method: "GET",
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

        router.push(`/application/resetpasswordcode/${email}`);
        localStorage.setItem("emailSentPasswordReset", true);
        localStorage.setItem("emailSentPasswordResetEmail", email);
        setEmailSent(true);
        showAlert("Verification successful!");
      } catch (err) {
          console.error(err)
        showAlert(err.message);
      }
  }

  return (
    <Layout>
      <div className="flex flex-col w-full h-screen items-center justify-center bg-lightBG dark:bg-darkBG">
        <div className="bg-white dark:bg-purple-50/5 px-8 py-6 lg:px-20 lg:py-14 rounded-2xl flex flex-col justify-center gap-2 fade-in-up w-1/3">
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
    </Layout>
  );
}
