"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/Layout";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { AlertContext } from "../../context/alertContext";

export default function LogIn() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { showAlert } = useContext(AlertContext);

  const handleLogin = async () => {
    setError(""); // Clear any previous error
    if (loginId == null || loginId == "") {
      showAlert("Please enter your email.");
      return;
    }
    if (password == null || password == "") {
      showAlert("Please enter your password.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginId, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "Login failed");
      }

      console.log("Token:", data.token);
      localStorage.setItem("token", data.token);
      const authPages = [
        `${process.env.NEXTFRONT_PUBLIC_API_URL}/login`,
        `${process.env.NEXTFRONT_PUBLIC_API_URL}/application/register`,
        `${process.env.NEXTFRONT_PUBLIC_API_URL}/application/resetpassword`,
        `${process.env.NEXTFRONT_PUBLIC_API_URL}/application/resetpasswordcode`,
      ];

      const referrer = document.referrer;
      const queryRedirect = router.query.redirect;

      const isFromAuthPage = authPages.some(
        (authPath) =>
          referrer?.startsWith(authPath) || queryRedirect?.startsWith(authPath)
      );

      const redirectTo = isFromAuthPage
        ? "/application/"
        : queryRedirect || referrer || "/application/addaspot";

      router.push(redirectTo);
    } catch (err) {
      setError(err.message);
      showAlert(err.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full h-screen items-center justify-center bg-lightBG dark:bg-darkBG">
        <div className="bg-white dark:bg-purple-50/5 px-8 py-6 lg:px-20 lg:py-14 rounded-2xl flex flex-col justify-center gap-2 fade-in-up lg:w-1/3">
          <h1 className="poppins-medium text-lg lg:text-2xl text-black dark:text-purple-200">
            Welcome back
          </h1>
          <p className="poppins-regular text-xs lg:text-sm text-black/50 dark:text-purple-200/50">
            Please log in to continue and access your account.
          </p>

          <div className="flex flex-col gap-4 mt-2 lg:mt-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Email or Username
              </label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="johndoe@example.com or johndoe"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="Password"
              />
              <button
                onClick={() => router.push("/application/resetpassword")}
                className="text-xs text-purple-500 dark:text-purple-400 text-right mt-1.5 poppins-regular"
              >
                Forgot Password
              </button>
            </div>
          </div>

          <PrimaryButton text={"Log In"} onClick={handleLogin} />

          <button
            onClick={() => router.push("/application/register")}
            className="text-xs text-black dark:text-purple-50 poppins-regular text-center mt-5"
          >
            Don't have an account?{" "}
            <span className="text-purple-500 dark:text-purple-400 poppins-medium">
              Register Now
            </span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
