import { useContext } from "react";

import { ThemeContextType } from "../@types/context";
import { ThemeContext } from "../contexts/ThemeContext";

import settingsIcon from "../assets/fa_settings.png";

type SettingsDialogToggleProps = { toggle: () => void };

const SettingsDialogToggle: React.FC<SettingsDialogToggleProps> = ({ toggle }) => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <>
      <img
        className={`w-[30px] h-[30px] cursor-pointer ${
          theme === "dark" ? "invert-[100%] hover:invert-[80%]" : "invert-[80%] hover:invert-[60%]"
        }`}
        src={settingsIcon}
        alt="sun icon"
        onClick={toggle}
      />
    </>
  );
};

export default SettingsDialogToggle;
