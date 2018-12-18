<style lang="scss" scoped>
  .counter {
    font-size: 16px;
    color: #333;
    font-weight: 700;
    .total {
      margin-left: 20px;
    }
    &:before {
      content: " ";
      position: absolute;
      z-index: 1;
      margin-left: -6px;
      margin-top: 5px;
      width: 12px;
      height: 12px;
      background: #bbb;
      border-radius: 50%;
    }
  }

  .collection-title {
    position: relative;
    margin: 40px 0;
    &:before {
      content: " ";
      position: absolute;
      z-index: 1;
      left: 0;
      top: 50%;
      margin-left: -5px;
      margin-top: -4px;
      width: 10px;
      height: 10px;
      background: #bbb;
      border-radius: 50%;
    }
    .year {
      margin-left: 20px;
      font-size: 22px;
    }
  }

  .post {
    .header {
      margin-bottom: 20px;
      position: relative;
      transition-duration: .2s;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      transition-property: border;
      border-bottom: 1px dashed #ccc;
      .title {
        font-size: 16px;
        font-weight: 400;
        line-height: inherit;
        margin: 20px 0 15px 60px;
        .link {
          color: #666;
        }
      }
      .meta {
        position: absolute;
        font-size: 12px;
        left: 20px;
        top: 5px;
        .time {
          color: #00a7e0;
        }
      }
      &:before {
        content: " ";
        position: absolute;
        z-index: 1;
        left: 0;
        top: 8px;
        width: 10px;
        height: 10px;
        margin-left: -5px;
        background: #bbb;
        border-radius: 50%;
        border: 1px solid #fff;
        transition-duration: .2s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
        transition-property: background;
      }
    }
  }
</style>

<template>
  <div class="archives-panel">
    <div class="counter"><span class="total">目前共计 {{total}} 篇日志。</span></div>
    <div v-for="item in archivesList">
      <div class="collection-title">
        <h1 class="year">{{item.name}}</h1>
      </div>
      <article class="post" v-for="article in item.list">
        <header class="header">
          <h2 class="title">
            <a class="link" href="javascript:;" @click="onClick(article)">
              <span>{{article.title}}</span>
            </a>
          </h2>
          <div class="meta">
            <time class="time">
              {{article.date}}
            </time>
          </div>
        </header>
      </article>
    </div>
  </div>
</template>

<script>
  export default {
    name: "archives-item",
    props: {
      total: {
        type: Number,
        default: 0
      },
      archivesList: {
        type: Array,
        default: []
      }
    },
    methods: {
      onClick(item) {
        this.$emit('on-click', item)
      }
    }
  }
</script>
