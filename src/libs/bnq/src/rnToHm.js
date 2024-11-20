/**
 * Author: Meng
 * Date: 2024-11-18
 * Modify: 2024-11-18
 * Desc: rn原生方法映射到鸿蒙方法
 */
const methodMap = {
  openAppCamera: "openCamera",
  openAppCamera2: "openCamera",
  openAppAlbum: "chooseAlbum",
  openAppAlbum2: "chooseAlbum",
  watermarkImg: "pictureEdit",
  isDeveloperMode: 'isDebug',
  setTitle: 'headerConfig',
  customConfig: 'headerConfig',
  openNativeMap: 'openMap',
  QRCodePage: 'qrcodeScan',
  LinkingOpen: 'openApp',
  GetGaodeLocationV2: 'getLocation',
  refreshTaskDetail: 'emit',
  launchMiniProgram: 'openApplet',
  telMobile: 'callPhone',
  pushToAppSetting: 'openSetting',
  selectFile: 'openFolder',
  cashier2: 'cashier',
  sendMsgToRN: 'invoke',
};

export { methodMap };