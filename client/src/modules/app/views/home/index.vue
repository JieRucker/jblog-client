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
                <span class="text">阅读 {{item.read_num}}</span>
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
            page_size: 4,
          }
        },
        more: true /*是否正在加载过程中*/
      }
    },
    created() {
      this.getArticleList()
    },
    mounted() {
      this.loadMore = this.debounce(this.loadMore, 300);
      window.addEventListener('scroll', this.loadMore, false);
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
          data.list.forEach(item => {
            let year = this.$Global.formatDate(item.article_create_time).year;
            let month = this.$Global.formatDate(item.article_create_time).month;
            let day = this.$Global.formatDate(item.article_create_time).day;

            item.article_create_time = `${year}-${month}-${day}`;
            item.month = `${month}`;
            item.day = `${day}`;
          });

          data.list.forEach(item => {
            this.table.body.push(item)
          });

          this.table.args.current_page = ++this.table.args.current_page;

          let totalPage = Math.ceil(data.total / this.table.args.page_size);
          if (this.table.args.current_page > totalPage) {
            this.more = false;
          } else {
            this.more = true;
          }
        }
      },
      loadMore() {
        let html = document.querySelector('html');
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        console.log(html.scrollHeight - scrollTop)
        if (html.scrollHeight - scrollTop - 204 <= window.innerHeight) {
          if (this.more) {
            // this.isLoadingMore = true;
            this.getArticleList()
          }
        }
      },
      /*函数去抖*/
      debounce(fn, delay) {
        let timer = null;
        return function () {
          const context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn.apply(this, args)
          }, delay)
        }
      },
      detailRouter(id) {
        this.$router.push({
          path: 'article-detail',
          query: {
            _id: id
          }
        })
      }
    }
  }
</script>
