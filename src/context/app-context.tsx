"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/translations";
import { Language } from "@/types";

interface AppContextValue {
  language: Language;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);
const LANGUAGE_KEY = "portfolio-language";

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved === "en" || saved === "ar" ? saved : "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = translations[language].dir;
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "ar" : "en")),
    }),
    [language],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
