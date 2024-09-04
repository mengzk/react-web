/**
 * Author: Meng
 * Date: 2024-09-04
 * Modify: 2024-09-04
 * Desc: 
 */

import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'

export default configureStore({
  reducer: {
    slice: appSlice,
  },
})