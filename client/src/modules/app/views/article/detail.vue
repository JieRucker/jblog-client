<style lang="scss" scoped>
  .main-inner {
    .posts-article-detail {
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
      .posts-article-detail {
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
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-article-detail animated fadeIn">
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
                <span class="text">阅读 13</span>
              </span>
        </div>
      </header>

      <div v-html="article.content" class="article-content"></div>

    </section>
    <j-aside current-page="postToc"></j-aside>
  </div>


</template>

<script>
  import jAside from '@/components/j-aside/j-aside';

  let marked = require('marked');
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  export default {
    name: "detail",
    components: {
      jAside
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
          navigation_list: []
        }
      }
    },
    mounted() {
      this.getArticleById()
    },
    methods: {
      async getArticleById() {
        let res = await this.$api.articleInterface.getArticleById({_id: this.$route.query._id});
        let {code, data} = res.data;
        if (code === 200 && data.length) {
          let [a] = data;
          this.article.title = a.article_title;
          this.article.state = a.article_state;
          this.article.cover = a.article_cover;
          this.article.desc = a.article_desc;
          this.article.month = this.formate(a.article_create_time, 2)[1];
          this.article.day = this.formate(a.article_create_time, 2)[2];
          this.article.create_time = this.formate(a.article_create_time, 1);
          this.article.update_time = a.article_update_time;
          this.article.content = marked(a.article_content);
          this.article.navigation_list = a.article_navigation;
          this.article.tag_list = a.article_tags;
        }

        this.$store.commit('setNavigationList', this.article.navigation_list);
      },
      formate(date, type) {
        if (!date) return;
        switch (type) {
          case 1:
            let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(date);
            return newDate[0];
          case 2:
            let matches = date.match(/\d+/g);
            return matches;
        }
      },
    }
  }
</script>
