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
      margin-left: 40px;
      font-size: 13px;
      .comment {
        &:not(:first-child) {
          .content-box .reply-state {
            margin-bottom: 0;
          }
          background-color: #fafbfc;
        }
        padding: 10px 0;
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
            margin: 10px 10px 10px 0;
            .time {
              color: #8a9aa9;
            }
            .action-box {
              display: flex;
              color: #8a93a0;
              .action {
                margin-left: 40px;
                cursor: pointer;
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
    .fetch-more-comment {
      padding: 10px 0;
      font-size: 14px;
      text-align: center;
      color: #406599;
      cursor: pointer;
    }
  }

  .editor /deep/ {
    position: relative;
    margin-left: 10px;
    width: 100%;
  }
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
        <div class="cover" v-if="article.cover != ''">
          <img :src="article.cover" class="img">
        </div>
      </header>

      <div v-html="article.content" class="article-content"></div>


      <div class="comment-list-box">
        <div class="title">评论</div>

        <div class="comment-form">
          <div class="avatar-box">
            <img src="https://user-gold-cdn.xitu.io/2018/8/10/1651f7955556e6b6?imageView2/1/w/100/h/100/q/85/forma"/>
          </div>
          <div class="form-box editor">
            <j-editor v-model="commentContent" ref="jEditor"></j-editor>
          </div>
        </div>

        <div class="comment-list">
          <div class="comment">
            <div class="avatar">
              <img
                src="https://user-gold-cdn.xitu.io/2017/5/31/3f69cfefffd335394c95d0ae25cb40ac?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"/>
            </div>
            <div class="content-box">

              <div class="meta-box">
                <span class="username">水电费撒风</span>
                <span class="position">前端工程师 @ 腾讯</span>
              </div>

              <div class="content">请问如何把豆瓣接口的数据都下载到本地呢？</div>

              <div class="reply-state">
                <time class="time">1年前</time>
                <div class="action-box">
                  <div class="like-action action">点赞</div>
                  <div class="comment-action action">回复</div>
                </div>
              </div>

              <j-editor
                class="reply-input"
                v-model="commentContent"
                ref="jEditor"
                :focused="true"
                :action="true"
                placeholder="回复11">
              </j-editor>

              <div class="comment">
                <div class="avatar">
                  <img
                    src="https://user-gold-cdn.xitu.io/2017/5/31/3f69cfefffd335394c95d0ae25cb40ac?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"/>
                </div>
                <div class="content-box">
                  <div class="meta-box">
                    <span class="username">水电费撒风</span>
                    <span class="position">前端工程师 @ 腾讯</span>
                  </div>

                  <div class="content">请问如何把豆瓣接口的数据都下载到本地呢？</div>

                  <div class="reply-state">
                    <time class="time">1年前</time>
                    <div class="action-box">
                      <div class="like-action action">点赞</div>
                      <div class="comment-action action">回复</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="comment">
                <div class="avatar">
                  <img
                    src="https://user-gold-cdn.xitu.io/2017/5/31/3f69cfefffd335394c95d0ae25cb40ac?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"/>
                </div>
                <div class="content-box">
                  <div class="meta-box">
                    <span class="username">水电费撒风</span>
                    <span class="position">前端工程师 @ 腾讯</span>
                  </div>

                  <div class="content">请问如何把豆瓣接口的数据都下载到本地呢？</div>

                  <div class="reply-state">
                    <time class="time">1年前</time>
                    <div class="action-box">
                      <div class="like-action action">点赞</div>
                      <div class="comment-action action">回复</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="fetch-more-comment">查看更多></div>
      </div>

    </section>
    <j-aside current-page="postToc"></j-aside>
  </div>


</template>

<script>
  import jAside from '@/components/j-aside/j-aside';
  import jEditor from '@/components/j-editor';

  let marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: false,
    smartLists: true,
    smartypants: true
  });

  export default {
    name: "detail",
    components: {
      jAside,
      jEditor
    },
    data() {
      return {
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
        commentContent: ''
      }
    },
    mounted() {
      window.jEditor = this.$refs.jEditor;
      this.getArticleById();
    },
    methods: {
      async getArticleById() {
        let res = await this.$api.articleInterface.getArticleById({_id: this.$route.query._id});
        let {code, data} = res.data;
        if (code === 200 && data.length) {
          let [a] = data;
          let year = this.$Global.formatDate(a.article_create_time).year;
          let month = this.$Global.formatDate(a.article_create_time).month;
          let day = this.$Global.formatDate(a.article_create_time).day;
          this.article.title = a.article_title;
          this.article.state = a.article_state;
          this.article.cover = a.article_cover;
          this.article.desc = a.article_desc;
          this.article.month = `${month}`;
          this.article.day = `${day}`;
          this.article.create_time = `${year}-${month}-${day}`;
          this.article.update_time = a.article_update_time;
          this.article.content = marked(a.article_render_content);
          this.article.navigation_list = a.article_navigation;
          this.article.tag_list = a.article_tags;
          this.article.read_num = a.read_num;
        }

        this.$store.commit('SET_NAVIGATION_LIST', this.article.navigation_list);
      }
    }
  }
</script>
