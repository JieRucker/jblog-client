<style lang="scss" scoped>
  .main-inner {
    .posts-detail {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      .date {
        background-color: #97dffd;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
        position: absolute;
        top: -18px;
        left: -25px;
        height: 70px;
        width: 70px;
        padding-top: 15px;
        border-radius: 100px;
        color: #fff;
        text-align: center;
        line-height: 1.1;
        .month {
          font-size: 14px;
        }
        .day {
          font-size: 30px;
          font-weight: 700;
        }
      }
      .header {
        .title {
          color: #333;
          font-size: 25px;
          font-weight: 700;
          text-align: center;
          word-break: break-word;
        }
        .cover {
          height: 200px;
          margin-top: 10px;
          .img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
        .meta {
          color: #999;
          font-size: 12px;
          text-align: center;
          margin-top: 10px;
          .time {
            color: #00a7e0;
          }
          .icon {
            margin-right: 3px;
          }
          .divider {
            margin: 0 5px;
          }
          .category {
            color: #333;
            a {
              color: #333;
            }
            .text {
              text-overflow: ellipsis;
              overflow: hidden;
              max-width: 100px;
              white-space: nowrap;
              display: table-cell;
            }
          }
          .visitors {
            color: #ff3f1a;
            .icon {
              .eye {
                font-size: 16px;
                vertical-align: text-bottom;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .main-inner {
      .posts-detail {
        width: 100%;
        min-height: auto;
        padding: 15px;
        .date {
          display: none;
        }
      }
    }
    .sidebar {
      display: none;
    }
  }

  .comment-list-box {
    .title {
      color: #8a9aa9;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      padding: 10px 5px;
      margin-bottom: 10px;
    }
    .comment-form {
      display: flex;
      padding: 20px 10px;
      background-color: #fafbfc;
      border-radius: 3px;
      .avatar-box {
        img {
          border-radius: 50%;
          width: 35px;
          height: 35px;
        }
      }
    }
    .comment-list {
      font-size: 13px;
      .comment {
        &:not(:first-child) {
        }
        padding: 10px;
        display: flex;
        .avatar {
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }
        .content-box {
          margin-left: 10px;
          width: 100%;
          .meta-box {
            display: flex;
            align-items: center;
            .position {
              color: #8a9aa9;
              margin-left: 10px;
            }
          }
          .content {
            margin-top: 5px;
            color: #505050;
          }
          .reply-state {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .time {
              color: #8a9aa9;
            }
            .action-box {
              display: flex;
              color: #8a93a0;
              .action {
                cursor: pointer;
                i {
                  margin-right: 3px;
                }
                &.like {
                  margin-right: 15px;
                }
              }
            }
          }
          .reply-input {
            padding: 10px;
            background-color: #fafbfc;
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  .editor /deep/ {
    position: relative;
    margin-left: 10px;
    width: 100%;
  }
</style>

<style lang="scss">
  @import "tomorrow.scss";
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-detail animated fadeIn">
      <div class="date">
        <div class="month">{{article.month}}月</div>
        <div class="day">{{article.day}}</div>
      </div>
      <header class="header">
        <h1 class="title">{{article.title}}</h1>
        <div class="meta">
              <span class="time">
                  <Icon type="ios-calendar-outline" class="calendar"></Icon> 发表 {{article.create_time}}
              </span>
          <span class="category">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="ios-folder-outline" class="folder"></Icon>
                </span>
            <span class="text">分类
                <span v-for="(tag,tag_index) in article.tag_list">{{tag.tags_name}}
                     <i v-if="tag_index !== article.tag_list.length - 1">、</i></span>
            </span>
              </span>
          <span class="visitors">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="eye" class="eye"></Icon>
                </span>
                <span class="text">阅读 {{article.read_num}}</span>
              </span>
        </div>
        <div class="cover" v-if="!!article.cover">
          <img :src="article.cover" class="img">
        </div>
      </header>

      <div v-html="article.content" class="article-content"></div>

      <div class="comment-list-box">
        <div class="title">评论</div>

        <div class="comment-form">
          <div class="form-box editor">
            <j-editor
              v-model="commentContent"
              ref="jEditor"
              :focused="true"
              :action="true"
              @on-submit="onSubmit">
            </j-editor>

          </div>
        </div>

        <div class="comment-list">
          <div class="comment" v-for="(item,idx) in comment_list">
            <div class="avatar">
              <img :src="item.avatar_url"/>
            </div>
            <div class="content-box">

              <div class="meta-box">
                <span class="username">{{item.name}}</span>
              </div>

              <div class="content" v-html="item.content"></div>

              <div class="reply-state" :style="item.reply.length && 'margin-bottom: 10px'">
                <time class="time">{{item.date}}</time>
                <div class="action-box">
                  <!--<div class="like action" @click="onLike(idx)">
                    <i class="iconfont icon-dianzan1"></i> {{item.like}}
                  </div>-->
                  <div class="comment-action action" @click="showReply(idx)">
                    <i class="iconfont icon-chakantiezihuifu"></i>回复
                  </div>
                </div>
              </div>

              <j-editor
                class="reply-input"
                v-if="item.show_reply"
                v-model="item.reply_content"
                :focused="true"
                :action="true"
                :show-user="false"
                :placeholder="'回复' + item.name + '...'"
                @on-submit="onReplySubmit(idx)">
              </j-editor>

              <div class="comment" v-for="(reply,replyIdx) in item.reply" style="background-color: #fafbfc">
                <div class="avatar">
                  <img :src="reply.avatar_url"/>
                </div>
                <div class="content-box">
                  <div class="meta-box">
                    <span class="username">{{reply.name}}</span>
                    <span class="position">@ {{reply.aite}}</span>
                  </div>

                  <div class="content" v-html="reply.content"></div>

                  <div class="reply-state">
                    <time class="time">{{reply.date}}</time>
                    <div class="action-box">
                      <!--<div class="like action" @click="onLike(idx,replyIdx)">
                        <i class="iconfont icon-dianzan1"></i> {{reply.like}}
                      </div>-->
                      <div class="comment-action action" @click="showReply(idx,replyIdx)">
                        <i class="iconfont icon-chakantiezihuifu"></i>回复
                      </div>
                    </div>
                  </div>

                  <j-editor
                    class="reply-input"
                    v-if="reply.show_reply"
                    v-model="reply.reply_content"
                    :focused="true"
                    :action="true"
                    :show-user="false"
                    :placeholder="'回复' + reply.name + '...'"
                    @on-submit="onReplyChildSubmit(idx,replyIdx)">
                  </j-editor>

                </div>
              </div>
            </div>
          </div>
        </div>

        <j-scroll :show-loading="show_spinner" :more="more" more-text="查看更多>>" @on-click="onMoreClick"></j-scroll>
      </div>
    </section>
    <j-aside current-page="postToc"></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';
  import jEditor from '@/components/j-editor';
  import {mapMutations, mapGetters} from 'vuex';
  import emojiData from '@/components/j-emoji/emoji-data';
  import jScroll from '@/components/j-scroll';

  let marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  });

  export default {
    name: "detail",
    components: {
      jAside,
      jEditor,
      jScroll
    },
    data() {
      return {
        comment_list: [],
        commentContent: '',
        article: {
          title: '', /*标题*/
          month: '',
          day: '',
          create_time: '',
          update_time: '',
          content: '',
          tag_list: [],
          navigation_list: [],
          read_num: 0
        },
        comment: {
          current_page: 1,
          page_size: 10,
          total_count: 0
        },
        more: true, /*是否还有数据*/
        show_spinner: false
      }
    },
    computed: {
      ...mapGetters({
        get_user_info: 'app/get_user_info'
      })
    },
    mounted() {
      this.getArticleById();
      this.getComment();
    },
    methods: {
      reset() {
        this.comment.current_page = 1;
        this.comment_list = [];
      },
      /*加载更多*/
      onMoreClick() {
        this.show_spinner = true;
        this.getComment()
      },
      /*点赞*/
      async onLike(idx, replyIdx) {
        let comment_list = this.comment_list;
        let revId = '';
        let repId = '';
        let reqBody;

        if (typeof replyIdx !== 'undefined') {
          revId = comment_list[idx]._id;
          repId = comment_list[idx].reply[replyIdx]._id;

          comment_list[idx].reply[replyIdx].hasLiked = !comment_list[idx].reply[replyIdx].hasLiked;

          reqBody = {
            revId: revId,
            repId: repId,
            addOrDel: comment_list[idx].reply[replyIdx].hasLiked ? 1 : -1
          };
        } else {
          revId = comment_list[idx]._id;
          comment_list[idx].hasLiked = !comment_list[idx].hasLiked;

          reqBody = {
            revId: revId,
            addOrDel: comment_list[idx].hasLiked ? 1 : -1
          };
        }

        let res = await this.$api.commentInterface.addLike(reqBody);
        let {code, data = {}, msg} = res.data;
        if (code === 200) {
          if (typeof replyIdx !== 'undefined') {
            comment_list[idx].reply[replyIdx].hasLiked ?
              comment_list[idx].reply[replyIdx].like++ :
              comment_list[idx].reply[replyIdx].like--
          } else {
            comment_list[idx].hasLiked ?
              comment_list[idx].like++ :
              comment_list[idx].like--
          }
        }
      },
      /*显示回复窗口*/
      showReply(idx, replyIdx) {
        let comment_list = this.comment_list;
        let _id = comment_list[idx]._id;

        if (typeof replyIdx !== 'undefined') {
          let reply_id = comment_list[idx].reply[replyIdx]._id;

          comment_list.map(it => {
            it.show_reply = false;
            it.reply.map(reply => reply.show_reply = reply._id === reply_id ? (reply.show_reply = !reply.show_reply) : false)
          });
        } else {
          comment_list.map(it => {
            it.show_reply = it._id === _id ? (it.show_reply = !it.show_reply) : false;
            it.reply.map(reply => reply.show_reply = false)
          });
        }

        comment_list.map(it => {
          let {reply} = it;
          it.reply_content = '';
          reply.map(reply => reply.reply_content = '')
        });

        this.$set(comment_list, idx, comment_list[idx]);
      },
      /*解析内容*/
      parseContent(content) {
        let finStr = content;
        finStr = finStr.replace(new RegExp("<", "g"), "&lt");
        finStr = finStr.replace(new RegExp(">", "g"), "&gt");

        emojiData.forEach(item => {
          let path = "/static/images/face/";
          let value = item.url;
          let imgURL = `<span style="display: inline-block;vertical-align: middle"><img src=${path}${value} alt="" width="16px" height="16px" /></span>`;
          finStr = finStr.replace(new RegExp(item.title, "g"), imgURL)
        });

        return finStr
      },
      /*提交评论*/
      async onSubmit() {
        if (this.$Global.isBlank(this.get_user_info.name)) {
          return this.$Message.info('请先登陆，再继续操作！')
        }

        let content = this.parseContent(this.commentContent);

        let reqBody = {
          article_id: this.$route.params.id,
          name: this.get_user_info.name,
          avatar_url: this.get_user_info.avatar_url,
          email: this.get_user_info.email,
          content: content
        };

        let res = await this.$api.commentInterface.addComment(reqBody);
        let {code, data = {}, msg} = res.data;
        if (code === 200) {
          this.reset();
          this.commentContent = '';
          this.getComment();
          this.$Message.info(msg)
        }
      },
      /*回复评论（一级）*/
      async onReplySubmit(idx) {
        if (this.$Global.isBlank(this.get_user_info.name)) {
          return this.$Message.info('请先登陆，再继续操作！')
        }

        let comment_list = this.comment_list;
        let reply_content = this.parseContent(comment_list[idx].reply_content);
        let aite = comment_list[idx].name;
        let _id = comment_list[idx]._id;

        let reqBody = {
          _id: _id,
          name: this.get_user_info.name,
          avatar_url: this.get_user_info.avatar_url,
          email: this.get_user_info.email,
          aite: aite,
          content: reply_content
        };

        let res = await this.$api.commentInterface.alterComment(reqBody);
        let {code, data = {}, msg} = res.data;
        if (code === 200) {
          this.$Message.info(msg);

          comment_list[idx].show_reply = false;
          comment_list[idx].reply_content = '';
          comment_list[idx].reply = data.reply;
        }
      },
      /*回复评论（二级）*/
      async onReplyChildSubmit(idx, replyIdx) {
        if (this.$Global.isBlank(this.get_user_info.name)) {
          return this.$Message.info('请先登陆，再继续操作！')
        }

        let comment_list = this.comment_list;
        let reply_content = this.parseContent(comment_list[idx].reply[replyIdx].reply_content);
        let aite = comment_list[idx].reply[replyIdx].name;
        let _id = comment_list[idx]._id;

        let reqBody = {
          _id: _id,
          name: this.get_user_info.name,
          avatar_url: this.get_user_info.avatar_url,
          email: this.get_user_info.email,
          aite: aite,
          content: reply_content
        };

        let res = await this.$api.commentInterface.alterComment(reqBody);
        let {code, data = {}, msg} = res.data;
        if (code === 200) {
          this.$Message.info(msg);

          comment_list[idx].show_reply = false;
          comment_list[idx].reply_content = '';
          comment_list[idx].reply = data.reply;
        }
      },
      /*获取评论数据*/
      async getComment() {
        let reqBody = {
          current_page: this.comment.current_page,
          page_size: this.comment.page_size,
          id: this.$route.params.id
        };

        let res = await this.$api.commentInterface.getCommentList(reqBody);
        let {code, data = {}} = res.data;
        if (code === 200) {
          this.show_spinner = false;

          data.list.forEach(it => {
            it.show_reply = false;
            it.reply_content = '';
            it.hasLiked = false;
            it.reply.map(reply => {
              reply.show_reply = false;
              reply.hasLiked = false;
              reply.reply_content = '';
            });

            this.comment_list.push(it);
          });

          this.comment.current_page = ++this.comment.current_page;
          let totalPage = Math.ceil(data.total / this.comment.page_size);
          this.more = this.comment.current_page <= totalPage;
        }
      },
      /*获取文章详情*/
      async getArticleById() {
        let res = await this.$api.articleInterface.getArticleById({_id: this.$route.params.id});
        let {code, data} = res.data;
        if (code === 200 && data.length) {
          let [a] = data;
          let year = this.$Global.formatDate(a.article_create_time.replace(/\-/g, "/")).year;
          let month = this.$Global.formatDate(a.article_create_time.replace(/\-/g, "/")).month;
          let day = this.$Global.formatDate(a.article_create_time.replace(/\-/g, "/")).day;
          this.article.title = a.article_title;
          this.article.state = a.article_state;
          this.article.cover = a.article_cover;
          this.article.desc = a.article_desc;
          this.article.month = `${month}`;
          this.article.day = `${day}`;
          this.article.create_time = `${year}-${month}-${day}`;
          this.article.update_time = a.article_update_time;
          this.article.content = a.article_render_content;
          this.article.navigation_list = a.article_navigation;
          this.article.tag_list = a.article_tags;
          this.article.read_num = a.read_num;
        }

        this.$store.commit('app/SET_NAVIGATION_LIST', this.article.navigation_list);
      }
    }
  }
</script>
