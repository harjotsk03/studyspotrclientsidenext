import { createContext, useContext, useState, useEffect } from "react";

const ViewContext = createContext();

export const useViewContext = () => useContext(ViewContext);

export const ViewContextProvider = ({ children }) => {
  const [view, setView] = useState("map");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView("map");
      } else {
        setView("list");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleHalf = () => {
    setView("half");
  };

  const toggleMap = () => {
    setView("map");
  };

  const toggleList = () => {
    setView("list");
  };

  return (
    <ViewContext.Provider
      value={{
        view,
        toggleMap,
        toggleList,
        toggleHalf,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
