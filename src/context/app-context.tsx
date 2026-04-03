"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/translations";
import { Language, Theme } from "@/types";

interface AppContextValue {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);
const THEME_KEY = "portfolio-theme";
const LANGUAGE_KEY = "portfolio-language";

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    return savedLanguage === "en" || savedLanguage === "ar" ? savedLanguage : "en";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = translations[language].dir;
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      theme,
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "ar" : "en")),
      toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [language, theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
