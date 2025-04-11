/**
 * Author: Meng
 * Date: 2025-03-01
 * Modify: 2025-03-01
 * Desc: 
 */
import { create } from "zustand";

const ERP_KEY = "zust-erp-config";
const useErpConfig = create((set) => ({
  configData: {},
  setErpConfig: (data) => {
    sessionStorage.setItem(ERP_KEY, JSON.stringify(data));
    set({ configData: data });
  },
  getErpConfig: () => {
    const json = sessionStorage.getItem(ERP_KEY);
    if(json) {
      set({ configData: JSON.parse(json) });
      return JSON.parse(json);
    }else {
      return null;
    }
  }
}));

export default useErpConfig;