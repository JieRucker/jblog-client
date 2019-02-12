<style lang="scss" scoped>
  .main-inner {
    .posts-tags {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;
      .counter {
        text-align: center;
        color: #333;
        font-size: 20px;
        font-weight: 700;
      }
      .cloud-tags {
        margin-top: 20px;
        text-align: center;
        .l-list {
          .item {
            display: inline-block;
            margin: 15px;
            border-bottom: 1px solid #999;
            word-wrap: break-word;
            a {
              color: #555;
              .num {
                color: #bbb;
                margin-left: 5px;
              }
              &:hover {
                color: #333333;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .main-inner {
      .posts-tags {
        width: 100%;
        min-height: auto;
        padding: 15px;
        .cloud-tags {
          text-align: left;
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
    <section class="posts-tags animated fadeIn">
      <div class="counter">目前共计 {{get_tags_list.length}} 个标签</div>
      <div class="cloud-tags">
        <ul class="l-list">
          <li class="item" v-for="item in get_tags_list">
            <a href="javascript:;" :style="{fontSize: item.tags_article_num * 2 + 13 + 'px'}" @click="onClick(item)">{{item.tags_name}}<span
              class="num">({{item.tags_article_num}})</span></a>
          </li>
        </ul>
      </div>

    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  // import {createNamespacedHelpers} from 'vuex'
  // const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('tags');
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import jAside from '@/components/j-aside/j-aside';

  export default {
    name: "index",
    components: {
      jAside
    },
    computed: {
      ...mapGetters({get_tags_list: 'tags/get_tags_list'})
    },
    asyncData({store, route}) {
      return store.dispatch('tags/getTagsList')
    },
    methods: {
      onClick(item) {
        this.$router.push({
          name: 'articles',
          params: {
            id: item._id
          }
        })
      },
      random(n, m) {
        let random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;
      }
    }
  }
</script>
