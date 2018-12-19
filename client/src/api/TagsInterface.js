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

  /*获取标签详情*/
  getTagsDetail(data = {}) {
    return this.get(`${this.baseUrl}/api/tags?_id=${data._id}&current_page=${data.current_page}&page_size=${data.page_size}`);
  }
}

export default new TagsInterface()
