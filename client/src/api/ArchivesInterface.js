import BaseModule from "./BaseModule";

class ArchivesInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取文章列表*/
  getArchivesList(data = {}) {
    return this.get(`${this.baseUrl}/api/archives?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword ? data.keyword : ''}`);
  }
}

export default new ArchivesInterface()
