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
              font-size: 22px;
              color: #795548;
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
            <a href="javascript:;" :style="[{fontSize:item.fontSize},{color:item.color}]">{{item.tags_name}}<span
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
        styles_list: [
          {
            fontSize: '28px',
            color: '#484444'
          },
          {
            fontSize: '12px',
            color: '#cccccc'
          },
          {
            fontSize: '16px',
            color: '#9d9d9d'
          },
          {
            fontSize: '27px',
            color: '#5a5959'
          },
          {
            fontSize: '18px',
            color: '#8e8e8e'
          },
          {
            fontSize: '19px',
            color: '#7e7e7e'
          },
          {
            fontSize: '21px',
            color: '#6f6f6f'
          },
          {
            fontSize: '24px',
            color: '#4f4f4f'
          },
          {
            fontSize: '15px',
            color: '#adadad'
          },
          {
            fontSize: '25px',
            color: '#464040'
          },
          {
            fontSize: '13px',
            color: '#bcbcbc'
          }
        ]
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
          let index = this.random(0, 10);
          item.tags_article_num = temp == null ? 0 : temp.count;
          item.fontSize = this.styles_list[index].fontSize;
          item.color = this.styles_list[index].color;
        });

        this.tags_list = tags_list.sort((a, b) => {
          return a.tags_article_num < b.tags_article_num;
        });

        this.tags_list = tags_list;
        console.log(this.tags_list)
      },
      random(n, m) {
        let random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;
      }
    }
  }
</script>
