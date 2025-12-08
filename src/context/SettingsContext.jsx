import { createContext, useContext, useEffect, useState } from "react";
import { getStorage, setStorage } from "../utils/storage";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [unit, setUnit] = useState(getStorage("unit", "metric"));
  const [lang, setLang] = useState(getStorage("lang", "en"));

  useEffect(() => setStorage("unit", unit), [unit]);
  useEffect(() => setStorage("lang", lang), [lang]);

  const value = {
    unit,
    setUnit,
    lang,
    setLang,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
