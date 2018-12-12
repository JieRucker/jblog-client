<style lang="scss" scoped>
  .main-inner {
    .posts-expand {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      .post {
        position: relative;
        padding: 25px;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 25px;
        &:last-child {
          margin-bottom: 0;
        }
        .date {
          background-color: #97dffd;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
          position: absolute;
          top: -18px;
          left: -25px;
          height: 50px;
          width: 50px;
          padding-top: 12px;
          border-radius: 100px;
          color: #fff;
          text-align: center;
          line-height: 1.1;
          .day {
            font-size: 16px;
            font-weight: 700;
          }
        }
        .body {
          .title {
            display: inherit;
            font-size: 18px;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
          }
          .abstract {
            font-size: 13px;
            line-height: 24px;
            color: #999;
          }
          .meta {
            color: #999;
            font-size: 12px;
            text-align: left;
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
  }

  @media (max-width: 991px) {
    .main-inner {
      .posts-expand {
        width: 100%;
        min-height: auto;
        .post {
          padding: 15px;
          border-radius: initial;
          margin-bottom: 15px;
          .date {
            display: none;
          }
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
    <section class="posts-expand animated fadeIn">
      <article class="post" v-for="item in table.body">
        <div class="date">
          <div class="month">{{item.month}}月</div>
          <div class="day">{{item.day}}</div>
        </div>
        <div class="body">
          <a class="title" href="javascript:;" @click="detailRouter(item._id)">{{item.article_title}}</a>
          <p class="abstract">{{item.article_desc}}</p>
          <div class="meta">
              <span class="time">
                  <Icon type="ios-calendar-outline" class="calendar"></Icon> 发表 {{item.article_create_time}}
              </span>
            <span class="category">
                <span class="divider">•</span>
                <span class="icon">
                  <Icon type="ios-folder-outline" class="folder"></Icon>
                </span>
                <span class="text">分类
                  <span v-for="(tag,tag_index) in item.article_tags">{{tag.tags_name}}
                    <i v-if="tag_index !== item.article_tags.length - 1">、</i></span>
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
        </div>
      </article>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';

  export default {
    name: "index",
    components: {
      jAside
    },
    data() {
      return {
        search: {
          keyword: '',
          tag: -1,
          state: -1
        },
        table: {
          body: [],
          args: {
            current_page: 1,
            page_size: 10,
            total_count: 0
          }
        }
      }
    },
    mounted() {
      this.getArticleList();
    },
    methods: {
      async getArticleList() {
        let a = {
          keyword: this.search.keyword,
          tag: this.search.tag === -1 ? '' : this.search.tag,
          state: this.search.state === -1 ? '' : this.search.state
        };

        let res = await this.$api.articleInterface.getArticleList({...a, ...this.table.args});
        let {code, data = {}} = res.data;
        if (code === 200) {
          this.table.body = data.list;
          this.table.body.forEach(item => {
            item.article_create_time = this.formate(item.article_create_time, 1);
            item.month = this.formate(item.article_create_time, 2)[1];
            item.day = this.formate(item.article_create_time, 2)[2];
          });
          this.table.args.total_count = data.pagination.total;

          console.log(this.table.body)
        }
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
      detailRouter(id) {
        this.$router.push({
          path: 'article/detail',
          query: {
            _id: id
          }
        })
      }
    }
  }
</script>
