import { createContext, useContext, useState } from "react";

import warmTheme from "../themes/warmTheme";
import darkTheme from "../themes/darkTheme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState("warm");

    const theme = themeMode === "dark"
        ? darkTheme
        : warmTheme;

    const toggleTheme = () => {
        setThemeMode((currentMode) =>
            currentMode === "warm" ? "dark" : "warm"
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                themeMode,
                theme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}