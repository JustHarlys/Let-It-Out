import { createContext, useState } from "react";

export const DarkModeContext = createContext()

export function DarkModeProvider({children}) {

  const [darkMode, setDarkMode] = useState(false)

  function toggleDark() {
    setDarkMode(prevMode => !prevMode)
  }

  return(
    <DarkModeContext.Provider value={{
    darkMode,
    toggleDark
    }}> 
      {children}
    </DarkModeContext.Provider>
  )
}