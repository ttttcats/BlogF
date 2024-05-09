import React, { createContext, useState } from "react";

//  createContext is not supported in Server Components
export const ThemeContext = createContext({});

const [darkMode, SetDarkMode] = useState("white");

type Props = {
  children: React.ReactNode;
};

export default function ThemContext({ children }: Props) {
  return (
    <html>
      <body>
        <ThemeContext.Provider value={darkMode}>
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
