import { useContext } from "react";

import { ThemeContextType } from "../@types/context";
import { ThemeContext } from "../contexts/ThemeContext";

import moonIcon from "../assets/moon_icon.png";
import sunIcon from "../assets/sun_icon.png";

type SettingsDialogProps = { onMouseLeave: () => void };

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onMouseLeave }) => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <div
      className="w-[250px] h-[100px] rounded-lg bg-gray-300 dark:bg-[#282828] dark:border-2 dark:border-solid dark:border-[#35383f] shadow-md shadow-gray-500 dark:shadow-none absolute right-[45px] top-[45px]"
      onMouseLeave={onMouseLeave}
    >
      <p className="m-2">Settings</p>
      <div className="flex items-center">
        <p className="m-2">Current Theme:</p>
        <div
          className="rounded-full w-[70px] h-[35px] bg-blue-400 flex items-center cursor-pointer"
          onClick={toggleTheme}
        >
          <div
            className={`transition-all ease-in-out duration-[800ms] mx-[4px] my-auto w-[28px] h-[28px] rounded-full ${
              theme === "light" ? "bg-white" : "bg-[#282828]"
            } ${theme === "light" ? "transform -translate-x-0" : "transform -translate-x-[-34px]"}`}
          >
            <img
              className="h-[28px] w-[28px] cursor-pointer"
              style={{
                filter: "invert(63%) sepia(29%) saturate(3006%) hue-rotate(188deg) brightness(98%) contrast(99%)",
              }}
              src={theme === "light" ? sunIcon : moonIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;
