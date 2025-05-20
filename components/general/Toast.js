import React, { useContext } from "react";
import { AlertContext } from "../../context/alertContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const { alert, message } = useContext(AlertContext);

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          className="fixed bottom-4 right-4 bg-purple-700 dark:bg-purple-900 text-white dark:text-white px-4 py-3 rounded-full z-50 poppins-regular text-sm"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
