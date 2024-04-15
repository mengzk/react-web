/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 主题
 * 
    const theme = useTheme();
    theme.setTheme('');
 */
import React, { ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

type ThemeProps = { children: React.ReactNode };

export default function AppTheme(props: Readonly<ThemeProps>): ReactNode;