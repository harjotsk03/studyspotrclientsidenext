import { createContext, useState, useCallback } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = useCallback((msg) => {
    setMessage(msg);
    setAlert(true);

    setTimeout(() => {
      setMessage("");
      setAlert(false);
    }, 3000);
  }, []);

  return (
    <AlertContext.Provider value={{ alert, message, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
