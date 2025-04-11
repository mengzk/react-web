/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc: 
 */

const Constants = {
  env: process.env.NODE_ENV,
  inApp: false,
  inBnq: false,
  isIOS: false,
  platform: 'web',
  version: '1.0.0',
  secret: '',
  appId: '',
  token: '',
  userId: '',
  userName: '',
  userPhone: '',
  userInfo: {},
  
  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
    bottom: 0,
    top: 0,
    scale: 1,
  },
};

export default Constants;