<style lang="scss" scoped>
  .author {
    text-align: center;
    .img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: none;
      margin: 0 auto;
    }
    .description {
      font-size: 14px;
      margin: 5px 0 8px;
      font-weight: 700;
      color: #555;
      text-align: center;
    }
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
    .item {
      font-size: 16px;
      display: inline-block;
      margin: 0 5px;
      text-align: center;
      width: 42px;
      height: 42px;
      line-height: 42px;
      border-radius: 42px;
      color: rgba(0, 0, 0, .5);
      background-color: rgba(0, 0, 0, .1);
      transition: all .3s ease-in-out;
      font-style: normal;
    }
  }

  .state {
    overflow: hidden;
    line-height: 1.4;
    white-space: nowrap;
    text-align: center;
    .item {
      display: inline-block;
      padding: 0 10px;
      color: #555;
      .count {
        display: block;
        text-align: center;
        color: inherit;
        font-weight: 600;
        font-size: 16px;
      }
    }
    .posts {
      .name {
        color: #00a7e0;
      }
    }
    .categories {
      border-left: 1px solid #eee;
      .name {
        color: #ff3f1a;
      }
    }
  }
</style>

<template>
  <div class="site-overview">
    <div class="author">
      <img class="img" :src="get_person_info.avatar" alt="JRucker">
      <p class="description">{{get_person_info.description}}</p>
    </div>
    <div class="links">
      <a class="item" @click="open_page(get_person_info.github)">
        <Icon type="social-github"></Icon>
      </a>
      <a class="item" @click="open_page(get_person_info.twitter)">
        <Icon type="social-twitter"></Icon>
      </a>
      <a class="item" @click="open_page(get_person_info.juejin)">
        <Icon type="social-rss"></Icon>
      </a>
    </div>

    <nav class="state">
      <a href="javascript:;" class="item posts" @click="open_archives">
        <span class="count">{{get_person_info.article_num}}</span>
        <span class="name">日志</span>
      </a>
      <a href="javascript:;" class="item categories" @click="open_tags">
        <span class="count">{{get_person_info.tags_num}}</span>
        <span class="name">标签</span>
      </a>
    </nav>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "site-overview",
    computed: {
      ...mapGetters([
        'get_person_info',
      ]),
    },
    methods: {
      open_page(href) {
        window.open(href, '_blank');
      },
      open_archives() {
        this.$router.push({
          path: 'archives'
        })
      },
      open_tags() {
        this.$router.push({
          path: 'tags'
        })
      }
    }
  }
</script>
