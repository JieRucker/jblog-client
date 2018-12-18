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
      <div class="counter">目前共计 {{tags_list.length}} 个标签</div>
      <div class="cloud-tags">
        <ul class="l-list">
          <li class="item" v-for="item in tags_list">
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
  import jAside from '@/components/j-aside/j-aside';

  export default {
    name: "index",
    components: {
      jAside
    },
    data() {
      return {
        tags_list: [],
      }
    },
    mounted() {
      this.getTagsList()
    },
    methods: {
      async getTagsList() {
        let res = await this.$api.tagsInterface.getTagsList();
        let {article_num_list = [], tags_list = []} = res.data.data;
        tags_list.forEach(item => {
          let temp = article_num_list.find(i => i._id === item._id);
          item.tags_article_num = temp ? temp.count : 0;
        });

        this.tags_list = tags_list.sort((a, b) => {
          return a.tags_article_num < b.tags_article_num;
        });

        this.tags_list = tags_list;
      },
      onClick(item) {
        this.$router.push({
          path: 'tags-detail',
          query: {
            _id: item._id
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
