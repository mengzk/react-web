/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 主题
 * 
    const theme = useTheme();
    theme.setTheme('');
 */
import React, { useEffect, useState, useCallback, createContext } from "react";

export const ThemeContext = createContext({});

export default function AppTheme(props) {
  const [theme, setTheme] = useState("def");

  useEffect(() => {
    // 监听主题变化
    return () => {
      // 移除监听
    };
  }, []);

  const onSetTheme = useCallback(() => { }, []);

  const value = { theme, setTheme: onSetTheme };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}
