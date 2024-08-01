import { createContext, ReactNode, useState } from "react";
import { ThemeContextType } from "../@types/context";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeContextProviderProps = { children: ReactNode };

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => {
          setTheme(theme === "light" ? "dark" : "light");
          document.body.classList.toggle("dark");
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
