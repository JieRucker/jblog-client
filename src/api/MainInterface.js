import BaseModule from "./BaseModule";

class MainInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取音乐列表*/
  getAudioList() {
    return this.get(`https://api.i-meto.com/meting/api?server=netease&type=playlist&id=35798529`);
  }

  /*获取github用户信息*/
  getUser(data = {}) {
    return this.get(`${this.baseUrl}/github/user?id=${data.visitor_id}`);
  }

  /*注册用户*/
  registerUser(data = {}) {
    return this.post(`${this.baseUrl}/api/visitors/register`, data);
  }
}

export default new MainInterface()
