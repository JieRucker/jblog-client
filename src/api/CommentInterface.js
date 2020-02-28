import BaseModule from "./BaseModule";

class CommentInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取评论列表*/
  getCommentList(data = {}) {
    return this.get(`${this.baseUrl}/api/comment?id=${data.id}&current_page=${data.current_page}&page_size=${data.page_size}`);
  }

  /*添加评论*/
  addComment(data) {
    return this.post(`${this.baseUrl}/api/comment`, data);
  }

  /*点赞*/
  addLike(data) {
    return this.post(`${this.baseUrl}/api/comment/addLike`, data);
  }

  /*回复评论*/
  alterComment(data) {
    return this.post(`${this.baseUrl}/api/comment/reply`, data);
  }

  /*删除评论*/
  deleteCommentById(data) {
    return this.delete(`${this.baseUrl}/api/comment/${data._id}`, data);
  }

}

export default new CommentInterface()
