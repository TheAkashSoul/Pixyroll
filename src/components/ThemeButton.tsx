"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <button
      onClick={toggleTheme}
      className="bg-[#0A0A0A] dark:bg-[#FFFFFF] p-1 rounded-md"
    >
      {theme === "light" ? (
        <MdDarkMode color="#FFFFFF" size={20} />
      ) : (
        <MdLightMode color="#000000" size={20} />
      )}
    </button>
  );
};

export default ThemeButton;
