<style lang="scss" scoped>
  .main-inner {
    .posts-expand {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      article {
        position: relative;
        padding: 25px;
        background: #fff;
        border-radius: 5px;
        margin-top: 25px;
        &:first-child {
          margin-top: 0;
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
          .cover {
            height: 200px;
            margin-top: 10px;
            .img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
          .abstract {
            margin-top: 10px;
            font-size: 13px;
            line-height: 24px;
            color: #999;
            display: flex;
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
        article {
          padding: 15px;
          border-radius: initial;
          margin-top: 15px;
          &:first-child {
            margin-top: 0;
          }
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
      <article class="post" v-for="(item,index) in get_article_list">
        <div class="date">
          <div class="month">{{item.month}}月</div>
          <div class="day">{{item.day}}</div>
        </div>
        <div class="body">
          <router-link class="title" tag="a" :to="{name: 'detail', params: {id: item._id}}">{{item.article_title}}
          </router-link>

          <div class="cover" v-if="item.article_cover != ''">
            <img :src="item.article_cover" class="img">
          </div>
          <div class="abstract">
            <p>{{item.article_desc}}</p>
          </div>
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

      <j-scroll :show-loading="show_spinner" :more="more" @on-click="onClick"></j-scroll>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  // 惰性注册
  // import {createNamespacedHelpers} from 'vuex'
  // const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('home');

  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import jAside from '@/components/j-aside/j-aside';
  import jScroll from '@/components/j-scroll';

  export default {
    name: "index",
    components: {
      jAside,
      jScroll
    },
    asyncData({store, route}) {
      store.commit('home/SET_RESET');
      return store.dispatch('home/getArticleList')
    },
    computed: {
      ...mapState({
        more: state => state.home.more,
        show_spinner: state => state.home.show_spinner
      }),
      ...mapGetters({get_article_list: 'home/get_article_list'})
    },
    data: () => ({
      _loadMore: null
    }),
    mounted() {
      this._loadMore = this.$Global.debounce(this.loadMore, 300);
      window.addEventListener('scroll', this._loadMore, false)
    },
    methods: {
      ...mapMutations({
        showSpinner: 'home/SHOW_SPINNER'
      }),
      ...mapActions({getArticleList: 'home/getArticleList'}),
      onClick() {
        this.showSpinner(true);
        this.getArticleList()
      },
      loadMore() {
        let html = document.querySelector('html');
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (html.scrollHeight - scrollTop - 204 <= window.innerHeight) {
          if (this.more) {
            this.showSpinner(true);
            this.getArticleList()
          }
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this._loadMore)
    }
  }
</script>
