import BaseModule from "./BaseModule";

class ArticleInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取文章列表*/
  getArticleList(data = {}) {
    return this.get(`${this.baseUrl}/api/article?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`);
  }

  /*通过文章id来获取文章*/
  getArticleById(data) {
    return this.get(`${this.baseUrl}/api/article/${data._id}`, data);
  }
}

export default new ArticleInterface()
