import BaseModule from "./BaseModule";

class SettingInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取全局设置*/
  getSetting(data = {}) {
    return this.get(`${this.baseUrl}/api/setting`, {cached: true});
  }
}

export default new SettingInterface()
