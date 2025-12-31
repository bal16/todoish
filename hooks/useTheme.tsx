import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const palette = {
  neutral: {
    0: "#ffffff",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },

  primary: {
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
  },

  success: { light: "#34d399", main: "#10b981", dark: "#059669" },
  warning: { light: "#fbbf24", main: "#f59e0b", dark: "#d97706" },
  danger: { light: "#f87171", main: "#ef4444", dark: "#dc2626" },
  misc: {
    shadowLight: "rgba(148, 163, 184, 0.15)",
    shadowDark: "#000000",
  },
};

export interface ColorScheme {
  bg: string;
  surface: string;
  surfaceHighlight: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

export const lightColors: ColorScheme = {
  bg: palette.neutral[50],
  surface: palette.neutral[0],
  surfaceHighlight: palette.neutral[100],
  text: palette.neutral[900],
  textMuted: palette.neutral[500],
  border: palette.neutral[200],

  primary: palette.primary[600],
  success: palette.success.dark,
  warning: palette.warning.dark,
  danger: palette.danger.main,

  shadow: palette.misc.shadowLight,

  gradients: {
    background: [palette.neutral[50], palette.neutral[100]],
    surface: [palette.neutral[0], palette.neutral[50]],
    primary: [palette.primary[500], palette.primary[700]],
    success: [palette.success.main, palette.success.dark],
    warning: [palette.warning.main, palette.warning.dark],
    danger: [palette.danger.main, palette.danger.dark],
    muted: [palette.neutral[200], palette.neutral[300]],
    empty: [palette.neutral[100], palette.neutral[200]],
  },
  backgrounds: {
    input: palette.neutral[0],
    editInput: palette.neutral[50],
  },
  statusBarStyle: "dark-content",
};

export const darkColors: ColorScheme = {
  bg: palette.neutral[950],
  surface: palette.neutral[900],
  surfaceHighlight: palette.neutral[800],
  text: palette.neutral[50],
  textMuted: palette.neutral[400],
  border: palette.neutral[800],

  primary: palette.primary[400],
  success: palette.success.light,
  warning: palette.warning.light,
  danger: palette.danger.light,

  shadow: palette.misc.shadowDark,

  gradients: {
    background: [palette.neutral[950], "#0b0f19"],
    surface: [palette.neutral[900], palette.neutral[800]],
    primary: [palette.primary[400], palette.primary[600]],
    success: [palette.success.light, palette.success.main],
    warning: [palette.warning.light, palette.warning.main],
    danger: [palette.danger.light, palette.danger.main],
    muted: [palette.neutral[800], palette.neutral[700]],
    empty: [palette.neutral[900], palette.neutral[800]],
  },
  backgrounds: {
    input: palette.neutral[900],
    editInput: palette.neutral[950],
  },
  statusBarStyle: "light-content",
};

interface IThemeContext {
  isDarkMode: boolean;
  colors: ColorScheme;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context || context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
