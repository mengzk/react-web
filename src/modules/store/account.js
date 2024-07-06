/**
 * Author: Meng
 * Date: 2024-07-06
 * Modify: 2024-07-06
 * Desc: 
 */
import Local from "./local";

const AccountKey = 'app-user-info';
const AccountPhone = 'app-user-phone';
const AccountToken = 'app-user-token';

export default class Account {

  static getInfo() {
    const data = Local.getStorage(AccountKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  static setInfo(data) {
    if(data) {
      Local.setStorage(AccountKey, JSON.stringify(data));
      Local.setStorage(AccountPhone, data.phone);
      Local.setStorage(AccountToken, data.token);
    }
  }

  static getPhone() {
    return Local.getStorage(AccountPhone);
  }

  static getToken() {
    return Local.getStorage(AccountToken);
  }

  static hasLogin() {
    return Account.getInfo() !== null;
  }

  static clearInfo() {
    Local.clear();
  }
}