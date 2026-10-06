import {
    createContext,
    useContext,
    useState,
} from "react";

import warmTheme from "../themes/warmTheme";
import darkTheme from "../themes/darkTheme";

const ThemeContext = createContext();

const THEME_COOKIE = "theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getSavedTheme() {
    const cookies = document.cookie.split("; ");

    const themeCookie = cookies.find(
        (cookie) =>
            cookie.startsWith(`${THEME_COOKIE}=`)
    );

    if (!themeCookie) {
        return "warm";
    }

    const savedTheme =
        themeCookie.split("=")[1];

    if (
        savedTheme === "dark" ||
        savedTheme === "warm"
    ) {
        return savedTheme;
    }

    return "warm";
}

function saveTheme(themeMode) {
    document.cookie =
        `${THEME_COOKIE}=${themeMode}; ` +
        `path=/; ` +
        `max-age=${COOKIE_MAX_AGE}; ` +
        `SameSite=Lax`;
}

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] =
        useState(getSavedTheme);

    const theme =
        themeMode === "dark"
            ? darkTheme
            : warmTheme;

    const toggleTheme = () => {
        setThemeMode((currentMode) => {
            const newMode =
                currentMode === "warm"
                    ? "dark"
                    : "warm";

            saveTheme(newMode);

            return newMode;
        });
    };

    return (
        <ThemeContext.Provider
            value={{
                themeMode,
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}