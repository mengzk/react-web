/**
 * Author: Meng
 * Date: 2023-09-07
 * Modify: 2023-09-07
 * Desc: 使用
 */
import React from "react";

import { ThemeContext } from "./AppTheme";

export function useTheme() {
  return React.useContext(ThemeContext);
}
