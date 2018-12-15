import BaseModule from "./BaseModule";

class SettingInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取全局设置*/
  getSetting() {
    return this.get(`${this.baseUrl}/api/setting`);
  }
}

export default new SettingInterface()
