"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layouts/Layout";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "Registration failed"
        );
      }

      console.log("Token:", data.token);

      router.push("/application/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full h-screen items-center justify-center lg:pt-16 bg-lightBG dark:bg-darkBG">
        <div className="bg-white dark:bg-purple-50/5 px-8 py-6 lg:px-20 lg:py-14 rounded-2xl flex flex-col justify-center gap-2 fade-in-up">
          <h1 className="poppins-medium text-lg lg:text-2xl text-black dark:text-purple-200">
            Join us Now
          </h1>
          <p className="poppins-regular text-xs lg:text-sm text-black/50 dark:text-purple-200/50">
            Create an account and join the world of studying.
          </p>

          <div className="flex flex-col gap-4 mt-2 lg:mt-4 mb-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-1">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                  placeholder="johndoe7"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="johndoe@gmail.com"
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
            </div>

            <div className="flex flex-col gap-1">
              <label className="poppins-light text-xs lg:text-sm text-black dark:text-purple-100">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-max px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 poppins-light text-xs lg:text-sm text-black dark:text-white"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 poppins-regular text-center mb-2">
              {error}
            </p>
          )}

          <PrimaryButton text={"Register"} onClick={handleRegister} />

          <button
            onClick={() => router.push("/application/login")}
            className="text-xs text-black dark:text-purple-50 poppins-regular text-center mt-5"
          >
            Have an account?{" "}
            <span className="text-purple-500 dark:text-purple-400 poppins-medium">
              Log In Now
            </span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
