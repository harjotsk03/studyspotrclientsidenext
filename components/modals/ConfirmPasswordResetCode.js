import { AnimatePresence, motion, time } from "framer-motion";
import React, { useState, useRef, useEffect, useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import PrimaryButton from "../buttons/PrimaryButton";
import { AlertContext } from "../../context/alertContext";
import { useRouter } from "next/router";

export default function ConfirmPasswordResetCode({
  email,
  setEmailSent,
  sendEmail
}) {
    const [timeLeft, setTimeLeft] = useState(0);
    const { showAlert } = useContext(AlertContext);
    const router = useRouter();
    useEffect(() => {
      const lastSentStr = localStorage.getItem("lastPasswordResetEmail");
      if (!lastSentStr) return;

      const lastSentTime = new Date(lastSentStr);
      const targetTime = new Date(lastSentTime.getTime() + 30 * 1000); // +30 seconds

      let timer; // ✅ Declare timer in outer scope

      const updateCountdown = () => {
        const now = new Date();
        const diff = targetTime - now;

        if (diff <= 0) {
          setTimeLeft(0);
          clearInterval(timer); // ✅ Now this works
        } else {
          setTimeLeft(Math.ceil(diff / 1000));
        }
      };

      updateCountdown(); // run once immediately
      timer = setInterval(updateCountdown, 1000); // then every second

      return () => clearInterval(timer); // cleanup on unmount
    }, []);
      

    const maskEmail = (email) => {
      if (!email || !email.includes("@")) return email;

      const [local, domain] = email.split("@");

      if (local.length <= 4) {
        return "*".repeat(local.length) + "@" + domain;
      }

      const first2 = local.slice(0, 2);
      const last3 = local.slice(-3);
      const masked = "*".repeat(local.length - 5); // in between

      return `${first2}${masked}${last3}@${domain}`;
    };

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((digit, i) => i < 6 && !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

//   const handleConfirm = () => {
    
//     if (fullCode.length === 6) {
//       console.log("Confirming with code:", fullCode);
//       // Add your confirmation logic here
//     }
//   };

  const handleConfirm = async () => {
    const verificationCode = code.join("");
    if (!email || !verificationCode || verificationCode.length != 6) {
      showAlert("Please enter full code.");
      return;
    }

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

      console.log(response);

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
    } catch (err) {
      console.error(err);
      showAlert(err.message);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-40 flex justify-center items-center z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-darkBG rounded-2xl px-8 py-6 lg:px-10 lg:py-10 w-10/12 lg:w-1/3 max-w-full shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-row justify-between w-full items-start">
          <h2 className="text-lg lg:text-2xl font-semibold mb-4 text-black dark:text-white">
            Confirmation
          </h2>
          <button
            onClick={() => setEmailSent(false)}
            className="p-2 rounded-lg dark:bg-purple-400/20 lg:bg-transparent bg-purple-400/40 dark:hover:bg-purple-400/20 hover:bg-purple-400/40 transition-all duration-500 ease-in-out"
          >
            <FaTimes className="text-xs lg:text-base text-purple-700 dark:text-purple-500" />
          </button>
        </div>

        {/* Description */}
        <p className="text-purple-500 dark:text-purple-300/70 mb-8 text-xs lg:text-sm">
          Please enter the code we sent to the email{" "}
          <strong>{maskEmail(email)}</strong>
        </p>

        {/* Code Input */}
        <div className="flex gap-1.5 lg:gap-4 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-11 h-11 lg:w-16 lg:h-16 bg-purple-100 dark:bg-purple-900/20 border border-purple-400 dark:border-purple-900 rounded-xl text-center text-purple-950 dark:text-white text-base lg:text-xl poppins-medium dark:focus:border-purple-500 focus:border-purple-800 focus:outline-none transition-colors"
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]"
            />
          ))}
        </div>

        {/* Resend Code */}
        <button
          onClick={sendEmail}
          disabled={timeLeft != 0}
          className="text-black/30 dark:text-white/30 dark:hover:text-purple-400 hover:text-purple-600 transition-colors duration-300 mb-8 text-xs poppins-medium uppercase tracking-wide"
        >
          RESEND CODE ({timeLeft})
        </button>

        <PrimaryButton
          onClick={handleConfirm}
          disabled={code.join("").length < 6}
          text={"Confirm"}
        />
      </motion.div>
    </motion.div>
  );
}
