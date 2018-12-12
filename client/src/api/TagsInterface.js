import BaseModule from "./BaseModule";

class TagsInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取标签列表*/
  getTagsList() {
    return this.get(`${this.baseUrl}/api/tags`);
  }
}

export default new TagsInterface()
